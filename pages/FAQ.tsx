import React, { useEffect, useState } from 'react';
import { contentService } from '../api/services/contentService';

export const FAQ = () => {
  const [items, setItems] = useState<{question:string, answer:string}[]>([]);

  useEffect(() => {
    contentService.getFAQ().then(setItems);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
       <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4">How can we help?</h1>
          <p className="text-gray-600">Find answers to your questions below.</p>
       </div>

       <div className="relative mb-12">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
          <input type="text" placeholder="Search for answers..." className="w-full h-14 pl-12 rounded-xl border-none shadow-sm bg-white focus:ring-2 focus:ring-primary" />
       </div>

       <div className="flex justify-center flex-wrap gap-3 mb-8">
          {['Shipping & Delivery', 'Returns', 'Ordering', 'Account'].map((tag, i) => (
             <button key={tag} className={`px-5 py-2 rounded-lg text-sm font-medium ${i === 0 ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-accent'}`}>
                {tag}
             </button>
          ))}
       </div>

       <div className="space-y-4">
          {items.map((item, idx) => (
             <details key={idx} className="group bg-white border border-secondary/20 rounded-xl p-4 cursor-pointer open:bg-accent/20 transition-colors" open={idx === 0}>
                <summary className="font-bold flex justify-between items-center list-none text-dark">
                   {item.question}
                   <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed text-sm">{item.answer}</p>
             </details>
          ))}
       </div>
       
       <div className="mt-12 bg-white rounded-xl p-8 text-center shadow-sm border border-secondary/10">
          <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
          <p className="text-gray-600 mb-6">Our support team is here to assist you.</p>
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary flex items-center justify-center gap-2 mx-auto">
             <span className="material-symbols-outlined">support_agent</span> Contact Us
          </button>
       </div>
    </div>
  );
};