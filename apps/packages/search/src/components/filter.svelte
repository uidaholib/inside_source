<script>
  import { searchFilters$, resultFilters$, filters$ } from "@uidaholib/shared/stores/filters";
  import { searchResults$ } from "@uidaholib/shared/stores/search";
  import { onMount } from "svelte";
  import Dropdown from "./dropdown.svelte";
  import { createEventDispatcher } from "svelte";

  export let type;
  export let title;
  export let selected;

  let values = [];

  const dispatch = createEventDispatcher();

  $: if ($searchFilters$ && $searchFilters$.length) {
    const filter = $searchFilters$.find(filter => filter.type === type);
    values = filter ? filter.values : [];
  }

  $: selected = values[0];


  $: dispatch("selected", { type, value: selected });

  onMount(() => {
    filters$.next(type);
  });

  function handleClick(value) {
    selected = value;
  }
</script>

<div class="d-flex flex-column mr-3">
  <Dropdown>
    <span slot="title">{title}</span>
    <div slot="menu" class="w-64">
      {#each values as value (value)}
        <a
          class={`dropdown-item ${selected === value ? 'active' : ''}`}
          href="#"
          on:click={() => handleClick(value)}>
          {value}
        </a>
      {:else}
        <span class="px-3d py-2">No {title.toLowerCase()} available!</span>
      {/each}
    </div>
  </Dropdown>

  {#if selected}
    <span class="text-wrap" style="width: 6rem;">{selected}</span>
  {/if}
</div>
