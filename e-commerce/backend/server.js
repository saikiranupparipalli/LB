// server.js
// Express server initialization, middleware setup, route mounting, and listener.

import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/productRoutes.js";
import { router as orderRouter } from "./routes/orderRoutes.js";
import  cors  from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use("/api/products", router);
app.use("/api/orders", orderRouter);
app.get("/api/health", (_, res) => {
  res.json({
    status: "ok",
    message: "E-commerce API is running",
  });
});
app.listen(PORT, () => {
  console.log(`server up on ${PORT}`);
});
