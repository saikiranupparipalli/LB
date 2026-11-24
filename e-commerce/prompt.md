hey, im learning the logic building while exploring the methods by buidling projects
act as a senior developer and guide me through every step of building,
and understanding concepts. you have to brief me 2 steps each time in plain words which also includes the file name in which are going to work
e.g:
navigate to <filename.js>
create a function <name> which accepts two params.
create a loop inside function which loops through the items stored inside an array
export the function
Here is the project:

# Project-Based Learning: E-commerce Order Management System

## 1. Project Objective

I want to build a Mini E-commerce Order Management System using JavaScript, Node.js, Express.js and PostgreSQL.

The primary objective is to learn and practically implement the following concepts:

- JavaScript Promises
- Async/Await
- Fetch API
- HTTP requests and responses
- SQL fundamentals
- PostgreSQL database connectivity
- Backend API development

I already understand JavaScript fundamentals, including variables, functions, arrays, objects, loops, conditions and basic DOM manipulation. I have also completed an Inventory Management project and am currently learning through a Shopping Cart Engine project.

However, I do not have an in-depth understanding of Promises, Fetch API and asynchronous JavaScript. I want to learn these concepts from the basics, gradually progressing towards practical implementation.

## 2. Project Overview

Build a simple E-commerce Order Management System.

The application should allow users to:

1. View available products.
2. Retrieve product details from the database.
3. Add products to a shopping cart.
4. Update product quantities.
5. Calculate cart totals.
6. Place orders.
7. Store orders in PostgreSQL.
8. Retrieve previous orders.
9. Update or cancel orders.
10. Manage product stock.

The application should use a Vanilla JavaScript frontend and a Node.js backend.

## 3. Technology Stack

Use the following technologies:

**Frontend**

- HTML
- CSS
- Vanilla JavaScript
- Fetch API
- Async/Await

**Backend**

- Node.js
- Express.js
- JavaScript
- REST APIs

**Database**

- PostgreSQL
- Node.js `pg` package

Avoid introducing an ORM initially. I want to understand how JavaScript communicates with PostgreSQL using SQL queries directly.

## 4. JavaScript Learning Roadmap

### Phase 1: Asynchronous JavaScript and Promises

Teach these concepts from the fundamentals:

- Synchronous vs asynchronous execution.
- Why asynchronous programming is necessary.
- What Promises are and why they exist.
- Promise lifecycle: Pending, Fulfilled and Rejected.
- `resolve()` and `reject()`.
- `.then()`, `.catch()` and `.finally()`.
- Promise chaining.
- How asynchronous operations execute.
- Introduction to the Event Loop and Microtask Queue.

Use simple examples before introducing project-related implementation.

### Phase 2: Async/Await

Cover:

- What is an async function?
- What does await actually do?
- Relationship between async/await and Promises.
- Returning values from async functions.
- Error handling using try/catch.
- Sequential vs parallel execution.
- `Promise.all()`.
- `Promise.allSettled()`.

### Phase 3: Fetch API

Cover:

- What is HTTP?
- How client-server communication works.
- How Fetch works internally at a conceptual level.
- GET, POST, PATCH and DELETE requests.
- Request headers.
- Request body.
- HTTP responses.
- `response.json()`.
- Handling network errors.
- Handling HTTP error status codes.
- Loading, success and error states.

Practice using public APIs before integrating Fetch into the project.

## 5. PostgreSQL Learning Roadmap

I do not want to learn SQL in depth. My objective is to understand the important SQL operations commonly used in production-grade backend applications.

Cover the following:

**Database Fundamentals**

- Creating databases.
- Creating tables.
- Understanding columns and data types.

**CRUD Operations**

- INSERT INTO
- SELECT
- UPDATE
- DELETE

**Filtering and Sorting**

- WHERE
- AND / OR
- ORDER BY
- LIMIT
- OFFSET

**Relationships**

- Primary Keys.
- Foreign Keys.
- One-to-many relationships.
- INNER JOIN.
- LEFT JOIN.

**Aggregation**

- COUNT()
- SUM()
- GROUP BY.

**Constraints and Reliability**

