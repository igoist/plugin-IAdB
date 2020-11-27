import * as React from 'react';
import { IAdBState } from '@Utils';
import { createContainer } from 'unstated-next';
import { extension } from '@Utils';

const { useState, useEffect } = React;
const { setStore } = extension;

const useIAdBHook = () => {
  const [data, setData] = useState(IAdBState);

  // for test
  // useEffect(() => {
  //   console.log('data change', data);
  // }, [data]);

  // useEffect(() => {}, []);

  const dispatch = (action) => {
    switch (action.type) {
      case 'DataSet':
        console.log('DataSet', action.payload);
        setData({
          ...data,
          ...action.payload,
        });
        break;
      case 'DataSync':
        setStore(data);
        break;
      default:
        break;
    }
  };

  return { data, dispatch };
};

export default createContainer(useIAdBHook);
