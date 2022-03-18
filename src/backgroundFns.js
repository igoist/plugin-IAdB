import { extension, time } from '@Utils';

const { setStore } = extension;
const { getYMD, getHMS } = time;

export const handleWorkTimeData = (payload) => {
  const { data, start, end } = payload;

  const ms = end - start;

  const YMD = getYMD(start);

  if (data[YMD] === undefined) {
    data[YMD] = [];
  }

  data[YMD].push({
    start,
    ms,
  });

  return [data, ms, getHMS(ms)];
};

export const returnWorkTimeArrStr = (data) => {
  const YMD = getYMD(new Date());

  if (data[YMD] === undefined) {
    console.log('...なぜ', data);

    return [];
  }

  return JSON.stringify(data[YMD]);
};

const host = 'http://localhost:6085';

/**
 * 牢记 news 是字典，存若干天，对应每天的 item 都应该是二维数组
 * cache - the old, with cache
 * latest - latest with storage
 * incognito - latest without storage
 **/
export const getNews = async (news, sendResponse, mode) => {
  let suffix;

  if (mode === 'cache') {
    // suffix = '';
    sendResponse({
      result: JSON.stringify(news),
    });
    return;
  } else {
    suffix = mode; // latest or incognito
  }

  const url = `${host}/api/v1/list/0/${suffix}`;

  const list = await new Promise(async (resolve) => {
    const r = await fetch(url).then((res) => res.json());

    if (r.Code === 0) {
      resolve(r.list);
    } else {
      resolve([]);
    }
  });

  const ymd = getYMD(new Date());

  const todayNews = news[ymd];
  let resultList;

  if (todayNews === undefined) {
    resultList = list.map((item) => {
      delete item.excerpt;
      item.isNew = false;
      return item;
    });

    news[ymd] = [list]; // !!这里没办法
  } else {
    const old = todayNews[todayNews.length - 1];

    resultList = list.map((item) => {
      delete item.excerpt;
      item.isNew = true;

      for (let i = 0; i < old.length; i++) {
        if (item.title === old[i].title) {
          item.isNew = false;
          break;
        }
      }

      return item;
    });

    todayNews.push(resultList);
  }

  // 3 代表 3天，这个之后应该可以设置
  if (todayNews && todayNews.length > 3) {
    todayNews.shift();
  }

  console.log('================ news');
  console.log(news);
  console.log('================');
  setStore({
    news,
  });

  sendResponse({
    result: JSON.stringify(news),
  });
};
