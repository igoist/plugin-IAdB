import { IAdBState, extension } from '@Utils';

const { getStore, getStoreLocal, setStore, setStoreLocal, ETXSenderGetTab, ETXTabRemove } = extension;

const saveTabs = () => {
  chrome.tabs.query({}, (tabs) => {
    setStoreLocal({
      IAdBTabs: JSON.stringify(tabs),
    });
  });
};

const getTabs = () => {
  return new Promise((resolve) => {
    getStoreLocal(['IAdBTabs'], (result) => {
      let r = JSON.parse(result.IAdBTabs);
      resolve(r);
    });
  });
};

const BGCAI = {
  'www.host.com': {
    total: 10,
    count: 8,
  },
};

window.BGCAI = BGCAI;

const handleBGCAI = (url, action = 0) => {
  let item = BGCAI[url];

  if (item) {
    item.total++;
    console.log('handleBGCAI', action);
    item.count += action;
    console.log(item, BGCAI);
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

  return true;
};

const main = () => {
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

    const onMessage = (request, sender, sendResponse) => {
      // console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
      console.log(sender, request);
      const { payload } = request;

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
            console.log('et-bgc-confirm');
            sendResponse({
              ifDarkMode: confirmBGCAI(payload.url),
            });
            break;
          case 'et-bgc-update':
            console.log('et-bgc-update');
            console.log('==========', payload.url, payload.action, payload);
            handleBGCAI(payload.url, payload.action);
            break;
          case 'et-bgc-inc':
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

    switch (details.reason) {
      case 'install': // when user install
        getStore(['fontColor'], (result) => {
          if (result.fontColor === undefined) {
            setStore(IAdBState);
          }
        });
      case 'update': // when user update
        getStore(['fontColor'], (result) => {
          if (result.fontColor === undefined) {
            setStore(IAdBState);
          }
        });
        break;
      case 'chrome_update':
        console.log('chrome_update');
        break;
      default:
        break;
    }
  });

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
};

try {
  main();
} catch (err) {
  console.log(`%cmain catch%c: ${err}`, 'background: #fff; color:  #f49cec;', 'color: #149cec;', err);
}
