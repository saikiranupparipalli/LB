 
## Chunk 2: Core Cart State & Pure Logic Operations

> [!IMPORTANT]
> In this phase, focus exclusively on manipulating in-memory JavaScript data structures (`arrays` and `objects`) using browser console logs for verification. Do not touch DOM methods yet.

### Subtopic 2.1: Cart State Representation
* **Goal**: Determine how selected items are stored in memory.
* **Conceptual Mindset**: The cart should hold references to products and their quantities rather than full duplicate copies of product data.
* **Action Steps**:
  1. In `cart.js`, initialize an in-memory `cart` array (`let cart = [];`).
  2. Define the schema for a cart entry: `{ productId: <id>, quantity: <number> }`.
  3. Export a getter function (or the array) so external modules can inspect the cart state without directly mutating it.

### Subtopic 2.2: Add Product & Prevent Duplicates
* **Goal**: Add items to the cart or increment quantity if already present.
* **Conceptual Mindset**: Before inserting a new item object, check if an entry with the target `id` already exists in your cart array.
* **Action Steps**:
  1. Implement a lookup function that inspects the cart for an existing item by its ID (e.g., using `find()` or `findIndex()`).
  2. If the item does **not** exist: append a new entry with an initial quantity of 1.
  3. If the item **already exists**: do not append a new row; instead, increment its existing quantity property.

### Subtopic 2.3: Stock Availability Validation
* **Goal**: Prevent users from adding or increasing quantities beyond available inventory.
* **Conceptual Mindset**: The store's catalog is the single source of truth for inventory limits.
* **Action Steps**:
  1. Create a validation rule: check the requested quantity against the product's catalog `stock`.
  2. If `currentCartQuantity + requestedQuantity > product.stock`, reject the action and produce an informative warning or boolean indicator (`false`).
  3. Wrap your Subtopic 2.2 addition logic with this stock validation check.

### Subtopic 2.4: Quantity Adjustment (Increment & Decrement)
* **Goal**: Allow users to adjust unit quantities dynamically.
* **Conceptual Mindset**: Increasing is bounded by maximum stock; decreasing is bounded by a lower threshold (1 or removal).
* **Action Steps**:
  1. Create an increase function that checks stock bounds before incrementing.
  2. Create a decrease function that reduces quantity by 1.
  3. Decide on decrement boundary behavior: if quantity drops below 1, either clamp it at 1 or trigger an automatic removal.

### Subtopic 2.5: Remove Product from Cart
* **Goal**: Completely delete a line item from the cart state regardless of quantity.
* **Conceptual Mindset**: Array filtering or index-based splicing creates a new state without the targeted ID.
* **Action Steps**:
  1. Implement a removal function accepting a `productId`.
  2. Update the cart array so all entries with that matching ID are excluded (e.g., using `filter()`).

---

## Chunk 3: Mathematical & Pricing Logic

### Subtopic 3.1: Individual Item Totals (Line-Item Total)
* **Goal**: Calculate the cost for a specific product line (`price × quantity`).
* **Conceptual Mindset**: The cart entry holds the quantity; the catalog holds the unit price. Combine both.
* **Action Steps**:
  1. In `calculations.js`, write a function that receives a product ID and its cart quantity.
  2. Lookup unit price from the catalog data.
  3. Multiply price by quantity, handling floating-point rounding cleanly (e.g., standard two-decimal precision).

### Subtopic 3.2: Cart Subtotal
* **Goal**: Calculate the sum of all individual item totals.
* **Conceptual Mindset**: Accumulating values across an array using iterative loops or `reduce()`.
* **Action Steps**:
  1. Iterate over every item currently in the cart.
  2. Compute its line-item total and accumulate into a running subtotal.
  3. Return 0 if the cart is empty.

### Subtopic 3.3: Discount Coupon Rules & Application
* **Goal**: Support promo code discounts (percentage-based or flat discount).
* **Conceptual Mindset**: Coupons require validation against an active list and must not produce negative totals.
* **Action Steps**:
  1. Define a data structure of valid coupons (e.g., code string, discount type (`percentage` or `fixed`), discount value, and optional minimum spend requirement).
  2. Implement a coupon validation function that checks whether an entered string is valid.
  3. Compute the discount deduction based on the current subtotal. Ensure the discount never exceeds the subtotal.

