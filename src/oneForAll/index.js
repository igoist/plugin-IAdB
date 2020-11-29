import { log, dom, extension, IAdBState, prefix, idName } from '@Utils';
import './oneForAll.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { KeyMenu, ResetStyle } from '@Components';
import { Message } from '@Components/Message';
import { useIAdBHook, useKeyMenuHook, Provider } from '@Models';

const { useEffect, useState } = React;
const { l } = log;
const { scrollSmothlyTo } = dom;
const { getStore, sendMessage } = extension;

const mainF = () => {
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

  let cC = 0;
  let keyArray = '';

  const KeyCodeArr = Object.keys(IAdBState);

  const sendActToBG = (actName) => {
    sendMessage({ to: 'IAdB-bg', act: actName }, (response) => {
      l({
        title: actName,
        text: 'should be success',
      });
      Message.success(response.msg);
    });
  };

  const R = () => {
    const { data: s, dispatch: useIAdBDispatch } = useIAdBHook.useContainer();
    const { visible, dispatch: keyMenuDispatch } = useKeyMenuHook.useContainer();
    const [switchFlag, setSwitchFlag] = useState(false);
    const [prevent, setPrevent] = useState(false);

    useEffect(() => {
      getStore(KeyCodeArr, (result) => {
        setSwitchFlag(result.ifDarkMode);
        useIAdBDispatch({
          type: 'DataSet',
          payload: { ...result },
        });
      });
    }, []);

    useEffect(() => {
      const dispatchMenuTask = (keyArray) => {
        switch (keyArray) {
          case '000':
            keyMenuDispatch({
              type: 'KeyMenuToggle',
            });
            return true;
          case '001':
            document.title = 'Yahaha';
            return true;
          case '002':
            useIAdBDispatch({
              type: 'DataSync',
            });
          case '005':
            setPrevent(!prevent);
            l({
              title: 'preventDefaultKeyDown',
              text: `now is ${prevent}, will be ${!prevent}`,
            });
            break;
          // 0111 ~ 0199 for sending actions to bg
          case '111':
            sendActToBG('TabsSave');
            break;
          case '112':
            sendActToBG('TabsGet');
          case '113':
            sendActToBG('TabsRecover');
            break;
          default:
            console.log('無駄ですよ');
            return false;
        }
      };

      const handleIClickEvent = (e) => {
        if (visible) {
          return;
        }

        if (prevent) {
          e.preventDefault();
        }

        l({
          title: 'handleKeyDown',
          text: `e.key: ${e.key}, keyArray: ${keyArray}, e.keyCode: ${e.keyCode}, cC: ${cC}, switchFlag: ${switchFlag}`,
        });

        getStore(KeyCodeArr, (result) => {
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

                // keyMenu.hide();
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
              switch (e.keyCode) {
                case 74: // j
                  scrollSmothlyTo(window.scrollY + 100);
                  break;
                case 75: // k
                  scrollSmothlyTo(window.scrollY - 100);
                  break;
                default:
                  break;
              }
              keyArray = '';
              cC = 0;
            }
          }

          useIAdBDispatch({
            type: 'DataSet',
            payload: { ...result },
          });
        });
      };

      document.addEventListener('keydown', handleIClickEvent, false);
      return () => {
        document.removeEventListener('keydown', handleIClickEvent, false);
      };
    });

    return (
      <>
        <ResetStyle {...s} visible={switchFlag} />
        <KeyMenu />
      </>
    );
  };

  // if (darkMode && result.programSwitch) {
  if (true) {
    let div = document.createElement('div');
    div.id = `${idName}-parent`;

    // document.body.appendChild(div);
    document.body.insertBefore(div, document.body.children[0]);

    ReactDOM.render(
      <Provider>
        <R />
      </Provider>,
      div
    );
    // keyMenu.init();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // backgroundMusic.play();
      sendMessage({ greeting: 'kejian' }, (response) => {
        l({
          title: 'TEST',
          text: 'kejian',
        });
        console.log(response);
      });
    } else {
      sendMessage({ greeting: 'bukejian' }, (response) => {
        l({
          title: 'TEST',
          text: 'bukejian',
        });
        console.log(response);
      });
    }
  });
};

try {
  mainF();
} catch (err) {
  console.log(`%cmainF catch%c: ${err}`, 'background: #fff; color:  #f49cec;', 'color: #149cec;', err);
}
