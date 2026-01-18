// src/api/services/categoryService.ts
import axios from "axios";
import { Category } from "../../types";

// Base URL
const API_URL = "https://ecommerc.zayamrock.com/api/front"; // عدّل حسب الباك اند عندك

export const categoryService = {
  /**
   * Get all categories with their products
   */
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      return response.data; // بافتراض إن الباك اند بيرجع array من categories مع products
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      return [];
    }
  },
};
