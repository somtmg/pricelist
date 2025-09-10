import Product from "../models/productModel.js";

const getAllProducts = async (request, reply) => {
  try {
    const products = await Product.findAll();
    return reply.code(200).send(products);
  } catch (error) {
    return reply.code(500).send({ error: "internal Server error" });
  }
};

const createProduct = async (request, reply) => {
  try {
    const product = await Product.create(request.body);
    return reply.code(200).send(product);
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

export { getAllProducts, createProduct };
