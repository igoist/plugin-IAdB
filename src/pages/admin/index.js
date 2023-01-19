import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.dark.css';

import { ETSendMessage } from '../../oneForAll/fns';
import { ListTabs, ListInfoNGA, ListInfoZhihu } from '@ComponentsAdmin';

const { useState } = React;

const Test = () => {
  // const [v, setV] = useState();

  // const onChange = (e) => {
  //   setV(e.target.value);
  // };
  const onClick = () => {
    ETSendMessage(
      {
        type: 'TabsGet',
      },
      (res) => {
        console.log(res.msg);
      }
    );
  };

  return <button onClick={onClick}>Button</button>;
};

const TextareaCSS = () => {
  const [v, setV] = useState();

  useEffect(() => {
    ETSendMessage(
      {
        type: 'et-bg-css-get',
      },
      (res) => {
        setV(res.result);
      }
    );
  }, []);

  const onChange = (e) => {
    setV(e.target.value);
  };

  const onClick = () => {
    ETSendMessage(
      {
        type: 'et-bg-css-save',
        payload: v,
      },
      (res) => {
        console.log(res.msg);
      }
    );
  };

  return (
    <>
      <textarea value={v} onChange={onChange} style={{ color: '#000' }} />
      <button onClick={onClick}>Save Css</button>
    </>
  );
};

const Admin = () => {
  return (
    <>
      <ListInfoNGA />
      <ListInfoZhihu />
      <Test />
      <TextareaCSS />
      <ListTabs />
    </>
  );
};

ReactDOM.render(<Admin />, document.getElementById('app'));
