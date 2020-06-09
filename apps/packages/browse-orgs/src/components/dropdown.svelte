<script>
  export let open = false;
  
  export let index;
</script>

<div class="btn-group">
  <button
    type="button"
    id={`dropdownMenuButton${index}`}
    class="btn btn-sm btn-secondary dropdown-toggle"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false">
    <slot name="title" />
  </button>
  <div class="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
    <slot name="menu" />
  </div>
</div>
