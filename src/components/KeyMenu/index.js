import KeyMenu from './KeyMenu';

const showKeyMenu = (config) => {
  let { content, duration, type } = config;
  let keyMenu = new KeyMenu({
    // content,
    // duration,
    // type
  });

  keyMenu.render();
  keyMenu.componentDidMount();
}

export {
  showKeyMenu
};