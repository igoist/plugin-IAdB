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

  ETMessage[r.code === 0 ? 'success' : 'warn'](`${prefix} addLink: ${r.msg}`);
};

export const sendActToBG = (actName, f = true) => {
  sendMessage({ to: 'IAdB-bg', act: actName }, (response) => {
    l({
      title: actName,
      text: 'should be success',
    });
    if (f) {
      ETMessage.success(response.msg);
    }
  });
};
