// 闭包，后期再说

// 搜索结果页右侧广告区, #content_right
let contentRight = document.getElementById('content_right');

// let kw = document.getElementById('kw');

if (contentRight) {
  contentRight.remove();
}

let styleStr = `
  #content_right {
    display: none;
  }
`;

// 简单粗暴 -- 然后 Head 会刷新
let trickStyle = document.createElement('style');
trickStyle.id = 'sssss';
trickStyle.type = 'text/css';
trickStyle.innerHTML = styleStr;

// 无用，head 中特定位置或者 style 每次都会刷新
// let igoist = document.getElementsByTagName('HEAD').item(0);
// igoist.insertBefore(trickStyle, igoist.children[0]);

// igoist.addEventListener('change', (e) => {
//   console.log('head change');
// });

// 真•简单粗暴
let body = document.body;

body.insertBefore(trickStyle, body.children[0]);

// 网络延迟方面的问题会影响，体验不够好，
// kw.addEventListener('keyup', (e) => {
//   // 搜索结果页右侧广告区, #content_right
//   setTimeout(() => {
//     let contentRight = document.getElementById('content_right');

//     if (contentRight) {
//       contentRight.remove();
//       console.log('clear');
//     }
//   }, 80);
// });


// kw.addEventListener('keydown', (e) => {
//   document.getElementsByTagName('HEAD').item(0).appendChild(trickStyle);
// });
