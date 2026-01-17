import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="relative h-[480px] flex items-center justify-center text-center px-4">
         <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `linear-gradient(rgba(26, 16, 34, 0.4), rgba(26, 16, 34, 0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9mKwwBvo_70UCY3DWD4n7MkjjTaPC0ge0nzmAG39Ht8fuZ-N0nsYZLMQqByrHVawAhNTlFILPXpeEKx6ZXNEt1s-PHq2FuTelPUxJwAWvzd990G3GKMKpPg4dS4M4y0iyYWI3GhjEa2fg1HladukAE-IwMULUZoLKHTNkTKuiqhh22EQV00ijCPOHV2be1VLjqx9FhaRnxexavrCFSuxyCNH7DfDbpqfJfEl2DayIDpRo6hLJmpWvdUpI2GgDiJXYTmam6GVADyY')`}}></div>
         <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t("about.heroTitle")}</h1>
            <p className="text-white/90 text-lg">{t("about.heroSubtitle")}</p>
         </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4">
         <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
               <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTwD1_-WXdKMWQfz1ff1Ipg5ICcNAsrvdacwb7Md1ZFnGn1YzJNQNrYmSzKflh6J936s990sNTfpV454iCN36wSdw--zqC5GnoKy86rTMnwsfUnt-XKYszdeC-XiQvo4aHXFcX8wkncpYPZXaLSi0WiurB4zXdOtczZxOU512EalY9CrwOdLhdggtqADnW6gh9BiIct-be5W5cgTY1z32loPKhBgQF8t-VuJGusrAvj4JRdszI9FEQhI7WrSDlxEXvi4Uv7A2K_74" alt="Workshop" className="w-full h-full object-cover" />
               </div>
            </div>
            <div className="md:w-1/2">
               <h2 className="text-3xl font-bold mb-6">{t("about.ourStory")}</h2>
               <p className="text-gray-600 leading-relaxed mb-6">{t("about.storyText1")}</p>
               <p className="text-gray-600 leading-relaxed">{t("about.storyText2")}</p>
            </div>
         </div>
      </section>

      {/* Mission/Vision */}
      <section className="container mx-auto px-4">
         <div className="bg-accent/30 rounded-xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border-t-2 border-primary/50 pt-6">
               <h3 className="text-xl font-bold text-primary mb-2">{t("about.ourMission")}</h3>
               <p className="text-gray-700">{t("about.missionText")}</p>
            </div>
            <div className="border-t-2 border-primary/50 pt-6">
               <h3 className="text-xl font-bold text-primary mb-2">{t("about.ourVision")}</h3>
               <p className="text-gray-700">{t("about.visionText")}</p>
            </div>
         </div>
      </section>
      
      {/* Commitment */}
      <section className="container mx-auto px-4 text-center">
         <h2 className="text-3xl font-bold mb-12">{t("about.commitmentTitle")}</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-xl shadow-lg border border-secondary/10 hover:-translate-y-2 transition-transform">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                   <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{t("about.premiumQuality")}</h3>
                <p className="text-sm text-gray-500">{t("about.premiumQualityDesc")}</p>
             </div>
             <div className="bg-white p-8 rounded-xl shadow-lg border border-secondary/10 hover:-translate-y-2 transition-transform">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                   <span className="material-symbols-outlined text-3xl">eco</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{t("about.ethicalSourcing")}</h3>
                <p className="text-sm text-gray-500">{t("about.ethicalSourcingDesc")}</p>
             </div>
             <div className="bg-white p-8 rounded-xl shadow-lg border border-secondary/10 hover:-translate-y-2 transition-transform">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                   <span className="material-symbols-outlined text-3xl">support_agent</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{t("about.exceptionalService")}</h3>
                <p className="text-sm text-gray-500">{t("about.exceptionalServiceDesc")}</p>
             </div>
         </div>
      </section>
    </div>
  );
};