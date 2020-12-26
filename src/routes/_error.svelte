<script lang="ts">
  export let status: number;
  export let error: Error;

  const dev = process.env.NODE_ENV === 'development';
</script>

<style>
  p {
    margin: 0 auto;
  }

  img {
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: contain;
    margin: 0 auto;
  }
  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

{#if status === 404}
  <img src="notfound.svg" alt="NOT_FOUND" />
  <p>{error.message}</p>
{/if}

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
