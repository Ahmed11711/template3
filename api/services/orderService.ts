import { request } from '../client';
import { APIS } from '../apis';
import { Order } from '../../types';
export const orderService = {
  createOrder: (data: object, imageFile?: File) => {
    const formData = new FormData();

    // حوّل كل البيانات النصية ل JSON string
    formData.append('data', JSON.stringify(data));

    // أضف الصورة الحقيقية
    if (imageFile) {
      formData.append('image', imageFile); // اسم الحقل 'image' لازم يتوافق مع السيرفر
    }

    return request<Order>(APIS.ORDERS.CREATE, formData);
  },
};
