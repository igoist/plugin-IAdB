export const getYear = (t) => t.getYear() + 1900;

export const getMonth = (t) => t.getMonth() + 1;

export const getDay = (t) => t.getDate();

export const getYMD = (data) => {
  const t = new Date(data);

  let m = getMonth(t);
  m = m < 10 ? '0' + m : m;

  let d = getDay(t);

  d = d < 10 ? '0' + d : d;

  return `${getYear(t)}${m}${d}`;
};

export const getHMS = (ms) => {
  let s = parseInt(ms / 1000);

  let m = Math.floor(s / 60) % 60;

  let h = Math.floor(s / 3600);

  h = h < 10 ? '0' + h : h;

  m = m < 10 ? '0' + m : m;

  s = s % 60;

  s = s < 10 ? '0' + s : s;

  return `${h}:${m}:${s}`;
};

export const getHMS2 = (t) => {
  let h = t.getHours();
  let m = t.getMinutes();
  let s = t.getSeconds();

  h = h < 10 ? '0' + h : h;

  m = m < 10 ? '0' + m : m;

  s = s < 10 ? '0' + s : s;

  return `${h}:${m}:${s}`;
};
