import { dom, prefix } from 'Util';

const { htmlToElement } = dom;


export default class KeyMenu {
  constructor(props) {
    this.props = props;
    this.state = {
      show: false,
      doing: false
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
        };
        this.keyMenuLastItem.addEventListener('transitionend', handleTransitionEnd, false);
      }, 36); // set 2 frame delay -- if hidden has not completed, and the 'ready' have been set, then you guess
    }
  }

  hide() {
    if (this.tmpNode && this.state.show) {
      this.switchDoing(true);
      this.state.show = false;
      this.keyMenuMask.classList.add('fadeOut');
      this.keyMenu.classList.add('leaving');

      let handleTransitionEnd = () => {
        console.log('fadeOut transitionEnd');
        this.tmpNode.classList.add('hidden');
        this.keyMenuMask.classList.remove('fadeOut');
        this.keyMenu.className = 'IAdB';
        this.keyMenuMask.removeEventListener('transitionend', handleTransitionEnd);
        this.switchDoing(false);
      };
      this.keyMenuMask.addEventListener('transitionend', handleTransitionEnd, false);
    }
  }

  render() {
    // const { content, type } = this.props;

    let tmpNode = htmlToElement(`
      <div id='${ prefix }-keyMenu-box' class='hidden'>
        <div id='${ prefix }-keyMenu-mask' class='${ prefix }'></div>
        <div id='${ prefix }-keyMenu-wrapper' class='${ prefix }'>
          <div id='${ prefix }-keyMenu-content' class='${ prefix }'>
            <div class='${ prefix }-keyMenu-row ${ prefix }'>
              <div class='${ prefix }-keyMenu-item ${ prefix }' style='--item-index:0;'>
                <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #f05050;'>A</button>
              </div>
              <div class='${ prefix }-keyMenu-item ${ prefix }' style='--item-index:1;'>
                <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #ff9900;'>S</button>
              </div>
              <div class='${ prefix }-keyMenu-item ${ prefix }' style='--item-index:2;'>
                <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #ffd52e;'>D</button>
              </div>
              <div class='${ prefix }-keyMenu-item ${ prefix }' style='--item-index:3;'>
                <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #49dd8e;'>F</button>
              </div>
              <div class='${ prefix }-keyMenu-item ${ prefix }' style='--item-index:4;'>
                <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #a8f0aa;'>G</button>
              </div>
              <div class='${ prefix }-keyMenu-item ${ prefix }' style='--item-index:5;'>
                <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #58b3ff;'>H</button>
              </div>
              <div class='${ prefix }-keyMenu-item ${ prefix }' style='--item-index:6;'>
                <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #ae99ff;'>J</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);

    this.tmpNode = tmpNode;
    this.keyMenu = tmpNode.querySelector(`#${ prefix }-keyMenu-wrapper`);
    this.keyMenuLastItem = tmpNode.querySelectorAll(`.${ prefix }-keyMenu-item`)[6];
    this.keyMenuMask = tmpNode.querySelector(`#${ prefix }-keyMenu-mask`);
    console.log('keyMenu: ', this.keyMenu);
    let G = document.querySelector(`#${ prefix }-keyMenu-wrapper`);
    // Before render(init), there should be no dom as G
    if (G) {
      G.parentNode.removeChild(G);
      console.log('here remove');
    } else {
      document.body.appendChild(tmpNode);
      console.log('here append');
    }

    return tmpNode;
  }
}
