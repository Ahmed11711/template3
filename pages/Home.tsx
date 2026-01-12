import React, { useEffect, useState } from 'react';
import { productService } from '../api/services/productService';
import { contentService } from '../api/services/contentService';
import { Product, BlogPost } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    productService.getLatest().then(setProducts);
    contentService.getBlogs().then(data => setPosts(data.slice(0, 3))); // Limit to 3 on home
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-start p-8 md:p-16">
        <div className="absolute inset-0 z-0">
             <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `linear-gradient(75deg, rgba(243, 232, 255, 0.95) 0%, rgba(155, 77, 255, 0.2) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_L8HZ17-J9oir-0zhVy7gt8pNpLDQ4Ri4frHNFeVg64sOW3dyejOPdLX6um0Snf9Zh9fD8vOZajAM3nkeUbcwVdg5J3jAGzUf5WXOWIL844I1mKw0pqp5qV4nA4ivWJeRfZcBqYAJ3Bcj2kIHT23YdSdS_d9zt3hq6vfBrJf_LpaORnMpukfAI5R6zGD0zcERj4XgeKgkOjklxkXrb55S2G9NeIMhh1caXyrbV3PW0aPfgN5BgytiI13VW-gdXEDnBjLyTQkbles')`}}></div>
        </div>
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight tracking-tighter mb-4">Elevate Your Style</h1>
          <p className="text-lg text-dark/80 mb-8">Discover our new collection of modern and elegant products. Up to 30% off this week.</p>
          <Link to="/shop" className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-primary rounded-lg shadow-lg hover:bg-secondary transition-all hover:scale-105">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-dark mb-10">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Women\'s Fashion', filter: 'Fashion' }, 
            { name: 'Men\'s Fashion', filter: 'Fashion' }, 
            { name: 'Electronics', filter: 'Electronics' }, 
            { name: 'Home Goods', filter: 'Home Decor' }
          ].map((cat, idx) => (
             <Link to={`/shop?category=${cat.filter}`} key={idx} className="group relative aspect-[3/4] overflow-hidden rounded-xl shadow-md cursor-pointer block">
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div> 
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img src={`https://picsum.photos/400/600?random=${idx + 10}`} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                <span className="absolute bottom-4 left-4 text-white font-bold text-lg z-20">{cat.name}</span>
             </Link>
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-dark mb-10">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
           <Link to="/shop" className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-colors">View All Products</Link>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-surface-dim py-16">
         <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
               <h2 className="text-3xl font-bold text-dark">From the Blog</h2>
               <Link to="/blog" className="text-primary font-bold hover:underline hidden sm:block">Read All Articles</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {posts.map(post => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-secondary/10 flex flex-col">
                     <div className="aspect-video overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <div className="p-6 flex flex-col flex-1">
                        <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">{post.category}</div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                        <span className="mt-auto text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                           Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </span>
                     </div>
                  </Link>
               ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
               <Link to="/blog" className="text-primary font-bold hover:underline">Read All Articles</Link>
            </div>
         </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-accent/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-dark mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: 'local_shipping', title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: 'verified', title: 'Quality Guarantee', desc: '30-day money back' },
              { icon: 'support_agent', title: '24/7 Support', desc: 'Here for you always' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                 <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                 </div>
                 <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                 <p className="text-dark/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};