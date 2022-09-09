import * as React from 'react';

import { useNewsHook, generateProvider } from '@Models';

const { useState } = React;

const filterBtnTextMap = {
  0: 'All',
  1: 'New',
  2: 'Old',
};

const providers = [useNewsHook.Provider];

const Provider = generateProvider(providers);

const News = () => {
  const { list, dispatch } = useNewsHook.useContainer();

  const [filter, setFilter] = useState(0);

  // 约定 0: all, 1: new, 2: old 即可
  const renderList = list.filter((item) => {
    if (filter === 0) {
      return true;
    }

    if (filter === 1) {
      return item.isNew;
    }

    if (filter === 2) {
      return !item.isNew;
    }
  });

  const handleLinkClick = (link) => {
    navigator.clipboard.writeText(link);
  };

  return (
    <>
      <div className="et-news-filter-btns">
        {[0, 1, 2].map((i) => (
          <div key={`et-news-filter-btn-${i}`} className="et-news-filter-btn" onClick={() => setFilter(i)}>
            {filterBtnTextMap[i]}
          </div>
        ))}
        <div key={`et-news-filter-btn-3`} className="et-news-filter-btn" onClick={() => dispatch({ type: 'GetNewsCache' })}>
          Cache
        </div>
        <div key={`et-news-filter-btn-4`} className="et-news-filter-btn" onClick={() => dispatch({ type: 'GetNewsLatest' })}>
          Latest
        </div>
      </div>
      <div className="et-news-wrap">
        {renderList.map((item, i) => (
          <div key={`et-news-item-${i}`} className={`et-news-item et-news-item-${item.isNew ? 'new' : 'old'}`} title={item.excerpt} onClick={() => handleLinkClick(item.link)}>
            {item.title}
          </div>
        ))}
      </div>
    </>
  );
};

export default () => (
  <Provider>
    <News />
  </Provider>
);
