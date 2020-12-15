import { writable } from 'svelte/store';
import type { Karban } from '../types';

//? mock overlook
let data: Karban | undefined = undefined;

const KarbanStore = writable(data);

export default KarbanStore;
