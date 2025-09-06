import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// 1. GET /products - return all products
app.get("/products", async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    if (category) {
      const products = await prisma.product.findMany({
        where: { category: String(category) },
      });
      return res.json(products);
    }

    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// 2. GET /products/:id - return product by ID
app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// 3. GET /products?category=Apparel - filters products by category
app.get("/products", async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const products = category
      ? await prisma.product.findMany({
          where: { category: String(category) },
        })
      : await prisma.product.findMany();

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
