<script lang="ts">
  import { goto } from '@sapper/app';
  import axios from '../utils/axios';
  import KarbanStore from '../store/KarbanStore';
  import type { Karban } from '../types';

  let username: string = '';
  let passcode: string = '';
  let remember: boolean = false;

  const createKarbanApiHandler = async () => {
    if (username && passcode) {
      const { data } = await axios.post('/', {
        username,
        passcode,
      });
      const karban: Karban = data.karban;
      if (remember) {
        if (!localStorage.getItem('karbanId')) {
          localStorage.setItem('karbanId', karban._id);
        } else {
          localStorage.setItem('karbanId', karban._id);
        }
      }
      KarbanStore.set(karban);
      goto('dashboard');
    } else {
      alert('Please Fill out the field');
    }
  };
</script>

<section class="container mx-auto lg:px-96 md:px-40 my-16">
  <div>
    <img
      class="mx-auto h-12 w-auto"
      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
      alt="Workflow" />
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Create your new Karban account
    </h2>
  </div>
  <form
    class="mt-8 space-y-6"
    on:submit|preventDefault={createKarbanApiHandler}>
    <input type="hidden" name="remember" value="true" />
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <label for="username" class="sr-only">Username</label>
        <input
          bind:value={username}
          required
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Username" />
      </div>
      <div>
        <label for="password" class="sr-only">Passcode</label>
        <input
          id="password"
          type="password"
          bind:value={passcode}
          required
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Passcode" />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          id="remember_me"
          name="remember_me"
          type="checkbox"
          bind:checked={remember}
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
        <label for="remember_me" class="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>

      <div class="text-sm">
        <a
          href="/forgot"
          class="font-medium text-indigo-600 hover:text-indigo-500">
          Forgot your passcode?
        </a>
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
        Create!
      </button>
    </div>
  </form>
</section>
