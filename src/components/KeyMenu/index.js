import KeyMenu from './KeyMenu';


const returnKeyMenu = (config) => {
  let { content, duration, type, withMask = true, showCallback = null, hideCallback = null } = config;
  return new KeyMenu({
    withMask: withMask,
    // content,
    // duration,
    // type
    showCallback: showCallback,
    hideCallback: hideCallback,
  });
}

export {
  returnKeyMenu
};
