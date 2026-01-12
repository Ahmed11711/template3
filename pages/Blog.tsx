
import React, { useEffect, useState } from 'react';
import { contentService } from '../api/services/contentService';
import { BlogPost } from '../types';
import { Link } from 'react-router-dom';

export const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    contentService.getBlogs().then(setPosts);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
       <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Latest Insights</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Explore our latest articles, tips, and stories designed to inspire your lifestyle and elevate your style.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
             <Link to={`/blog/${post.id}`} key={post.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-secondary/10 h-full flex flex-col">
                <div className="aspect-video overflow-hidden">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                   <div className="text-xs font-bold text-primary mb-2">{post.category} • {post.date}</div>
                   <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                   <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                   <span className="mt-auto text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                   </span>
                </div>
             </Link>
          ))}
       </div>

       <div className="flex justify-center mt-12 gap-2">
           <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100"><span className="material-symbols-outlined">chevron_left</span></button>
           <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
           <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100">2</button>
           <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100">3</button>
           <span className="flex items-center">...</span>
           <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100"><span className="material-symbols-outlined">chevron_right</span></button>
       </div>
    </div>
  );
};
