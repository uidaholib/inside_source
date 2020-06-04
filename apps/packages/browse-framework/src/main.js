import App from "./app.svelte";

const target = document.getElementById("inside-browse-framework");

const app = new App({
  target,
});

export default app;