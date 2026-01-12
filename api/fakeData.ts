import { Product, User, CartItem, BlogPost, Order } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hydrating Serum',
    price: 24.99,
    rating: 4.5,
    reviews: 128,
    category: 'Skincare',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjva-PCCeBB_aaFixQUTsP76that2QxEaspvlYxSIpBN0NYxdun6qer7ZXjkL6E7NTSw3VlP_AqFW8sa7AHgaT8b_aGOmCiaLCNz_M7JHDlO5gp-82xmA1WsykuIbF9OBfPhhRDmPNDKHr60tbIdAVSTDR1PGHbYIVhOAEZGtZLiTT_7o2kyY7jE-VK9BVP13vvJ86EbKYNqI_YwvQ5QeO0pbC1ks8hvOlL33II3a-3dHjKoNaeAvQZuSpk1M36EpRpBr6JmQSPxA',
  },
  {
    id: '2',
    name: 'Exfoliating Scrub',
    price: 18.50,
    rating: 5,
    reviews: 210,
    category: 'Skincare',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9zF5Jw3MCMTSb1OMcXch_TB92cYDLhpGIBFCBJiLE0SPD4HmkpsO0QFSlmCPGOjZZtM6bM7aFLQDDBsKpvpVMBvCSkJMzCyKkbrQrbsk6X9qU8mfe90zQVk4N8kSD4_ZjePAXMX0nh845DcWE0opDonfbyZGC5wfMRb07xRiFBBSoCzVVv5DebYu3pgKJwPtenvQNMztuMpLTA3lwxZrtzvRkEydEIOqo2qygSKWuDvQV0Tasvru-VF8HX0bppR4vypR29MQMj0Y',
  },
  {
    id: '3',
    name: 'Matte Lipstick Set',
    price: 45.00,
    rating: 4.5,
    reviews: 98,
    category: 'Makeup',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfN1i4_PXTehYV6BD4MS7JwiZZopcndxHugaVTLSAC_kM0J9lrJL43g11zWBSFtbzHMj6QdBgaMXgn1999FtKGvDFmIchUSI9L8KqK5eA_6ueNvifjRd3D69anIBk0yz1xSWqPSMvdu4efPqRmxf5mndDOygRoSbz8iPWbRHIgAlEJu1CXjlz60D9UDAFLX47o1p-wYeswoqk-oJfw22b6mPkYJahD-geCS9ylQ0eH3l-QnTyNtG4pVnXAaFWUbdFlOt4O5Jw8myI',
  },
  {
    id: '4',
    name: 'Nourishing Hair Oil',
    price: 32.00,
    rating: 4.5,
    reviews: 155,
    category: 'Haircare',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUhJS67hQsRX5RETtidzO5QH_3JBvm7ewkP47FDg1uZvHvv5oZmJGM-JbvtU0JkVcjUK6pNVH4qtJhu1K6WGocNfuRl0IRGBb1ppS9WoUnHPWcxOCzNeFAYXJZZlOKYrhUhdETf5n0a31GqUMKqkDb_j6oojoN3YG4c1AxGDVm-EK2yOWLru6ywSdp-piYW7Yxfm7vugZUcKoHMhxlI_Srp2a1kz08a_LCtDSkhzYt9uzm5976-AzebHzEWkKgQR7f9-LEodCCzGs',
  },
  {
    id: '5',
    name: 'The Velvet Dream Dress',
    price: 149.99,
    rating: 4.8,
    reviews: 42,
    category: 'Fashion',
    description: 'Indulge in the luxurious feel of our Velvet Dream Dress. Crafted from the finest materials, this piece is designed to make a statement.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABTcMgIqOLd3BWIRA___7Yjp5k1NXwDW0QOVlc_GCv9DgWMlgr-rlOUldgmSv_lROioPB3-4v1RBfy1ozmtEwDh9sXhQCe-6VtbaikS1OjL0QDDqUuFmDezfUgSf4mgSRiaBnpogDJp55ZemPSqXF2jtLX_stOEsUHAClyCRz3prkKA_tFjvSqMEcV4oIFLSeqDrYY6RXwofBMe2tgEG3wbXH8rPwj3Fp7f4JOSkGBSTGqFCGr9LBwtIWAaTS3bD6qVtjmG_lMHtU',
  },
  {
    id: '6',
    name: 'Chronos Watch',
    price: 199.99,
    rating: 5,
    reviews: 12,
    category: 'Accessories',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDib3XDN-i53uhu05WffRCfH5WpyQUAXjLjXEPrsX1sRXXyoIALEiM9WKnUohPcQA7ONMxuq0YD0jmMc6-s0kWod77OeojFLglt3xLyPiglEq2T2MyUEpkDi5DVN8O7JJW1tKEDUJvYBuqcG_K3CZdxRqw4GfSaJ4HFWlURoCy7-tcQjhVHStIXmT-pwYtFF-FC1T7F4s1oIsRa9FQVnYE7QOSs4XfwwwMbq42MBBILALzT2B9IWOxl2s96EJhrnEQocAHOVvpLmJo',
  },
  {
    id: '7',
    name: 'Aura Handbag',
    price: 120.00,
    rating: 4.2,
    reviews: 30,
    category: 'Accessories',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTWAtDOZKp5XFjqiFmDFL_JLBZWu7pKM9i-EMg7Zl6zmt1byIkwoUZGzpPxJlgdI6jjvgf4qFS2PyNmMmDxlejTzkWkiewlfcAd_eN5fxny1IVXooqmLvxbpgRgCXZi9ppv0PUMOQNeKUDNng0GQjcHotCe5bpVX_3wsEJT8ZdcbcFlFSzsi0a396UdmJvocjla6qzclc6ZabbG088Of1JTqYx2Elvoy1GO-R3KokRZImZdznlrlHNLdGrcAH50rzfzxCHmiBCAco',
  },
  {
    id: '8',
    name: 'Sonic Headphones',
    price: 250.00,
    rating: 4.9,
    reviews: 500,
    category: 'Electronics',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrR_8zHHGjXkILJUvMuNIvVCM_10fTMr-9S2WGGo5G0WP8Pez4PL_nxsRUTo1y0T1cCelrBw5ccHeRFFVI3OiW8GaazHN8WTmQRyTjMkBvPbncok7RP8gNEmmQlo3OrfzZk_EgzMByHNtnIOns2JT1NkhAaZLuTrorFLudi3IdXej2zPci3AgDrtNka0MA1Js7HTQJChW0e3r33JiwcEg9TWFbaLm3YhIgdf0fPrZdze4MTRYpDwjTAnRlVYYn3T6jSDmC4mgYAxo',
  },
];

