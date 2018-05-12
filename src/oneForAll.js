(function() {
  let backgroundColor = '#2a2a2a';
  let fontFolor = '#86c797';

  let styleStr = `
    *,
    *:before,
    *:after {
      background-color: ${backgroundColor}!important;
      border-color: ${backgroundColor}!important;
      color: ${fontFolor}!important;
      box-shadow: none!important;
      text-shadow: none!important;
    }

    hr {
      border: none!important;
    }
  `;
  //rgb(134, 199, 151)

  let cC = 0;
  let switchFlag = false;
  let idName = 'iadb_reset_site_style';
  let trickStyle = document.createElement('style');
  trickStyle.id = idName;
  trickStyle.type = 'text/css';
  trickStyle.innerHTML = styleStr;

  let handleIClickEvent = e => {
    // e.preventDefault();
    if (e.ctrlKey) {
      console.log(cC);
      cC += 1;

      if (cC === 3 && !switchFlag) {
        console.log('enter');
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
  document.dispatchEvent(mockKeyboardEvent);
  document.dispatchEvent(mockKeyboardEvent);
  document.dispatchEvent(mockKeyboardEvent);
})();
