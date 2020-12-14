import { writable } from 'svelte/store';
import type { Karban } from '../types';

//? mock overlook
const data: Karban[] | [] = [];

const KarbanStore = writable(data);

export default KarbanStore;
