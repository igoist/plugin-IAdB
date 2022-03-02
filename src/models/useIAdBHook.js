import * as React from 'react';
import { IAdBState } from '@Utils';
import { createContainer } from 'unstated-next';
import { extension } from '@Utils';

const { useState } = React;
const { setStore } = extension;

const useIAdBHook = () => {
  const [data, setData] = useState(IAdBState);

  const dispatch = (action) => {
    switch (action.type) {
      case 'IAdBStateSet':
        console.log('IAdBStateSet', action.payload);
        setData({
          ...data,
          ...action.payload,
        });
        break;
      case 'IAdBStateSync':
        setStore(data);
        break;
      default:
        break;
    }
  };

  return { data, dispatch };
};

export default createContainer(useIAdBHook);
