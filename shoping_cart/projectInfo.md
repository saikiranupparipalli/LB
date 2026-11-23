# Shopping Cart Project - Project Information & Plan of Action

## 1. Project Overview & Requirements

This project is focused on learning and mastering logic building in vanilla JavaScript while creating a full shopping cart application. The core philosophy is **separation of concerns**: isolating pure data mutations and mathematical calculations from DOM manipulation and UI rendering.

### Core Functional Requirements
- **Add a product to cart**: Select items from the catalog.
- **Prevent duplicate cart entries**: If an item already exists in the cart, increase its quantity instead of creating a duplicate row.
- **Increase / decrease product quantity**: Dynamically update counts with boundary checks.
- **Remove a product from cart**: Cleanly delete line items regardless of count.
- **Calculate individual item totals**: Line-item price calculation (`unit price × quantity`).
- **Calculate total cart price**: Aggregate subtotal across all items.
- **Validate stock availability**: Guard all add/increment actions against available catalog stock limits.
- **Apply discount coupons**: Validate and deduct promotional codes (flat amount or percentage).
- **Calculate tax & final payable amount**: Compute applicable tax on the discounted subtotal and yield the final total.

### UI & Architecture Rules
- **Minimalistic, modern, spacious UI**: Clean, uncluttered layout with generous whitespace; no visual noise.
- **Not production-grade UI**: The interface must remain simple so that DOM selection and manipulation remain clear and straightforward.
- **Micro-folder architecture**: Separate HTML, CSS, and modular JavaScript files inside dedicated directories.
- **Logic-first approach**: No pre-written implementation code; all features are developed step-by-step through deliberate logic building.

---

## 2. Micro-Folder Architecture

```text
shopping-cart-project/
│
├── index.html                  # Minimalist, semantic HTML markup
├── styles/
│   └── style.css               # Spacious, modern, uncluttered CSS
│
└── js/
    ├── products.js             # Mock product catalog data definition
    ├── cart.js                 # Pure cart state management & mutations
    ├── calculations.js         # Math, coupon discounts, tax, and totals
    ├── dom.js                  # Pure UI rendering and DOM manipulation
    └── app.js                  # Entry point, orchestration, and event listeners
```

---

## 3. Complete Phase-by-Phase Roadmap

### Chunk 1: Structure & Data Modeling
- **Subtopic 1.1: File Architecture Setup**
  - Create project folders and file layout.
  - Link CSS and modular JS scripts using `<script type="module" src="js/app.js"></script>`.
- **Subtopic 1.2: Minimalist, Spacious HTML Blueprint**
  - Semantic containers for product list, cart items, order summary, and feedback messages.
  - Predictable identifiers (`#product-list`, `#cart-items`, `#cart-summary`).
- **Subtopic 1.3: Clean, Modern Base CSS**
  - Modern box-sizing reset, neutral color palette, generous spacing/padding (`gap: 1.5rem` to `2rem`).
- **Subtopic 1.4: Mock Product Catalog & Data Schema**
  - Export product objects: `id`, `name`, `price`, `stock`.

### Chunk 2: Core Cart State & Pure Logic Operations
- **Subtopic 2.1: Cart State Representation**
  - In-memory array storing item references (`productId`, `quantity`).
- **Subtopic 2.2: Add Product & Prevent Duplicates**
  - Check existing entries by ID; increment quantity if present, append if new.
- **Subtopic 2.3: Stock Availability Validation**
  - Ensure `cartQuantity + requestedQuantity <= product.stock` before mutation.
- **Subtopic 2.4: Quantity Adjustment (Increment & Decrement)**
  - Guard increment with stock limits; clamp or remove on decrement below 1.
- **Subtopic 2.5: Remove Product from Cart**
  - Delete line items by ID using filter/splice.

### Chunk 3: Mathematical & Pricing Logic
- **Subtopic 3.1: Individual Item Totals (Line-Item Total)**
  - Compute `unit price × quantity` with clean decimal precision.
- **Subtopic 3.2: Cart Subtotal**
  - Reduce/accumulate all line-item totals into a single subtotal amount.
- **Subtopic 3.3: Discount Coupon Rules & Application**
  - Validate coupon codes; compute flat or percentage discount (capped at subtotal).
- **Subtopic 3.4: Tax & Final Payable Calculation**
  - Compute taxable subtotal, apply tax rate, and generate consolidated totals summary.

### Chunk 4: UI Rendering & Event Wiring (DOM Integration)
- **Subtopic 4.1: Render Product Catalog**
  - Dynamically render product cards with data attributes.
- **Subtopic 4.2: Render Cart Items**
  - Render empty state placeholder or active line items with controls (`+`, `-`, Remove).
- **Subtopic 4.3: Render Summary & Coupon Section**
  - Output subtotal, discount, tax, grand total, and coupon form status.
- **Subtopic 4.4: Event Delegation & Application Orchestration**
  - Event listeners on parent containers delegating actions to state updates and re-renders.

### Chunk 5: Edge Cases, Testing & Logic Polish
- **Subtopic 5.1: Inventory Boundary Testing**
  - Stock limits, disabled buttons, zero-stock handling.
- **Subtopic 5.2: Cart Boundary & Input Sanitization**
  - Zero/negative quantities, invalid coupons, floating-point formatting.

