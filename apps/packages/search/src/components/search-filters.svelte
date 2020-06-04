<script>
  import Filter from "./filter.svelte";
  import {
    filters,
    resultFilters$,
    filteredResults$,
    searchFilters$
  } from "@uidaholib/shared/stores/filters";
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";

  let selected;

  let filterGroup = new Map();

  function selectionChanged(event) {
    const { type, value } = event.detail;
    filterGroup.set(type, { type, value });
    resultFilters$.next(filterGroup);
  }
</script>

<div
  class="d-inline-flex justify-content-center align-items-start mb-3"
  class:hidden={$searchFilters$.length === 0}>
  {#each filters as filter (filter.type)}
    <Filter {...filter} on:selected={selectionChanged} />
  {/each}
</div>
