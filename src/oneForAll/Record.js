import * as React from 'react';
import { useIRecordsHook } from '@Models';

import { ScrollNum } from '@Components';

const { useState, useEffect, useRef } = React;

const Record = () => {
  const { recordList, dispatch } = useIRecordsHook.useContainer();
  const [selects, setSelects] = useState([]);

  // useEffect(() => {
  //   const layer = layerRef.current;

  //   const handle = (e) => {
  //     setX(e.clientX);
  //     setY(e.clientY);
  //   };

  //   const handleClick = (e) => {
  //     layer.classList.add('click-through');
  //     document.elementFromPoint(e.clientX, e.clientY).click();
  //     layer.classList.remove('click-through');

  //     if (recording) {
  //       console.log('here add record click');
  //       dispatch({
  //         type: 'RecordsAdd',
  //         payload: {
  //           type: 'click',
  //           params: [e.clientX, e.clientY],
  //         },
  //       });
  //     }
  //   };

  //   layer.addEventListener('mousemove', handle);
  //   layer.addEventListener('click', handleClick);

  //   return () => {
  //     layer.removeEventListener('mousemove', handle);
  //     layer.removeEventListener('click', handleClick);
  //   };
  // }, [recording, dispatch]);

  const handleSelect = (id) => {
    if (selects.includes(id)) {
      setSelects(selects.filter((i) => i !== id));
    } else {
      setSelects([...selects, id]);
    }
  };

  return (
    <>
      <ScrollNum />
      <div className="et-records-wrap">
        <div className="et-records">
          {recordList.map((record, i) => (
            <div key={`et-record-item-${i}`} className={`et-record-item ${selects.includes(record.id) ? 'is-selected' : ''}`}>
              <div className="et-record-item-s" onClick={() => handleSelect(record.id)}></div>
              <div className="et-record-item-id">{i}</div>
              <div className="et-record-item-time">{record.time}</div>
              <div className="et-record-item-type">{record.type}</div>
              <div className="et-record-item-params">{JSON.stringify(record.params)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Record;
