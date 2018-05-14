//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//       tabs[0].id,
//       {
//         code: `
//           console.log(${JSON.stringify(chrome.tabs, null, 2)});
//           console.log(${JSON.stringify(tabs, null, 2)});
//           document.body.style.backgroundColor = '${color}';
//           document.body.style.backgroundImage = 'none';
//         `
//       }
//     );
//   });

let fontColor;

let ifDarkMode;
let ifFontColorSwitch;
let lis = document.querySelectorAll('.nav-tags li');

chrome.storage.sync.get(['color', 'darkMode'], result => {
  ifDarkMode = result.darkMode;
  fontColor = result.color;
  ifFontColorSwitch = fontColor === '#86c797' ? false : true;

  console.log(lis);

  if (ifDarkMode) {
    lis[0].classList.add('active');
  }

  if (ifFontColorSwitch) {
    lis[1].classList.add('active');
  }

  lis[0];
});


lis[0].addEventListener('click', e => {
  e.preventDefault();

  ifDarkMode = !ifDarkMode;

  chrome.storage.sync.set({
    darkMode: ifDarkMode
  }, () => {
    lis[0].classList.toggle('active');
  });
});

lis[1].addEventListener('click', e => {
  e.preventDefault();

  fontColor = !ifFontColorSwitch ? '#86c7c7' : '#86c797';

  chrome.storage.sync.set({
    color: fontColor
  }, () => {
    ifFontColorSwitch = !ifFontColorSwitch;
    lis[1].classList.toggle('active');
  });
});
