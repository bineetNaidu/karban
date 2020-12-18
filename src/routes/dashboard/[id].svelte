<script context="module">
 export async function preload(page, session) {
  const { id } = page.params;
  return { id };
 }
</script>

<script lang="ts">
 import { onMount } from "svelte";
 import { goto } from "@sapper/app";
 import KarbanStore from "../../store/KarbanStore";
 import type { KarbanProjects } from "../../types";

 export let id;

 let data: KarbanProjects;
 onMount(async () => {
  if (!$KarbanStore) {
   goto("/");
  }

  data = $KarbanStore.projects.find((p) => p.projectId === id);
 });
</script>

<p>Projects</p>
