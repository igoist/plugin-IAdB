import { IAdBState, extension } from '@Utils';

const { getStore, getStoreLocal, setStore, setStoreLocal } = extension;

const saveTabs = () => {
  chrome.tabs.query({}, (tabs) => {
    setStoreLocal({
      IAdBTabs: JSON.stringify(tabs),
    });
  });
};

const getTabs = () => {
  getStoreLocal(['IAdBTabs'], (result) => {
    let r = JSON.parse(result.IAdBTabs);
    console.log(r);
    return r;
  });
};

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

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
    console.log(sender, request);
    if (request.to === 'IAdB-bg') {
      switch (request.act) {
        case 'TabsSave':
          sendResponse({ msg: 'save tabs success' });
          saveTabs();
          break;
        case 'TabsGet':
          sendResponse({ msg: 'get tabs success' });
          getTabs();
          break;
        case 'TabsRecover':
          // to the tabs recover
          break;
        default:
          break;
      }
    }
  });

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
