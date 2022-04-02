import * as React from 'react';
import { useInputHook } from '@Models';

const Inputs = () => {
  const { inputMode, inputValue, inputList, dispatch } = useInputHook.useContainer();

  const handleRemove = (i) => {
    dispatch({
      type: 'InputRemoveValue',
      payload: i,
    });
  };

  if (inputMode) {
    return (
      <div className={`${'et'}-global-input-list`}>
        {inputList.map((inputItem, i) => (
          <div key={`${'et'}-global-input-item-${i}`} className={`${'et'}-global-input-item`} onClick={() => handleRemove(i)}>
            {inputItem}
          </div>
        ))}

        <div className={`${'et'}-global-input-item is-active`}>{inputValue}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default Inputs;
