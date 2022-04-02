import { log, dom, extension, keyCode, IAdBState, idName } from '@Utils';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useImmerReducer } from 'use-immer';

import { FadeLayer, KeyMenu, ResetStyle } from '@Components';
import { useIAdBHook, useInputHook, useKeyMenuHook, Provider } from '@Models';

import Inputs from './Inputs';
import Keys from './Keys';
import Panel from './Panel';
import News from './News';
import Inspect from './Inspect';

const { useEffect, useMemo } = React;
const { l } = log;
const { scrollSmothlyTo } = dom;
const { getStore } = extension;
const { returnModifierKeyArr, returnKeyCode, returnCode, returnInputKey } = keyCode;

import { returnURL, ETSendMessage } from './fns';
import { returnCommands, returnDispatchMenuTask, initialState, reducer } from './tmp';

const mainF = () => {
  /**
   * backgroundColor
   * fontColor
   * cC 计数器
   * keyArray 指令字符串
   * switchFlag 按键控制标记 可以使用 ifDarkMode 来替代
   * ifDarkMode 当前模式
   * ifBgImage 是否保留背景图
   * ifProgramSwitch 插件开关
   * keyMenu 就是 keyMenu
   */

  let cC = 0;
  let keyArray = '';
  let BAN = false;

  const KeyCodeArr = Object.keys(IAdBState);

  const R = () => {
    const { data: IAdBState, dispatch: useIAdBDispatch } = useIAdBHook.useContainer();
    const { inputValue, inputList, inputMode, dispatch: useInputDispatch } = useInputHook.useContainer();
    const { visible, dispatch: keyMenuDispatch } = useKeyMenuHook.useContainer();

    const [state, dispatch] = useImmerReducer(reducer, initialState);
    const { keys, inspectOn } = state;

    const commands = returnCommands({
      IAdBState,
      inputList,
      useIAdBDispatch,
      keyMenuDispatch,
      dispatch,
    });

    // 会在 Panel 以及 handleIKeypressEvent 中使用到，此外这里需不需要 useMemo，结论是不需要
    const dispatchMenuTask = returnDispatchMenuTask(commands);

    const PanelProps = {
      commands,
      dispatch: dispatchMenuTask,
    };

    useEffect(() => {
      getStore(KeyCodeArr, (result) => {
        useIAdBDispatch({
          type: 'IAdBStateSet',
          payload: { ...result },
        });
      });

      // 原本通过 getStore 获得 result.ifDarkMode
      window.IAdBURL = returnURL();
      ETSendMessage(
        {
          type: 'et-bgc-confirm',
          payload: {
            url: returnURL(),
          },
        },
        (res) => {
          if (!res) {
            return;
          }
          useIAdBDispatch({
            type: 'IAdBStateSet',
            payload: {
              ifDarkMode: res.ifDarkMode,
            },
          });
        }
      );
    }, []);

    useEffect(() => {
      const handleIKeypressEvent = (e) => {
        if (BAN || visible) {
          return;
        }

        l({
          title: 'handleKeyDown',
          text: `e.key: ${e.key}, keyArray: ${keyArray}, e.code: ${e.code}, e.keyCode: ${e.keyCode}, cC: ${cC}, ifDarkMode: ${IAdBState.ifDarkMode}`,
        });

        if (IAdBState.ifProgramSwitch) {
          // Inputs start
          if (inputMode) {
            if (e.altKey && e.code === returnCode('m')) {
              useInputDispatch({
                type: 'InputToggleMode',
              });
            } else if (returnInputKey(e.code) !== undefined) {
              useInputDispatch({
                type: 'InputSetValue',
                payload: e.key,
              });
            } else {
              if (e.code === 'Backspace') {
                useInputDispatch({
                  type: 'InputBackspace',
                });
              }

              if (e.code === 'Escape') {
                let typeName = 'InputPopValue';

                if (inputValue) {
                  typeName = 'InputResetValue';
                }

                useInputDispatch({
                  type: typeName,
                });
              }

              if (e.code === 'Enter') {
                useInputDispatch({
                  type: 'InputPushValue',
                });
              }
            }
            return;
          }
          // Inputs end

          if (e.keyCode === 27) {
            // esc
            keyArray = '';
            cC = 0;
          } else if (e.ctrlKey) {
            cC += 1;

            if (cC === 3 && !IAdBState.ifDarkMode) {
              dispatchMenuTask('003', {
                action: true,
              });

              cC = 0;
            }

            if (cC === 2 && IAdBState.ifDarkMode) {
              dispatchMenuTask('003', {
                action: false,
              });

              cC = 0;
            }
          } else if (e.altKey) {
            if (e.keyCode === 67) {
              // alt + c
              document.body.dispatchEvent(new Event('et-side-toggle'));
            }
            if (e.code === returnCode('m')) {
              useInputDispatch({
                type: 'InputToggleMode',
              });
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

          dispatch({
            type: 'setKeys',
            payload: [...returnModifierKeyArr(e), ...keyArray.split('')],
          });
        }
      };

      document.addEventListener('keydown', handleIKeypressEvent, false);
      return () => {
        document.removeEventListener('keydown', handleIKeypressEvent, false);
      };
    });

    const fadeLayerPanelProps = {
      suffix: 'panel',
      layerKeyCode: returnKeyCode('p'),
      main: useMemo(() => () => <Panel {...PanelProps} />, [commands]),
      handleEnter: () => {
        BAN = true;
      },
      handleLeave: () => {
        BAN = false;
      },
    };

    const FadeLayerNews = useMemo(() => {
      const fadeLayerNewsProps = {
        suffix: 'news',
        layerKeyCode: returnKeyCode('w'),
        main: () => <News />,
      };

      return <FadeLayer {...fadeLayerNewsProps} />;
    }, []);

    return (
      <>
        {/* ResetStyle 的 visible 改用了 ifDarkMode */}
        <ResetStyle {...IAdBState} />
        <KeyMenu />

        <FadeLayer {...fadeLayerPanelProps} />
        {FadeLayerNews}

        <Inputs />
        <Keys keys={keys} />

        <Inspect turnOn={inspectOn} />

        {/* <ListTabs /> it could be moved into iframe with ... */}
      </>
    );
  };

  if (true) {
    let div = document.createElement('div');
    div.id = `${idName}-parent`;
    div.classList.add('IAdB');
    div.classList.add('IAdB-wrap');

    document.body.appendChild(div);

    ReactDOM.render(
      <Provider>
        <R />
      </Provider>,
      div
    );
  }
};

try {
  mainF();
} catch (err) {
  console.log(`%cmainF catch%c: ${err}`, 'background: #fff; color:  #f49cec;', 'color: #149cec;', err);
}
