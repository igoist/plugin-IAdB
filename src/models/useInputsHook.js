import * as React from 'react';
import { createContainer } from 'unstated-next';
import { random } from '@Utils';

const { useState } = React;
const { returnRandomString } = random;

/**
 * 把之前的 inputActive, inputValue 都去掉了
 * 每次直接通过 enter 键添加一个默认 string 值，然后再点击编辑
 * 这里这个默认值可以通过调用一个函数，随机获得字符串 -- returnRandomString
 */
const useInputsHook = () => {
  const [inputMode, setInputMode] = useState(false);
  const [inputList, setInputList] = useState([returnRandomString()]);
  const [inputTypeList, setInputTypeList] = useState(['string']);

  const dispatch = (action) => {
    switch (action.type) {
      case 'InputToggleMode':
        setInputMode(!inputMode);
        break;
      case 'InputPopValue':
        if (inputList.length > 1) {
          setInputList([...inputList.slice(0, -1)]);
          setInputTypeList([...inputTypeList.slice(0, -1)]);
        }
        break;
      case 'InputPushValue':
        setInputList([...inputList, returnRandomString()]);
        setInputTypeList([...inputTypeList, 'string']);
        break;
      case 'InputUpdateValue':
        setInputList([...inputList.slice(0, action.payload.i), action.payload.v, ...inputList.slice(action.payload.i + 1)]);
        setInputTypeList([...inputTypeList.slice(0, action.payload.i), 'string', ...inputTypeList.slice(action.payload.i + 1)]);
        break;
      // case 'InputRemoveValue':
      //   setInputList([...inputList.slice(0, action.payload), ...inputList.slice(action.payload + 1)]);
      //   setInputTypeList([...inputTypeList.slice(0, action.payload), ...inputTypeList.slice(action.payload + 1)]);
      //   break;
      case 'InputTypeSwitch':
        setInputTypeList([...inputTypeList.slice(0, action.payload.i), action.payload.t, ...inputTypeList.slice(action.payload.i + 1)]);
        break;
    }
  };

  return { inputMode, inputList, inputTypeList, dispatch };
};

export default createContainer(useInputsHook);
