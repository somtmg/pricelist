import {
  getAllProducts,
  createProduct,
} from "../controllers/productController.js";

const productSchema = {
  body: {
    type: "object",
    required: [
      "article_no",
      "product_name",
      "in_price",
      "price",
      "unit",
      "in_stock",
    ],
    properties: {
      article_no: { type: "string" },
      product_name: { type: "string" },
      in_price: { type: "number" },
      price: { type: "number" },
      unit: { type: "string" },
      in_stock: { type: "integer" },
      description: { type: "string" },
    },
  },
};

const productRoutes = async (fastify) => {
  fastify.get("/products", getAllProducts);

  fastify.post("/products", { schema: productSchema }, createProduct);
};

export default productRoutes;
