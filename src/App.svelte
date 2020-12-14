<script lang="ts">
	import Modal from "./Modal.svelte";

	import Signin from "./Signin.svelte";
</script>

<style>
	main {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
</style>

<main>
	<Modal showModal>
		<Signin />
	</Modal>
</main>
