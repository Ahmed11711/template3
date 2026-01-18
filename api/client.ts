// src/api/request.ts

export const APIS = {
  PRODUCTS: {
    GET_ALL: { url: '/api/front/products', method: 'GET' },
    GET_ONE: { url: '/api/front/products/:id', method: 'GET' },
    GET_LATEST: { url: '/api/v1/products/latest', method: 'GET' },
    GET_RELATED: { url: '/api/v1/products/:id/related', method: 'GET' },
  },
  CART: { /* ... */ },
  ORDERS: { /* ... */ },
  USER: { /* ... */ },
  CONTENT: { /* ... */ },
};

const USE_MOCK = false;
const BASE_URL = 'https://ecommerc.zayamrock.com';

function mockRequest<T>(
  endpoint: { url: string; method: string },
  body?: any,
  params?: Record<string, string>
): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({} as T), 300);
  });
}

export async function request<T>(
  endpoint: { url: string; method: string },
  body?: any,
  params?: Record<string, string>
): Promise<T> {
  if (USE_MOCK) return mockRequest<T>(endpoint, body, params);

  let url = BASE_URL + endpoint.url;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
  }

  const headers: HeadersInit = {};
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;

  // لو body مش FormData نعمله JSON و نضيف header
  let payload;
  if (body instanceof FormData) {
    payload = body;
  } else if (body) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  const response = await fetch(url, {
    method: endpoint.method,
    headers,
    body: payload,
    // ❌ امسح credentials: 'include'
  });

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    console.error('API Response is not JSON:', text);
    throw new Error('Expected JSON, got HTML or invalid JSON');
  }
}


