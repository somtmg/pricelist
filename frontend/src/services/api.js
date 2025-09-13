import axios from "axios";

const ENDPOINTS = {
  PRODUCTS: "/products",
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  maxRedirects: 5,
});

export const ProductService = {
  getProducts: async () => {
    try {
      const response = await api.get(ENDPOINTS.PRODUCTS);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch products: ${error.message} (Status: ${
          error.response?.status || "unknown"
        })`
      );
    }
  },

  createProduct: async (data) => {
    try {
      const response = await api.post(ENDPOINTS.PRODUCTS, data);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to create product: ${error.message} (Status: ${
          error.response?.status || "unknown"
        })`
      );
    }
  },

  updateProduct: async (id, data) => {
    try {
      const response = await api.put(`${ENDPOINTS.PRODUCTS}/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to update product: ${error.message} (Status: ${
          error.response?.status || "unknown"
        })`
      );
    }
  },
};
