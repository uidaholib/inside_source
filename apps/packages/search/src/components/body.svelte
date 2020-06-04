<script>
  import Search from "./search.svelte";
  import SearchList from "./search-list.svelte";
  import SearchFilters from "./search-filters.svelte";
  import { filteredResults$ } from "@uidaholib/shared/stores/filters";
  import {
    searchTerm$,
    search$,
    searchState$,
    SEARCH_STATES,
    searchResults$,
    groups$
  } from "@uidaholib/shared/stores/search";
  import { onMount } from "svelte";

  onMount(() => {
    const urlParam = window.location.search.split("=");
    const q = urlParam.length == 2 ? urlParam[1] : "";
    if (q !== "") search$.next(q);
  });
</script>

<div class="container mt-3">
  <div class="d-flex flex-column align-items-center">
    <Search />
    <SearchFilters />
    {#if $searchState$ === SEARCH_STATES.LOADING}
      <div class="d-flex flex-column align-items-center mt-8">
        <span class="text-center text-primary">Loading results</span>
        <div class="spinner-border text-primary mt-2" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    {:else if $filteredResults$ && $filteredResults$.length}
      <div class="d-flex justify-content-center mt-4">
        <h6 class="text-lg">
          <span>{$filteredResults$.length}</span>
          result{$filteredResults$.length > 1 ? 's' : ''} found for "
          <span class="font-weight-bold">{$searchTerm$}</span>
          "
        </h6>
      </div>
    {:else if $searchState$ === SEARCH_STATES.LOADED}
      <div class="d-flex justify-content-center mt-4">
        <h3>
          No results found for "
          <span class="font-weight-bold">{$searchTerm$}</span>
          "
        </h3>
      </div>
    {/if}
  </div>

  <div class="d-flex justify-content-center">
    <SearchList />
  </div>

</div>
