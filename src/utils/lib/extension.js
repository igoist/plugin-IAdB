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

const setStore = (keyAndValue, callback) => {
  chrome.storage.sync.set(keyAndValue, (a, b) => {
    if (callback) {
      callback();
    }
  });
};

export { getStore, setStore };
