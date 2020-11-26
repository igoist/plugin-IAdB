import * as React from 'react';
import { useThrottleFn } from 'ahooks';
import { createContainer } from 'unstated-next';

const { useEffect, useState, useRef } = React;

const useKeyMenuHook = () => {
  const [visible, setVisible] = useState(false);
  const tNodeRef = useRef(null);
  const keyMenuRef = useRef(null);
  const lastItemRef = useRef(null);
  const maskRef = useRef(null);
  const lockRef = useRef(1);

  const { run: toggleKeyMenu } = useThrottleFn(
    () => {
      if (lockRef.current) {
        return;
      }
      if (visible) {
        handleShow();
      } else {
        handleHide();
      }
    },
    { wait: 500 }
  );

  useEffect(() => {
    toggleKeyMenu();
  }, [visible]);

  useEffect(() => {
    lockRef.current = 0;
  }, []);

  const handleShow = () => {
    lockRef.current += 1;
    tNodeRef.current.classList.remove('hidden');
    setTimeout(() => {
      let handleTransitionEnd = () => {
        // console.log('keyMenu transitionEnd');
        keyMenuRef.current.className = 'IAdB prepareForLeaving';
        lastItemRef.current.removeEventListener('transitionend', handleTransitionEnd);

        setTimeout(() => {
          lockRef.current -= 1;
        }, 200);
        // if (this.props.showCallback) {
        //   this.props.showCallback();
        // }
      };
      lastItemRef.current.addEventListener('transitionend', handleTransitionEnd, false);

      keyMenuRef.current.classList.add('ready');
    }, 36);
  };

  const handleHide = () => {
    lockRef.current += 1;
    let handleTransitionEnd = (e) => {
      // console.log('fadeOut without type:', e.target === maskRef.current, e.target === lastItemRef.current);
      tNodeRef.current.classList.add('hidden');
      // if (e.target === maskRef.current) {
      maskRef.current.classList.remove('fadeOut');
      // }
      keyMenuRef.current.className = 'IAdB';
      maskRef.current.removeEventListener('transitionend', handleTransitionEnd);
      setTimeout(() => {
        lockRef.current -= 1;
      }, 20);
      // this.switchDoing(false);
      // if (this.props.hideCallback) {
      //   this.props.hideCallback();
      // }
    };

    keyMenuRef.current.classList.add('leaving');

    // if (this.state.withMask) {
    if (true) {
      maskRef.current.classList.add('fadeOut');
      maskRef.current.addEventListener('transitionend', handleTransitionEnd, false);
    } else {
      lastItemRef.current.addEventListener('transitionend', handleTransitionEnd, false);
    }
  };

  const dispatch = (action) => {
    switch (action.type) {
      case 'KeyMenuToggle':
        if (lockRef.current < 1) {
          setVisible(!visible);
        }
        break;
      case 'KeyMenuShow':
        setVisible(true);
        break;
      case 'KeyMenuHide':
        setVisible(false);
        break;
      default:
        break;
    }
  };

  return { visible, dispatch, tNodeRef, keyMenuRef, lastItemRef, maskRef, lockRef };
};

export default createContainer(useKeyMenuHook);
