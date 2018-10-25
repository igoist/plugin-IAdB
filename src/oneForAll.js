(function() {
  /**
   * backgroundColor
   * fontColor
   * cC 计数器
   * switchFlag 按键控制标记
   * darkMode 当前模式
   * ifBgImage 是否保留背景图
   * programSwitch 插件开关
   */
  let backgroundColor = '#2a2a2a';
  let fontColor = '#86c797';
  let darkMode;
  let switchFlag;
  let ifBgImage;

  let cC = 0;
  let idName = 'iadb_reset_site_style';

  let trickStyle = document.createElement('style');
  trickStyle.id = idName;
  trickStyle.type = 'text/css';

  const KeyCodeArr = [
    'color',
    'darkMode',
    'bgImage',
    'programSwitch',
  ];

  chrome.storage.sync.get(KeyCodeArr, result => {
    fontColor = result.color;
    ifBgImage = result.bgImage;
    darkMode = result.darkMode;
    switchFlag = result.darkMode;
    // console.log(
    //   result.color,
    //   result.darkMode,
    //   result.bgImage,
    //   result.programSwitch,
    // );
    let styleStr = `
      *,
      *:before,
      *:after {
        background-color: ${ backgroundColor }!important;
        border-color: ${ backgroundColor }!important;
        color: ${ fontColor }!important;
        box-shadow: none!important;
        text-shadow: none!important;
        ${ ifBgImage ? 'background-image: none!important;' : '' }
      }

      hr {
        border: none!important;
      }
    `;
    //rgb(134, 199, 151)
    trickStyle.innerHTML = styleStr;

    if (darkMode && result.programSwitch) {
      document.body.insertBefore(trickStyle, document.body.children[0]);
    }

    // 以上为初始与执行 & 以下为持久存在事件

    let handleIClickEvent = e => {
      chrome.storage.sync.get(KeyCodeArr, result => {
        fontColor = result.color;
        ifBgImage = result.bgImage;

        styleStr = `
          *,
          *:before,
          *:after {
            background-color: ${ backgroundColor }!important;
            border-color: ${ backgroundColor }!important;
            color: ${ fontColor }!important;
            box-shadow: none!important;
            text-shadow: none!important;
            ${ ifBgImage ? 'background-image: none!important;' : '' }
          }

          hr {
            border: none!important;
          }
        `;
        // 若 result.color 改变， 则 styleStr、trickStyle.innerHTML 相应改变
        trickStyle.innerHTML = styleStr;

        if (result.programSwitch) {
          if (e.ctrlKey) {
            cC += 1;

            if (cC === 3 && !switchFlag) {
              document.body.insertBefore(trickStyle, document.body.children[0]);
              switchFlag = !switchFlag;
              cC = 0;
            }

            if (cC === 2 && switchFlag) {
              let t = document.getElementById(idName);
              t.parentNode.removeChild(t);
              switchFlag = !switchFlag;
              cC = 0;
            }
          } else {
            cC = 0;
          }
          // console.log('cc: ', cC, darkMode, switchFlag);
        }
      });
    };

    document.addEventListener('keydown', handleIClickEvent, false);

    // let mockKeyboardEvent = new KeyboardEvent('keydown', { ctrlKey: true });
    // if (darkMode) {
    //   document.dispatchEvent(mockKeyboardEvent);
    //   document.dispatchEvent(mockKeyboardEvent);
    //   document.dispatchEvent(mockKeyboardEvent);
    // }
  });
})();
