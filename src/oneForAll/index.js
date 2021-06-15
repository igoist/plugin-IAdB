import { log, dom, extension, IAdBState, prefix, idName } from '@Utils';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useImmerReducer } from 'use-immer';

import { KeyMenu, ResetStyle } from '@Components';
import { ETMessage } from '@Components/ETMessage';
import { useIAdBHook, useKeyMenuHook, Provider } from '@Models';

import Hightlight from './Highlight';

const { useEffect, useState } = React;
const { l } = log;
const { scrollSmothlyTo } = dom;
const { getStore, sendMessage } = extension;

import { ETSendMessage } from './fns';
import { returnCommands, returnDispatchMenuTask, initialState, reducer } from './tmp';

const mainF = () => {
  const pf = 'et';
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

  const R = () => {
    const { data: s, dispatch: useIAdBDispatch } = useIAdBHook.useContainer();
    const { visible, dispatch: keyMenuDispatch } = useKeyMenuHook.useContainer();
    const [state, dispatch] = useImmerReducer(reducer, initialState);
    const { switchFlag, prevent, PV } = state;

    useEffect(() => {
      getStore(KeyCodeArr, (result) => {
        useIAdBDispatch({
          type: 'DataSet',
          payload: { ...result },
        });
      });

      // 原本通过 getStore 获得 result.ifDarkMode
      ETSendMessage(
        {
          type: 'et-bgc-confirm',
          payload: {
            url: location.hostname + location.pathname,
          },
        },
        (res) => {
          console.log('et-bgc-confirm', res);
          dispatch({
            type: 'initSwitchFlag',
            payload: res.ifDarkMode,
          });
        }
      );
    }, []);

    useEffect(() => {
      const commands = returnCommands({
        keyMenuDispatch,
        useIAdBDispatch,
      });

      const dispatchMenuTask = returnDispatchMenuTask(commands);

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
                dispatch({
                  type: 'setSwitchFlag',
                  payload: true,
                });

                cC = 0;
                ETMessage.success('Switch On');
              }

              if (cC === 2 && switchFlag) {
                dispatch({
                  type: 'setSwitchFlag',
                  payload: false,
                });

                cC = 0;
                ETMessage.success('Switch Off');
              }
            } else if (e.altKey) {
              if (e.keyCode === 67) {
                document.body.dispatchEvent(new Event('et-side-toggle'));
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
                  scrollSmothlyTo(100);
                  break;
                case 75: // k
                  scrollSmothlyTo(-100);
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

        {/* <ListTabs /> it could be moved into iframe with ... */}

        <Hightlight visible={PV} />
      </>
    );
  };

  if (true) {
    let div = document.createElement('div');
    div.id = `${idName}-parent`;

    document.body.appendChild(div);

    ReactDOM.render(
      <Provider>
        <R />
      </Provider>,
      div
    );
    // keyMenu.init();
  }

  // document.addEventListener('visibilitychange', () => {
  //   if (document.visibilityState === 'visible') {
  //     ETSendMessage({
  //       type: 'kejian',
  //     });
  //   } else {
  //     ETSendMessage({
  //       type: 'bukejian',
  //     });
  //   }
  // });
};

try {
  mainF();
} catch (err) {
  console.log(`%cmainF catch%c: ${err}`, 'background: #fff; color:  #f49cec;', 'color: #149cec;', err);
}
