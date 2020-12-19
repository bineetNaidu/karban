<script lang="ts">
  import type { KarbanProjectTab } from "../types";
  import axios from "../utils/axios";
  import CardTabSurface from "./CardTabSurface.svelte";
  import Modal from "./Modal.svelte";
  import NewProjectCardForm from "./NewProjectCardForm.svelte";

  export let tab: KarbanProjectTab;
  export let deleteTab: (tabId: string) => Promise<void>;
  export let projectId: string;
  export let id: string;

  let isOpen: boolean = false;
  let showForm: boolean = false;

  const addTabCard = async (tabId: string, cardBody: string) => {
    const res = await axios.post(`/${id}/project/${projectId}/tab/${tabId}`, {
      cardBody,
    });
    if (res.data.errors) {
      alert(res.data.errors);
    }
    const proj = res.data.karban.projects.find(
      (p) => p.projectId === projectId
    );
    const latest = proj.tabs.find((t) => t.tabId === tabId).cards;
    tab.cards = latest;

    isOpen = false;
    showForm = false;
  };
</script>

<Modal showModal={showForm}>
  <NewProjectCardForm
    on:click={() => (showForm = !showForm)}
    tabId={tab.tabId}
    {addTabCard} />
</Modal>

<div class="bg-gray-200 rounded-xl p-6 w-72 min-h-screen h-full">
  <header class="flex flex-row justify-between items-center">
    <h1>{tab.tabName}</h1>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu"
          on:click={() => (isOpen = !isOpen)}
          aria-haspopup="true"
          aria-expanded="true">
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      {#if isOpen}
        <div
          class="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu">
          <div class="py-1">
            <button
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500
        "
              role="menuitem">Edit</button>
          </div>
          <div class="py-1">
            <button
              on:click={() => (showForm = !showForm)}
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500
        "
              role="menuitem">Add</button>
          </div>

          <div class="py-1">
            <button
              on:click={async () => await deleteTab(tab.tabId)}
              class="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500
        "
              role="menuitem">Delete</button>
          </div>
        </div>
      {/if}
    </div>
  </header>

  {#if tab.cards !== []}
    <section class="pt-4 flex flex-col">
      {#each tab.cards as card (card.cardId)}
        <CardTabSurface {card} />
      {/each}
    </section>
  {/if}
</div>
