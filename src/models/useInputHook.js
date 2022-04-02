import * as React from 'react';
import { createContainer } from 'unstated-next';

const { useState } = React;

const useInputHook = () => {
  const [inputMode, setInputMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputList, setInputList] = useState([]);

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
        break;
      case 'InputPushValue':
        setInputList([...inputList, inputValue]);
        setInputValue('');
        break;
      case 'InputRemoveValue':
        setInputList([...inputList.slice(0, action.payload), ...inputList.slice(action.payload + 1)]);
        break;
    }
  };

  return { inputMode, inputValue, inputList, dispatch };
};

export default createContainer(useInputHook);
