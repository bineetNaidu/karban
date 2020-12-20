<script lang="ts">
 export let showModal: boolean = false;
</script>

<style>
 .backdrop {
  width: 100%;
  overflow: hidden;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10000000000000000000;
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
