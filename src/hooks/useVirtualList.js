import * as React from 'react';

const { useState, useRef, useEffect } = React;

/**
 * T : THRESHOLD
 * TO: THRESHOLD_OFFSET
 * TP: THRESHOLD_PADDING
 */
const T = 30;
const TO = 5;
const TP = 10;
const TX = T - TP - 1 - TO; // 14

const useVirtualList = (initialProps) => {
  const { array, refBox } = initialProps;
  const refTop = useRef(null);
  const refBottom = useRef(null);
  const refOB = useRef(null);

  const arrayLength = array.length;
  const maxStartIndex = arrayLength - 1 - 25 > 0 ? arrayLength - 1 - 25 : 0; // Maximum index value `start` can take
  const maxEndIndex = arrayLength > 0 ? arrayLength - 1 : 0; // Maximum index value `end` can take

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(TX < maxEndIndex ? TX : maxEndIndex);

  const [current, setCurrent] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);

  const list = array.slice(start - TO < 0 ? 0 : start - TO, end + TO);

  useEffect(() => {
    intiateScrollObserver();
  }, [start, end]);

  useEffect(() => {
    setCurrent(0);
    setTargetIndex(0);
    setStart(0);
    setEnd(TX < maxEndIndex ? TX : maxEndIndex);
  }, [array]);

  // ======== not exposed start
  const intiateScrollObserver = () => {
    const options = {
      root: refBox.current,
      rootMargin: '0px',
      threshold: 0.1,
    };

    if (refOB.current) {
      refOB.current.disconnect();
    }

    refOB.current = new IntersectionObserver(callback, options);

    if (refTop.current) {
      refOB.current.observe(refTop.current);
    }
    if (refBottom.current) {
      refOB.current.observe(refBottom.current);
    }
  };

  const callback = (entries, observer) => {
    entries.forEach((entry, index) => {
      // Scroll Down
      // We make increments and decrements in 10s
      if (entry.isIntersecting && entry.target.id === 'bottom') {
        const newEnd = end + TO <= maxEndIndex ? end + TO : maxEndIndex;
        const newStart = end - TX > 0 ? (end - TX <= maxStartIndex ? end - TX : maxStartIndex) : 0;
        // console.log(`old start: ${start}, new: ${newStart} `, end - TX, maxStartIndex, end, TX);

        updateState(newStart, newEnd);
      }

      // Scroll up
      if (entry.isIntersecting && entry.target.id === 'top') {
        const newStart = start - TO <= 0 ? 0 : start - TO;

        const t = maxEndIndex;
        const newEnd = start + TX <= t ? start + TX : t;

        // console.log(`xold start: ${start}, new: ${newStart} `, end - TX, maxStartIndex, end, TX, newEnd);
        updateState(newStart, newEnd);
      }
    });
  };

  const resetObservation = () => {
    if (refTop.current) {
      refOB.current.unobserve(refTop.current);
    }
    if (refBottom.current) {
      refOB.current.unobserve(refBottom.current);
    }
  };

  const updateState = (newStart, newEnd) => {
    if (start !== newStart || end !== newEnd) {
      resetObservation();
      setStart(newStart);
      setEnd(newEnd);
    }
  };
  // ======== not exposed end

  const getReference = (item) => {
    if (item.currentIndex === start) return refTop;
    if (item.currentIndex === end) return refBottom;
    return null;
  };

  return {
    list,
    start,
    end,
    current,
    targetIndex,
    setStart,
    setEnd,
    setCurrent,
    setTargetIndex,
    getReference,
  };
};

export default useVirtualList;
