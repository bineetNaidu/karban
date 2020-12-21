<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';
  import KarbanStore from '../../store/KarbanStore';
  import Navbar from '../../components/Navbar.svelte';
  import KarbanProjects from '../../components/KarbanProjects.svelte';

  let loading: boolean = true;

  $: projects = undefined;
  $: username = undefined;

  onMount(() => {
    KarbanStore.subscribe((data) => {
      if (!data) goto('/');
      projects = data.projects;
      username = data.username;
      loading = false;
    });
  });
</script>

{#if !loading}
  <main class="">
    <Navbar {username} />
    <KarbanProjects {projects} />
  </main>
{:else}
  <h1>Loading...</h1>
{/if}
