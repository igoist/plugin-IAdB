import * as React from 'react';
import * as utils from '@Utils';

import { useVirtualList } from '@Hooks';

const { useEffect, useRef } = React;

const { scroll2 } = utils;
const { returnCurrent } = scroll2;

const LineHeight = 28;

/**
 *     current: scroll position, usage -- 56 * current
 * targetIndex: index of the selected item
 */
const ScrollListWithKeyBoard = (props) => {
  const { extraClassName, arr, handleEnterKey, tagH = 10, renderItem } = props;

  const refBox = useRef(null);

  const { list, start, end, current, targetIndex, setCurrent, setTargetIndex, getReference } = useVirtualList({
    array: arr,
    refBox,
  });

  useEffect(() => {
    const box = refBox.current;
    box.style.height = 0 + 'px';

    setTimeout(() => {
      box.scrollTop = 0;
      box.style.height = tagH * LineHeight + 'px';
    }, 16);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arr]);

  const handleItem = (index) => {
    handleEnterKey(index);
    console.log(index, targetIndex, current, returnCurrent(current, index));

    setTargetIndex(index);
    setCurrent(returnCurrent(current, index));
  };

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.keyCode === 74 || e.keyCode === 40) {
  //       const newTargetIndex = targetIndex + 1 > arr.length - 1 ? targetIndex : targetIndex + 1;
  //       const newCurrent = returnCurrent(current, newTargetIndex);

  //       setTargetIndex(newTargetIndex);
  //       setCurrent(newCurrent);
  //     }

  //     if (e.keyCode === 75 || e.keyCode === 38) {
  //       const newTargetIndex = targetIndex > 0 ? targetIndex - 1 : 0;
  //       const newCurrent = returnCurrent(current, newTargetIndex);

  //       setTargetIndex(newTargetIndex);
  //       setCurrent(newCurrent);
  //     }

  //     if (e.keyCode === 13) {
  //       if (arr.length) {
  //         handleItem(targetIndex);
  //       }
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // });

  useEffect(() => {
    const box = refBox.current;
    const item = document.querySelector('.et-scroll-list-item.is-selected');
    // 触发时间需要调整 写给函数专门进行判断
    if (item && box) {
      box.scrollTop = LineHeight * current;
    } else {
      console.log(`I can't get the selected item: `, current, targetIndex, box);
    }
  }, [current]);

  return (
    <div className={`et-scroll-list-wrap ${extraClassName}`} style={{ height: '0' }} ref={refBox}>
      {list.map((item, index) => {
        const top = LineHeight * (index + (start - 5 > 0 ? start - 5 : 0)) + 'px';
        const refVal = getReference(item);
        const id = item.currentIndex === start ? 'top' : item.currentIndex === end ? 'bottom' : undefined;
        return (
          <div
            className={`et-scroll-list-item ${'id-' + item.currentIndex}` + (targetIndex === item.currentIndex ? ' is-selected' : '')}
            key={'et-scroll-list-item-' + item.currentIndex}
            style={{ top }}
            ref={refVal}
            id={id}
            onClick={() => handleItem(item.currentIndex)}
            dangerouslySetInnerHTML={{ __html: renderItem ? renderItem(item) : item.colored }}
            data-id={item.currentIndex}
            title={item.excerpt}
          ></div>
        );
      })}
    </div>
  );
};

export default ScrollListWithKeyBoard;
