const htmlToElement = (html) => {
  let template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
};

const Q = (s) => document.querySelector(s);
const QA = (s) => document.querySelectorAll(s);

const scrollSmothlyTo = (p) => {
  // if (!window.requestAnimationFrame) {
  //   window.requestAnimationFrame = (callback, el) => {
  //     return setTimeout(callback, 17);
  //   }
  // }

  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  const step = () => {
    const distance = p - scrollTop;

    scrollTop += distance / 5;

    if (Math.abs(distance) < 1) {
      window.scrollTo(0, p);
    } else {
      window.scrollTo(0, scrollTop);
      requestAnimationFrame(step);
    }
  };

  step();
};

export { htmlToElement, Q, QA, scrollSmothlyTo };
