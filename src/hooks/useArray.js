import { useState, useMemo } from 'react';

export const useMethods = (initialValue, methods) => {
  const [value, setValue] = useState(initialValue);
  const boundMethods = useMemo(
    () =>
      Object.entries(methods).reduce((methods, [name, fn]) => {
        const method = (...args) => {
          setValue((value) => fn(value, ...args));
        };

        methods[name] = method;
        return methods;
      }, {}),
    [methods]
  );
  return [value, boundMethods];
};

// 使用
const arrayMethods = {
  push(state, item) {
    return state.concat(item);
  },
  pop(state) {
    return state.slice(0, -1);
  },
  slice(state, start, end) {
    return state.slice(start, end);
  },
  empty() {
    return [];
  },
  set(state, newValue) {
    return newValue;
  },
  remove(state, item) {
    const index = state.indexOf(item);
    if (index < 0) {
      return state;
    }
    return [...state.slice(0, index), ...state.slice(index + 1)];
  },
};

export const useArray = (initialValue = []) => {
  // invariant(Array.isArray(initialValue), 'initialValue must be an array');
  return useMethods(initialValue, arrayMethods);
};

export default useArray;
