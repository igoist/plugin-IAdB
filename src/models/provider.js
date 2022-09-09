import useIAdBHook from './useIAdBHook';
import useIRecordsHook from './useIRecordsHook';
import useInputsHook from './useInputsHook';
import useKeyMenuHook from './useKeyMenuHook';

import { generateProvider } from './generateProvider';

// Level A B C D E, and then [E, D, C, B, A] with reduce
// Level A B C D E, and then [A, B, C, D, E] with reduceRight
// const providers = [useKeyMenuHook.Provider, useIAdBHook.Provider]; // !! just for error test !!

// prettier-ignore
const providers = [
  useIAdBHook.Provider,
  useIRecordsHook.Provider,
  useInputsHook.Provider,
  useKeyMenuHook.Provider,
];

const Provider = generateProvider(providers);

export default Provider;
