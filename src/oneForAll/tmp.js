import { addLink, ETSendMessage } from './fns';

export const returnCommands = (props) => {
  const { keyMenuDispatch, useIAdBDispatch } = props;

  return [
    {
      key: '000',
      fn: () => {
        keyMenuDispatch({
          type: 'KeyMenuToggle',
        });
      },
    },
    {
      key: '001',
      fn: () => {
        document.title = 'Yahaha';
      },
    },
    {
      key: '002',
      fn: () => {
        useIAdBDispatch({
          type: 'DataSync',
        });
      },
    },
    // {
    //   key: '005',
    //   fn: () => {
    //     setPrevent(!prevent);
    //     l({
    //       title: 'preventDefaultKeyDown',
    //       text: `now is ${prevent}, will be ${!prevent}`,
    //     });
    //   },
    // },
    // 0111 ~ 0199 for sending actions to bg
    // {
    //   key: '111',
    //   fn: () => {
    //     ETSendMessage('TabsSave');
    //   },
    // },
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
    // {
    //   key: '225',
    //   fn: () => {
    //     setPV(!PV);
    //   },
    // },
    {
      key: '666',
      fn: () => {
        ETSendMessage({
          type: 'et-bgc-update',
          payload: {
            url: location.hostname + location.pathname,
            action: 1,
          },
        });
      },
    },
    {
      key: '555',
      fn: () => {
        ETSendMessage({
          type: 'et-bgc-update',
          payload: {
            url: location.hostname + location.pathname,
            action: 0,
          },
        });
      },
    },
    {
      key: '999',
      fn: () => {
        addLink();
      },
    },
  ];
};

// (() => {
//   window.fse = () => {
//     console.log(chrome.sessions);
//   };

//   console.log('=========;, ', chrome.sessions);

//   console.log('IADB init', window, window.chrome.runtime.getManifest());
//   window.fse();
// })();

// 传入 returnCommands 返回的 commands, 返回对应的 dispatch 函数
export const returnDispatchMenuTask = (commands) => {
  return (keyArray) => {
    // switch (keyArray) {
    //   case '000':
    //     keyMenuDispatch({
    //       type: 'KeyMenuToggle',
    //     });
    //     return true;
    //   case '001':
    //     document.title = 'Yahaha';
    //     return true;
    //   case '002':
    //     useIAdBDispatch({
    //       type: 'DataSync',
    //     });
    //     break;
    //   case '005':
    //     setPrevent(!prevent);
    //     l({
    //       title: 'preventDefaultKeyDown',
    //       text: `now is ${prevent}, will be ${!prevent}`,
    //     });
    //     break;
    //   // 0111 ~ 0199 for sending actions to bg
    //   case '111':
    //     ETSendMessage('TabsSave');
    //     break;
    //   case '112':
    //     ETSendMessage('TabsGet');
    //     break;
    //   case '113':
    //     ETSendMessage('TabsRecover');
    //     break;
    //   case '225':
    //     setPV(!PV);
    //     break;
    //   case '999':
    //     addLink();
    //     break;
    //   default:
    //     console.log('無駄ですよ');
    //     return false;
    // }
    for (let i = 0; i < commands.length; i++) {
      let command = commands[i];
      if (command.key === keyArray) {
        command.fn();
        console.log('fn!!!', command);
        return true;
      }
    }

    console.log('無駄ですよ');
    return false;
  };
};

export const initialState = {
  switchFlag: false,
  prevent: false,
  PV: false,
};

export const reducer = (draft, action) => {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'initSwitchFlag':
      draft.switchFlag = action.payload;
      break;
    case 'setSwitchFlag':
      draft.switchFlag = action.payload;
      // initSwitchFlag 不算, 其他情况每次 set 都需要发送 update 事件
      ETSendMessage({
        type: 'et-bgc-update',
        payload: {
          url: location.hostname + location.pathname,
          action: action.payload ? 1 : 0,
        },
      });
      break;
    case 'setPrevent':
      draft.prevent = action.payload;
      break;
    case 'setPV':
      draft.PV = action.payload;
      break;
  }
};
