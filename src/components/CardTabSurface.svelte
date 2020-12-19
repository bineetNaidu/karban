<script lang="ts">
 import type { KarbanProjectTabCard } from "../types";
 export let card: KarbanProjectTabCard;
 export let deleteCard: (cardId: string) => Promise<void>;
</script>

<div
 class="bg-gray-100 rounded-xl p-6 mt-4"
 on:click={async () => await deleteCard(card.cardId)}>
 <h1>{card.cardBody}</h1>
</div>
