<script>
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { sorter } from "@uidaholib/shared/stores/helpers";

  export let items, selectedGroup;

  $: sortedItems = sorter("name")(items);

  const dispatch = createEventDispatcher();

  let selected;

  const title = "Select an organization";

  function onChange() {
    dispatch("change", selected);
  }
</script>

{#if sortedItems.length}
  <div class="form-group">
    <select
      bind:value={selected}
      on:change={onChange}
      transition:scale
      class="form-control"
      id="OrgFormControlSelect1">
      <option value={title} disabled selected>{title}</option>
      {#each sortedItems as item (item.id)}
        <option value={item}>{item.name}</option>
      {/each}
    </select>
  </div>
{:else}
  <div class="text-center mt-4 spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>
{/if}
