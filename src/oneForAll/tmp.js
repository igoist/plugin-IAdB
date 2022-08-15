import { ETMessage } from '@Components/ETMessage';
import { addLink, returnURL, ETSendMessage } from './fns';
import { dom, fns } from '@Utils';

const { scrollSmothlyTo } = dom;
const { handleValue } = fns;

const outp = (props) => {
  const [a, b] = props;
  console.log(`Hello ${a}, my name is ${b}`);
};
/**
 * 这里一个问题
 * props 是固定的一些值
 */
export const returnCommands = (props) => {
  const { IAdBState, inputList, inputTypeList, recording, useIAdBDispatch, useIRecordsHookDispatch, keyMenuDispatch, dispatch } = props;

  return [
    {
      key: '000',
      desc: 'Toggle KeyMenu',
      fn: () => {
        keyMenuDispatch({
          type: 'KeyMenuToggle',
        });
      },
    },
    {
      key: '001',
      desc: '修改页面标题',
      fn: () => {
        document.title = 'Yahaha';
      },
    },
    {
      key: '002',
      desc: 'IAdB 状态数据同步到 storage',
      fn: () => {
        useIAdBDispatch({
          type: 'IAdBStateSync',
        });
      },
    },
    {
      key: '003',
      desc: '切换 ifDarkMode，并更新 bgc 数据',
      fn: (payload) => {
        const url = returnURL();
        if (payload) {
          ETSendMessage({
            type: 'et-bgc-update',
            payload: {
              url,
              action: payload.action ? 1 : 0,
            },
          });
          useIAdBDispatch({
            type: 'IAdBStateSet',
            payload: {
              ifDarkMode: !!payload.action,
            },
          });
        } else if (inputList.length) {
          console.log('inputList', inputList);
          ETSendMessage({
            type: 'et-bgc-update',
            payload: {
              url,
              totalAdd: parseInt(inputList[0]) || 0,
              countAdd: parseInt(inputList[1]) || 0,
            },
          });
        }
      },
    },
    // 0111 ~ 0199 for sending actions to bg
    // {
    //   key: '111',
    //   desc: '保存当前 Tabs(仅对非匿名窗口有效)',
    //   fn: () => {
    //     ETSendMessage('TabsSave');
    //   },
    // },
    {
      key: '100',
      desc: '工作时间统计开始或结束',
      fn: () => {
        ETSendMessage(
          {
            type: 'et-bg-work-time',
          },
          (res) => {
            console.log(res.msg);
          }
        );
      },
    },
    {
      key: '101',
      desc: '今日工作时间统计',
      fn: () => {
        ETSendMessage(
          {
            type: 'et-bg-work-time-show',
          },
          (res) => {
            let result = JSON.parse(res.result);

            for (let i = 0; i < result.length; i++) {
              console.log(`start: ${result[i].start} -- ms: ${result[i].ms}`);
            }
          }
        );
      },
    },
    {
      key: '111',
      desc: 'ifDarkMode 取反',
      fn: () => {
        ETSendMessage({
          type: 'et-bgc-update',
          payload: {
            url: returnURL(),
            flag: IAdBState.ifDarkMode, // 取反再取反
          },
        });
        useIAdBDispatch({
          type: 'IAdBStateSet',
          payload: {
            ifDarkMode: !IAdBState.ifDarkMode,
          },
        });
      },
    },
    // {
    //   key: '112',
    //   fn: () => {
    //     ETSendMessage('TabsGet');
    //   },
    // },
    // {
    //   key: '113',
    //   fn: () => {
    //     ETSendMessage('TabsRecover');
    //   },
    // },
    // 复制选中文字（反禁止转载）
    {
      key: '333',
      fn: () => {
        navigator.clipboard.writeText(document.getSelection());
      },
    },
    {
      key: '555',
      desc: 'output some info',
      fn: () => {
        outp(inputList);
      },
    },
    {
      key: '600',
      fn: () => {
        useIRecordsHookDispatch({
          type: 'RecordsToggleMode',
        });
      },
    },
    {
      key: '601',
      fn: () => {
        useIRecordsHookDispatch({
          type: 'RecordsConsole',
        });
      },
    },
    {
      key: '602',
      fn: () => {
        useIRecordsHookDispatch({
          type: 'RecordsRepeat',
        });
      },
    },
    {
      key: '609',
      fn: () => {
        const t = parseFloat(inputList[0]);
        let y = 100;
        if (!isNaN(t)) {
          y = t;
        }

        if (recording) {
          useIRecordsHookDispatch({
            type: 'RecordsAdd',
            payload: {
              type: 'scroll',
              params: [y],
            },
          });
        }

        scrollSmothlyTo(y);
      },
    },
    {
      key: '666',
      fn: () => {
        dispatch({
          type: 'toggleInspect',
        });
      },
    },
    {
      key: '665',
      fn: () => {
        dispatch({
          type: 'togglePosition',
        });
      },
    },
    {
      key: '998',
      fn: () => {
        const msr = document.getElementById('fontstylemsr');

        if (msr) {
          document.body.removeChild(msr);
        } else {
          const s = document.createElement('style');

          s.id = 'fontstylemsr';

          s.innerHTML = `
@font-face {
  font-family: 'museo-sans-rounded';
  src: url('https://use.typekit.net/af/491586/00000000000000003b9b1e2d/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3')
      format('woff2'),
    url('https://use.typekit.net/af/491586/00000000000000003b9b1e2d/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3')
      format('woff'),
    url('https://use.typekit.net/af/491586/00000000000000003b9b1e2d/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3')
      format('opentype');
  font-display: auto;
  font-style: normal;
  font-weight: 300;
  font-stretch: normal;
}

body {
  font-family: museo-sans-rounded, sans-serif;
}
          `;

          s.type = 'text/css';

          document.body.appendChild(s);
        }
      },
    },
    {
      key: '999',
      desc: '试验田，专门用于测试特定代码',
      fn: () => {
        // addLink();
        // const arr = [];
        // for (let i = 0; i < inputList.length; i++) {
        //   arr.push(handleValue(inputList[i], inputTypeList[i]));
        // }
        // console.log(arr);

        const checkInputList = (typeArr) => {
          if (typeArr.length > inputTypeList.length) {
            ETMessage['warn']('输入参数数量不匹配');
            return false;
          }

          for (let i = 0; i < typeArr.length; i++) {
            if (typeArr[i] !== inputTypeList[i]) {
              ETMessage['warn'](`输入参数 ${i} 类型不匹配`);
              return false;
            }
          }

          return true;
        };

        const changeDOMText = () => {
          if (inputList.length < 2 || !checkInputList(['dom', 'string'])) {
            return;
          }

          const el = handleValue(inputList[0], 'dom');

          if (el) {
            el.innerText = inputList[1];
          }
        };

        changeDOMText();
      },
    },
  ];
};

// 传入 returnCommands 返回的 commands, 返回对应的 dispatch 函数
export const returnDispatchMenuTask = (commands) => {
  // keyArray 实际就是个三位数字字符串
  // payload 固定为 object
  return (keyArray, payload) => {
    for (let i = 0; i < commands.length; i++) {
      let command = commands[i];
      if (command.key === keyArray) {
        command.fn(payload);
        console.log('fn!!!', command);
        return true;
      }
    }

    console.log('無駄ですよ');
    return false;
  };
};

export const initialState = {
  menuVisible: false,
  keys: [],
  inspectOn: false,
  positionOn: false,
  modeInput: false,
};

export const reducer = (draft, action) => {
  switch (action.type) {
    case 'setKeys':
      draft.keys = action.payload;
      break;
    case 'toggleInspect':
      draft.inspectOn = !draft.inspectOn;
      break;
    case 'toggleInputMode':
      draft.modeInput = !draft.modeInput;
      break;
    case 'togglePosition':
      draft.positionOn = !draft.positionOn;
      break;
  }
};
