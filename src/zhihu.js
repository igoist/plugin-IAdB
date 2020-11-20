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
  let GlobalSideBar = Q('.GlobalSideBar');
  if (GlobalSideBar) {
    GlobalSideBar.remove();
    let TopstoryMain = Q('.TopstoryMain');
    if (TopstoryMain) {
      TopstoryMain.style.width = '100%';
    }
  }

  /**
   * 问题答案页
   * .AdblockBanner 友情提示
   * .Question-sideColumn 侧栏
   * .Question-main 主要内容，对其排版样式重新自定义
   */
  let AdblockBanner = Q('.AdblockBanner');

  if (AdblockBanner) {
    AdblockBanner.remove();
  }

  let QuestionSideColumn = Q('.Question-sideColumn');

  if (QuestionSideColumn) {
    QuestionSideColumn.remove();
  }

  let QuestionMain = Q('.Question-main');

  if (QuestionMain) {
    QuestionMain.style = `
      margin: 0 auto;
      margin-top: 10px;
      margin-bottom: 10px;
      width: 1170px;
    `;

    let QuestionMainColumn = Q('.Question-mainColumn');

    QuestionMainColumn.style.width = '100%';
  }

  /**
   * 2020.11.20
   */

  let TopstoryMainColumn = Q('.Topstory-mainColumn');
  if (TopstoryMainColumn) {
    TopstoryMainColumn.style.width = '100%';
  }

  console.log('=========', TopstoryMainColumn);

  let SearchMain = Q('.SearchMain');
  if (SearchMain) {
    SearchMain.style.width = '100%';
  }

  let SearchSideBar = Q('.SearchSideBar');
  if (SearchSideBar) {
    SearchSideBar.style.display = 'none';
  }
};

try {
  mainF();
} catch (err) {
  console.log(`%cmainF catch%c: ${err}`, 'background: #fff; color:  #f49cec;', 'color: #149cec;', err);
}
