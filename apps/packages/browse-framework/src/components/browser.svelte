<script>
  import { items$, itemsState$ } from "@uidaholib/shared/stores/items";
  import { fade } from "svelte/transition";
  import Item from "../components/item.svelte";
</script>

<div class="d-flex align-items-center justify-content-center">
  <div class="d-flex flex-row justify-content-center flex-wrap">
    {#each $items$ as item (item.id)}
      <div
        in:fade={{ duration: 500 }}>
        <Item {item} />
      </div>
    {:else}
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    {/each}
  </div>
</div>
