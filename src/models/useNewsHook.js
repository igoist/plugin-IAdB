import * as React from 'react';
import { extension, time, prefix } from '@Utils';
import { createContainer } from 'unstated-next';

const { sendMessage } = extension;
const { getYMD } = time;

const { useState, useEffect } = React;

const useNewsHook = () => {
  const [data, setData] = useState({});
  const [list, setList] = useState([]);

  const fetchData = (mode) => {
    sendMessage(
      {
        to: `${prefix}-bg`,
        type: 'et-bg-news',
        payload: mode,
      },
      (res) => {
        setData(JSON.parse(res.result));
      }
    );
  };

  useEffect(() => {
    fetchData('cache');
  }, []);

  useEffect(() => {
    const ymd = getYMD(+new Date());
    const todayNews = data[ymd];
    if (!todayNews) {
      return;
    }

    console.log('now data cgabfe', todayNews[todayNews.length - 1]);
    setList(todayNews[todayNews.length - 1]);
  }, [data]);

  const dispatch = (action) => {
    switch (action.type) {
      case 'GetNewsCache':
        fetchData('cache');
        break;
      // case 'GetNewsLatest':
      //   fetchData('latest');
      //   break;
      case 'GetNewsLatest':
        console.log('here clicked GetNewsLatest');
        fetchData('incognito');
        break;
    }
  };

  return { list, dispatch };
};

export default createContainer(useNewsHook);
