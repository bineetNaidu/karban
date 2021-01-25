<script lang="ts">
 import type { KarbanProjectTabCard } from "../types";
 export let card: KarbanProjectTabCard;
 export let deleteCard: (cardId: string) => Promise<void>;

 let hidden: boolean = true;
</script>

<div
 class="bg-gray-100 rounded-xl p-6 mt-4 relative"
 on:mouseenter={() => (hidden = false)}
 on:mouseleave={() => (hidden = true)}>
 <button
  on:click={async () => await deleteCard(card.cardId)}
  class="group absolute top-0.5	right-0.5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
  {hidden}>
  Delete!
 </button>
 <h1>{card.cardBody}</h1>
</div>
