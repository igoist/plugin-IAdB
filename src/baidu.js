// 闭包，后期再说
const clog = console.log.bind(this);

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
  #container {
    margin: 0 auto;
    width: 1240px;
  }

  #container.sam_newgrid #content_left {
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }


  .c-container {
    padding: 12px;
    width: 100%;
    min-height: 160px;
    border: 1px solid transparent;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.16);
    box-sizing: border-box;
  }
  .new-pmd.c-container {
    width: 100%;
  }

  .new-pmd .c-span12 {
    width: 100%;
  }

  h3.t a {
    color: #149cec;
  }

  h3.t a em {
    color: #ec414d;
  }
`;

// #rs,
// #rs_top_new,
// .hit_top_new,
// .leftBlock {
//   display: none!important;
// }

// if (contentRight) {
//   contentRight.remove();
//   clog('搜索结果页右侧广告区已移除');
// }

// if (rs) {
//   rs.remove();
//   clog('底部相关搜索 #rs 已移除');
// }

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

// if (sideContent) {
//   sideContent.remove();
//   clog('百科页右侧已移除');
// }

// if (topA) {
//   topA.remove();
//   clog('百科页顶部广告 .topA 已移除');
// }

// if (newSideShare) {
//   newSideShare.remove();
//   clog('百科页右侧分享 .new-side-share 已移除');
// }

// if (afterContent) {
//   afterContent.remove();
//   clog('百科页底部猜你喜欢 .after-content 已移除');
// }

/**
 * 百度知道页
 * aside 右侧
 */

let aside = document.querySelector('aside');

// if (aside) {
//   aside.remove();
// }

import React from 'react';
import ReactDOM from 'react-dom';
import { dom } from '@Utils';

const { useEffect, useState } = React;
const { CE, ETElHide, ETElShow, returnTargetDOM } = dom;

const mainF = () => {
  const topArr = ['.topA'];

  const mainArr = ['.c-group-wrapper'];

  const sidebarArr = ['.cr-offset', '.side-content', '.new-side-share', 'aside'];

  const bottomArr = ['.s-hotsearch-wrapper', '#rs', '.after-content'];

  const checkMS = () => {
    let w, x, y, z;

    w = returnTargetDOM(topArr);
    x = returnTargetDOM(mainArr);
    y = returnTargetDOM(sidebarArr);
    z = returnTargetDOM(bottomArr);

    return [w, x, y, z];
  };

  let div = CE('div');
  document.body.appendChild(div);

  const [top, main, sidebar, bottom] = checkMS();

  const returnHandleFn = (el, flag, setFlag) => {
    return () => {
      if (!el) {
        return;
      }

      if (flag) {
        ETElShow(el.d);
      } else {
        ETElHide(el.d);
      }

      setFlag(!flag);
    };
  };

  const R = () => {
    const [w, setW] = useState(top);
    const [x, setX] = useState(main);
    const [y, setY] = useState(sidebar);
    const [z, setZ] = useState(bottom);
    const [fW, setFW] = useState(false);
    const [fX, setFX] = useState(false);
    const [fY, setFY] = useState(false);
    const [fZ, setFZ] = useState(false);
    const [menu, setMenu] = useState(false);

    useEffect(() => {}, []);

    useEffect(() => {
      hFW();
    }, [w]);

    useEffect(() => {
      hFX();
    }, [x]);

    useEffect(() => {
      hFY();
    }, [y]);

    useEffect(() => {
      hFZ();
    }, [z]);

    const hFW = returnHandleFn(w, fW, setFW);
    const hFX = returnHandleFn(x, fX, setFX);
    const hFY = returnHandleFn(y, fY, setFY);
    const hFZ = returnHandleFn(z, fZ, setFZ);

    const handleToggle = () => {
      setMenu(!menu);
    };

    let count = 0;

    if (w) {
      count++;
    }

    if (x) {
      count++;
    }

    if (y) {
      count++;
    }

    if (z) {
      count++;
    }

    const pf = 'et-side';

    return (
      <>
        <div className={`IAdB ${pf}-wrap ${menu ? 'hidden' : ''}`} style={{ top: `${244 - count * 22}px` }}>
          <div className={`IAdB ${pf}-item ${fW ? 'active' : ''} ${w ? '' : 'is-hidden'}`} onClick={hFW}>
            <div className="IAdB et-btn">{w ? w.c : '...'}</div>
          </div>
          <div className={`IAdB ${pf}-item ${fX ? 'active' : ''} ${x ? '' : 'is-hidden'}`} onClick={hFX}>
            <div className="IAdB et-btn">{x ? x.c : '...'}</div>
          </div>
          <div className={`IAdB ${pf}-item ${fY ? 'active' : ''} ${y ? '' : 'is-hidden'}`} onClick={hFY}>
            <div className="IAdB et-btn">{y ? y.c : '...'}</div>
          </div>
          <div className={`IAdB ${pf}-item ${fZ ? 'active' : ''} ${z ? '' : 'is-hidden'}`} onClick={hFZ}>
            <div className="IAdB et-btn">{z ? z.c : '...'}</div>
          </div>
        </div>

        <div className={`IAdB ${pf}-toggle`} onClick={handleToggle}>
          Toggle
        </div>
      </>
    );
  };

  ReactDOM.render(<R />, div);
};

try {
  mainF();
} catch (err) {
  console.log(`%cmainF catch%c: ${err}`, 'background: #fff; color:  #f49cec;', 'color: #149cec;', err);
}

/**
 * main
 * .c-group-wrapper 搜索结果视频推荐
 *
 * sidebar
 * .cr-offset 搜索结果右侧推荐
 *
 * bottom
 * .s-hotsearch-wrapper 首页搜索框下, 百度热搜
 * #rs 搜索结果底部相关搜索 related search...
 */
