const keyCodeMap = {
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  // extra part 1
  // backspace: 8,
  // tab: 9,
  // enter: 13,
  // shift: 16,
  // ctrl: 17,
  // alt: 18,
  // pausebreak: 19,
  // capslock: 20,
  // esc: 27,
  // space: 32,
  // pageup: 33,
  // pagedown: 34,
  // end: 35,
  // home: 36,
  // leftarrow: 37,
  // uparrow: 38,
  // rightarrow: 39,
  // downarrow: 40,
  // insert: 45,
  // delete: 46,
  // extra part 1 end
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  // extra part 2
  // leftwindowkey: 91,
  // rightwindowkey: 92, // 这里有个问题，mac 上 Meta(R) 是 93 唉（虽然平时用不到）
  // selectkey: 93,
  // numpad0: 96,
  // numpad1: 97,
  // numpad2: 98,
  // numpad3: 99,
  // numpad4: 100,
  // numpad5: 101,
  // numpad6: 102,
  // numpad7: 103,
  // numpad8: 104,
  // numpad9: 105,
  // multiply: 106,
  // add: 107,
  // subtract: 109,
  // decimalpoint: 110,
  // divide: 111,
  // f1: 112,
  // f2: 113,
  // f3: 114,
  // f4: 115,
  // f5: 116,
  // f6: 117,
  // f7: 118,
  // f8: 119,
  // f9: 120,
  // f10: 121,
  // f11: 122,
  // f12: 123,
  // numlock: 144,
  // scrolllock: 145,
  // semicolon: 186,
  // equalsign: 187,
  // comma: 188,
  // dash: 189,
  // period: 190,
  // forwardslash: 191,
  // graveaccent: 192,
  openbracket: 219, // [
  // backslash: 220,
  closebracket: 221, // ]
  // singlequote: 222,
  // extra part 2 end
};

const codeMap = {
  1: 'Digit1',
  2: 'Digit2',
  3: 'Digit3',
  4: 'Digit4',
  5: 'Digit5',
  6: 'Digit6',
  7: 'Digit7',
  8: 'Digit8',
  9: 'Digit9',
  0: 'Digit0',
  esc: 'Escape',
  a: 'KeyA',
  b: 'KeyB',
  c: 'KeyC',
  d: 'KeyD',
  e: 'KeyE',
  f: 'KeyF',
  g: 'KeyG',
  h: 'KeyH',
  i: 'KeyI',
  j: 'KeyJ',
  k: 'KeyK',
  l: 'KeyL',
  m: 'KeyM',
  n: 'KeyN',
  o: 'KeyO',
  p: 'KeyP',
  q: 'KeyQ',
  r: 'KeyR',
  s: 'KeyS',
  t: 'KeyT',
  u: 'KeyU',
  v: 'KeyV',
  w: 'KeyW',
  x: 'KeyX',
  y: 'KeyY',
  z: 'KeyZ',
  '[': 'BracketLeft',
  ']': 'BracketRight',
};

export const returnKeyCode = (keyChar) => keyCodeMap[keyChar];

export const returnCode = (keyChar) => codeMap[keyChar];

const keyMap = {
  Digit1: 1,
  Digit2: 2,
  Digit3: 3,
  Digit4: 4,
  Digit5: 5,
  Digit6: 6,
  Digit7: 7,
  Digit8: 8,
  Digit9: 9,
  Digit0: 0,
  KeyA: 'a',
  KeyB: 'b',
  KeyC: 'c',
  KeyD: 'd',
  KeyE: 'e',
  KeyF: 'f',
  KeyG: 'g',
  KeyH: 'h',
  KeyI: 'i',
  KeyJ: 'j',
  KeyK: 'k',
  KeyL: 'l',
  KeyM: 'm',
  KeyN: 'n',
  KeyO: 'o',
  KeyP: 'p',
  KeyQ: 'q',
  KeyR: 'r',
  KeyS: 's',
  KeyT: 't',
  KeyU: 'u',
  KeyV: 'v',
  KeyW: 'w',
  KeyX: 'x',
  KeyY: 'y',
  KeyZ: 'z',
  // --------
  Space: ' ',
  Comma: ',',
  Period: '.',
  Slash: '/',
  Semicolon: ';',
  Quote: "'",
  BracketLeft: '[',
  BracketRight: ']',
  Minus: '-',
  Equal: '=',
  Backslash: '\\',
  Backquote: '`',
  // --------
};

export const returnInputKey = (code) => keyMap[code];

// 修饰键
const modifierKey = {
  ctrl: (e) => e.ctrlKey,
  shift: (e) => e.shiftKey,
  alt: (e) => e.altKey,
  meta: (e) => e.metaKey,
};

// 根据 event 计算激活键数量
export const countKeyByEvent = (e) => {
  const countOfModifier = Object.keys(modifierKey).reduce((total, key) => {
    if (modifierKey[key](e)) {
      return total + 1;
    }

    return total;
  }, 0);

  // 16 17 18 91 92 是修饰键的 keyCode，如果 keyCode 是修饰键，那么激活数量就是修饰键的数量，如果不是，那么就需要 +1
  return [16, 17, 18, 91, 92].includes(e.keyCode) ? countOfModifier : countOfModifier + 1;
};

export const returnModifierKeyArr = (e) => {
  const result = [];

  if (e.ctrlKey) {
    result.push('ctrl');
  }

  if (e.shiftKey) {
    result.push('shift');
  }

  if (e.altKey) {
    result.push('alt');
  }

  if (e.metaKey) {
    result.push('meta');
  }

  return result;
};
