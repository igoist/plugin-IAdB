import { dom } from '@Utils';

const { htmlToElement } = dom;

export default class Message {
  constructor(props) {
    this.props = props;

    this.handleLeave = this.handleLeave.bind(this);
  }

  componentDidMount() {
    let handleIn = () => {
      this.tmpNode.classList.remove('move-up-enter');
      this.tmpNode.classList.remove('move-up-enter-active');

      this.tmpNode.removeEventListener('animationend', handleIn);
    };
    this.tmpNode.addEventListener('animationend', handleIn);

    this.tmpNode.classList.add('move-up-enter');
    this.tmpNode.classList.add('move-up-enter-active');
  }

  handleLeave(tmpNode) {
    const { duration } = this.props;
    tmpNode.addEventListener('click', () => {
      tmpNode.addEventListener('animationend', () => {
        tmpNode.parentNode.removeChild(tmpNode);
        tmpNode = null;
      });

      tmpNode.classList.add('move-up-leave');
      tmpNode.classList.add('move-up-leave-active');
    });

    setTimeout(() => {
      if (tmpNode) {
        tmpNode.addEventListener('animationend', () => {
          tmpNode.parentNode.removeChild(tmpNode);
          tmpNode = null;
        });

        tmpNode.classList.add('move-up-leave');
        tmpNode.classList.add('move-up-leave-active');
      }
    }, duration);
  }

  render() {
    const { content, type } = this.props;

    let tmpNode = htmlToElement(`
      <div class='IAdB message'>
        <div class='IAdB message-content'>
          <div class='IAdB message-custom-content message-${type}'>
            <i class='IAdB icon response-${type}'></i>
            <span class='IAdB'>${content}</span>
          </div>
        </div>
      </div>
    `);

    this.tmpNode = tmpNode;
    let GlobalMessage = document.querySelector('.global-message span');
    if (GlobalMessage) {
      GlobalMessage.appendChild(tmpNode);
    } else {
      let span = document.createElement('span');
      span.appendChild(tmpNode);
      let div = document.createElement('div');
      div.classList.add('global-message');
      div.classList.add('IAdB');
      div.appendChild(span);
      document.body.appendChild(div);
    }
    this.handleLeave(tmpNode);

    return tmpNode;
  }
}
