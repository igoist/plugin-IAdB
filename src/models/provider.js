import * as React from 'react';

import useIAdBHook from './useIAdBHook';

// Level A B C D E, and then [E, D, C, B, A]
const providers = [useIAdBHook.Provider];

// 数据 Provider 组合器
const ProvidersComposer = (props) => {
  return props.providers.reduceRight((children, Parent) => <Parent>{children}</Parent>, props.children);
};

const Provider = (props) => {
  return <ProvidersComposer providers={providers}>{props.children}</ProvidersComposer>;
};

export default Provider;
