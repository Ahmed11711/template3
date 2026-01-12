import { request } from '../client';
import { APIS } from '../apis';
import { Product } from '../../types';

export const productService = {
  getAll: () => request<Product[]>(APIS.PRODUCTS.GET_ALL),
  getLatest: () => request<Product[]>(APIS.PRODUCTS.GET_LATEST),
  getOne: (id: string) => request<Product>(APIS.PRODUCTS.GET_ONE, undefined, { id }),
  getRelated: (id: string) => request<Product[]>(APIS.PRODUCTS.GET_RELATED, undefined, { id }),
};