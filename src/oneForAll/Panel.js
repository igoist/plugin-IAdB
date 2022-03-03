import * as React from 'react';

const pf = 'et';

const Panel = (props) => {
  const { commands } = props;

  return (
    <>
      {/* <input className={`${pf}-input`} value={value} onChange={handleOnChange} /> */}
      <div className={`${pf}-commands-panel`}>
        {commands.map((command, i) => (
          <div key={`${pf}-command-item-${i}`} className={`${pf}-command-item`}>
            {command.key} -- {command.desc}
          </div>
        ))}
      </div>
    </>
  );
};

export default Panel;
