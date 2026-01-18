// Defines the contract for the API
// This mimics the structure you might get from an API schema generator

export const APIS = {
  PRODUCTS: {
    GET_ALL: {
      url: '/api/v1/products',
      method: 'GET',
    },
    GET_ONE: {
      url: '/api/v1/products/:id',
      method: 'GET',
    },
    GET_LATEST: {
      url: '/api/v1/products/latest',
      method: 'GET',
    },
    GET_RELATED: {
      url: '/api/v1/products/:id/related',
      method: 'GET',
    },
  },
  CART: {
    GET: {
      url: '/api/cart',
      method: 'GET',
    },
    ADD: {
      url: '/api/cart',
      method: 'POST',
    },
    UPDATE: {
      url: '/api/cart/:id',
      method: 'PUT',
    },
    REMOVE: {
      url: '/api/cart/:id',
      method: 'DELETE',
    },
  },
  ORDERS: {
    GET: {
      url: '/api/orders',
      method: 'GET',
    },
    GET_ONE: {
      url: '/api/orders/:id',
      method: 'GET',
    },
       CREATE: {
    url: '/api/front/orders',
    method: 'POST',
  },
  GET_ALL:{
    url: '/api/user/myorders',
    method: 'get',

  }

  },
  USER: {
    PROFILE: {
      url: '/api/user/profile',
      method: 'GET',
    },
    UPDATE_PROFILE: {
      url: '/api/user/profile',
      method: 'PUT',
    },
    LOGIN: {
      url: '/api/auth/login',
      method: 'POST',
    },
    REGISTER: {
      url: '/api/auth/register',
      method: 'POST',
    },
  },
 
    BLOGS: {
      url: '/api/front/articles',
      method: 'GET',
    },
    GET_ONE: {
      url: '/api/front/articles/:id',
      method: 'GET',
    },
    FAQ: {
      url: '/api/content/faq',
      method: 'GET',
    },
 
};