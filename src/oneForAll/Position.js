import * as React from 'react';
import { useIRecordsHook } from '@Models';

const { useState, useEffect, useRef } = React;

const JustPosition = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const layerRef = useRef();

  const { recording, dispatch } = useIRecordsHook.useContainer();

  useEffect(() => {
    const layer = layerRef.current;

    const handle = (e) => {
      setX(e.clientX);
      setY(e.clientY);
    };

    const handleClick = (e) => {
      layer.classList.add('click-through');
      document.elementFromPoint(e.clientX, e.clientY).click();
      layer.classList.remove('click-through');

      if (recording) {
        console.log('here add record click');
        dispatch({
          type: 'RecordsAdd',
          payload: {
            type: 'click',
            params: [e.clientX, e.clientY],
          },
        });
      }
    };

    layer.addEventListener('mousemove', handle);
    layer.addEventListener('click', handleClick);

    return () => {
      layer.removeEventListener('mousemove', handle);
      layer.removeEventListener('click', handleClick);
    };
  }, [recording, dispatch]);

  return (
    <>
      <div className="et-position-layer" ref={layerRef}></div>
      <div className="et-position">
        <div className="et-position-item et-position-x">{x}</div>
        <div className="et-position-item et-position-y">{y}</div>
      </div>
    </>
  );
};

const PositionWrap = (props) => {
  if (props.turnOn) {
    return <JustPosition />;
  } else {
    return null;
  }
};

export default PositionWrap;
