let changeColor = document.getElementById('changeColor');

let x = document.querySelectorAll('.item')[0];
let x2 = document.querySelectorAll('.item')[1];
let color;

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);

  color = data.color;
  x.style.backgroundColor = data.color;
});

// setTimeout(() => {
//   x.style.backgroundColor = '#333';
// }, 2000);


x.addEventListener('click', function(e) {
  x.style.backgroundColor = color;
  console.log(chrome.tabs);

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: `
          console.log(${JSON.stringify(chrome.tabs, null, 2)});
          console.log(${JSON.stringify(tabs, null, 2)});
          document.body.style.backgroundColor = '${color}';
          document.body.style.backgroundImage = 'none';
        `
      }
    );
  });
});

x2.addEventListener('click', e => {
  chrome.storage.sync.set({
    color: '#86c797'
  }, function() {
    console.log("And the color is green.");
  });
});

