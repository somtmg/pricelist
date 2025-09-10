import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  maxRedirects: 5,
});

export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch products");
  }
};

export const createProduct = async (data) => {
  try {
    const response = await api.post("/products", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create product");
  }
};
