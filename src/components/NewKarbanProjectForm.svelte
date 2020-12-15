<script lang="ts">
 import KarbanStore from "../store/KarbanStore";
 import type { Karban } from "../types";
 import axios from "../utils/axios";

 export const id: string = $KarbanStore._id;

 let projectName: string = "";
 let projectDescription: string = "";

 const createNewKarbanProject = async () => {
  if (projectName && projectDescription) {
   const { data } = await axios.post(`/${id}/project`, {
    projectName,
    projectDescription,
   });
   const karban: Karban = data.karban;
   KarbanStore.update(() => karban);
  } else {
   alert("Please Fill out the field");
  }
 };
</script>

{#if id !== ''}
 <form
  class="mt-8 space-y-6 relative"
  on:submit|preventDefault={createNewKarbanProject}>
  <button
   on:click
   class="absolute -top-10 -right-10 bg-red-500 px-2 py-1 text-white">X</button>
  <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
   Create new Project
  </h2>
  <div class="rounded-md shadow-sm -space-y-px">
   <div>
    <label for="projectName" class="sr-only">ProjectName</label>
    <input
     bind:value={projectName}
     required
     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
     placeholder="ProjectName" />
   </div>
   <div>
    <label for="projectDescription" class="sr-only">ProjectDescription</label>
    <input
     type="text"
     bind:value={projectDescription}
     required
     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
     placeholder="ProjectDescription" />
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
    Create Project
   </button>
  </div>
 </form>
{:else}
 <h1>Please Provide an ID</h1>
{/if}