export const MOCK_USER: User = {
  id: 'u1',
  firstName: 'Elara',
  lastName: 'Vance',
  email: 'elara.v@email.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApEOrAoWQ_cMo61taraENWuFKTd1WLXHSij9h7Sa1sJfDj-yny-xNXccYSdykCQywUGWSuijxrFE3UancUnVQunxXv6e65MNc6_1g2JEf7B2IAqyRgWzM2H4OdNvZw1GPKWQouqBaC_tBm_SshMuFoKJ9xfGJS5suYx2_yy0w3sH7ySOfLy3VcYHeRvkNe7_EcrB9Jss4Ccw39cAus9an5_PWpvVC3GFHYjpeeIiAfm50Ev4ETJoY_hvv_MkykZNO_XX7P1i3SGrw',
  address: {
    street: '123 Blossom Lane',
    city: 'Aethelgard',
    state: 'Emberfall',
    zip: '98765',
    country: 'Valoria',
  },
};

export const MOCK_CART: CartItem[] = [
  {
    id: 'c1',
    name: 'Classic Silk Blouse',
    price: 110.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ11eQ4P-IodB48YNgP6J6rUKc1ZdR1ZKKNX_tENwoT7wuKe0-QOHv8bw0luLQWA6YwhqfVxOBcIJubm1eHQz7MYSPSOdOdCSp2I_YVQcv444JmZW19RUQ5codlHUghSjIJp7K26yiCxds1wfyVqMqZtAFmvbqu2aL8YjHo3kK_wWuCPMwJJDXo4vRlgGTS_9TcDrIRhp4UoEqGBPFoKzKnkdNE48BdNi9KAvU6m6nWVwMV4zsPw5kv0RpREr4088lQJO9NOtrX8w',
    quantity: 1,
    size: 'M',
    color: 'Ivory',
    category: 'Fashion',
    rating: 4.5,
    reviews: 10
  },
  {
    id: 'c2',
    name: 'Tailored Wool Trousers',
    price: 185.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCNwrXn3gxWetTrEooMyE0vFBzqyrDUB-gMkT-BmSA3PUxehEAQisLAIiitiC9ElEXi8GXHFEYw6QM4oWCbVxwiv7bkUDAKVNhsgZfCNQgTK11vv5H06a9YtNUpTufo74rD6pfNtfkBY8IR_6Ise6XWLbIkzdI6ufnNvsXIP8nVC7VfYadknOhehFPZzzBTENlRzrOb7-H6Do60VTjOvRkH7P_MoXC8DCxU8zNHpwYMRJWP5yjzBm8dYHE9QN4Ylm4W2bA0tPc7Ug',
    quantity: 1,
    size: '8',
    color: 'Charcoal',
    category: 'Fashion',
    rating: 4.8,
    reviews: 12
  },
  {
    id: 'c3',
    name: 'Leather Ankle Boots',
    price: 250.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOv7CMXqYLNbzVox4VxS19n5qoKjJT7kva7L8DLotkZ8yU0CDojtYa-QNFWdQDNSJ_KLldtLSQ0esZ4uJSPQPTzgw7Nc_tSJ_KJqEK0iAQrxkjNdnCG0_YFrtROZRuLlleZCbMIAdz6BhcshYZIh570Tf-J3eobUnIy7guCmzILgjcqhvm9jS3DwUF5v-HI_m7jATc49b1gCAeYNSAopYsNpXkLxlHvaBBYy1n5U8vwzYHn7M7dmeBHfioww5D4z5Azgvmsu_dWTY',
    quantity: 1,
    size: '9',
    color: 'Black',
    category: 'Footwear',
    rating: 4.7,
    reviews: 8
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Art of Accessorizing: A 2024 Guide',
    excerpt: 'Discover how to elevate your style with the perfect accessories. From timeless classics to bold statement pieces.',
    category: 'FASHION',
    date: 'OCT 24, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3KGPctiNWmZKOUC0YI-rTh0LkcbYhiUL4uGk_SH-ls58ucI_XtZ0q-La7CItElrLsaYeYt1R5Gub5UaQYSoFopxo8JgszpALbcSkTOQt0iR36lxp0CZmIX-p7iW0cOpb8OT6tuDKwHLspHZ3Jn0hrll2qULNs7qfDRJh4O8id4jM2dS8_KCKTatySF7_pmDARD_HsKujsXYt-cacmEASslAU07hW3ph1jUmT9pkbuIoMeyLUhpvAhrz2cNdrRBXjGqoHXDBkA9C4'
  },
  {
    id: 'b2',
    title: 'Unboxing The Future: Our Top Gadget Picks',
    excerpt: 'We\'ve tested the latest gadgets so you don\'t have to. Here are the devices that will change your life this year.',
    category: 'TECHNOLOGY',
    date: 'OCT 22, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFGwvrnm3mChMF6dHdIO_RqtBTVb9sB7_V5yOWmb4nxa-iY4xIO17MeRSZ8hnziJbDedOPE-LTLpSBKkM_EJ2ioK0HHfTnL067dR5xW1swflNBvvag7wm3o6AXqXyGGCHI4Op0AvHvLPL9ke9oOK2rprhAGz3YjZQWJweFnaD9JBrMYkMVffpbA9qTftmYSKlheTDXXk5odmE7D1QPWO1Vwnz3oDyuN8GAmfqF4ViWWxkJvrXKAO0VZ49Rf9Z49AKCcQnJAPrTrvM'
  },
  {
    id: 'b3',
    title: 'Creating a Minimalist Sanctuary at Home',
    excerpt: 'Learn the principles of minimalist design and turn your home into a peaceful, clutter-free haven of tranquility.',
    category: 'HOME DECOR',
    date: 'OCT 19, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuTeX79G0TEYbgUEKQyYlPx6XXEYiw4pgIYH6kKXsJb-pcekuoDwZHersxyfY6AaUqIPsL8cxK8_kzXqsqir95iFIivM-FApiCal9DSl4ff-IhdrVtmN8EFfub7mRaeqMZOf_l3c6485_HXUJ1f-2tVe_Vark-DXKKXil3dG21B0-ubM2uotbilshhLhatXxFMEQjD1kTY6xVrObn9mm3Uenepw8qt3KvYBl0OeqnselfqlWApb8o9WpT6SJbA2PcdAwCohqFL38Q'
  }
];

