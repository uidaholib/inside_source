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
  <img src={thumbnailUrl} class="card-img-top" alt="dataset image" style="height: 14rem;"/>
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

        html {
          --lh: 1.4rem;
          line-height: var(--lh);
        }

        .truncate-overflow {
          --max-lines: 3;
          position: relative;
          max-height: calc(var(--lh) * var(--max-lines));
          overflow: hidden;
          padding-right: 1rem; /* space for ellipsis */
        }
        .truncate-overflow::before {
          position: absolute;
          content: "...";
          inset-block-end: 0; /* "bottom" */
          inset-inline-end: 0; /* "right" */
        }
        .truncate-overflow::after {
          content: "";
          position: absolute;
          inset-inline-end: 0; /* "right" */
          width: 1rem;
          height: 1rem;
          background: white;
        }
      </style>
      <p class="card-text truncate-overflow" style="height: 4.5rem; overflow: hidden;">
        {@html description}
      </p>
    {/if}

  </div>
  <div class="card-body pt-0">
    <div class="d-flex justify-content-center w-100">
      <a
        on:click={openArcgis}
        href="#"
        class="btn btn-sm btn-info w-100 mr-2">
        ArcGIS Item Details
      </a>
      <a on:click={openHub} href="#" class="btn btn-sm btn-info w-100">
        Open Data Item Details
      </a>
    </div>

  </div>

</div>
