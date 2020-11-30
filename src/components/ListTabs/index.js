import * as React from 'react';
import { extension } from '@Utils';

const { getStoreLocal } = extension;

const { useEffect, useState } = React;

const useListTabs = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getStoreLocal(['IAdBTabs'], (result) => {
      // console.log('ListTabs: ', JSON.parse(result));
      // console.log('ListTabs: ', result);
      if (result.IAdBTabs) {
        const l = JSON.parse(result.IAdBTabs);
        console.log(l[0]);
        setList(l);
      }
    });
  }, []);

  return { list };
};

const ListTabs = () => {
  const { list } = useListTabs();

  return (
    <div>
      <h1>XXXXXXXList</h1>
      {list.map((item, index) => {
        return (
          <div key={`tab-${index}`}>
            <a href={item.url} target='_blank'>
              {item.title}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default ListTabs;
