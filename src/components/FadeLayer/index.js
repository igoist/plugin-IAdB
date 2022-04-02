/**
 * 改版之后 FadeLayerTop 传参数别忘了 suffix
 * 这里补充说明一下吧
 * 淡入淡出的状态和逻辑全部写在这两层之之后，不影响到内外层
 * 后面可能要考虑如何接入初始化和生命周期结束的回调
 */
import * as React from 'react';

import { dom } from '@Utils';

const { useState, useEffect, useMemo } = React;

const { Q, hasClass, addClass, removeClass, ETFade } = dom;

const pf = 'et';

/**
 * top 相当于一个最外层 fixed 的父元素
 * inner 才是真正需要动画淡入的 wrap
 */
const FadeLayerInner = (props) => {
  const { layerClassNameEx, isInset, readyToLeave, handleEnter, handleInnerLeave, children } = props;

  const wrapName = `${pf}-fade-layer-inner`;

  // 淡入
  useEffect(() => {
    if (isInset) {
      const w = Q(`.${layerClassNameEx} .${wrapName}`);

      if (hasClass('is-hidden', w)) {
        removeClass('is-hidden', w);

        ETFade({
          el: w,
          isEnter: true,
          callback: handleEnter, // enter callback
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
      const w = Q(`.${layerClassNameEx} .${wrapName}`);

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
  const { layerKeyCode, suffix, main, handleEnter, handleLeave } = props;
  const [visible, setVisible] = useState(false);
  const [readyToLeave, setReadyToLeave] = useState(false);

  const layerClassName = 'et-fade-layer-top';
  const layerClassNameEx = `${layerClassName}-${suffix}`;

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

    // leave callback
    if (handleLeave) {
      handleLeave();
    }
  };

  const Main = useMemo(() => main(), [props]);

  if (visible) {
    const innerProps = {
      layerClassNameEx,
      isInset: true,
      readyToLeave,
      handleEnter,
      handleInnerLeave,
    };

    return (
      <div className={`${layerClassName} ${layerClassNameEx}`}>
        <FadeLayerInner {...innerProps}>{Main}</FadeLayerInner>
      </div>
    );
  } else {
    return null;
  }
};

export default FadeLayerTop;
