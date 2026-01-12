// Defines the contract for the API
// This mimics the structure you might get from an API schema generator

export const APIS = {
  PRODUCTS: {
    GET_ALL: {
      url: '/api/products',
      method: 'GET',
    },
    GET_ONE: {
      url: '/api/products/:id',
      method: 'GET',
    },
    GET_LATEST: {
      url: '/api/products/latest',
      method: 'GET',
    },
    GET_RELATED: {
      url: '/api/products/:id/related',
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
  CONTENT: {
    BLOGS: {
      url: '/api/content/blogs',
      method: 'GET',
    },
    FAQ: {
      url: '/api/content/faq',
      method: 'GET',
    },
  },
};