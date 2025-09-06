import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.create({
    data: {
      name: "T-Shirt",
      price: 25,
      category: "Apparel",
      inStock: true,
      image: "https://example.com/tshirt.jpg",
      variants: {
        create: [{ name: "S" }, { name: "M" }, { name: "L" }],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Jeans",
      price: 50,
      category: "Apparel",
      inStock: true,
      image: "https://example.com/jeans.jpg",
      variants: {
        create: [{ name: "32" }, { name: "34" }, { name: "36" }],
      },
    },
  });

  console.log("✅ Seed data inserted!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
