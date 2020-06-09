<script>
  import {
    search$,
    searchState$,
    SEARCH_STATES
  } from "@uidaholib/shared/stores/search";

  let text = "";

  $: showSpinner = $searchState$ === SEARCH_STATES.LOADING;

  function handleSubmit() {
    search$.next(text);
    text = "";
  }
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="row mb-3 justify-content-center text-center">

  <div class="input-group">
    <input
      class="form-control px-4 py-2"
      type="text"
      bind:value={text}
      name="search"
      placeholder="Search"
      aria-label="Search GIS data"
      aria-describedby="button-addon2" />
    <div class="input-group-append">
      <button
        class="btn btn-primary rounded-right shadow-sm"
        type="submit"
        id="button-addon2"
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
