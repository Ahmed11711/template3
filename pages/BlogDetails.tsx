import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { contentService } from "../api/services/contentService";
import { BlogPost } from "../types";
import { useLanguage } from "../context/LanguageContext";

export const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
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

  if (loading)
    return <div className="p-20 text-center">{t("common.loading")}</div>;
  if (error)
    return <div className="p-20 text-center text-red-600">{error}</div>;
  if (!post)
    return <div className="p-20 text-center">{t("blog.notFound")}</div>;

  // دالة اختيار النص حسب اللغة
  const getLocalized = (
    arField: string | undefined,
    enField: string | undefined,
  ) => {
    return language === "ar"
      ? arField || enField || ""
      : enField || arField || "";
  };

  const postTitle = getLocalized(post.title_ar, post.title);
  const postExcerpt = getLocalized(post.excerpt_ar, post.excerpt);
  const postData = getLocalized(post.date_ar, post.date);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* العنوان */}
      <h1
        className={`text-4xl md:text-5xl font-black text-dark mb-6 leading-tight ${language === "ar" ? "text-right" : "text-left"}`}
      >
        {postTitle}
      </h1>

      {/* الصورة */}
      <div className="aspect-video rounded-xl overflow-hidden mb-6 shadow-lg">
        <img
          src={post.image}
          alt={postTitle}
          className="w-full h-full object-cover"
        />
      </div>

      {/* التاريخ / ملخص */}
      <p
        className={`text-gray-700 text-lg mb-8 ${language === "ar" ? "text-right" : "text-left"}`}
      >
        {postData}
      </p>

      {/* باقي المقال */}
      <article
        className={`prose prose-lg max-w-none text-gray-700 ${language === "ar" ? "prose-rtl" : ""}`}
      >
        <p>{postExcerpt}</p>
        {/* إذا عندك محتوى HTML كامل للمقال من الباك اند ممكن تحطه هنا */}
      </article>

      {/* أزرار المشاركة */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold mb-6">{t("blog.shareArticle")}</h3>
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
          className={`text-sm text-gray-500 hover:text-primary flex items-center gap-1 ${language === "ar" ? "justify-end" : "justify-start"}`}
        >
          <span className="material-symbols-outlined text-sm">
            {language === "ar" ? "arrow_forward" : "arrow_back"}
          </span>
          {t("blog.backToBlog")}
        </Link>
      </div>
    </div>
  );
};
