// csdn 吃枣💊
let body = document.body;

let styleStr = `
  .customize.modthree,
  .fixRight_box {
    display: none !important;
  }
`;

// 简单粗暴
let trickStyle = document.createElement('style');
trickStyle.id = 'igoist_iadb';
trickStyle.type = 'text/css';
trickStyle.innerHTML = styleStr;

body.appendChild(trickStyle);

// csdn-tricking-statistics 部分，ajax 或者怎样，反正大概在首屏后加载（不要怪我）
setTimeout(() => {
  let adWrapper = document.querySelector('.extension_other');

  if (adWrapper) {
    adWrapper.remove();
    console.log(adWrapper, 'It has been removed');
  }
}, 300);