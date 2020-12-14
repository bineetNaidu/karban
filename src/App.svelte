<script lang="ts">
	// imports
	import { onMount } from "svelte";
	import axios from "./axios";
	import Modal from "./Modal.svelte";
	import Signin from "./createKarbanCard.svelte";
	import KarbanStore from "./store/KarbanStore";

	// States
	let showModal: boolean = true;

	onMount(async () => {
		const id = localStorage.getItem("karbanId");
		const res = await axios.get(`/${id}`);
		if (res.data.karban) {
			KarbanStore.update(() => res.data.karban);
			showModal = false;
			console.log($KarbanStore);
		}
	});
</script>

<style>
	main {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
</style>

<main>
	<Modal {showModal}>
		<Signin />
	</Modal>
</main>
