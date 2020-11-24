import { IAdBState } from '@Utils';

chrome.runtime.onInstalled.addListener(function () {
  // chrome.contextMenus.create({
  //   "id": "sampleContextMenu",
  //   "title": "Sample Context Menu",
  //   "contexts": ["selection"]
  // });
  // chrome.storage.local.set(IAdBState);

  chrome.storage.sync.set(IAdBState, function () {
    console.log('And the color is green.');
  });

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

let testFunc = () => {
  console.log('Yes!');
};

testFunc();
