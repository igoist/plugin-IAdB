import * as React from 'react';
import { createContainer } from 'unstated-next';

const { useState } = React;

const useInputsHook = () => {
  const [inputMode, setInputMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputList, setInputList] = useState([]);
  const [inputTypeList, setInputTypeList] = useState([]);

  const dispatch = (action) => {
    switch (action.type) {
      case 'InputToggleMode':
        setInputMode(!inputMode);
        break;
      case 'InputSetValue':
        setInputValue(inputValue + action.payload);
        break;
      case 'InputBackspace':
        setInputValue(inputValue.slice(0, -1));
        break;
      case 'InputResetValue':
        setInputValue('');
        break;
      case 'InputPopValue':
        setInputList([...inputList.slice(0, -1)]);
        setInputTypeList([...inputTypeList.slice(0, -1)]);
        break;
      case 'InputPushValue':
        setInputList([...inputList, inputValue]);
        setInputTypeList([...inputTypeList, 'string']);
        setInputValue('');
        break;
      case 'InputRemoveValue':
        setInputList([...inputList.slice(0, action.payload), ...inputList.slice(action.payload + 1)]);
        setInputTypeList([...inputTypeList.slice(0, action.payload), ...inputTypeList.slice(action.payload + 1)]);
        break;
      case 'InputTypeSwitch':
        setInputTypeList([...inputTypeList.slice(0, action.payload.i), action.payload.t, ...inputTypeList.slice(action.payload.i + 1)]);
        break;
    }
  };

  return { inputMode, inputValue, inputList, inputTypeList, dispatch };
};

export default createContainer(useInputsHook);
