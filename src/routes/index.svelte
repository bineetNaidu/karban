<script>
 import KarbanStore from "../store/KarbanStore";

 KarbanStore.subscribe((man) => console.log(man));
</script>

<svelte:head>
 <title>bineet</title>
</svelte:head>

<p>Hello karban</p>
<a href="/dashboard">dashboard</a>
