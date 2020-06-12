<script>
  import { organizations$ } from "@uidaholib/shared/stores/organizations";
  import { currentGroup$ } from "@uidaholib/shared/stores/group";

  import Selection from "./selection.svelte";
  import Sidebar from "./sidebar.svelte";

  let selected;

  let selectedGroup;

  let selectedGroups = [];
  $: {
    if (selected) selectedGroups = [...selected.groups];
    else if ($organizations$.length > 0)
      selectedGroups = [...$organizations$[0].groups];
  }

  $: if (selected && !selectedGroup) {
    selectedGroup = selected.groups[0];
  }

  $: {
    currentGroup$.next(selectedGroup);
  }

  function setSelectedGroup(event) {
    selectedGroup = event.detail;
  }

  function selectionChanged(event) {
    selected = event.detail;
    selectedGroup = null;
    // gtag("event", "inside-browse-org-organization-click", {
    //   event_category: "inside-browse-org",
    //   event_label: selected.name
    // });
  }
</script>

<div class="container mx-auto px-4 py-2">
  
  <div class="d-flex flex-column">
    <div class="d-flex justify-content-center mb-3">
      <Selection items={$organizations$} on:change={selectionChanged} />
    </div>

    {#if selected}
      <Sidebar {selectedGroups} {selectedGroup} on:change={setSelectedGroup} />
    {/if}
  </div>

</div>
