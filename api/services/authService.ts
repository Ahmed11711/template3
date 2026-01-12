import { request } from '../client';
import { APIS } from '../apis';
import { User } from '../../types';

export const authService = {
  login: (credentials: any) => request<User>(APIS.USER.LOGIN, credentials),
  getProfile: () => request<User>(APIS.USER.PROFILE),
  updateProfile: (data: Partial<User>) => request<User>(APIS.USER.UPDATE_PROFILE, data),
};