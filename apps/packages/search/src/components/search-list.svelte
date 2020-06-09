<script>
  import {
    searchState$,
    searchTerm$,
    SEARCH_STATES
  } from "@uidaholib/shared/stores/search";
  import { filteredResults$ } from "@uidaholib/shared/stores/filters";
  import SearchItem from "./search-item.svelte";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";

  $: term = $searchTerm$;
</script>

{#if $searchState$ === SEARCH_STATES.LOADED && $filteredResults$ && $filteredResults$.length}
  <div class="d-flex flex-row justify-content-center flex-wrap">
    {#each $filteredResults$ as item (item.id)}
      <div in:fade={{ duration: 500 }}>
        <SearchItem {item} />
      </div>
    {/each}
  </div>
{/if}
