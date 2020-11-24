import { log, IAdBState, prefix } from '@Utils';
import './oneForAll.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { returnKeyMenu } from '@Components/KeyMenu';
import { Message } from '@Components/Message';

const { useEffect, useState } = React;
const { l } = log;

const mainF = function () {
  /**
   * backgroundColor
   * fontColor
   * cC 计数器
   * keyArray 指令字符串
   * switchFlag 按键控制标记
   * ifDarkMode 当前模式
   * ifBgImage 是否保留背景图
   * ifProgramSwitch 插件开关
   * keyMenu 就是 keyMenu
   */
  let backgroundColor = '#2a2a2a';
  // let fontColor = '#86c7c7';
  // let ifDarkMode;
  // let switchFlag;
  // let ifBgImage;
  // let ifNoImage;
  // let ifReadCode;

  let cC = 0;
  let keyArray = '';
  let idName = 'iadb_reset_site_style';

  const keyMenu = returnKeyMenu({
    withMask: true,
    // showCallback: () => {
    //   console.log('for showCall');
    // },
    // hideCallback: () => {
    //   console.log('for hideCall');
    // }
  });

  const KeyCodeArr = Object.keys(IAdBState);

  const dispatchMenuTask = (keyArray) => {
    switch (keyArray) {
      case '000':
        if (!keyMenu.state.doing) {
          if (keyMenu.state.show) {
            keyMenu.hide();
          } else {
            keyMenu.show();
          }
        }
        return true;
      case '001':
        if (!keyMenu.state.doing) {
          document.title = 'Yahaha';
        }
        return true;
      default:
        console.log('無駄ですよ');
        return false;
    }
  };

  const getStore = (callback) => {
    chrome.storage.sync.get(KeyCodeArr, (result) => {
      callback({
        ...result,
      });
    });
  };

  const R = () => {
    const [s, setS] = useState(IAdBState);
    const [switchFlag, setSwitchFlag] = useState(false);

    useEffect(() => {
      getStore((result) => {
        setSwitchFlag(result.ifDarkMode);
        setS({ ...result });
      });
    }, []);

    useEffect(() => {
      const handleIClickEvent = (e) => {
        l({
          title: 'handleKeyDown',
          text: `e.key: ${e.key}, keyArray: ${keyArray}, e.keyCode: ${e.keyCode}, cC: ${cC}, switchFlag: ${switchFlag}`,
        });

        getStore((result) => {
          if (result.ifProgramSwitch) {
            if (e.ctrlKey) {
              cC += 1;

              if (cC === 3 && !switchFlag) {
                setSwitchFlag(true);

                cC = 0;
                Message.success('Switch On');
              }

              if (cC === 2 && switchFlag) {
                setSwitchFlag(false);

                keyMenu.hide();
                cC = 0;
                Message.success('Switch Off');
              }
            } else if (document.activeElement.nodeName !== 'INPUT' && keyArray.length < 3 && 47 < e.keyCode && e.keyCode < 58) {
              // keyMenu 显示 && keyArray.length < 3 && 焦点非 input && key 0 ~ 9
              keyArray += e.key;
              if (keyArray.length === 3) {
                // if order executed, then reset
                if (dispatchMenuTask(keyArray)) {
                  keyArray = '';
                } else {
                  keyArray = keyArray.slice(1, 3);
                }
              }
              // } else if (e.keyCode === 27 && cC === 1) {
              //   window.chrome.runtime.sendMessage('kfajbgpmhinphopgjjempdcgihajeejb', {
              //     to: 'huaban-bg',
              //     act: 'toggleREPartner',
              //   });
            } else {
              keyArray = '';
              cC = 0;
            }
          }

          setS({
            ...result,
          });
        });
      };

      document.addEventListener('keydown', handleIClickEvent, false);
      return () => {
        document.removeEventListener('keydown', handleIClickEvent, false);
      };
    });

    const { fontColor, ifBgImage, ifNoImage, ifReadCode } = s;

    if (switchFlag) {
      return (
        <style id={idName} type={'text/css'}>
          {`
${ifReadCode ? '*:not(pre):not(code):not(span):not(.' + prefix + ')' : '*:not(.' + prefix + ')'},
*:before,
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
}
        `}
        </style>
      );
    } else {
      return null;
    }
  };

  // if (darkMode && result.programSwitch) {
  if (true) {
    let div = document.createElement('div');
    div.id = `${idName}-parent`;
    document.body.appendChild(div);

    document.body.insertBefore(div, document.body.children[0]);

    ReactDOM.render(<R />, div);
    keyMenu.init();
  }
};

try {
  mainF();
} catch (err) {
  console.log(`%cmainF catch%c: ${err}`, 'background: #fff; color:  #f49cec;', 'color: #149cec;', err);
}
