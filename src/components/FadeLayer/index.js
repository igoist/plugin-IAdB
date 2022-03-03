import * as React from 'react';

import { dom } from '@Utils';

const { useState, useEffect } = React;

const { Q, hasClass, addClass, removeClass, ETFade } = dom;

const pf = 'et';

/**
 * top 相当于一个最外层 fixed 的父元素
 * inner 才是真正需要动画淡入的 wrap
 */
const FadeLayerInner = (props) => {
  const { isInset, readyToLeave, handleInnerLeave, children } = props;
  // console.log('her th theChildren', children);

  const wrapName = `${pf}-fade-layer-inner`;

  // 淡入
  useEffect(() => {
    if (isInset) {
      const w = Q(`.${wrapName}`);

      if (hasClass('is-hidden', w)) {
        removeClass('is-hidden', w);

        ETFade({
          el: w,
          isEnter: true,
        });
      } else {
        return;
      }
    } else {
      return;
    }
  }, []);

  // 淡出
  useEffect(() => {
    if (readyToLeave) {
      const w = Q(`.${wrapName}`);

      ETFade({
        el: w,
        callback: () => {
          addClass('is-hidden', w);

          handleInnerLeave();
        },
      });
    }
  }, [readyToLeave]);

  return (
    <>
      <div className={`${wrapName} ${isInset ? 'is-inset is-hidden' : ''}`}>{children}</div>
    </>
  );
};

const FadeLayerTop = (props) => {
  const { layerKeyCode, main } = props;
  const [visible, setVisible] = useState(false);
  const [readyToLeave, setReadyToLeave] = useState(false);
  // console.log('here in f top', props);

  useEffect(() => {
    const handle = (e) => {
      if (e.altKey) {
        if (e.keyCode === layerKeyCode) {
          // alt + p
          if (!visible) {
            setVisible(true);
          } else {
            setReadyToLeave(true);
          }
        }
      }
    };

    document.body.addEventListener('keydown', handle);

    return () => {
      document.body.removeEventListener('keydown', handle);
    };
  });

  const handleInnerLeave = () => {
    setVisible(false);
    setReadyToLeave(false);
  };

  if (visible) {
    const innerProps = {
      isInset: true,
      readyToLeave,
      handleInnerLeave,
      // theChildren: children,
    };

    return (
      <div className={`et-fade-layer-top`}>
        <FadeLayerInner {...innerProps}>{main()}</FadeLayerInner>
      </div>
    );
  } else {
    return null;
  }
};

export default FadeLayerTop;
