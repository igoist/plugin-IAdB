import * as React from 'react';
import { useInputsHook } from '@Models';
import { fns } from '@Utils';

const { useEffect, useState, useRef } = React;
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

  if (typeof handleValue(v, 'domAll') === 'object') {
    typeArr.push('domAll');
  }

  const tmpArr = typeArr.filter((i) => i !== t);

  return (
    <div className={`${'et'}-global-input-type-selector`}>
      {tmpArr.map((i) => (
        <div key={`etgits-${i}`} className={`${'et'}-global-input-type-selector-item type-${i}`} onClick={() => onClick(i)}>
          {i === 'domAll' ? 'A' : i[0].toUpperCase()}
        </div>
      ))}
    </div>
  );
};

const Editor = (props) => {
  const { defaultValue, onComplete } = props;

  const [value, setValue] = useState(defaultValue);
  const [active, setActive] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const inputEl = inputRef.current;

    if (!inputEl) {
      return;
    }

    // inputEl && inputEl.focus(); // autofocus

    // const handleBlur = () => {
    //   setActive(false);
    // };

    const handleKeyDown = (e) => {
      e.stopPropagation();

      if (e.code === 'Escape') {
        setActive(false);
        setValue(defaultValue);
        return;
      }

      if (e.code === 'Enter') {
        setActive(false);
        onComplete(value);
        return;
      }
    };

    // inputEl.addEventListener('blur', handleBlur);
    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      // inputEl.removeEventListener('blur', handleBlur);
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, value]);

  const onClick = () => {
    setActive(!active);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  if (active) {
    return <input ref={inputRef} autoFocus className={`${'et'}-global-input-editor ${value !== defaultValue ? 'is-edited' : ''}`} value={value} onChange={onChange} />;
  } else {
    return (
      <div className={`${'et'}-global-input-editor ${value !== defaultValue ? 'is-edited' : ''}`} onClick={onClick}>
        {value}
      </div>
    );
  }
};

const Inputs = () => {
  const { inputMode, inputList, inputTypeList, dispatch } = useInputsHook.useContainer();

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

  const returnHandleUpdate = (i) => {
    return (v) => {
      dispatch({
        type: 'InputUpdateValue',
        payload: {
          i,
          v,
        },
      });
    };
  };

  if (inputMode) {
    return (
      <div className={`${'et'}-global-input-list`}>
        {inputList.map((v, i) => (
          <div key={`${'et'}-global-input-item-${i}`} className={`${'et'}-global-input-item ${handleType(inputTypeList[i])}`}>
            <Editor defaultValue={v} onComplete={returnHandleUpdate(i)} />
            <TypeSelector v={v} t={inputTypeList[i]} onClick={returnHandleTypeSwitch(i)} />
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default Inputs;
