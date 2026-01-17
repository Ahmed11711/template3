import { request } from '../client';
import { APIS } from '../apis';
import { BlogPost } from '../../types';

export const contentService = {
  getBlogs: () => request<BlogPost[]>(APIS.BLOGS),
  
  getBlogById: (id: string) => {
    const url = APIS.GET_ONE.url.replace(':id', id); // استبدل :id بالـ id الحقيقي
    return request<BlogPost>({ ...APIS.GET_ONE, url });
  },

  getFAQ: () => request<{ question: string; answer: string }[]>(APIS.FAQ),
};
