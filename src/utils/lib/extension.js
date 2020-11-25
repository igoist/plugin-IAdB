/**
 * f(browser extension)
 */
const getStore = (keyArr, callback) => {
  chrome.storage.sync.get(keyArr, (result) => {
    callback({
      ...result,
    });
  });
};

export { getStore };
