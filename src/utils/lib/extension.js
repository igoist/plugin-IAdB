/**
 * f(browser extension)
 * keyArr as Array<any>
 * keyAndValue as {}
 */
const getStore = (keyArr, callback) => {
  chrome.storage.sync.get(keyArr, (result) => {
    callback({
      ...result,
    });
  });
};

const getStoreLocal = (keyArr, callback) => {
  chrome.storage.local.get(keyArr, (result) => {
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

const setStoreLocal = (keyAndValue, callback) => {
  chrome.storage.local.set(keyAndValue, (a, b) => {
    if (callback) {
      callback();
    }
  });
};

const sendMessage = (data, callback) => {
  chrome.runtime.sendMessage(data, callback);
};

export { getStore, getStoreLocal, setStore, setStoreLocal, sendMessage };
