// state.js
// Holds the in-memory state of the inventory and state-access helpers.

export let inventory = [
  {
    id: 0,
    name: "doors",
    category: "wood",
    price: 100,
    quantity: 10,
  },
  {
    id: 1,
    name: "dolo 650",
    category: "medicine",
    price: 10,
    quantity: 5,
  },
  {
    id:2,
    name: "school bag",
    category: "bags",
    price: 600,
    quantity: 0,
  },
];


export function get_inventory(){
    return inventory
}

export function set_inventory(arr){
    inventory = arr
    return arr
}

 

