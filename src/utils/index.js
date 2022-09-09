export * as dom from './lib/dom';
export * as log from './lib/log';

export * as decode from './lib/decode';
export * as extension from './lib/extension';
export * as fuzzyMatch from './lib/fuzzyMatch';
export * as keyCode from './lib/keyCode';
export * as random from './lib/random';
export * as scroll2 from './lib/scroll2';
export * as time from './lib/time';
export { default as md5 } from './lib/md5';

export const prefix = 'IAdB';
export const idName = 'iadb_reset_site_style';

export const IAdBState = {
  ifDarkMode: false,
  fontColor: '#b8b8b8',
  ifBgImage: true,
  ifNoImage: false,
  ifReadCode: false,
  ifProgramSwitch: true,
};

// 未归类 fn start
export const fns = {
  handleValue: (v, t) => {
    try {
      switch (t) {
        case 'string':
          return v;
        case 'int':
          return parseInt(v, 10);
        case 'float':
          return parseFloat(v);
        case 'bool':
          return v === 'false' ? false : !!v;
        case 'object':
          return JSON.parse(v);
        case 'dom':
          return document.querySelector(v);
        case 'domAll':
          return document.querySelectorAll(v);
      }
    } catch (err) {
      return 'et-custom-input-error';
    }
  },
};
// 未归类 fn end
