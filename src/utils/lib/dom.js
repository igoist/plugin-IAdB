const htmlToElement = (html) => {
  let template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
};

const Q = (s) => document.querySelector(s);
const QA = (s) => document.querySelectorAll(s);

export default { htmlToElement, Q, QA };

export { htmlToElement, Q, QA };
