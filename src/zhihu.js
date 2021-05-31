import React from 'react';
import ReactDOM from 'react-dom';
import { log, dom } from '@Utils';

const { useEffect, useState } = React;
const { Q, QA, ETElHide, ETElShow, returnTargetDOM } = dom;

const mainF = function () {
  /**
   * 顾老几行代码知乎热门屏蔽
   * 再看看自己当初写的实在太蠢萌，而且之前一直不晓得 Mutation 功能存在
   * 处理 .TopstoryItem 为主的以及其他可能包含'热门内容，'的 DOM
   * 留一线情面，不把其直接 remove，而是用模拟点击的方式屏蔽，话说这注释也是好玩
   */

  function purify(nodes) {
    for (let node of nodes) {
      if (node.textContent.indexOf('热门内容, ') === 0) {
        node.querySelector('.TopstoryItem-rightButton').click();
        // node.parentNode.removeChild(node) // 做人留一线，先注释掉
        console.log(node);
      }
    }
  }

  const mo = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      if (mutation.type === 'childList') {
        purify(mutation.addedNodes);
      }
    }
  });

  purify(QA('.TopstoryItem'));

  if (Q('.TopstoryMain > div')) {
    mo.observe(Q('.TopstoryMain > div'), { childList: true });
  }

  /**
   * 问题答案页
   * .AdblockBanner 友情提示
   * .Question-sideColumn 侧栏
   * .Question-main 主要内容，对其排版样式重新自定义
   *
   * 针对 /question/id/answer/id
   * ViewAllBtns 点击之后延时处理
   */
  // let AdblockBanner = Q('.AdblockBanner');

  // if (AdblockBanner) {
  //   AdblockBanner.remove();
  // }

  ////////////
  let topArr = ['.QuestionHeader-main .QuestionHeader-title'];
  let mainArr = ['.Topstory-mainColumn', '.SearchMain', '.Question-mainColumn', '.Profile-mainColumn', '.Collections-mainColumn'];
  let sidebarArr = ['.GlobalSideBar', '.SearchSideBar', '.Question-sideColumn', '.Profile-sideColumn'];

  const checkMS = () => {
    let w, x, y;

    w = returnTargetDOM(topArr);
    x = returnTargetDOM(mainArr);
    y = returnTargetDOM(sidebarArr);

    return [w, x, y];
  };

  let div = document.createElement('div');
  document.body.appendChild(div);

  const [top, main, sidebar] = checkMS();

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
    const [fW, setFW] = useState(false);
    const [fX, setFX] = useState(false);
    const [fY, setFY] = useState(false);
    const [menu, setMenu] = useState(false);

    useEffect(() => {
      let ViewAllBtns = QA('.Question-main .ViewAll');
      if (ViewAllBtns.length > 0) {
        for (let i = 0; i < ViewAllBtns.length; i++) {
          ViewAllBtns[i].addEventListener('click', () => {
            setTimeout(() => {
              const [top, main, sidebar] = checkMS();
              setFX(false);
              setFY(false);
              setX(main);
              setY(sidebar);
            }, 1000);
          });
        }
      }
    }, []);

    useEffect(() => {
      hFW();
    }, [w]);

    useEffect(() => {
      hFX();
    }, [x]);

    useEffect(() => {
      hFY();
    }, [y]);

    const hFW = returnHandleFn(w, fW, setFW);
    const hFX = () => {
      if (fX) {
        x.d.style.width = '';
      } else {
        x.d.style.width = '100%';
      }
      setFX(!fX);
    };
    const hFY = returnHandleFn(y, fY, setFY);

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
 * /hot 首页（热榜）
 * Topstory-container
 * Topstory-mainColumn
 * GlobalSideBar
 *
 * /question/waiting 等你来答
 * QuestionWaiting
 * QuestionWaiting-mainColumn
 * GlobalSideBar
 *
 * /search?type=..&q=.. 搜索页
 * Search-container
 * SearchMain
 * SearchSideBar
 *
 *
 * /question/.. 回答页
 * Question-main
 * Question-mainColumn
 * Question-sideColumn
 *
 *
 * /question/../answer/.. 指向指定回答页，点击查看全部会重新渲染成回答页
 * Question-main
 * Question-mainColumn
 * Question-sideColumn
 * ViewAll
 *
 *
 * /people/xxx 用户信息页
 * Profile-main
 * Profile-mainColumn
 * Profile-sideColumn
 *
 *
 * /collections/mine 个人收藏
 * Collections-container
 * Collections-mainColumn
 */
