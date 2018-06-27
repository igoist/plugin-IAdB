// 闭包，后期再说
const log = console.log.bind(this);

/*
 * 搜索结果页
 * 以 DOM 移除外加样式覆盖的方式
 * #content_right 右侧广告区
 * 搜索结果样式魔改
 * #rs 底部相关搜索这个狗东西
 */
let contentRight = document.getElementById('content_right');
let rs = document.getElementById('rs');
// let kw = document.getElementById('kw'); // 搜索输入框

let styleStr = `
  #content_right {
    display: none;
  }

  #container {
    margin: 0 auto;
    width: 1240px;
  }

  #content_left {
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .c-container {
    padding: 12px;
    width: 588px;
    min-height: 160px;
    border: 1px solid transparent;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.16);
    box-sizing: border-box;
  }

  #rs,
  #rs_top_new,
  .hit_top_new,
  .leftBlock {
    display: none!important;
  }

  h3.t a {
    color: #149cec;
  }

  h3.t a em {
    color: #ec414d;
  }
`;

if (contentRight) {
  contentRight.remove();
  log('搜索结果页右侧广告区已移除');
}

if (rs) {
  rs.remove();
  log('底部相关搜索 #rs 已移除');
}

// 简单粗暴 -- 然后 Head 会刷新
let trickStyle = document.createElement('style');
trickStyle.id = 'igoist_iadb';
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


/*
 * 百科页内容处理
 * .side-content 右侧内容
 * .topA 顶部广告
 * .new-side-share 右侧分享按钮
 * .after-content 底部猜你喜欢
 */

let sideContent = document.querySelector('.side-content');
let topA = document.querySelector('.topA');
let newSideShare = document.querySelector('.new-side-share');
let afterContent = document.querySelector('.after-content');

if (sideContent) {
  sideContent.remove();
  log('百科页右侧已移除');
}


if (topA) {
  topA.remove();
  log('百科页顶部广告 .topA 已移除');
}

if (newSideShare) {
  newSideShare.remove();
  log('百科页右侧分享 .new-side-share 已移除');
}

if (afterContent) {
  afterContent.remove();
  log('百科页底部猜你喜欢 .after-content 已移除');
}


/**
 * 百度知道页
 * aside 右侧
 */

let aside = document.querySelector('aside');

if (aside) {
  aside.remove();
}
