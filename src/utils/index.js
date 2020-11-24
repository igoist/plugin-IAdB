import * as dom from './lib/dom';
import * as log from './lib/log';

import * as decode from './lib/decode';
import md5 from './lib/md5';

const prefix = 'IAdB';

const IAdBState = {
  fontColor: '#b8b8b8',
  ifDarkMode: false,
  ifBgImage: true,
  ifNoImage: false,
  ifReadCode: false,
  ifProgramSwitch: true,
};

export { prefix, IAdBState, dom, log, decode, md5 };
