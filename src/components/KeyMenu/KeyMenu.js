import { dom, prefix } from 'Util';

const { htmlToElement } = dom;


export default class KeyMenu {
  constructor(props) {
    this.props = props;
  }

  componentDidMount() {
  }

  render() {
    // const { content, type } = this.props;

    let tmpNode = htmlToElement(`
      <div id='${ prefix }-keyMenu-wrapper'>
        <div id='${ prefix }-keyMenu-content'>
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
