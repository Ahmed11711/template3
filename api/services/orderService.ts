// src/api/services/orderService.ts
import { request } from '../client';
import { APIS } from '../apis';
import { Order } from '../../types';

export const orderService = {
  // انشاء طلب
  createOrder: (data: object, imageFile?: File) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return request<Order>(APIS.ORDERS.CREATE, formData);
  },

  // جلب كل الطلبات للمستخدم
  getOrders: () => {
    return request<Order[]>(APIS.ORDERS.GET_ALL); // مفترض يكون عندك endpoint اسمه GET_ALL
  }
};
