<script lang="ts">
 import Header from "./Header.svelte";
 import KarbanStore from "./store/KarbanStore";
</script>

<main class="">
 <Header username={$KarbanStore.username} />
 Karban Surface
</main>
