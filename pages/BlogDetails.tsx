
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { contentService } from '../api/services/contentService';
import { BlogPost } from '../types';

export const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    contentService.getBlogs().then(posts => {
      const found = posts.find(p => p.id === id);
      setPost(found || null);
    });
  }, [id]);

  if (!post) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link to="/blog" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1 mb-4">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Insights
        </Link>
        <div className="text-sm font-bold text-primary mb-2 tracking-wide uppercase">{post.category}</div>
        <h1 className="text-4xl md:text-5xl font-black text-dark mb-4 leading-tight">{post.title}</h1>
        <div className="text-gray-500 flex items-center gap-4 text-sm">
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-gray-400"></span>
          <span>5 min read</span>
        </div>
      </div>

      <div className="aspect-video rounded-xl overflow-hidden mb-10 shadow-lg">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <article className="prose prose-lg max-w-none text-gray-700">
        <p className="lead text-xl text-gray-600 font-medium mb-8">{post.excerpt}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h3 className="text-2xl font-bold text-dark mt-8 mb-4">Why it matters</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <blockquote className="border-l-4 border-primary pl-4 italic text-xl my-8 text-dark">
          "Fashion is the armor to survive the reality of everyday life."
        </blockquote>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      </article>

      <div className="mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold mb-6">Share this article</h3>
        <div className="flex gap-4">
          <button className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">FB</button>
          <button className="h-10 w-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-200 transition-colors">TW</button>
          <button className="h-10 w-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors">IG</button>
        </div>
      </div>
    </div>
  );
};
