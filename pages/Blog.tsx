import React, { useEffect, useState } from "react";
import { contentService } from "../api/services/contentService";
import { BlogPost } from "../types";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext"; // Context اللغة

export const Blog = () => {
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    contentService.getBlogs().then(setPosts);
  }, []);

  // دالة لمساعدة اختيار النص حسب اللغة
  const getLocalized = (
    arField: string | undefined,
    enField: string | undefined,
  ) => {
    return language === "ar"
      ? arField || enField || ""
      : enField || arField || "";
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* العنوان والوصف */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          {t("blog.latestInsights")}
        </h1>
      </div>

      {/* قائمة المقالات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => {
          const postTitle = getLocalized(post.title_ar, post.title);
          const postExcerpt = getLocalized(post.excerpt_ar, post.excerpt);
          const dataDesc = getLocalized(post.data_ar, post.data);

          return (
            <Link
              to={`/blog/${post.id}`}
              key={post.id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-secondary/10 h-full flex flex-col"
            >
              {/* صورة المقال */}
              <div
                className="overflow-hidden rounded-xl mb-4"
                style={{ height: "200px" }}
              >
                <img
                  src={post.image}
                  alt={postTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* محتوى المقال */}
              <div className="p-6 flex flex-col flex-1">
                {/* عرض جزء من dataDesc */}
                <div className="text-xs font-bold text-primary mb-2">
                  {(() => {
                    const words = dataDesc.split(" ");
                    const count = Math.min(
                      words.length,
                      15 + Math.floor(Math.random() * 6),
                    );
                    return (
                      words.slice(0, count).join(" ") +
                      (words.length > count ? "..." : "")
                    );
                  })()}
                </div>

                {/* العنوان */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {postTitle}
                </h3>

                {/* الوصف */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 overflow-hidden">
                  {postExcerpt}
                </p>

                {/* زر قراءة المزيد */}
                <span className="mt-auto text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t("blog.readMore")}{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-2">
        <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">
          1
        </button>
        <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100">
          2
        </button>
        <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100">
          3
        </button>
        <span className="flex items-center">...</span>
        <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
};
