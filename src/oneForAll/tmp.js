import { addLink, returnURL, ETSendMessage } from './fns';

/**
 * 这里一个问题
 * props 是固定的一些值
 */
export const returnCommands = (props) => {
  const { IAdBState, useIAdBDispatch, keyMenuDispatch, dispatch } = props;

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
        ETSendMessage({
          type: 'et-bgc-update',
          payload: {
            url: returnURL(),
            action: payload.action ? 1 : 0,
          },
        });
        useIAdBDispatch({
          type: 'IAdBStateSet',
          payload: {
            ifDarkMode: payload.action,
          },
        });
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
            type: 'et-bgc-work-time',
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
            type: 'et-bgc-work-time-show',
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
      key: '999',
      fn: () => {
        addLink();
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
};

export const reducer = (draft, action) => {
  switch (action.type) {
    case 'setKeys':
      draft.keys = action.payload;
      break;
  }
};