export const MOCK_FAQ = [
  { question: "What are the available shipping options?", answer: "We offer standard, expedited, and next-day shipping." },
  { question: "How do I track my order?", answer: "You will receive an email with a tracking number once shipped." },
  { question: "How long will it take to get my package?", answer: "Standard shipping takes 5-7 business days." },
  { question: "Do you ship internationally?", answer: "Yes, we ship to most countries worldwide." }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'EL-89231',
    date: 'Oct 24, 2024',
    total: 250.00,
    status: 'Processing',
    items: [MOCK_CART[2]]
  },
  {
    id: 'EL-88120',
    date: 'Sep 15, 2024',
    total: 149.99,
    status: 'Delivered',
    items: [
        {
            id: '5',
            name: 'The Velvet Dream Dress',
            price: 149.99,
            rating: 4.8,
            reviews: 42,
            category: 'Fashion',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABTcMgIqOLd3BWIRA___7Yjp5k1NXwDW0QOVlc_GCv9DgWMlgr-rlOUldgmSv_lROioPB3-4v1RBfy1ozmtEwDh9sXhQCe-6VtbaikS1OjL0QDDqUuFmDezfUgSf4mgSRiaBnpogDJp55ZemPSqXF2jtLX_stOEsUHAClyCRz3prkKA_tFjvSqMEcV4oIFLSeqDrYY6RXwofBMe2tgEG3wbXH8rPwj3Fp7f4JOSkGBSTGqFCGr9LBwtIWAaTS3bD6qVtjmG_lMHtU',
            quantity: 1
        }
    ]
  }
];