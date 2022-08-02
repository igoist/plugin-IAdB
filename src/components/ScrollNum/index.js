import * as React from 'react';

const { useState } = React;

const ScrollNumSingle = () => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => setAnimate(!animate);

  return (
    <div style={{ pointerEvents: 'auto' }}>
      <div>
        <button onClick={handleClick}>Toggle Animate</button>
      </div>

      <div className={`et-scroll-num ${animate ? 'et-scroll-num-border-animate' : ''}`} style={{ '--i': 0, '--delay': 1 }}>
        <ul className={`${animate ? 'et-scroll-num-animate' : ''}`}>
          <li>0</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
        </ul>

        <svg width="0" height="0">
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0 2" />
          </filter>
        </svg>
      </div>
    </div>
  );
};

export default ScrollNumSingle;
