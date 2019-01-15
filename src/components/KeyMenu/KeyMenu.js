import { dom, prefix } from 'Util';

const { htmlToElement } = dom;


export default class KeyMenu {
  constructor(props) {
    this.props = props;

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
  }

  show() {
    this.render();
    this.componentDidMount();
  }

  hide() {
    if (this.tmpNode) {
      this.tmpNode.parentNode.removeChild(this.tmpNode);
      this.tmpNode = null;
    }
  }

  render() {
    // const { content, type } = this.props;

    let tmpNode = htmlToElement(`
      <div id='${ prefix }-keyMenu-wrapper' class='${ prefix }'>
        <div id='${ prefix }-keyMenu-content' class='${ prefix }'>
          <div class='${ prefix }-keyMenu-row ${ prefix }'>
            <div class='${ prefix }-keyMenu-item ${ prefix }'>
              <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #f05050;'>A</button>
            </div>
            <div class='${ prefix }-keyMenu-item ${ prefix }'>
              <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #ff9900;'>S</button>
            </div>
            <div class='${ prefix }-keyMenu-item ${ prefix }'>
              <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #ffd52e;'>D</button>
            </div>
            <div class='${ prefix }-keyMenu-item ${ prefix }'>
              <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #49dd8e;'>F</button>
            </div>
            <div class='${ prefix }-keyMenu-item ${ prefix }'>
              <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #a8f0aa;'>G</button>
            </div>
            <div class='${ prefix }-keyMenu-item ${ prefix }'>
              <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #58b3ff;'>H</button>
            </div>
            <div class='${ prefix }-keyMenu-item ${ prefix }'>
              <button class='${ prefix }-btn-neon ${ prefix }' style='--color: #ae99ff;'>J</button>
            </div>
          </div>
        </div>
      </div>
    `);

    this.tmpNode = tmpNode;
    let G = document.querySelector(`#${ prefix }-keyMenu-wrapper`);
    if (G) {
      G.parentNode.removeChild(G);
    } else {
      document.body.appendChild(tmpNode);
    }

    return tmpNode;
  }
}
