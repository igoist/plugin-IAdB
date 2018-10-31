import { log, decode, md5 } from '../util/';

const { dev } = log;
const { decodeUnicode } = decode;

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
          } else if (e.key === 'e' || e.key === 'E' && cC === 1 && !switchFlag) {
            let formData = new FormData();

            let q = window.getSelection().toString();
            let appid = 20181026000225932;
            let salt = 666666;
            formData.append('q', q);
            formData.append('from', 'en');
            formData.append('to', 'zh');
            formData.append('appid', appid);
            formData.append('salt', salt);

            let sign = md5(appid + q + salt + '2jWjLSYSR71Vd1YTOMPV');
            formData.append('sign', sign);

            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://fanyi-api.baidu.com/api/trans/vip/translate');
            // xhr.onprogress = (e) => {
            //   if (e.lengthComputable) {
            //     progress.style.width = (e.loaded / e.total) * 100 + '%';
            //   }
            // };
            xhr.onloadend = () => {
              if (xhr.readyState === 4 && xhr.status === 200) {
                let obj = JSON.parse(xhr.response);
                let resultArr = obj.trans_result;
                let result = decodeUnicode(resultArr[0].dst);
                // dev({
                //   title: 'oneForAll - translate',
                //   text: obj,
                //   textColor: 'green',
                // });
                dev({
                  title: 'oneForAll - translate',
                  text: resultArr,
                  textColor: 'green',
                });
                dev({
                  title: 'oneForAll - translate',
                  text: result,
                  textColor: 'green',
                });
              }
              if (xhr.readyState === 4 && xhr.status === 413) {
              }
            };
            xhr.send(formData);
            cC = 0;
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