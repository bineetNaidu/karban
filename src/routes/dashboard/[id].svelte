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
  import TabCard from "../../components/TabCard.svelte";
  import Navbar from "../../components/Navbar.svelte";
  import Modal from "../../components/Modal.svelte";
  import NewKarbanTabForm from "../../components/NewKarbanTabForm.svelte";
  import axios from "../../utils/axios";

  export let id;

  let showNewProjectTabForm = false;

  let data: KarbanProjects;
  onMount(async () => {
    if (!$KarbanStore) {
      goto("/");
    }

    data = $KarbanStore.projects.find((p) => p.projectId === id);
  });

  const updateTabs = (updateddata: KarbanProjects) => {
    data = updateddata;
    showNewProjectTabForm = false;
  };
  const deleteTab = async (tabId: string) => {
    const res = await axios.delete(
      `/${$KarbanStore._id}/project/${id}/tab/${tabId}`
    );
    if (res.data.errors) {
      alert(res.data.errors);
    }
    const removedTabList = data.tabs.filter((t) => t.tabId !== tabId);
    data.tabs = removedTabList;
  };
</script>

<Navbar username={$KarbanStore.username} />

<Modal
  showModal={showNewProjectTabForm}
  on:click={() => (showNewProjectTabForm = false)}>
  <NewKarbanTabForm
    on:click={() => (showNewProjectTabForm = false)}
    id={$KarbanStore._id}
    projectId={id}
    {updateTabs} />
</Modal>

<section
  class="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
  <header class="flex items-center justify-between">
    <h2 class="text-lg leading-6 font-medium text-black">
      {data ? data.projectName : 'loading...'}
    </h2>
    <button
      on:click={() => (showNewProjectTabForm = true)}
      class="hover:bg-light-blue-200 hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2">
      <svg
        class="group-hover:text-light-blue-600 text-light-blue-500 mr-2"
        width="12"
        height="20"
        fill="currentColor">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z" />
      </svg>
      New
    </button>
  </header>
  {#if data}
    <div class="grid grid-cols-4 gap-4">
      {#each data.tabs as tab (tab.tabId)}
        <TabCard {tab} {deleteTab} id={$KarbanStore._id} projectId={id} />
      {/each}
    </div>
  {/if}
</section>
