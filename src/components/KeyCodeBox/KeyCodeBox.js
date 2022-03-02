import { dom, prefix } from 'Util';

const { htmlToElement } = dom;


export default class KeyCodeBox {
  constructor(props) {
    this.props = props;
    this.state = {
      show: false,
      doing: false,
      keyCodeArr: [],
      taskStack: []
    };

    this.push = this.push.bind(this);
    this.handlePush = this.handlePush.bind(this);
  }

  push(keyCode) {
    if (this.state.keyCodeArr.length) {

    }
    this.handlePush();
  }

  handlePush() {

  }

  render() {


    let tmpNode = htmlToElement(`
      <div id='${ prefix }-keyCodeBox-wrap'>
        <div id='${ prefix }-keyCodeBox'>
        </div>
      </div>
    `);
  }
};
