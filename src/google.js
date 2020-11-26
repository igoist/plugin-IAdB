const log = console.log.bind(this);

/*
 * Google 搜索结果页
 * 同百度，以 DOM 移除外加样式覆盖的方式
 * .mw #rhs 右侧广告区
 * 搜索结果样式魔改
 * 底部相关搜索不管
 */
let styleStr = `
  .mw,
  #center_col,
  #res {
    margin: 0 auto!important;
    padding: 0!important;
    width: 1240px!important;
  }

  #ires .bkWMgd {
    width: 1240px!important;
    padding: 0 20px;
    box-sizing: border-box;
    overflow: hidden;
  }

  #ires .bkWMgd .srg {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0!important;
    box-sizing: border-box;
  }

  .g {
    padding: 12px;
    width: 100%;
    min-height: 160px;
    border: 1px solid transparent;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.16);
    box-sizing: border-box;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
    will-change: transform;
  }

  .g:hover {
    transform: translateY(-10px);
  }

  .mw #rhs {
    display: none!important;
  }

  h3.r {
    margin-bottom: 8px;
  }

  h3.LC20lb {
    color: #149cec;
  }

  .s span.st em,
  span.st em {
    color: #ec414d;
  }

  .IsZvec {
    max-width: 100%;
  }

  #center_col .kp-blk {
    width: 100%;
  }

  .jmjoTe {
    width: 100%;
  }
`;

let trickStyle = document.createElement('style');
trickStyle.id = 'igoist_iadb';
trickStyle.innerHTML = styleStr;

let body = document.body;

// body.insertBefore(trickStyle, body.children[0]);
body.append(trickStyle);
