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


## 配合 useInputsHook 可以做的事情

可以设置任何字符、数值类型参数

由此可以完成包括 scrollSmothlyTo 滚动、各种简单数值计算、各种控制操作的传参


## 网页操作录制构想

举例平常测试，无非是进行了滚动到指定位置、选择了指定元素、点击或者 hover、等待若干时间调用接口加载数据、判断数据，也就说，进行了一系列滚动、选择、点击、等待、数据判断(以及下拉选择、输入)等操作的排列组合，那么只将要这些操作抽象出来，最后加以上层逻辑的封装组合，即可实现对操作的录制

(
  选择(元素) 601
  点击 602
  滚动 603
  判断系列(当作细节，以后补充)

  计算系列
  等待这个，因为有记录时间戳，默认不需要，但是可以主动添加

  利用 Inputs 传参数
  利用 Inspects 选择，对应 666 -> 选择完毕(暂时单选) 点601

  Repeat 可包括
  播放速度 x10 x0.1
  循环次数 1 ~ n
)

actionType = {
  timestamp: number,
  type1: 滚动、选择、点击、等待、数据判断,
  type2: dispatch | ... | ...,
  params: [...]
}

## Inspect

选择元素是很关键的一环，最简单的情况是元素带有 id，或者其某一项 className 能够唯一指定该元素。更普遍的当然是，最上层有一个唯一指定的父元素，经过若干层嵌套，定位到某一子节点的第 N 个 XX 元素。

这里最开始实现的时候最好还是考虑有人为的筛选，能够首先人为确定父、子元素位置，然后进行选择

[
  root/parent, className or id
  the next, className/tag, n(第 n 个节点)
  ...
  the target, className/tag, n
]


## Fns

* 改变指定 class 元素的 textContent -- changeDOMText(className: string, text: string, multiple: bool)


