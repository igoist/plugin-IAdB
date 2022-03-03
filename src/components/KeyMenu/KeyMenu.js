import { dom, prefix } from '@Utils';
import React from 'react';
import ReactDOM from 'react-dom';

import { useIAdBHook, useKeyMenuHook } from '@Models';

const { htmlToElement } = dom;

const KeyMenu = () => {
  const { data } = useIAdBHook.useContainer();
  const { ifDarkMode, fontColor, ifBgImage, ifNoImage, ifReadCode, ifProgramSwitch } = data;
  const { tNodeRef, keyMenuRef, lastItemRef, maskRef } = useKeyMenuHook.useContainer();

  return (
    <div id={`${prefix}-keyMenu-box`} className={`${prefix} hidden`} ref={tNodeRef}>
      <div id={`${prefix}-keyMenu-mask`} className={prefix} ref={maskRef}></div>
      <div id={`${prefix}-keyMenu-wrapper`} className={prefix} ref={keyMenuRef}>
        <div id={`${prefix}-keyMenu-content`} className={prefix}>
          <div className={`${prefix}-keyMenu-row`}>
            <div className={`${prefix}-keyMenu-item ${ifDarkMode ? 'active' : ''}`} style={{ '--item-index': 0 }}>
              <button className={`${prefix}-btn-neon`} style={{ '--color': '#f05050' }}>
                A
              </button>
            </div>
            <div className={`${prefix}-keyMenu-item ${fontColor === '#86c7c7' ? 'active' : ''}`} style={{ '--item-index': 1 }}>
              <button className={`${prefix}-btn-neon`} style={{ '--color': '#ff9900' }}>
                S
              </button>
            </div>
            <div className={`${prefix}-keyMenu-item ${ifBgImage ? 'active' : ''}`} style={{ '--item-index': 2 }}>
              <button className={`${prefix}-btn-neon`} style={{ '--color': '#ffd52e' }}>
                D
              </button>
            </div>
            <div className={`${prefix}-keyMenu-item ${ifNoImage ? 'active' : ''}`} style={{ '--item-index': 3 }}>
              <button className={`${prefix}-btn-neon`} style={{ '--color': '#49dd8e' }}>
                F
              </button>
            </div>
            <div className={`${prefix}-keyMenu-item ${ifReadCode ? 'active' : ''}`} style={{ '--item-index': 4 }}>
              <button className={`${prefix}-btn-neon`} style={{ '--color': '#a8f0aa' }}>
                G
              </button>
            </div>
            <div className={`${prefix}-keyMenu-item`} style={{ '--item-index': 5 }}>
              <button className={`${prefix}-btn-neon`} style={{ '--color': '#58b3ff' }}>
                H
              </button>
            </div>
            <div
              className={`${prefix}-keyMenu-item ${ifProgramSwitch ? 'active' : ''}`}
              style={{ '--item-index': 6 }}
              ref={lastItemRef}
            >
              <button className={`${prefix}-btn-neon`} style={{ '--color': '#ae99ff' }}>
                J
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderKeyMenu = () => {
  let div = document.createElement('div');
  div.id = `${prefix}-keyMenu-box-parent`;
  document.body.appendChild(div);

  ReactDOM.render(<KeyMenu />, div);
  keyMenu.init();
};

export { renderKeyMenu, KeyMenu };

class KeyMenuOld {
  constructor(props) {
    this.props = props;
    this.state = {
      show: false,
      doing: false,
      withMask: !!this.props.withMask,
    };

    this.init = this.init.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.switchDoing = this.switchDoing.bind(this);
  }

  switchDoing(f) {
    this.state.doing = f;
  }

  init() {
    this.render();
  }

  show() {
    if (!this.state.show) {
      this.switchDoing(true);
      this.state.show = true;
      this.tmpNode.classList.remove('hidden');
      setTimeout(() => {
        this.keyMenu.classList.add('ready');
        let handleTransitionEnd = () => {
          console.log('keyMenu transitionEnd');
          this.keyMenu.className = 'IAdB prepareForLeaving';
          this.keyMenuLastItem.removeEventListener('transitionend', handleTransitionEnd);
          this.switchDoing(false);
          if (this.props.showCallback) {
            console.log('here, showCall');
            this.props.showCallback();
          }
        };
        this.keyMenuLastItem.addEventListener('transitionend', handleTransitionEnd, false);
      }, 36); // set 2 frame delay -- if hidden has not completed, and the 'ready' have been set, then you guess
    }
  }

  hide() {
    if (this.tmpNode && this.state.show) {
      this.switchDoing(true);
      this.state.show = false;

      let handleTransitionEnd = (e) => {
        console.log('fadeOut without type:', e.target === this.keyMenuMask, e.target === this.keyMenuLastItem);
        this.tmpNode.classList.add('hidden');
        if (e.target === this.keyMenuMask) {
          e.target.classList.remove('fadeOut');
        }
        this.keyMenu.className = 'IAdB';
        e.target.removeEventListener('transitionend', handleTransitionEnd);
        this.switchDoing(false);
        if (this.props.hideCallback) {
          this.props.hideCallback();
        }
      };

      this.keyMenu.classList.add('leaving');

      if (this.state.withMask) {
        this.keyMenuMask.classList.add('fadeOut');
        this.keyMenuMask.addEventListener('transitionend', handleTransitionEnd, false);
      } else {
        this.keyMenuLastItem.addEventListener('transitionend', handleTransitionEnd, false);
      }
    }
  }

  render() {
    // const { content, type } = this.props;

    let tmpStyle = '';
    if (!this.state.withMask) {
      tmpStyle = 'display: none';
    }

    let tmpNode = htmlToElement(`
      <div id='${prefix}-keyMenu-box' class='hidden'>
        <div id='${prefix}-keyMenu-mask' class='${prefix}' style='${tmpStyle}'></div>
        <div id='${prefix}-keyMenu-wrapper' class='${prefix}'>
          <div id='${prefix}-keyMenu-content' class='${prefix}'>
            <div class='${prefix}-keyMenu-row ${prefix}'>
              <div class='${prefix}-keyMenu-item ${prefix}' style='--item-index:0;'>
                <button class='${prefix}-btn-neon ${prefix}' style='--color: #f05050;'>A</button>
              </div>
              <div class='${prefix}-keyMenu-item ${prefix}' style='--item-index:1;'>
                <button class='${prefix}-btn-neon ${prefix}' style='--color: #ff9900;'>S</button>
              </div>
              <div class='${prefix}-keyMenu-item ${prefix}' style='--item-index:2;'>
                <button class='${prefix}-btn-neon ${prefix}' style='--color: #ffd52e;'>D</button>
              </div>
              <div class='${prefix}-keyMenu-item ${prefix}' style='--item-index:3;'>
                <button class='${prefix}-btn-neon ${prefix}' style='--color: #49dd8e;'>F</button>
              </div>
              <div class='${prefix}-keyMenu-item ${prefix}' style='--item-index:4;'>
                <button class='${prefix}-btn-neon ${prefix}' style='--color: #a8f0aa;'>G</button>
              </div>
              <div class='${prefix}-keyMenu-item ${prefix}' style='--item-index:5;'>
                <button class='${prefix}-btn-neon ${prefix}' style='--color: #58b3ff;'>H</button>
              </div>
              <div class='${prefix}-keyMenu-item ${prefix}' style='--item-index:6;'>
                <button class='${prefix}-btn-neon ${prefix}' style='--color: #ae99ff;'>J</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);

    this.tmpNode = tmpNode;
    this.keyMenu = tmpNode.querySelector(`#${prefix}-keyMenu-wrapper`);
    this.keyMenuLastItem = tmpNode.querySelectorAll(`.${prefix}-keyMenu-item`)[6];
    this.keyMenuMask = tmpNode.querySelector(`#${prefix}-keyMenu-mask`);
    console.log('keyMenu: ', this.keyMenu);
    let G = document.querySelector(`#${prefix}-keyMenu-box`);
    // Before render(init), there should be no dom as G
    if (G) {
      G.parentNode.removeChild(G);
      console.log('here remove');
    }

    document.body.appendChild(tmpNode);
    console.log('here append');

    return tmpNode;
  }
}
