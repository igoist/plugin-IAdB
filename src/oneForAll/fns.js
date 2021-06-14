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
 * props:
 *   - type
 *   - payload
 */
export const ETSendMessage = (props, callback) => {
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

      if (response.msg) {
        ETMessage.success(response.msg);
      }
    }
  );
};

// export const ETSendMessageBundle = {

// }
