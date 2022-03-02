import { prefix as IAdB, dom } from '@Utils';

const { CE, Q, ETFade, htmlToElement } = dom;

const ETMessage = (config) => {
  // tmp prefix
  const prefix = 'et';

  const pf = `${prefix}-message`;
  const { content, duration = 2000, type = 'warn' } = config;

  let wrap = Q(`.${pf}-wrap`);

  if (!wrap) {
    wrap = CE('div');
    wrap.className = `${pf}-wrap ${IAdB}`;
    document.body.appendChild(wrap);
  }

  const t = `${pf}-${type}`;

  const msg = htmlToElement(`
    <div class='${pf} ${IAdB}'>
      <div class='${pf}-content ${t} ${IAdB}'>
        ${content}
      </div>
    </div>
  `);

  wrap.appendChild(msg);

  ETFade({
    el: msg,
    isEnter: true,
  });

  let hasQuit = false;

  const handleClick = () => {
    if (hasQuit) {
      return;
    }

    hasQuit = true;

    ETFade({
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

export default ETMessage;
