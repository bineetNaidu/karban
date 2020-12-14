<script lang="ts">
 import Header from "./Header.svelte";
 import KarbanProjects from "./components/KarbanProjects.svelte";
 import KarbanStore from "./store/KarbanStore";
</script>

<main class="">
 <Header username={$KarbanStore.username} />
 <KarbanProjects projects={$KarbanStore.projects} />
</main>
