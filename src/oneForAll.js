(function() {
  /**
   * backgroundColor
   * fontColor
   * cC 计数器
   * switchFlag 按键控制标记
   * darkMode 当前模式
   */
  let backgroundColor = '#2a2a2a';
  let fontColor = '#86c797';
  let cC = 0;
  let darkMode;
  let switchFlag;
  let idName = 'iadb_reset_site_style';

  let trickStyle = document.createElement('style');
  trickStyle.id = idName;
  trickStyle.type = 'text/css';

  chrome.storage.sync.get(['color', 'darkMode'], function(result) {
    fontColor = result.color;
    darkMode = result.darkMode;
    switchFlag = result.darkMode;
    console.log('darkMode: ', darkMode, 'color: ', fontColor);

    let styleStr = `
      *,
      *:before,
      *:after {
        background-color: ${backgroundColor}!important;
        border-color: ${backgroundColor}!important;
        color: ${fontColor}!important;
        box-shadow: none!important;
        text-shadow: none!important;
      }

      hr {
        border: none!important;
      }
    `;
    //rgb(134, 199, 151)

    trickStyle.innerHTML = styleStr;

    let handleIClickEvent = e => {
      // e.preventDefault();
      if (e.ctrlKey) {
        console.log(cC);
        cC += 1;

        if (cC === 3 && !switchFlag) {
          document.body.insertBefore(trickStyle, document.body.children[0]);
          // document.removeEventListener('keydown', handleIClickEvent, false);
          switchFlag = !switchFlag;
          cC = 0;
        }

        if (cC === 2 && switchFlag) {
          let t = document.getElementById(idName);
          t.parentNode.removeChild(t);
          // t.remove();
          switchFlag = !switchFlag;
          cC = 0;
        }
      } else {
        cC = 0;
      }
    };

    document.addEventListener('keydown', handleIClickEvent, false);

    let mockKeyboardEvent = new KeyboardEvent('keydown', { ctrlKey: true });

    if (darkMode) {
      document.body.insertBefore(trickStyle, document.body.children[0]);
    }
    // if (darkMode) {
    //   document.dispatchEvent(mockKeyboardEvent);
    //   document.dispatchEvent(mockKeyboardEvent);
    //   document.dispatchEvent(mockKeyboardEvent);
    // }
  });
})();
