import Message from './Message';

const showMessage = (config) => {
  let { content, duration, type } = config;
  let message = new Message({
    content,
    duration,
    type
  });

  message.render();
  message.componentDidMount();
}

const duration = 2000;

Message.success = (content) => {
  let message = new Message({
    content,
    duration,
    type: 'success'
  });

  message.render();
  message.componentDidMount();
}

Message.warning = (content) => {
  let message = new Message({
    content,
    duration,
    type: 'warning'
  });

  message.render();
  message.componentDidMount();
}

Message.error = (content) => {
  let message = new Message({
    content,
    duration,
    type: 'error'
  });

  message.render();
  message.componentDidMount();
}

export default Message;

export { Message, showMessage };
