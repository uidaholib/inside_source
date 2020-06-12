<script>
  import CardItem from "@uidaholib/shared/components/card-item.svelte";

  export let item;

  const openHub = () => {
    const url = `http://hub.arcgis.com/datasets/${item.id}`;
    window.open(url, "_blank");
  };

  const openArcgis = () => {
    const id = item.id.split("_")[0];
    const url = `https://www.arcgis.com/home/item.html?id=${id}`;
    window.open(url, "_blank");
  };
</script>


<CardItem {...item} on:hub={openHub} on:arcgis={openArcgis}></CardItem>
