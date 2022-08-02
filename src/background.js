import { IAdBState, extension } from '@Utils';
import { handleWorkTimeData, returnWorkTimeArrStr, getNews } from './backgroundFns';
import BGCAI from './BGCAI';

const { getStore, getStoreLocal, setStore, setStoreLocal, getOrCreateStorage, ETXSenderGetTab, ETXTabRemove } = extension;

const saveTabs = () => {
  chrome.tabs.query({}, (tabs) => {
    setStoreLocal({
      IAdBTabs: JSON.stringify(tabs),
    });
  });
};

const getTabsOld = () => {
  return new Promise((resolve) => {
    getStoreLocal(['IAdBTabs'], (result) => {
      let r = JSON.parse(result.IAdBTabs);
      resolve(r);
    });
  });
};

const getTabs = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({}, (tabs) => {
      resolve(tabs);
    });
  });
};

const main = async () => {
  /**
   * workTime 初始为 0
   * 当计时开始，赋值 +new Date()，如此一来，之后统计时间只需要算一下 duration/delta
   * workTimeData 关键词 'YMD': [{ start, ms }]
   */
  let workTime = 0;
  let workTimeData = {};
  let news = {};
  let defaultDarkMode = false;

  chrome.runtime.onInstalled.addListener(function (details) {
    // chrome.contextMenus.create({
    //   "id": "sampleContextMenu",
    //   "title": "Sample Context Menu",
    //   "contexts": ["selection"]
    // });
    // chrome.storage.local.set(IAdBState);

    // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    //   chrome.declarativeContent.onPageChanged.addRules([{
    //     conditions: [new chrome.declarativeContent.PageStateMatcher({
    //       pageUrl: {
    //         hostEquals: 'www.baidu.com'
    //       },
    //     })],
    //     actions: [new chrome.declarativeContent.ShowPageAction()]
    //   }]);
    // });

    const resetGlobals = () => {
      getStore(['fontColor'], (result) => {
        if (result.fontColor === undefined) {
          setStore(IAdBState);
        }
      });
      getStore(['workTime', 'workTimeData'], (result) => {
        if (result.workTime !== undefined) {
          workTime = parseInt(result.workTime);
        }
        if (result.workTimeData !== undefined) {
          workTimeData = JSON.parse(result.workTimeData);
        }
      });
      // Unchecked runtime.lastError: QUOTA_BYTES_PER_ITEM quota exceeded
      // getStore(['news'], (result) => {
      //   if (result.news !== undefined) {
      //     news = JSON.parse(result.news);
      //   }
      // });
    };

    switch (details.reason) {
      // 这里代码层面想优化可以优化，也可以不优化
      case 'install': // when user install
        resetGlobals();
      case 'update': // when user update
        resetGlobals();
        break;
      case 'chrome_update':
        console.log('chrome_update');
        break;
      default:
        break;
    }
  });

  // 需要注意的是 await 前置会导致错过 onInstalled
  // const BGCAI = await getOrCreateStorage('BGCAI', {});

  window.BGCAI = BGCAI;
  window.workTimeData = workTimeData;
  window.news = news;
  window.defaultDarkMode = defaultDarkMode;

  const handleBGCAI = ({ url, action = 0, totalAdd, countAdd }) => {
    let item = BGCAI[url];

    if (item) {
      if (totalAdd !== undefined) {
        item.total += totalAdd;
        item.count += countAdd;
      } else {
        item.total++;
        item.count += action;
      }
      console.log('handleBGCAI', item);
    } else {
      BGCAI[url] = {
        total: 1,
        count: action,
      };
    }
  };

  const confirmBGCAI = (url) => {
    let item = BGCAI[url];

    if (item) {
      console.log(`confirmBGCAI: ${item.count} / ${item.total} = ${item.count / item.total}`);
      return item.count / item.total > 0.5;
    }

    // 控制默认行为是否是 darkMode
    return defaultDarkMode;
  };

  const onMessage = (request, sender, sendResponse) => {
    // console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
    console.log(sender, request);
    const { payload } = request;
    let tmp; // for any tmp result

    if (request.to === 'IAdB-bg') {
      switch (request.type) {
        case 'TabsSave':
          sendResponse({ msg: 'save tabs success' });
          saveTabs();
          break;
        case 'TabsGet':
          sendResponse({ msg: 'get tabs success' });
          // getTabs();
          break;
        case 'TabsRecover':
          // to the tabs recover
          break;
        case 'et-bgc-confirm':
          sendResponse({
            ifDarkMode: confirmBGCAI(payload.url),
          });
          break;
        case 'et-bgc-update':
          console.log('et-bgc-update: ', payload.url, payload.action, payload);
          handleBGCAI({ ...payload });
          sendResponse({ msg: 'et-bgc-update success' });
          break;
        case 'et-bg-work-time':
          if (workTime === 0) {
            sendResponse({ msg: '始まり' });
            workTime = +new Date();
            setStore({ workTime });
          } else {
            tmp = handleWorkTimeData({
              data: workTimeData,
              start: workTime,
              end: +new Date(),
            });

            workTime = 0;
            workTimeData = tmp[0];

            setStore({ workTime, workTimeData: JSON.stringify(workTimeData) });
            sendResponse({ msg: `お疲れ様でした。時間は ${tmp[1]}ms / ${tmp[2]}` });
          }
          break;
        case 'et-bg-work-time-show':
          tmp = returnWorkTimeArrStr(workTimeData);
          sendResponse({ result: tmp });
          break;
        case 'et-bg-news':
          getNews(news, sendResponse, payload);
          return true;
        case '....':
          // const tab = ETXSenderGetTab(sender);
          // ETXTabRemove(tab.id);
          // chrome.tabs.getSelected(null, (tab) => {
          //   chrome.tabs.remove(tab.id, function (zzz) {
          //   });
          // });
          break;
        default:
          if (request.act) {
            sendResponse({ msg: request.act });
          }
          break;
      }
    }
  };

  chrome.runtime.onMessage.addListener(onMessage);

  // chrome.bookmarks.onCreated.addListener(function() {
  //   // Events must be registered synchronously from the start of th page
  //   // do something
  //   console.log(chrome.bookmarks);
  // });

  // chrome.runtime.onMessage.addListener(function(message, sender, reply) {
  //   chrome.runtime.onMessage.removeListener(event);
  // });

  // chrome.webNavigation.onCompleted.addListener(function() {
  //   // alert("This is my test website!");
  //   console.log('.........');
  // }, {
  //   url: [{urlMatches : 'https://www.baidu.com/'}]
  // });

  // await 的任务放在前面会导致

  window.getTabs = async () => {
    const tabs = await getTabs();

    // console.log('=========', tabs);
    for (let i = 0; i < tabs.length; i++) {
      console.log(`${tabs[i].id} - ${tabs[i].title} - ${tabs[i].url}`);
    }
  };

  window.closeTab = (id) => {
    chrome.tabs.remove(id, function () {
      console.log('should be successful');
    });
  };
};

try {
  main();
} catch (err) {
  console.log(`%cmain catch%c: ${err}`, 'background: #fff; color:  #f49cec;', 'color: #149cec;', err);
}
