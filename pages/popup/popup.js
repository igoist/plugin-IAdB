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
const KeyCodeArr = ['color', 'darkMode', 'bgImage', 'noImage', 'readCode', 'programSwitch'];

let fontColor;
let ifFontColorSwitch;

let ifDarkMode;
let ifBgImage;
let ifNoImage;
let ifReadCode;
let programSwitch;

let lis = document.querySelectorAll('.nav-tags li');

chrome.storage.sync.get(KeyCodeArr, (result) => {
  fontColor = result.color;
  ifFontColorSwitch = fontColor === '#b8b8b8' ? false : true;

  ifDarkMode = result.darkMode;

  ifBgImage = result.bgImage;

  ifNoImage = result.noImage;

  ifReadCode = result.readCode;

  programSwitch = result.programSwitch;

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
  if (programSwitch) {
    lis[6].classList.add('active');
  }
});

lis[0].addEventListener('click', (e) => {
  e.preventDefault();

  ifDarkMode = !ifDarkMode;

  chrome.storage.sync.set(
    {
      darkMode: ifDarkMode
    },
    () => {
      lis[0].classList.toggle('active');
    }
  );
});

lis[1].addEventListener('click', (e) => {
  e.preventDefault();

  fontColor = !ifFontColorSwitch ? '#b8b8b8' : '#86c7c7';

  chrome.storage.sync.set(
    {
      color: fontColor
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
      bgImage: ifBgImage
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
      noImage: ifNoImage
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
      readCode: ifReadCode
    },
    () => {
      lis[4].classList.toggle('active');
    }
  );
});

lis[6].addEventListener('click', (e) => {
  e.preventDefault();

  programSwitch = !programSwitch;

  chrome.storage.sync.set(
    {
      programSwitch
    },
    () => {
      lis[6].classList.toggle('active');
    }
  );
});
