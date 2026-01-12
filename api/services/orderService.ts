import { request } from '../client';
import { APIS } from '../apis';
import { Order } from '../../types';

export const orderService = {
  getOrders: () => request<Order[]>(APIS.ORDERS.GET),
  getOrder: (id: string) => request<Order>(APIS.ORDERS.GET_ONE, undefined, { id }),
};