### Subtopic 3.4: Tax & Final Payable Calculation
* **Goal**: Combine subtotal, discounts, and applicable taxes into a final payable amount.
* **Conceptual Mindset**: `Final Payable = (Subtotal - Discount) + Tax`. Tax is calculated on the discounted subtotal.
* **Action Steps**:
  1. Define a constant tax rate (e.g., 5% or 10%).
  2. Calculate taxable amount: `Subtotal - Discount`.
  3. Calculate tax amount: `taxableAmount * taxRate`.
  4. Sum the taxable amount and tax to get the final total.
  5. Structure the return value as a consolidated calculation summary object (`{ subtotal, discountAmount, taxAmount, grandTotal }`).

---

## Chunk 4: UI Rendering & Event Wiring (DOM Integration)

> [!TIP]
> Keep rendering functions "dumb": they should read state from your logic functions and render HTML strings or elements. Avoid putting math inside render functions.

### Subtopic 4.1: Render Product Catalog
* **Goal**: Dynamically display all products on the web page.
* **Conceptual Mindset**: Map over the catalog array and generate clean, accessible HTML cards.
* **Action Steps**:
  1. In `dom.js`, create a render function targeting `#product-list`.
  2. Clear existing inner content.
  3. For each product, build a clean card showing name, price, remaining stock, and an "Add to Cart" button holding a `data-product-id` attribute.

### Subtopic 4.2: Render Cart Items
* **Goal**: Dynamically display rows in the cart matching current state.
* **Conceptual Mindset**: If empty, display a polite empty state message; otherwise, render line items with controls.
* **Action Steps**:
  1. Create a cart render function targeting `#cart-items`.
  2. If cart is empty, render a simple "Your cart is empty" placeholder.
  3. If items exist, render each item row: product name, unit price, quantity with `+` and `-` buttons, item total, and a "Remove" button.

### Subtopic 4.3: Render Summary & Coupon Section
* **Goal**: Reflect real-time pricing figures and coupon status in the UI.
* **Conceptual Mindset**: Keep labels clear and align numbers neatly.
* **Action Steps**:
  1. Create a summary render function targeting the summary block.
  2. Output Subtotal, Discount (if applied), Tax, and Grand Total.
  3. Provide an input field with an "Apply" button for discount codes, plus an inline feedback area for success/error messages.

### Subtopic 4.4: Event Delegation & Application Orchestration
* **Goal**: Connect user clicks and inputs in `app.js` to pure logic and trigger re-renders.
* **Conceptual Mindset**: User action -> Update in-memory state -> Recalculate totals -> Re-render affected DOM sections.
* **Action Steps**:
  1. Use event delegation on container elements (`#product-list`, `#cart-items`) to handle clicks efficiently without binding separate listeners to every single button.
  2. On "Add to Cart" click: read product ID, execute logic, and refresh the cart view.
  3. On quantity increase/decrease or remove click: execute corresponding logic function and refresh the view.
  4. On coupon form submit: execute coupon logic, update calculation display, and show validation messages.

---

## Chunk 5: Edge Cases, Testing & Logic Polish

### Subtopic 5.1: Inventory Boundary Testing
* **Checklist**:
  - [ ] Can a user add more items than available in `product.stock`?
  - [ ] Does the `+` button disable or show feedback when stock limit is reached?
  - [ ] If stock is 0, is the "Add to Cart" button disabled from the start?

### Subtopic 5.2: Cart Boundary & Input Sanitization
* **Checklist**:
  - [ ] Decrementing an item at quantity 1 triggers removal or stops cleanly at 1.
  - [ ] Removing the final item resets the summary to zero and displays the empty cart placeholder.
  - [ ] Submitting an empty, expired, or misspelled coupon shows an error message without breaking existing numbers.
  - [ ] Floating-point operations avoid quirks like `$19.9999999996` by using proper decimal formatting.

