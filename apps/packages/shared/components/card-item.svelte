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

  // card display reference:
  //https://uidaho.maps.arcgis.com/home/gallery.html?view=grid&sortOrder=asc&sortField=title
</script>

<div class="card mb-3 mr-3" style="width: 20rem;">
  <img src={thumbnailUrl} class="card-img-top" alt="dataset image" />
  <div class="card-body">
    <h6 class="card-title text-primary text-truncate w-100" {title}>{title}</h6>
    {#if subtitle}
      <span
        class="card-subtitle mb-2 text-muted text-truncate w-100"
        title={subtitle}>
        {subtitle}
      </span>
    {/if}
    {#if description}
      <style>
        .fade-text {
          position: relative;
          height: 5em;
          width: 100%;
        }
        .fade-text:after {
          content: "";
          text-align: right;
          position: absolute;
          bottom: 0;
          right: 0;
          width: 65%;
          height: 2em;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 1) 85%
          );
        }
        .fade-text > * {
          font-size: 1rem;
        }
      </style>
      <p class="card-text fade-text" style="height: 4.5rem; overflow: hidden;">
        {@html description}
      </p>
    {/if}

  </div>
  <div class="card-body pt-0">
    <div class="d-flex justify-content-center w-100">
      <a
        on:click={openArcgis}
        href="#"
        class="btn btn-sm btn-outline-info w-100 mr-2">
        ArcGIS Item Details
      </a>
      <a on:click={openHub} href="#" class="btn btn-sm btn-outline-info w-100">
        Open Data Item Details
      </a>
    </div>

  </div>

</div>
