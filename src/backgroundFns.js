import { time } from '@Utils';

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
