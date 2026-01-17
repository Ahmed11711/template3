// src/api/services/productService.ts
import { request, APIS } from '../client';
import { Product } from '../../types';

interface ProductFilters {
  categories?: string[];
  maxPrice?: number;
  sort?: 'Newest' | 'Price: Low to High' | 'Price: High to Low';
  page?: number;
  limit?: number;
}

export const productService = {
  getAll: async (filters?: ProductFilters): Promise<Product[]> => {
    try {
      const params: Record<string, string> = {};

      if (filters?.categories) params['categories'] = filters.categories.join(',');
      if (filters?.maxPrice) params['maxPrice'] = filters.maxPrice.toString();
      if (filters?.sort) params['sort'] = filters.sort;
      if (filters?.page) params['page'] = filters.page.toString();
      if (filters?.limit) params['limit'] = filters.limit.toString();

      return await request<Product[]>(APIS.PRODUCTS.GET_ALL, undefined, params);
    } catch (error) {
      console.error('Failed to fetch all products:', error);
      return [];
    }
  },

  getOne: async (id: string | number): Promise<Product | null> => {
    try {
      return await request<Product>(APIS.PRODUCTS.GET_ONE, undefined, { id: id.toString() });
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      return null;
    }
  },

  getLatest: async (): Promise<Product[]> => {
    try {
      return await request<Product[]>(APIS.PRODUCTS.GET_LATEST);
    } catch (error) {
      console.error('Failed to fetch latest products:', error);
      return [];
    }
  },

  getRelated: async (id: string | number): Promise<Product[]> => {
    try {
      return await request<Product[]>(APIS.PRODUCTS.GET_RELATED, undefined, { id: id.toString() });
    } catch (error) {
      console.error(`Failed to fetch related products for ${id}:`, error);
      return [];
    }
  },
};
