import { writable } from 'svelte/store';
import type { Karban } from '../types';

//? mock overlook
let data: Karban | undefined = undefined;

const KarbanStore = writable(data);

// (async () => {
//   const res = await axios.get('/5fd8f1885831be0015b2f143');
//   data = res.data.karban;
//   KarbanStore.update(() => data);
// })();

export default KarbanStore;
