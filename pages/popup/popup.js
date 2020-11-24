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
const KeyCodeArr = ['ifDarkMode', 'fontColor', 'ifBgImage', 'ifNoImage', 'ifReadCode', 'ifProgramSwitch'];

let fontColor;
let ifFontColorSwitch;

let ifDarkMode;
let ifBgImage;
let ifNoImage;
let ifReadCode;
let ifProgramSwitch;

let lis = document.querySelectorAll('.nav-tags li');

chrome.storage.sync.get(KeyCodeArr, (result) => {
  ifDarkMode = result.ifDarkMode;

  fontColor = result.fontColor;
  ifFontColorSwitch = fontColor === '#86c7c7' ? true : false;

  ifBgImage = result.ifBgImage;

  ifNoImage = result.ifNoImage;

  ifReadCode = result.ifReadCode;

  ifProgramSwitch = result.ifProgramSwitch;

  if (ifDarkMode) {
    lis[0].classList.add('active');
  }
  if (ifFontColorSwitch) {
    lis[1].classList.add('active');
  }
  if (ifBgImage) {
    lis[2].classList.add('active');
  }
  if (ifNoImage) {
    lis[3].classList.add('active');
  }
  if (ifReadCode) {
    lis[4].classList.add('active');
  }
  if (ifProgramSwitch) {
    lis[6].classList.add('active');
  }
});

lis[0].addEventListener('click', (e) => {
  e.preventDefault();

  ifDarkMode = !ifDarkMode;

  chrome.storage.sync.set(
    {
      ifDarkMode,
    },
    () => {
      lis[0].classList.toggle('active');
    }
  );
});

lis[1].addEventListener('click', (e) => {
  e.preventDefault();

  fontColor = !ifFontColorSwitch ? '#86c7c7' : '#b8b8b8';

  chrome.storage.sync.set(
    {
      fontColor,
    },
    () => {
      ifFontColorSwitch = !ifFontColorSwitch;
      lis[1].classList.toggle('active');
    }
  );
});

lis[2].addEventListener('click', (e) => {
  e.preventDefault();

  ifBgImage = !ifBgImage;

  chrome.storage.sync.set(
    {
      ifBgImage,
    },
    () => {
      lis[2].classList.toggle('active');
    }
  );
});

lis[3].addEventListener('click', (e) => {
  e.preventDefault();

  ifNoImage = !ifNoImage;

  chrome.storage.sync.set(
    {
      ifNoImage,
    },
    () => {
      lis[3].classList.toggle('active');
    }
  );
});

lis[4].addEventListener('click', (e) => {
  e.preventDefault();

  ifReadCode = !ifReadCode;

  chrome.storage.sync.set(
    {
      ifReadCode,
    },
    () => {
      lis[4].classList.toggle('active');
    }
  );
});

lis[6].addEventListener('click', (e) => {
  e.preventDefault();

  ifProgramSwitch = !ifProgramSwitch;

  chrome.storage.sync.set(
    {
      ifProgramSwitch,
    },
    () => {
      lis[6].classList.toggle('active');
    }
  );
});
