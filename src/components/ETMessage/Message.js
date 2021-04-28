import { dom } from '@Utils';

const { CE, Q, hbFade, htmlToElement } = dom;

const HBMessage = (config) => {
  // tmp prefix
  const prefix = 'et';

  const pf = `${prefix}-message`;
  const { content, duration = 2000, type = 'warn' } = config;

  let wrap = Q(`.${pf}-wrap`);

  if (!wrap) {
    wrap = CE('div');
    wrap.className = `${pf}-wrap`;
    document.body.appendChild(wrap);
  }

  const t = `${pf}-${type}`;

  const msg = htmlToElement(`
    <div class='${pf}'>
      <div class='${pf}-content ${t}'>
        ${content}
      </div>
    </div>
  `);

  wrap.appendChild(msg);

  hbFade({
    el: msg,
    isEnter: true,
  });

  let hasQuit = false;

  const handleClick = () => {
    if (hasQuit) {
      return;
    }

    hasQuit = true;

    hbFade({
      el: msg,
      callback: () => {
        wrap.removeChild(msg);
      },
    });
  };

  msg.addEventListener('click', handleClick);

  setTimeout(() => {
    handleClick();
  }, duration);
};

export default HBMessage;
