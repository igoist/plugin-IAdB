import * as React from 'react';
import { idName, prefix } from '@Utils';
import { ETSendMessage } from '../../oneForAll/fns';

const { useEffect, useState } = React;

const ResetStyle = (props) => {
  const backgroundColor = '#2a2a2a';
  const { fontColor, ifBgImage, ifNoImage, ifReadCode, ifDarkMode } = props;

  const [extraCSS, setExtraCSS] = useState('');

  useEffect(() => {
    ETSendMessage(
      {
        type: 'et-bg-css-get',
      },
      (res) => {
        setExtraCSS(res.result);
      }
    );

    chrome.runtime.onMessage.addListener(function (response, sendResponse) {
      const r = JSON.parse(response);

      if (r.type === 'et-css-update') {
        setExtraCSS(r.data);
      }
    });
  }, []);

  if (ifDarkMode) {
    return (
      <style id={idName} type={'text/css'}>
        {`
${ifReadCode ? '*:not(pre):not(code):not(span),' : ''}
${'*:not(.' + prefix + ', .' + prefix + ' *)'},
${'*:not(html, .' + prefix + ', .' + prefix + ' *):before'},
${'*:not(.' + prefix + ', .' + prefix + ' *):after'} {
background-color: ${backgroundColor}!important;
border-color: ${backgroundColor}!important;
color: ${fontColor}!important;
box-shadow: none!important;
text-shadow: none!important;
${ifBgImage ? 'background-image: none!important;' : ''}
}

${ifNoImage ? 'img { visibility: hidden!important; }' : ''}

hr {
border: none!important;
}

iframe {
display: none!important;
cursor: pointer;
}

.et-test-selected {
filter: invert(100%);
}

${extraCSS}
      `}
      </style>
    );
  } else {
    return (
      <style id={idName} type={'text/css'}>
        {extraCSS}
      </style>
    );
  }
};

export default ResetStyle;
