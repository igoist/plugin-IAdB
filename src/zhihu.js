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
  let mainArr = ['.Topstory-mainColumn', '.SearchMain', '.Question-mainColumn', '.Profile-mainColumn', '.Collections-mainColumn'];

  let sideBarArr = ['.GlobalSideBar', '.SearchSideBar', '.Question-sideColumn', '.Profile-sideColumn'];

  const checkMS = () => {
    let i;
    let x, y;
    for (i = 0; i < mainArr.length; i++) {
      let tmp = Q(mainArr[i]);
      if (tmp) {
        log.l({
          title: 'checkMS',
          text: `${mainArr[i]} exist`
        });
        console.log(tmp);
        x = {
          c: mainArr[i],
          d: tmp
        };
      }
    }

    for (i = 0; i < sideBarArr.length; i++) {
      let tmp = Q(sideBarArr[i]);
      if (tmp) {
        log.l({
          title: 'checkMS',
          text: `${sideBarArr[i]} exist`
        });
        console.log(tmp);
        y = {
          c: sideBarArr[i],
          d: tmp
        };
      }
    }

    return [x, y];
  };

  let div = document.createElement('div');
  document.body.appendChild(div);

  const prefix = 'zh';
  const [main, siderBar] = checkMS();

  const R = () => {
    const [x, setX] = useState(main);
    const [y, setY] = useState(siderBar);
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);

    useEffect(() => {
      hA();
      hB();

      let ViewAllBtns = QA('.Question-main .ViewAll');
      if (ViewAllBtns.length > 0) {
        for (let i = 0; i < ViewAllBtns.length; i++) {
          ViewAllBtns[i].addEventListener('click', () => {
            setTimeout(() => {
              const [main, siderBar] = checkMS();
              setA(false);
              setB(false);
              setX(main);
              setY(siderBar);
            }, 1000);
          });
        }
      }
    }, []);

    useEffect(() => {
      // console.log('x change: ', x.c, x && x.d.style.width, a);
      hA();
    }, [x]);

    useEffect(() => {
      // console.log('y change: ', y.c, y && y.d.style.display, b);
      hB();
    }, [y]);

    const hA = () => {
      if (a) {
        x.d.style.width = '';
      } else {
        x.d.style.width = '100%';
      }
      setA(!a);
    };

    const hB = () => {
      if (b) {
        y.d.style.display = '';
      } else {
        y.d.style.display = 'none';
      }
      setB(!b);
    };

    return (
      <div className='IAdB zhihu-handler'>
        <div className={`IAdB ${prefix}-item ${a && 'active'}`} onClick={hA}>
          <button class='IAdB xxx'>{x ? x.c : '...'}</button>
        </div>
        <div className={`IAdB ${prefix}-item ${b && 'active'}`} onClick={hB}>
          <button class='IAdB yyy'>{y ? y.c : '...'}</button>
        </div>
      </div>
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
