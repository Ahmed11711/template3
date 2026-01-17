import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { contentService } from "../api/services/contentService";
import { BlogPost } from "../types";

export const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    contentService
      .getBlogById(id)
      .then(setPost)
      .catch((err) => setError(err.message || "Failed to load article"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (error)
    return <div className="p-20 text-center text-red-600">{error}</div>;
  if (!post) return <div className="p-20 text-center">Article not found.</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* العنوان */}
      <h1 className="text-4xl md:text-5xl font-black text-dark mb-6 leading-tight">
        {post.title}
      </h1>

      {/* الصورة */}
      <div className="aspect-video rounded-xl overflow-hidden mb-6 shadow-lg">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* الوصف الحقيقي من الباك اند */}
      <p className="text-gray-700 text-lg mb-8">{post.date}</p>

      {/* باقي المقال */}
      <article className="prose prose-lg max-w-none text-gray-700">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <h3 className="text-2xl font-bold text-dark mt-8 mb-4">
          Why it matters
        </h3>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur...
        </p>
        <blockquote className="border-l-4 border-primary pl-4 italic text-xl my-8 text-dark">
          "Fashion is the armor to survive the reality of everyday life."
        </blockquote>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium...
        </p>
      </article>

      {/* أزرار المشاركة */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold mb-6">Share this article</h3>
        <div className="flex gap-4">
          <button className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
            FB
          </button>
          <button className="h-10 w-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-200 transition-colors">
            TW
          </button>
          <button className="h-10 w-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors">
            IG
          </button>
        </div>
      </div>

      {/* رابط العودة للمدونة */}
      <div className="mt-8">
        <Link
          to="/blog"
          className="text-sm text-gray-500 hover:text-primary flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Insights
        </Link>
      </div>
    </div>
  );
};
