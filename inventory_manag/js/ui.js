// ui.js
// DOM rendering functions: tables, badges, KPI summary updates.
import { productValue, formatCurrency} from "./logic.js";
import { inventory } from "./state.js";

export function renderInventoryTable(inventory){
    const inventory_tbody = document.getElementById("inventory-tbody")
    inventory_tbody.c
    inventory_tbody.innerHTML += productValue
}

renderInventoryTable(inventory)