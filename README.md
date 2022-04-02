# IAdB

It means igoist's Ad Blocker.

It's a ADB like plugin, and also a demo of recalling how to develop chrome plugin.

**Items**

- 2018.05.09 -- oneForAll.js
- 2018.00.00 -- zhangxinxu.js
- 2018.00.00 -- baidu.js
- 2018.00.00 -- lodash.js
- 2018.00.00 -- csdn.js
- 2018.00.00 -- google.js
- 2018.00.00 -- zhihu.js

**Golbal**

- 2018.05.10 -- popup

#...

- Remember to init the global state in background.js

## fade-layer

```js
// fade layer 页面淡入
const div = CE('div');
div.className = 'et-fade-layer';

div.style = `
    position: fixed;
    inset: 0;
    background-color: #2a2a2a;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.54s ease-in-out;
  `;

div.style.zIndex = 99999;

div.addEventListener('click', () => {
  document.body.removeChild(div);
});

document.body.appendChild(div);

setTimeout(() => {
  div.style.opacity = 1;
}, 20);

setTimeout(() => {
  mainF();
}, 500);
```

在初始化时添加

```js
const handleFixedLayerFadeOut = () => {
  const div = Q(`.${pf}-fade-layer`);

  if (!div) {
    return;
  }

  const transitionEnd = () => {
    const another = Q(`.${pf}-fade-layer`);

    if (another) {
      document.body.removeChild(another);
    }
  };

  div.addEventListener('transitionend', transitionEnd);

  div.style.opacity = 0;

  setTimeout(transitionEnd, 800);
};
```

## et-bg-news

除了在 resetGlobals 中更新对象，后台一开始压根不用主动去请求

完全由前台传参数来控制请求最新还是请求缓存

## 配合 useInputHook 可以做的事情

可以设置任何字符、数值类型参数

由此可以完成包括 scrollSmothlyTo 滚动、各种简单数值计算、各种控制操作的传参
