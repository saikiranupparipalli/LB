// state.js
// Holds the in-memory state of the inventory and state-access helpers.

export let inventory = [
  {
    id: 0,
    name: "doors",
    category: "wood",
    price: 100,
    quantity: 88,
  },
  {
    id: 1,
    name: "dolo 650",
    category: "medicine",
    price: 10,
    quantity: 12,
  },
  {
    id: 2,
    name: "school bag",
    category: "bags",
    price: 600,
    quantity: 100,
  },
];

export function get_inventory() {
  return inventory;
}

export function set_inventory(arr) {
  inventory = arr;
  return arr;
}
