import * as React from 'react';
import { useArray } from '@Hooks';
import { keyCode } from '@Utils';

const { useState, useEffect, useRef } = React;
const { returnCode } = keyCode;

const TSI = (props) => {
  const { pf, handleClick, toggleActive } = props;

  return (
    <div className={`${pf}-wrap`}>
      {[0, 1, 2, 3].map((item) => (
        <div key={`${pf}-${item}`} className={`${pf}`} onClick={() => handleClick(item)}>
          {item}
        </div>
      ))}

      <div className={`${pf}-toggle`} onClick={toggleActive} />
    </div>
  );
};

const TaskEditor = (props) => {
  const { pf, defaultValue = '', onComplete } = props;

  const [value, setValue] = useState(defaultValue);
  const [active, setActive] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const inputEl = inputRef.current;

    if (!inputEl) {
      return;
    }

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

    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
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
    return <input ref={inputRef} autoFocus className={`${pf} ${value !== defaultValue ? 'is-edited' : ''}`} value={value} onChange={onChange} />;
  } else {
    return (
      <div className={`${pf} ${value !== defaultValue ? 'is-edited' : ''}`} onClick={onClick}>
        {value}
      </div>
    );
  }
};

const TaskItem = (props) => {
  const { pf } = props;

  // active selects
  const [as, setAS] = useState([1, 1, 1, 1]);
  const [active, setActive] = useState(false);

  const handleClick = (i) => {
    const tmp = [...as];
    if (tmp[i]) {
      tmp[i] = 0;
    } else {
      tmp[i] = 1;
    }
    setAS(tmp);
  };

  const toggleActive = () => {
    setActive(!active);
  };

  const handleA = (v) => {
    console.log('handleA:', v);
  };

  return (
    <div className={`${pf} ${active ? 'is-active' : ''}`}>
      <div className={`${pf}-inner`}>
        <TSI pf={`${pf}-tsi`} handleClick={handleClick} toggleActive={toggleActive} />

        <div className={`${pf}-content-wrap`}>
          {as[0] ? <TaskEditor key={`${pf}-editor-0`} pf={`${pf}-editor`} onComplete={handleA} /> : null}
          {as[1] ? <div style={{ width: '60px', height: '100%', backgroundColor: '#333', display: 'inline-block', verticalAlign: 'top' }} /> : null}
          {as[2] ? <TaskEditor key={`${pf}-editor-2`} pf={`${pf}-editor`} onComplete={handleA} /> : null}
          {as[3] ? <TaskEditor key={`${pf}-editor-3`} pf={`${pf}-editor`} onComplete={handleA} /> : null}
        </div>
      </div>
    </div>
  );
};

const Task = (props) => {
  const pf = `${'et'}-task`;

  if (props.turnOn) {
    return (
      <div className={`${pf}-wrap`}>
        {[1, 2].map((item) => (
          <TaskItem pf={`${pf}-item`} />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default Task;
