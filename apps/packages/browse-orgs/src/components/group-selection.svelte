<script>
  import { createEventDispatcher } from "svelte";
  import Dropdown from "./dropdown.svelte";
  import { sorter } from "@uidaholib/shared/stores/helpers";

  export let selectedGroups = [],
    selectedGroup;

  let title = "Groups";
  $: selected = selectedGroup.title;

  $: console.log("selected: ", selected);

  $: sortedSelectedGroups = sorter("title")(selectedGroups);

  const dispatch = createEventDispatcher();

  function setSelectedGroup(group) {
    dispatch("change", group);
    selected = group.title;
    console.log("selection: ", group);
    // gtag("event", "inside-browse-org-group-click", {
    //   event_category: "inside-browse-org",
    //   event_label: selected
    // });
  }

  const onSelectionChanged = event => {
    const group = selectedGroups.find(g => g.title === event.target.value);
    console.log("group: ", group);
    setSelectedGroup(group);
  };
</script>

<div class="form-group">
  <label for="exampleFormControlSelect1">{title}</label>
  <select
    class="form-control"
    id="GroupFormControlSelect1"
    on:change={onSelectionChanged}>
    {#each sortedSelectedGroups as group (group.id)}
      <option>{group.title}</option>
    {/each}
  </select>
</div>
