import * as React from 'react';
import { useArray } from '@Hooks';
import { keyCode } from '@Utils';

const { useState, useEffect, useRef } = React;
const { returnCode } = keyCode;

/**
 * 父级 turnOn 控制 fadeLayer 的显示
 * el 为元素 tagName
 * classList
 * pause 控制是否暂停选择
 * selects 类名多选
 * resultList
 * elRef 指向 targetEl
 */
const Inspect = (props) => {
  const [visible, setVisible] = useState(props.turnOn);
  const [el, setEl] = useState('');
  const [classList, setClassList] = useState([]);
  const [selects, setSelects] = useState([]);
  const [pause, setPause] = useState(false);
  const [resultList, { push: resultListPush, pop: resultListPop, empty: resultListReset }] = useArray([]);
  const elRef = useRef(null);

  useEffect(() => {
    setVisible(props.turnOn);

    if (!props.turnOn) {
      console.log('enter !props.turnOn');
      setEl('');
      setClassList([]);
      setSelects([]);
      setPause(false);
      resultListReset();
      elRef.current = null;
    }
  }, [props.turnOn]);

  const handleElement = (target) => {
    if (elRef.current) {
      elRef.current.classList.remove('et-test-selected');
    }

    // 一方面要保证能根据 id 获得元素，另一方面要保证不影响该元素原 id
    // const tmpId = +new Date();
    // const oldId = target.id;
    // target.id = tmpId;

    // const t = document.getElementById(tmpId);
    // t.id = oldId;

    const t = getTargetEl(target);

    elRef.current = t;
    t.classList.add('et-test-selected');
    setEl(t.tagName);

    // 更新 classList、selects
    const tmpClassList = t.className.split(' ').slice(0, -1);
    setClassList(tmpClassList);
    const tmpSelects = [];
    for (let i = 0; i < tmpClassList.length; i++) {
      tmpSelects.push(0);
    }
    setSelects(tmpSelects);
  };

  // 按 A 键添加值
  const pushResult = () => {
    const tmp = classList.filter((_, i) => selects[i] === 1);
    let tmpStr = '';
    for (let i = 0; i < tmp.length; i++) {
      tmpStr += `.${tmp[i]}`;
    }
    const tmpResult = `${el}${tmpStr}`;
    resultListPush(tmpResult);
    setEl('');
    setClassList([]);
    setSelects([]);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (pause) {
        return;
      }

      const elCurrent = elRef.current;
      if (elCurrent === e.target) {
        return;
      } else {
        handleElement(e.target);
      }
    };

    /**
     * s: 暂停选择
     * r: 选中父级元素（如果有的话）
     */
    const handleKeyDown = (e) => {
      if (e.code === returnCode('a')) {
        pushResult();
      }

      if (e.code === returnCode('z')) {
        resultListPop();
      }

      if (e.code === returnCode('b')) {
        console.log(resultList);
      }

      if (e.code === returnCode('s')) {
        setPause(!pause);
      }

      if (e.code === returnCode('r')) {
        const elCurrent = elRef.current;

        if (elCurrent && elCurrent.tagName !== 'HTML' && elCurrent.parentNode) {
          handleElement(elCurrent.parentNode);
        }
      }
    };

    if (visible) {
      document.body.addEventListener('mousemove', handleMouseMove);
      document.body.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('keydown', handleKeyDown);

      // console.log('here return ', visible, pause, elRef.current);

      if (elRef.current && pause) {
        elRef.current.classList.remove('et-test-selected');
      }
    };
  }, [visible, pause, selects, resultList]);

  const handleClick = (i) => {
    selects[i] = selects[i] ? 0 : 1;
    setSelects([...selects]);
  };

  const renderClassList = () => {
    if (classList.length) {
      return (
        <div className={`${'et'}-inspect-class-list`}>
          {classList.map((item, i) => (
            <div key={`icli-${item}`} className={`${'et'}-inspect-class-list-item ${selects[i] ? 'is-selected' : ''}`} onClick={() => handleClick(i)}>
              {item}
            </div>
          ))}
        </div>
      );
    } else {
      return <div className={`${'et'}-inspect-class-list`}>何もない</div>;
    }
  };

  if (visible) {
    return (
      <>
        {renderClassList()}

        <div className={`${'et'}-inspect-el`}>{el}</div>
      </>
    );
  } else {
    return null;
  }
};

export default Inspect;

/**
 * 若元素存在 id，则使用 id 查询
 * 反之，使用 tagName + className 查询，并标记时间戳 tmpId
 * 通过 for 循环判断后得到 N，删除 tmpId
 * 最后返回 el、tagName + className、N
 */

const getTargetEl = (el) => {
  let targetEl;

  if (el.id) {
    targetEl = document.getElementById(el.id);
  } else {
    const tmpId = +new Date();

    el.id = tmpId;
    targetEl = document.getElementById(tmpId);

    el.removeAttribute('id');
  }

  return targetEl;
};

// 一个是拿到 el，另一个是返回包括 el 的定位信息
