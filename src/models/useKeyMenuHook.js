import * as React from 'react';
import { useThrottleFn, useKeyPress } from 'ahooks';
import { createContainer } from 'unstated-next';
import { useIAdBHook } from '@Models';

const { useEffect, useState, useRef } = React;

/**
 * 按键只在持有 hook 的当前 tab 生效
 * 跟全局 chrome storage 需在 useIAdBHook 进行同步操作
 */
const useKeyMenuHook = () => {
  const [visible, setVisible] = useState(false);
  const tNodeRef = useRef(null);
  const keyMenuRef = useRef(null);
  const lastItemRef = useRef(null);
  const maskRef = useRef(null);
  const lockRef = useRef(1);
  const { data, dispatch: useIAdBDispatch } = useIAdBHook.useContainer();
  const { ifDarkMode, fontColor, ifBgImage, ifNoImage, ifReadCode, ifProgramSwitch } = data;

  const { run: toggleKeyMenu } = useThrottleFn(
    () => {
      if (lockRef.current) {
        return;
      }
      if (visible) {
        handleShow();
      } else {
        handleHide();
        useIAdBDispatch({
          type: 'DataSync',
        });
      }
    },
    { wait: 500 }
  );

  const wrapD = (payload) => {
    if (visible) {
      useIAdBDispatch({
        type: 'DataSet',
        payload,
      });
    }
  };

  useKeyPress('a', () => {
    wrapD({
      ifDarkMode: !ifDarkMode,
    });
  });

  useKeyPress('s', () => {
    wrapD({
      fontColor: fontColor === '#86c7c7' ? '#b8b8b8' : '#86c7c7',
    });
  });

  useKeyPress('d', () => {
    wrapD({
      ifBgImage: !ifBgImage,
    });
  });

  useKeyPress('f', () => {
    wrapD({
      ifNoImage: !ifNoImage,
    });
  });

  useKeyPress('g', () => {
    wrapD({
      ifReadCode: !ifReadCode,
    });
  });

  useKeyPress('j', () => {
    wrapD({
      ifProgramSwitch: !ifProgramSwitch,
    });
  });

  useKeyPress('ctrl', () => {
    if (visible) {
      if (lockRef.current < 1) {
        setVisible(!visible);
      }
    }
  });

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