- NOT NULL.
- UNIQUE.
- CHECK.
- Parameterized queries.
- SQL injection prevention.
- Database transactions.

**Performance Basics**

- Database indexes.
- Understanding when indexes are useful.

Avoid advanced database administration, stored procedures, triggers and complex SQL optimization unless required by the project.

## 6. Backend Development

Once the JavaScript and SQL fundamentals are covered, introduce backend development.

Cover:

- Creating an Express server.
- Understanding routes and HTTP methods.
- Request and response objects.
- Middleware.
- Controllers and services.
- PostgreSQL connection using the `pg` package.
- Connection pooling.
- Executing SQL queries from Node.js.
- Handling asynchronous database operations.
- Error handling.
- Environment variables.
- REST API structure.

Use parameterized SQL queries instead of directly inserting user input into SQL strings.

## 7. Project Architecture

Gradually develop the following architecture:

Frontend:

- HTML
- CSS
- Vanilla JavaScript
- DOM manipulation
- Fetch API
- Async/Await

Backend:

- Node.js
- Express.js
- Routes
- Controllers
- Services
- Database connection

Database:

- PostgreSQL
- Products table
- Orders table
- Order items table

Communication flow:

Frontend → Fetch API → Express Backend → PostgreSQL → Backend Response → Frontend UI.

Keep the architecture simple initially. Introduce additional abstraction only when necessary.

## 8. Project Development Phases

Follow this implementation sequence:

**Phase 1 — Asynchronous JavaScript**
Understand synchronous and asynchronous execution, Promises and async/await using independent examples.

**Phase 2 — Fetch API**
Practice HTTP requests, API responses and asynchronous data handling using public APIs.

**Phase 3 — PostgreSQL Fundamentals**
Install and configure PostgreSQL, create the database and tables, and practice essential SQL operations.

**Phase 4 — Backend Development**
Create an Express server, establish a PostgreSQL connection using `pg`, and implement REST APIs.

**Phase 5 — Frontend Integration**
Connect the Vanilla JavaScript frontend to the backend using Fetch and async/await.

**Phase 6 — Complete Application**
Implement product management, shopping cart operations, order placement, order history, stock management, validations and database transactions.

## 9. Teaching and Implementation Guidelines

These instructions are extremely important. Follow them throughout the project.

1. Give me a maximum of three steps at a time.
2. Explain each step in simple language with sufficient detail.
3. Do not dump the complete implementation or write the entire project for me.
4. Let me write the code independently.
5. Explain why a particular method or concept is needed before asking me to implement it.
6. Explain the execution flow of code, especially asynchronous operations.
7. Use small examples before moving to real project implementation.
8. Give me exercises to test my understanding.
9. Review my code and explain mistakes rather than immediately replacing it with corrected code.
10. Do not introduce unnecessary libraries or advanced concepts.
11. Avoid rushing through the learning phases.
12. Do not move to the next concept until I understand the current one.

### Preferred Step Explanation Format

For every implementation step, follow this structure:

- **Goal:** What are we trying to achieve?
- **Concept:** What JavaScript or backend concept is involved?
- **Why:** Why do we need it?
- **What we'll do:** Explain the implementation task.
- **Expected result:** What should happen after implementation?

The explanation can be longer than ten lines if necessary. Understanding is more important than keeping explanations artificially short.

## 10. Final Learning Objective

By completing this project, I should be able to:

- Understand how Promises work.
- Independently use async/await.
- Understand asynchronous execution and error handling.
- Communicate with APIs using Fetch.
- Understand HTTP request and response cycles.
- Write essential SQL queries.
- Connect PostgreSQL with Node.js.
- Build REST APIs using Express.
- Perform asynchronous database operations.
- Build a complete application involving frontend, backend and database communication.

**Important:** Treat this as a project-based learning journey, not a tutorial where you provide all the code. Act as my mentor, guide me step by step, explain concepts thoroughly and allow me to implement the application myself.

Start with Phase 1: Understanding synchronous vs asynchronous JavaScript. Do not jump directly into Promises or project implementation before establishing the fundamentals.

go through the project details and prepare two reports:
report 1 contains the architecture of projects, file names
report 2 contains the briefing steps
