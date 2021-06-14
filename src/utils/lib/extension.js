/**
 * f(browser extension)
 * keyArr as Array<any>
 * keyAndValue as {}
 */
export const getStore = (keyArr, callback) => {
  chrome.storage.sync.get(keyArr, (result) => {
    callback({
      ...result,
    });
  });
};

export const getStoreLocal = (keyArr, callback) => {
  chrome.storage.local.get(keyArr, (result) => {
    callback({
      ...result,
    });
  });
};

export const setStore = (keyAndValue, callback) => {
  chrome.storage.sync.set(keyAndValue, (a, b) => {
    if (callback) {
      callback();
    }
  });
};

export const setStoreLocal = (keyAndValue, callback) => {
  chrome.storage.local.set(keyAndValue, (a, b) => {
    if (callback) {
      callback();
    }
  });
};

export const sendMessage = (data, callback) => {
  chrome.runtime.sendMessage(data, callback);
};

/**
 * ======== bg only ========
 * ETXSenderGetTab
 * ETXTabRemove
 **/
export const ETXSenderGetTab = (sender) => {
  return sender.tab;
};

export const ETXTabRemove = (id, callback) => {
  chrome.tabs.remove(id, callback);
};
