import KeyMenu from './KeyMenu';


const returnKeyMenu = (config) => {
  let { content, duration, type, withMask = true } = config;
  return new KeyMenu({
    withMask: withMask
    // content,
    // duration,
    // type
  });
}

export {
  returnKeyMenu
};
