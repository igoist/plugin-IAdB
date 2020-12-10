import React from 'react';
import ReactDOM from 'react-dom';
import { log, dom } from '@Utils';

const { useEffect, useState } = React;
const { Q, QA } = dom;

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
  let titleArr = ['.QuestionHeader-main .QuestionHeader-title'];
  let mainArr = ['.Topstory-mainColumn', '.SearchMain', '.Question-mainColumn', '.Profile-mainColumn', '.Collections-mainColumn'];

  let sideBarArr = ['.GlobalSideBar', '.SearchSideBar', '.Question-sideColumn', '.Profile-sideColumn'];

  const checkMS = () => {
    let i;
    let w, x, y;

    for (i = 0; i < titleArr.length; i++) {
      let tmp = Q(titleArr[i]);

      if (tmp) {
        log.l({
          title: 'checkMS',
          text: `${titleArr[i]} exist`,
        });
        console.log(tmp);
        w = {
          c: titleArr[i],
          d: tmp,
        };
      }
    }

    for (i = 0; i < mainArr.length; i++) {
      let tmp = Q(mainArr[i]);
      if (tmp) {
        log.l({
          title: 'checkMS',
          text: `${mainArr[i]} exist`,
        });
        console.log(tmp);
        x = {
          c: mainArr[i],
          d: tmp,
        };
      }
    }

    for (i = 0; i < sideBarArr.length; i++) {
      let tmp = Q(sideBarArr[i]);
      if (tmp) {
        log.l({
          title: 'checkMS',
          text: `${sideBarArr[i]} exist`,
        });
        console.log(tmp);
        y = {
          c: sideBarArr[i],
          d: tmp,
        };
      }
    }

    return [w, x, y];
  };

  let div = document.createElement('div');
  document.body.appendChild(div);

  const prefix = 'zh';
  const [title, main, siderBar] = checkMS();

  const R = () => {
    const [w, setW] = useState(title);
    const [x, setX] = useState(main);
    const [y, setY] = useState(siderBar);
    const [fW, setFW] = useState(false);
    const [fX, setFX] = useState(false);
    const [fY, setFY] = useState(false);
    const [menu, setMenu] = useState(false);

    useEffect(() => {
      hFW();
      hFX();
      hFY();

      let ViewAllBtns = QA('.Question-main .ViewAll');
      if (ViewAllBtns.length > 0) {
        for (let i = 0; i < ViewAllBtns.length; i++) {
          ViewAllBtns[i].addEventListener('click', () => {
            setTimeout(() => {
              const [title, main, siderBar] = checkMS();
              setFX(false);
              setFY(false);
              setX(main);
              setY(siderBar);
            }, 1000);
          });
        }
      }
    }, []);

    // useEffect(() => {
    //   // console.log('w change: ', w.c, w && w.d.style.width, a);
    //   hFW();
    // }, [w]);

    useEffect(() => {
      // console.log('x change: ', x.c, x && x.d.style.width, a);
      hFX();
    }, [x]);

    useEffect(() => {
      // console.log('y change: ', y.c, y && y.d.style.display, b);
      hFY();
    }, [y]);

    const hFW = () => {
      // title may not exist
      if (!w) {
        return;
      }
      if (fW) {
        w.d.style.display = '';
      } else {
        w.d.style.display = 'none';
      }
      setFW(!fW);
    };

    const hFX = () => {
      if (fX) {
        x.d.style.width = '';
      } else {
        x.d.style.width = '100%';
      }
      setFX(!fX);
    };

    const hFY = () => {
      if (fY) {
        y.d.style.display = '';
      } else {
        y.d.style.display = 'none';
      }
      setFY(!fY);
    };

    const handleToggle = () => {
      setMenu(!menu);
    };

    let count = 2;
    if (w) {
      count++;
    }

    return (
      <>
        <div className={`IAdB zhihu-handler ${menu && 'hidden'}`} style={{ top: `${244 - count * 22}px` }}>
          <div className={`IAdB ${prefix}-item www ${fW && 'active'}`} onClick={hFW} style={{ display: w ? '' : 'none' }}>
            <button className='IAdB'>{w ? '.' + w.d.className : '...'}</button>
          </div>
          <div className={`IAdB ${prefix}-item xxx ${fX && 'active'}`} onClick={hFX}>
            <button className='IAdB'>{x ? x.c : '...'}</button>
          </div>
          <div className={`IAdB ${prefix}-item yyy ${fY && 'active'}`} onClick={hFY}>
            <button className='IAdB'>{y ? y.c : '...'}</button>
          </div>
        </div>
        {/* <div className={`IAdB zhihu-handler-toggle ${!menu & 'hidden'}`}>Toggle</div> */}
        <div className={`IAdB zhihu-handler-toggle`} onClick={handleToggle}>
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
