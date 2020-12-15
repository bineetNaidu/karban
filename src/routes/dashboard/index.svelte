<script lang="ts">
 import KarbanStore from "../../store/KarbanStore";
 import Navbar from "../../components/Navbar.svelte";
 import KarbanProjects from "../../components/KarbanProjects.svelte";
</script>

<main class="">
 <Navbar username={$KarbanStore.username} />
 <KarbanProjects projects={$KarbanStore.projects} />
</main>
