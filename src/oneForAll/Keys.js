import * as React from 'react';

const Keys = (props) => {
  const { keys } = props;

  if (keys.length) {
    return (
      <div className={`${'et'}-keys`}>
        {keys.map((keyItem, i) => (
          <div key={`${'et'}-key-item-${i}`} className={`${'et'}-key-item`}>
            {keyItem}
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default Keys;
