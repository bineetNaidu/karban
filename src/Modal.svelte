<script lang="ts">
 export let showModal: boolean = false;
</script>

<style>
 .backdrop {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
 }
 .modal {
  padding: 50px;
  border-radius: 10px;
  max-width: 500px;
  margin: 10% auto;
  text-align: center;
  background: white;
 }
</style>

{#if showModal}
 <div class="backdrop" on:click|self>
  <div class="modal">
   <slot />
  </div>
 </div>
{/if}
