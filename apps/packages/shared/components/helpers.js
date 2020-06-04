import shave from "shave";

export function truncate(node, maxHeight = 70) {
  shave(node, maxHeight);
}
