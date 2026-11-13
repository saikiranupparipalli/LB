# Step-by-Step Action Guide: Inventory Management

---

## 📦 Chunk 1: State & Data Modeling

### Step 5 & 6: Define Schema & Initial Inventory
- Go to `js/state.js`
- Create a list named `inventory` to hold all products
- Add 3 sample product objects inside it with properties for ID, name, category, price, and quantity
- Ensure the sample products cover all 3 scenarios:
  - An item with plenty of stock (quantity higher than 5)
  - An item with low stock (quantity between 1 and 5)
  - An item that is completely out of stock (quantity of 0)
- Export this inventory list so other files can read and use it

### Step 7: Create State Helpers
- Stay in `js/state.js`
- Create a getter function `getInventory` that simply returns the current inventory list
- Create a setter function `setInventory` that accepts a new inventory list and replaces the current inventory with it
- Export both functions so other modules can safely access and update the state

---

## ➕ Chunk 2: Adding Products & Input Validation

### Step 8: Validate Product Inputs
- Go to `js/logic.js`
- Create a validation function `validateProductInput` that accepts name, price, and quantity
- Check the name: ensure it is text and not empty after removing leading and trailing spaces
- Check the price: ensure it is a valid number strictly greater than 0
- Check the quantity: ensure it is a non-negative whole number (0 or higher)
- If any check fails, return an object indicating failure along with a clear error message explaining what was invalid
- If all checks pass, return an object indicating success
- Export the function

### Step 9: Add Product to Inventory
- Stay in `js/logic.js`
- Create an `addProduct` function that accepts the current inventory array and the new product details
- Search the inventory to check if a product with the same name already exists (compare names in lowercase and without surrounding whitespace)
- If a match is found (Duplicate / Restock):
  - Increase that existing product's quantity by the incoming quantity
  - Return the updated product and the inventory
- If no match is found (New Item):
  - Determine the next available ID by taking the highest existing ID and adding 1 (or 1 if the inventory is empty)
  - Build the new product object with the generated ID, trimmed name, category, price as a number, and quantity as a number
  - Add the new product to the inventory list
  - Return the newly created product and the updated inventory
- Export the function

---

## 🔄 Chunk 3: Stock Management & Guard Clauses

### Step 10 & 11: Find Product by ID with Safe Lookup
- Stay in `js/logic.js`
- Create a lookup function `findProductById` that takes the inventory array and a target ID
- Search the inventory list for a product whose ID matches the target ID (make sure to treat the ID as a number)
- If found, return that product object
- If not found, return null so callers know the item does not exist
- Export the function

### Step 12: Update Stock with Guard Clauses
- Stay in `js/logic.js`
- Create an `updateStock` function that accepts the inventory array, the product ID, and the change amount (a positive number to restock, or a negative number to sell)
- Look up the product using your find product by ID function
- Guard 1: If the product does not exist, return a failure response stating the product was not found
- Guard 2: If applying the change would cause the product's quantity to drop below 0, block the operation and return a failure response stating there is not enough stock
- If both checks pass:
  - Add the change amount to the product's quantity
  - Return a success response with the updated product
- Export the function

---

## 🔍 Chunk 4: Auditing & Filter Logic

### Step 13: Detect Out-of-Stock Products
- Stay in `js/logic.js`
- Create a function `getOutOfStock` that accepts the inventory array
- Filter the inventory to pick only the products where quantity is exactly 0
- Return the filtered list
- Export the function

### Step 14: Detect Low-Stock Products
- Stay in `js/logic.js`
- Create a function `getLowStock` that accepts the inventory array and an optional threshold number (defaulting to 5)
- Filter the inventory to pick products that have more than 0 quantity, but less than or equal to the threshold
- Return the filtered list
- Export the function

---

## 💰 Chunk 5: Financial Metrics & Valuation

### Step 15: Calculate Individual Product Value
- Stay in `js/logic.js`
- Create a function `getProductValue` that accepts a single product object
- Multiply its price by its quantity
- Return the resulting monetary value
- Export the function

### Step 16 & 17: Total Inventory Valuation & Formatting
- Stay in `js/logic.js`
- Create a formatter function `formatCurrency` that accepts a number and converts it to a standard currency format (e.g. adding dollar sign, commas, and two decimals)
- Create a function `calculateTotalValue` that accepts the inventory array
- Sum up the value of every product in the inventory by calculating each product's price times quantity and adding them together
- Return the final total number
- Export both functions

### Step 18: Build Inventory Summary Metrics
- Stay in `js/logic.js`
- Create a function `getInventorySummary` that accepts the inventory array
- Compute four key statistics:
  1. Total inventory valuation
  2. Total number of distinct products
  3. Count of low-stock items
  4. Count of out-of-stock items
- Package all four metrics into a single summary object and return it
- Export the function

---

## 🖥️ Chunk 6: UI Rendering & Event Wiring

### Step 19: Render Inventory Table
- Go to `js/ui.js`
- Import the product value calculator and currency formatter from `logic.js`
- Create a function `renderInventoryTable` that accepts an inventory array
- Locate the table body in the DOM
- For every product in the inventory list, construct a table row showing:
  - ID, name, category, formatted unit price, quantity, and total item value
  - A status badge indicating whether it is In Stock, Low Stock, or Out of Stock based on its quantity
  - Action buttons for quick addition (+) and subtraction (-) tagged with the product's ID
- Update the table body's content with all generated rows
- Export the function

### Step 20: Render KPI Summary Cards
- Stay in `js/ui.js`
- Import the summary function and currency formatter from `logic.js`
- Create a function `renderSummaryCards` that accepts the inventory array
- Calculate the summary statistics using your summary function
- Locate the four KPI card elements in the DOM (total value, total products, low stock count, out of stock count)
- Update the text inside each card with the corresponding metric
- Export the function

### Step 21: Handle "Add Product" Form
- Go to `js/app.js`
- Import state helpers from `state.js`, logic functions from `logic.js`, and UI functions from `ui.js`
- Listen for the submit event on the add-product form
- When submitted:
  - Prevent default browser page reload
  - Read user inputs from the form fields (name, category, price, quantity)
  - Validate the inputs using your validation function
  - If invalid, show an error alert with the failure message
  - If valid:
    - Add the product using your add product function
    - Save the updated inventory in state
    - Re-render the inventory table with the updated inventory
    - Re-render the summary cards
    - Clear the form inputs so it is ready for the next entry

### Step 22: Handle Quick Stock Adjustments & Filter Dropdown
- Stay in `js/app.js`
- Listen for click events on the table body to catch clicks on the + and - buttons
  - Identify which button was clicked and read its product ID
  - Call the stock update function with +1 or -1
  - If update succeeds: save state, re-render table, and re-render summary cards
  - If update fails (e.g. stock cannot go negative): show the error message to the user
- Listen for change events on the filter dropdown
  - If "All" is chosen, render the full inventory
  - If "Low Stock" is chosen, filter using the low-stock function and render the results
  - If "Out of Stock" is chosen, filter using the out-of-stock function and render the results

### Step 23: Boot the Application
- Stay in `js/app.js`
- Run the initial render functions on page load using the starter inventory from state
- Open `index.html` in the browser and test all user interactions end-to-end
