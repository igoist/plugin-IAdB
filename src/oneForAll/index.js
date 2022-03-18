import { log, dom, extension, keyCode, IAdBState, idName } from '@Utils';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useImmerReducer } from 'use-immer';

import { FadeLayer, KeyMenu, ResetStyle } from '@Components';
import { useIAdBHook, useKeyMenuHook, Provider } from '@Models';

import Keys from './Keys';
import Panel from './Panel';
import News from './News';

const { useEffect, useMemo } = React;
const { l } = log;
const { scrollSmothlyTo } = dom;
const { getStore } = extension;
const { returnKeyCode } = keyCode;

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

  const KeyCodeArr = Object.keys(IAdBState);

  const R = () => {
    const { data: IAdBState, dispatch: useIAdBDispatch } = useIAdBHook.useContainer();
    const { visible, dispatch: keyMenuDispatch } = useKeyMenuHook.useContainer();

    const [state, dispatch] = useImmerReducer(reducer, initialState);
    const { keys } = state;

    const commands = returnCommands({
      IAdBState,
      useIAdBDispatch,
      keyMenuDispatch,
      dispatch,
    });

    // 会在 Panel 以及 handleIClickEvent 中使用到，此外这里需不需要 useMemo，结论是不需要
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
      const handleIClickEvent = (e) => {
        if (visible) {
          return;
        }

        l({
          title: 'handleKeyDown',
          text: `e.key: ${e.key}, keyArray: ${keyArray}, e.keyCode: ${e.keyCode}, cC: ${cC}, ifDarkMode: ${IAdBState.ifDarkMode}`,
        });

        if (IAdBState.ifProgramSwitch) {
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
            payload: keyArray.split(''),
          });
        }
      };

      document.addEventListener('keydown', handleIClickEvent, false);
      return () => {
        document.removeEventListener('keydown', handleIClickEvent, false);
      };
    });

    const fadeLayerPanelProps = {
      suffix: 'panel',
      layerKeyCode: returnKeyCode('p'),
      main: () => <Panel {...PanelProps} />,
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

        <Keys keys={keys} />

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
