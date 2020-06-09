<script>
  export let item;

  import CardItem from "@uidaholib/shared/components/card-item.svelte";

  $: id = item.id.split("_")[0];
  $: itemArgisUrl = `https://www.arcgis.com/home/item.html?id=${id}`;


  const openHub = (event) => {
    window.open(event.detail.landingPage, "_blank");
  };

  const openArcgis = (event) => {
    const id = event.detail.id.split("_")[0];
    const url = `https://www.arcgis.com/home/item.html?id=${id}`;
    window.open(url, "_blank");
  };
</script>

<CardItem {...item} description={item.snippet} title={item.name} on:hub={openHub} on:arcgis={openArcgis}></CardItem>
