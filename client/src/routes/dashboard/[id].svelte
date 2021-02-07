<script context="module">
  export async function preload(page, session) {
    const { id } = page.params;
    return { id };
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';
  import KarbanStore from '../../store/KarbanStore';
  import type { KarbanProjects } from '../../types';
  import TabCard from '../../components/TabCard.svelte';
  import Navbar from '../../components/Navbar.svelte';
  import Modal from '../../components/Modal.svelte';
  import NewKarbanTabForm from '../../components/NewKarbanTabForm.svelte';
  import DeleteProject from '../../components/DeleteProject.svelte';

  export let id;

  let showNewProjectTabForm = false;
  let showDeleteProjectModal: boolean = false;

  let data: KarbanProjects;
  // onMount(async () => {
  //   if (!$KarbanStore) {
  //     goto("/");
  //   }

  //   data = $KarbanStore.projects.find((p) => p.projectId === id);
  // });

  const updateTabs = (updateddata: KarbanProjects) => {
    // data = updateddata;
    // showNewProjectTabForm = false;
  };
  const deleteTab = async (tabId: string) => {
    // const res = await axios.delete(
    //   `/${$KarbanStore._id}/project/${id}/tab/${tabId}`
    // );
    // if (res.data.errors) {
    //   alert(res.data.errors);
    // }
    // const removedTabList = data.tabs.filter((t) => t.tabId !== tabId);
    // data.tabs = removedTabList;
  };
</script>

<Navbar username={$KarbanStore.username} />

<Modal
  showModal={showNewProjectTabForm}
  on:click={() => (showNewProjectTabForm = false)}
>
  <NewKarbanTabForm
    on:click={() => (showNewProjectTabForm = false)}
    id={$KarbanStore._id}
    projectId={id}
    {updateTabs}
  />
</Modal>

<DeleteProject {showDeleteProjectModal} projectId={id} />

<section
  class="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4"
>
  <header class="flex items-center justify-between">
    <h2 class="text-lg leading-6 font-medium text-black">
      {data ? data.projectName : 'loading...'}
    </h2>
    <button
      on:click={() => (showDeleteProjectModal = !showDeleteProjectModal)}
      class="hover:bg-light-blue-200 group flex items-center rounded-md bg-red-600 text-sm font-medium px-4 py-2 text-white"
    >
      Delete this Project
    </button>
  </header>
  {#if data}
    <div class="grid grid-cols-4 gap-4">
      {#each data.tabs as tab (tab.tabId)}
        <TabCard {tab} {deleteTab} id={$KarbanStore._id} projectId={id} />
      {/each}
      <div
        class="hover:shadow-lg flex  rounded-xl p-6 w-72 min-h-screen h-full"
      >
        <button
          on:click={() => (showNewProjectTabForm = true)}
          class="hover:border-transparent hover:bg-gray-200 hover:shadow-xs w-full flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-sm font-medium py-4 focus:outline-none"
        >
          Add New Tab
        </button>
      </div>
    </div>
  {/if}
</section>
