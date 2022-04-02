import * as React from 'react';
import { ScrollList } from '@Components';
import { fuzzyMatch } from '@Utils';

const { useState } = React;
const { fuzzyList } = fuzzyMatch;

const pf = 'et';

const Panel = (props) => {
  const { commands } = props;

  const [filter, setFilter] = useState('');

  const handleOnChange = (e) => {
    setFilter(e.target.value);
  };

  const list = fuzzyList(filter, commands, 'key');

  const tagH = list.length > 10 ? 10 : list.length;

  const scrollListProps = {
    extraClassName: `${pf}-commands-panel`,
    arr: list,
    handleEnterKey: (i) => {
      console.log('handleEnterKey ', i);
    },
    tagH,
    renderItem: (item) => `${item.colored} -- ${item.desc}`,
  };

  return (
    <>
      <input className={`${pf}-input`} value={filter} onChange={handleOnChange} />

      <ScrollList {...scrollListProps} />
    </>
  );
};

export default Panel;
