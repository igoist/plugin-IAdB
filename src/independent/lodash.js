let body = document.body;

let styleStr = `
  #carbonads {
    display: none !important;
  }
`;

// 简单粗暴
let trickStyle = document.createElement('style');
trickStyle.id = 'igoist_iadb';
trickStyle.type = 'text/css';
trickStyle.innerHTML = styleStr;

// No! it will be covered
// body.insertBefore(trickStyle, body.children[0]);
body.appendChild(trickStyle);