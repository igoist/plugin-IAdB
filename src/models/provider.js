import * as React from 'react';

import useIAdBHook from './useIAdBHook';
import useKeyMenuHook from './useKeyMenuHook';
import useNewsHook from './useNewsHook';

// Level A B C D E, and then [E, D, C, B, A] with reduce
// Level A B C D E, and then [A, B, C, D, E] with reduceRight
// const providers = [useKeyMenuHook.Provider, useIAdBHook.Provider]; // !! just for error test !!

const providers = [useIAdBHook.Provider, useKeyMenuHook.Provider, useNewsHook.Provider];

// 数据 Provider 组合器
const ProvidersComposer = (props) => {
  return props.providers.reduceRight((children, Parent) => <Parent>{children}</Parent>, props.children);
};

const Provider = (props) => {
  return <ProvidersComposer providers={providers}>{props.children}</ProvidersComposer>;
};

export default Provider;
