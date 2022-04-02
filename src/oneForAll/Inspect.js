import * as React from 'react';

const { useState, useEffect, createRef } = React;

const Inspect = (props) => {
  const [el, setEl] = useState('');
  const [visible, setVisible] = useState(props.turnOn);
  const elRef = createRef(null);

  useEffect(() => {
    setVisible(props.turnOn);
  }, [props.turnOn]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const el = elRef.current;
      if (el === e.target) {
        return;
      } else {
        if (el) {
          el.classList.remove('et-test-selected');
        }

        elRef.current = e.target;
        e.target.classList.add('et-test-selected');
      }

      setEl(e.target.tagName);
    };

    if (visible) {
      document.body.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);

      if (elRef.current) {
        elRef.current.classList.remove('et-test-selected');
      }
    };
  }, [visible]);

  if (visible) {
    return <div className={`${'et'}-inspect-el`}>{el}</div>;
  } else {
    return null;
  }
};

export default Inspect;
