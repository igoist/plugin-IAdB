import * as dom from './lib/dom';
import * as log from './lib/log';

import * as decode from './lib/decode';
import * as extension from './lib/extension';
import md5 from './lib/md5';

const prefix = 'IAdB';
const idName = 'iadb_reset_site_style';

const IAdBState = {
  fontColor: '#b8b8b8',
  ifDarkMode: false,
  ifBgImage: true,
  ifNoImage: false,
  ifReadCode: false,
  ifProgramSwitch: true,
};

export { prefix, idName, IAdBState, dom, log, decode, md5, extension };
