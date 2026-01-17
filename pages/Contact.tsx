import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16">
       <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">{t("contact.title")}</h1>
          <p className="text-gray-600 max-w-xl mx-auto">{t("contact.subtitle")}</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-secondary/10">
             <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <label className="block">
                      <span className="text-sm font-medium mb-1 block">{t("contact.name")}</span>
                      <input type="text" placeholder={t("contact.namePlaceholder")} className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary" />
                   </label>
                   <label className="block">
                      <span className="text-sm font-medium mb-1 block">{t("contact.email")}</span>
                      <input type="email" placeholder={t("contact.emailPlaceholder")} className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary" />
                   </label>
                </div>
                <label className="block">
                   <span className="text-sm font-medium mb-1 block">{t("contact.subject")}</span>
                   <input type="text" placeholder={t("contact.subjectPlaceholder")} className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary" />
                </label>
                <label className="block">
                   <span className="text-sm font-medium mb-1 block">{t("contact.message")}</span>
                   <textarea rows={5} placeholder={t("contact.messagePlaceholder")} className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary"></textarea>
                </label>
                <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition-colors">{t("contact.sendMessage")}</button>
             </form>
          </div>

          <div className="space-y-8">
             <div className="space-y-6">
                <div className="flex gap-4 items-start">
                   <div className="h-12 w-12 bg-accent/50 text-primary flex items-center justify-center rounded-lg flex-shrink-0">
                      <span className="material-symbols-outlined">location_on</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-lg">{t("contact.address")}</h3>
                      <p className="text-gray-600 whitespace-pre-line">{t("contact.addressValue")}</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start">
                   <div className="h-12 w-12 bg-accent/50 text-primary flex items-center justify-center rounded-lg flex-shrink-0">
                      <span className="material-symbols-outlined">call</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-lg">{t("contact.phone")}</h3>
                      <p className="text-gray-600">{t("contact.phoneValue")}</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start">
                   <div className="h-12 w-12 bg-accent/50 text-primary flex items-center justify-center rounded-lg flex-shrink-0">
                      <span className="material-symbols-outlined">email</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-lg">{t("contact.emailLabel")}</h3>
                      <p className="text-gray-600">{t("contact.emailValue")}</p>
                   </div>
                </div>
             </div>
             
             <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-sm border border-secondary/10 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-accent/20">
                    <span className="text-gray-500 font-medium">{t("contact.mapPlaceholder")}</span>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};