import { APIS } from './apis';
import { MOCK_PRODUCTS, MOCK_USER, MOCK_CART, MOCK_BLOGS, MOCK_FAQ, MOCK_ORDERS } from './fakeData';
import { APIResponse } from '../types';

// ============================================
// CONFIGURATION SWITCH
// ============================================
const USE_MOCK = true;
const MOCK_DELAY = 300; // ms to simulate latency

// Generic Request Handler
export async function request<T>(endpoint: { url: string; method: string }, body?: any, params?: Record<string, string>): Promise<T> {
  if (USE_MOCK) {
    return mockRequest<T>(endpoint, body, params);
  } else {
    // Real Fetch Implementation
    // Replace URL params
    let url = endpoint.url;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`:${key}`, value);
      });
    }
    
    const response = await fetch(url, {
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization headers here if needed
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }
}

// Mock Request Router
function mockRequest<T>(endpoint: { url: string; method: string }, body?: any, params?: Record<string, string>): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let data: any;

      // Simple Router for Mocks
      if (endpoint === APIS.PRODUCTS.GET_ALL) {
        data = MOCK_PRODUCTS;
      } else if (endpoint === APIS.PRODUCTS.GET_LATEST) {
        data = MOCK_PRODUCTS.slice(5); // Last few
      } else if (endpoint === APIS.PRODUCTS.GET_ONE) {
         data = MOCK_PRODUCTS.find(p => p.id === params?.id) || MOCK_PRODUCTS[0];
      } else if (endpoint === APIS.PRODUCTS.GET_RELATED) {
         data = MOCK_PRODUCTS.slice(0, 4);
      } else if (endpoint === APIS.USER.PROFILE || endpoint === APIS.USER.LOGIN || endpoint === APIS.USER.REGISTER) {
        data = MOCK_USER;
      } else if (endpoint === APIS.CART.GET) {
        data = MOCK_CART;
      } else if (endpoint === APIS.CONTENT.BLOGS) {
        data = MOCK_BLOGS;
      } else if (endpoint === APIS.CONTENT.FAQ) {
        data = MOCK_FAQ;
      } else if (endpoint === APIS.ORDERS.GET) {
        data = MOCK_ORDERS;
      } else {
        // Default fallthrough or specific POST/PUT mocks
        if (endpoint.method !== 'GET') {
          resolve({ success: true, message: 'Operation successful (Mock)' } as any);
          return;
        }
        data = [];
      }

      resolve(data as T);
    }, MOCK_DELAY);
  });
}