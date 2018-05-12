(function() {
  /**
   * 顾老几行代码知乎热门屏蔽
   * 再看看自己当初写的实在太蠢萌，而且之前一直不晓得 Mutation 功能存在
   * 处理 .TopstoryItem 为主的以及其他可能包含'热门内容，'的 DOM
   * 留一线情面，不把其直接 remove，而是用模拟点击的方式屏蔽，话说这注释也是好玩
   */

  function purify (nodes) {
    for (let node of nodes) {
      if (node.textContent.indexOf('热门内容, ') === 0) {
        node.querySelector('.TopstoryItem-rightButton').click()
        // node.parentNode.removeChild(node) // 做人留一线，先注释掉
        console.log(node);
      }
    }
  }

  const mo = new MutationObserver(mutations => {
    for (let mutation of mutations) {
      if (mutation.type === 'childList') {
        purify(mutation.addedNodes)
      }
    }
  })

  purify(document.querySelectorAll('.TopstoryItem'))
  if (document.querySelector('.TopstoryMain > div')) {
    mo.observe(document.querySelector('.TopstoryMain > div'), { childList: true })
  }

  /**
   * 问题答案页
   * .AdblockBanner 友情提示
   * .Question-sideColumn 侧栏
   */
  let AdblockBanner = document.querySelector('.AdblockBanner');

  if (AdblockBanner) {
    AdblockBanner.remove();
  }

  let QuestionSideColumn = document.querySelector('.Question-sideColumn');

  if (QuestionSideColumn) {
    QuestionSideColumn.remove();
  }
})();