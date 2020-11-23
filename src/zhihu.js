import React from 'react';
import ReactDOM from 'react-dom';
import { log } from '@Utils';

const { useEffect, useState } = React;

const mainF = function () {
  const Q = (s) => document.querySelector(s);
  const QA = (s) => document.querySelectorAll(s);
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
   * 首页去 Sidebar
   * 排版调整
   */
  // let GlobalSideBar = Q('.GlobalSideBar');
  // if (GlobalSideBar) {
  //   GlobalSideBar.remove();
  //   let TopstoryMain = Q('.TopstoryMain');
  //   if (TopstoryMain) {
  //     TopstoryMain.style.width = '100%';
  //   }
  // }

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

  // let QuestionSideColumn = Q('.Question-sideColumn');

  // if (QuestionSideColumn) {
  //   QuestionSideColumn.style.display = 'none';
  // }

  // let QuestionMain = Q('.Question-main');

  // if (QuestionMain) {
  //   QuestionMain.style.width = '100%';

  //   let QuestionMainColumn = Q('.Question-mainColumn');

  //   if (QuestionMainColumn) {
  //     QuestionMainColumn.style.width = '100%';

  //     let p = QuestionMainColumn.parentNode;
  //     if (p && p.className.indexOf('ListShortcut') !== -1) {
  //       p.style.width = '100%';
  //     }
  //   }

  //   let ViewAllBtns = QA('.Question-main .ViewAll');
  //   if (ViewAllBtns && ViewAllBtns.length > 0) {
  //     for (let i = 0; i < ViewAllBtns.length; i++) {
  //       ViewAllBtns[i].addEventListener('click', () => {
  //         console.log(`${i} clicked`);
  //         setTimeout(() => {
  //           QuestionMainColumn = Q('.Question-mainColumn');
  //           QuestionSideColumn = Q('.Question-sideColumn');
  //           if (QuestionMainColumn) {
  //             QuestionMainColumn.style.width = '100%';
  //           }
  //           if (QuestionSideColumn) {
  //             QuestionSideColumn.style.display = 'none';
  //           }
  //         }, 1000);
  //       });
  //     }
  //   }
  // }

  /**
   * 首页热榜
   */
  // let TopstoryMainColumn = Q('.Topstory-mainColumn');
  // if (TopstoryMainColumn) {
  //   TopstoryMainColumn.style.width = '100%';
  // }

  /**
   * 搜索页
   */
  // let SearchMain = Q('.SearchMain');
  // if (SearchMain) {
  //   SearchMain.style.width = '100%';
  // }

  // let SearchSideBar = Q('.SearchSideBar');
  // if (SearchSideBar) {
  //   SearchSideBar.style.display = 'none';
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

  const [x, y] = checkMS();

  const R = () => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);

    useEffect(() => {
      hA();
      hB();
    }, []);

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
      <div className='zhihu-handler'>
        <div className={`${prefix}-item ${a && 'active'}`} onClick={hA}>
          <button class='xxx'>{x ? x.c : '...'}</button>
        </div>
        <div className={`${prefix}-item ${b && 'active'}`} onClick={hB}>
          <button class='yyy'>{y ? y.c : '...'}</button>
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
