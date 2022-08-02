import * as React from 'react';
import { createContainer } from 'unstated-next';
import { dom } from '@Utils';

const { useState, useEffect, useRef } = React;
const { scrollSmothlyTo } = dom;

const useIRecordsHook = () => {
  const [recording, setRecording] = useState(false);
  const [recordList, setRecordList] = useState([]);
  const timeRef = useRef(null);

  useEffect(() => {
    if (recording) {
      timeRef.current = +new Date();
    }
  }, [recording]);

  const dispatch = (action) => {
    const { payload } = action;
    let tmpList;

    switch (action.type) {
      case 'RecordsToggleMode':
        setRecording(!recording);
        break;
      // case 'recordListPopValue':
      //   setRecordList([...inputList.slice(0, -1)]);
      //   break;
      case 'RecordsAdd':
        setRecordList([
          ...recordList,
          {
            id: recordList.length,
            ...payload,
            time: +new Date() - timeRef.current,
          },
        ]);
        console.log('recordList', [
          ...recordList,
          {
            id: recordList.length,
            ...payload,
            time: +new Date() - timeRef.current,
          },
        ]);
        break;
      case 'RecordsRemove':
        tmpList = recordList.filter((i) => i.id !== payload.id);
        setRecordList(tmpList);
        break;
      case 'RecordsConsole':
        console.log(recordList);
        break;
      case 'RecordsRepeat':
        console.log('RecordsRepeat', recordList);
        handleRepeat(recordList);
        break;
    }
  };

  return { recording, recordList, dispatch };
};

export default createContainer(useIRecordsHook);

const handleRepeat = (recordList) => {
  recordList.map((recordItem) => {
    const { id, time, params, type } = recordItem;
    let fn;

    if (type === 'click') {
      const [x, y] = params;
      fn = () => {
        console.log(`Replaying ${id} - ${time} - click x: ${x}, y: ${y}`);
        document.elementFromPoint(x, y).click();
      };
    }

    if (type === 'scroll') {
      const [y] = params;

      fn = () => {
        console.log(`Replaying ${id} - ${time} - scroll y: ${y}`);
        scrollSmothlyTo(y);
      };
    }

    setTimeout(fn, time);
  });
};
