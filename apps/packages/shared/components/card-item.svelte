<script>
  import shave from "shave";
  import lozad from "lozad";

  import { truncate } from "./helpers";
  import { createEventDispatcher, onMount } from "svelte";

  export let thumbnailUrl, title, subtitle, description, id, landingPage, url;

  let observer;

  onMount(() => {
    const el = document.querySelector("img");
    observer = lozad();
    observer.observe();
    observer.triggerLoad(el);
  });

  $: if (observer) observer.observe();

  const dispatch = createEventDispatcher();

  const openHub = () => {
    dispatch("hub", { id, landingPage });
  };

  const openArcgis = () => {
    dispatch("arcgis", { id, landingPage, url });
  };
</script>

<div
  class="d-flex flex-column justify-content-between h-100 shadow rounded w-100
  h-100 rounded-lg">
  <div>
    <img
      src={thumbnailUrl}
      alt="thumbnail image"
      class="img-fluid w-100 mb-2 rounded-top"
      style="height: 12rem;" />
    <div class="p-2">
      <h6
        class="font-weight-bold"
        aria-label="more information"
        title="More Information"
        use:truncate={20}>
        {title}
      </h6>
      <p class="">{subtitle}</p>
      <p use:truncate={90} class="">
        {@html description}
      </p>
    </div>
  </div>
  <div class="d-flex align-items-center p-2 w-100">
    <button
      class="btn btn-sm btn-outline-primary w-100 mr-2"
      on:click={openArcgis}>
      ArcGIS Item Details
    </button>
    <button class="btn btn-sm btn-outline-primary w-100" on:click={openHub}>
      Open Data Item Details
    </button>
  </div>

</div>
