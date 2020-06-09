<script>
  import { search$, searchState$, SEARCH_STATES } from "@uidaholib/shared/stores/search";

  let text = "";

  $: showSpinner = $searchState$ === SEARCH_STATES.LOADING;

  function handleSubmit() {
    search$.next(text);
    text = "";
  }
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="d-flex justify-content-center mb-2">

  <div
    class="input-group d-flex justify-content-center rounded"
    style="width: 24rem;">
    <input
      class="form-control rounded-left shadow-sm px-4 py-2"
      type="text"
      placeholder="Search for dataset"
      bind:value={text}
      name="search" />
    <div class="input-group-prepend">
      <button
        class="btn btn-primary rounded-right shadow-sm"
        type="submit"
        disabled={text === ''}>
        {#if showSpinner}
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true" />
        {/if}
        Search
      </button>
    </div>
  </div>

</form>
