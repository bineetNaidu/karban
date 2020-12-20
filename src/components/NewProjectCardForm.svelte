<script lang="ts">
  import KarbanStore from "../store/KarbanStore";

  export let addTabCard: (tabId: string, cardBody: string) => Promise<void>;
  export let tabId: string;

  let id: string = $KarbanStore._id;
  let cardBody: string = "";
</script>

{#if id !== ''}
  <form
    class="mt-8 space-y-6 relative"
    on:submit|preventDefault={async () => {
      await addTabCard(tabId, cardBody);
    }}>
    <button
      on:click
      class="absolute -top-10 -right-10 bg-red-500 px-2 py-1 text-white">X</button>
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Create new Card
    </h2>
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <label for="cardBody" class="sr-only">CardBody</label>
        <input
          bind:value={cardBody}
          required
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="CardBody" />
      </div>
    </div>
    <div>
      <button
        type="submit"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <!-- Heroicon name: lock-closed -->
          <svg
            class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd" />
          </svg>
        </span>
        Create Card
      </button>
    </div>
  </form>
{:else}
  <h1>Please Provide an ID</h1>
{/if}
