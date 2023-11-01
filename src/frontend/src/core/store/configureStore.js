// async function getStore() {
//   let module;
//   if (import.meta.env.PROD === true) {
//     module = await import('./configureStore.prod');
//   } else {
//     module = await import('./configureStore.dev');
//   }
//   return module.default;
// }

import getStore from './configureStore.dev';

export default getStore;