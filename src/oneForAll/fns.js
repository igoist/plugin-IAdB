import { log, extension, md5, prefix } from '@Utils';
import { ETMessage } from '@Components/ETMessage';

const { l } = log;
const { getStore, sendMessage } = extension;

export const addLink = async () => {
  const values = {
    title: document.title,
    link: location.href,
    excerpt: 'test3',
    generatedId: md5(location.hostname) + md5(location.pathname) + (location.search ? md5(location.search) : ''),
  };

  let api = '/api/v1/item/history/';
  let r = await fetch(`http://localhost:6085${api}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .then((res) => res);

  ETMessage[r.Code === 0 ? 'success' : 'warn'](`${prefix} addLink: ${r.msg}`);
};

/**
 * 一种方式是 props 中约定一个变量，控制是否最后显示消息
 * 另一种是 background 中约定的 response，不要消息时不返回 msg
 * 目前选择了后者
 * props:
 *   - type
 *   - payload
 */
export const ETSendMessage = (props, callback) => {
  console.log('ETSendMessage to', `${prefix}-bg`);
  sendMessage(
    {
      to: `${prefix}-bg`,
      ...props,
    },
    (response) => {
      l({
        title: props.type,
        text: 'should be success',
      });

      if (callback) {
        callback(response);
      }

      if (response && response.msg) {
        ETMessage.success(response.msg);
      }
    }
  );
};

// export const ETSendMessageBundle = {

// }

/**
 * 传 pathname, 返回处理后的 pathname
 * /art/44/slug/works/ -> /art/**
 */
const regexNumber = /\d+/;

export const returnPathname = (p) => {
  let arr = p.split('/');

  let cur = -1;

  for (let i = 0; i < arr.length; i++) {
    if (regexNumber.test(arr[i])) {
      cur = i;
      break;
    }
  }

  if (cur !== -1) {
    arr[cur] = '**';
    arr = arr.slice(0, cur + 1);
  }

  let pathname = arr.join('/');

  return pathname;
};

export const returnURL = () => {
  return location.hostname + returnPathname(location.pathname);
};
