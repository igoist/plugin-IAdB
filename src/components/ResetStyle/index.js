import * as React from 'react';
import { idName, prefix } from '@Utils';

const ResetStyle = (props) => {
  const backgroundColor = '#2a2a2a';
  const { fontColor, ifBgImage, ifNoImage, ifReadCode, ifDarkMode } = props;

  if (ifDarkMode) {
    return (
      <style id={idName} type={'text/css'}>
        {`
${ifReadCode ? '*:not(pre):not(code):not(span),' : ''}
${'*:not(.' + prefix + ', .' + prefix + ' *)'},
*:not(html):before,
*:after {
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
      `}
      </style>
    );
  } else {
    return null;
  }
};

export default ResetStyle;
