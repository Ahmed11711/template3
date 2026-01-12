import { request } from '../client';
import { APIS } from '../apis';
import { BlogPost } from '../../types';

export const contentService = {
  getBlogs: () => request<BlogPost[]>(APIS.CONTENT.BLOGS),
  getFAQ: () => request<{question: string, answer: string}[]>(APIS.CONTENT.FAQ),
};