const pickItem = (titleIndex, list, i) => {
  let item;

  item = list[i][titleIndex];

  return item;
};

const fuzzyMatches = (fuzzy, text) => {
  fuzzy = fuzzy.toLowerCase();
  text = text.toLowerCase();

  let tp = 0; // text position / pointer
  let matches = [];

  // match algorithm 匹配算法，之后再改
  for (let i = 0; i < fuzzy.length; i++) {
    const f = fuzzy[i];

    for (; tp < text.length; tp++) {
      const t = text[tp];
      if (f === t) {
        matches.push(tp);
        tp++;
        break;
      }
    }
  }

  return matches;
};

export const fuzzyList = (fuzzy, list, titleIndex, ifLog = false) => {
  const results = [];

  for (let i = 0; i < list.length; i++) {
    const originalIndex = i;

    let item = pickItem(titleIndex, list, i);

    const matches = fuzzyMatches(fuzzy, item);

    if (matches.length === fuzzy.length) {
      let t = item;

      for (let i = 0; i < matches.length; i++) {
        const index = matches[matches.length - (i + 1)];

        // high light the matched result
        // const c = clcFgMatchYellow(t[index]);
        // const c = clcBgYellow(clcFgMatchBlack(t[index]));
        const c = t[index];
        t = t.slice(0, index) + '<span class="em">' + c + '</span>' + t.slice(index + 1);
      }

      results.push({
        ...list[i],
        originalIndex,
        original: item,
        colored: t,
      });
    }
  }

  let i = 0;
  // sorts in-place
  if (ifLog) {
    console.time('fuzzy sort');
  }
  // replace it to quick sort later
  results.sort((a, b) => {
    i++;
    if (a.original < b.original) return -1;
    return 1;
  });

  for (let i = 0; i < results.length; i++) {
    results[i].currentIndex = i;
  }

  if (ifLog) {
    console.timeEnd('fuzzy sort');
    console.log('fuzzy sort end, i: ', i, 'results.length: ', results.length, ' list.length: ', list.length);
  }
  return results;
};

export const transformData = (list, titleIndex) => {
  const result = [];

  for (let i = 0; i < list.length; i++) {
    const item = pickItem(titleIndex, list, i);

    result.push({
      ...list[i],
      currentIndex: i,
      originalIndex: i,
      original: item,
      colored: item,
    });
  }

  return result;
};
