import * as React from 'react';
import { IAdBState } from '@Utils';
import { createContainer } from 'unstated-next';

const { useState, useEffect } = React;

const useIAdBHook = () => {
  const [data, setData] = useState(IAdBState);

  // for test
  useEffect(() => {}, [data]);

  useEffect(() => {}, []);

  const dispatch = (action) => {
    switch (action.type) {
      case 'SetData':
        console.log('SetData', action.payload);
        setData(action.payload);
        break;
      default:
        break;
    }
  };

  return { data, dispatch };
};

export default createContainer(useIAdBHook);
