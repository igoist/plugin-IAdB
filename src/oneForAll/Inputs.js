import * as React from 'react';
import { useInputsHook } from '@Models';
import { fns } from '@Utils';

const { handleValue } = fns;

const TypeSelector = ({ v, t, onClick }) => {
  const typeArr = ['string'];

  if (!isNaN(handleValue(v, 'int'))) {
    typeArr.push('int');
  }

  if (!isNaN(handleValue(v, 'float'))) {
    typeArr.push('float');
  }

  typeArr.push('bool');

  if (typeof handleValue(v, 'object') === 'object') {
    typeArr.push('object');
  }

  if (typeof handleValue(v, 'dom') === 'object') {
    typeArr.push('dom');
  }

  const tmpArr = typeArr.filter((i) => i !== t);

  return (
    <div className={`${'et'}-global-input-type-selector`}>
      {tmpArr.map((i) => (
        <div key={`etgits-${i}`} className={`${'et'}-global-input-type-selector-item type-${i}`} onClick={() => onClick(i)}>
          {i[0].toUpperCase()}
        </div>
      ))}
    </div>
  );
};

const Inputs = () => {
  const { inputMode, inputValue, inputList, inputTypeList, dispatch } = useInputsHook.useContainer();

  // const handleRemove = (i) => {
  //   dispatch({
  //     type: 'InputRemoveValue',
  //     payload: i,
  //   });
  // };

  // string(s) int(i) float(f) bool(b) dom/domAll/object(o/d/a)?
  const handleType = (t = 'string') => {
    return `${'et'}-global-input-type-${t}`;
  };

  const returnHandleTypeSwitch = (i) => {
    return (t) => {
      // console.log(handleValue(inputList[i], inputTypeList[i])); // old value
      // console.log(handleValue(inputList[i], t)); // new value
      const newValue = handleValue(inputList[i], t);
      console.log(newValue);

      if (newValue !== 'et-custom-input-error') {
        dispatch({
          type: 'InputTypeSwitch',
          payload: {
            i,
            t,
          },
        });
      }
    };
  };

  if (inputMode) {
    if (inputList.length || inputValue) {
      return (
        <div className={`${'et'}-global-input-list`}>
          {inputList.map((v, i) => (
            <div
              key={`${'et'}-global-input-item-${i}`}
              className={`${'et'}-global-input-item ${handleType(inputTypeList[i])}`}
              // onClick={() => handleTypeSwitch(i)}
            >
              {v}
              <TypeSelector v={v} t={inputTypeList[i]} onClick={returnHandleTypeSwitch(i)} />
            </div>
          ))}
          {inputValue && <div className={`${'et'}-global-input-item is-active`}>{inputValue}</div>}
        </div>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default Inputs;
