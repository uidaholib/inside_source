<script>
  import { items$, currentState$ } from "@uidaholib/shared/stores/group";
  import CatalogItem from "./catalog-item.svelte";
  import { fly, fade, slide, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { sorter } from "@uidaholib/shared/stores/helpers";

  export let selectedGroup;

  $: sortedItems = sorter("title")($items$);
</script>

{#if selectedGroup}
  <h4 class="mb-4" transition:fade={{ duration: 500 }}>
    {selectedGroup.title} Group Items
  </h4>
  <div class="d-flex flex-row justify-content-center flex-wrap">
    {#each sortedItems as item (item.id)}
      <div
        in:fade={{ duration: 500 }}>
        <CatalogItem {item} />
      </div>
    {:else}
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    {/each}
  </div>
{:else}
  <p>Select a group to see its catalogs.</p>
{/if}
