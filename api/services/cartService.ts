import { request } from '../client';
import { APIS } from '../apis';
import { CartItem } from '../../types';

export const cartService = {
  getCart: () => request<CartItem[]>(APIS.CART.GET),
  addItem: (productId: string, quantity: number) => request(APIS.CART.ADD, { productId, quantity }),
  removeItem: (id: string) => request(APIS.CART.REMOVE, undefined, { id }),
};