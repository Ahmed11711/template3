import React from 'react';

export const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16">
       <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-xl mx-auto">We'd love to hear from you. Fill out the form below or use our contact details to reach us.</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-secondary/10">
             <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <label className="block">
                      <span className="text-sm font-medium mb-1 block">Full Name</span>
                      <input type="text" placeholder="John Doe" className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary" />
                   </label>
                   <label className="block">
                      <span className="text-sm font-medium mb-1 block">Email Address</span>
                      <input type="email" placeholder="you@example.com" className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary" />
                   </label>
                </div>
                <label className="block">
                   <span className="text-sm font-medium mb-1 block">Subject</span>
                   <input type="text" placeholder="How can we help?" className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary" />
                </label>
                <label className="block">
                   <span className="text-sm font-medium mb-1 block">Message</span>
                   <textarea rows={5} placeholder="Write your message here..." className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary"></textarea>
                </label>
                <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition-colors">Send Message</button>
             </form>
          </div>

          <div className="space-y-8">
             <div className="space-y-6">
                <div className="flex gap-4 items-start">
                   <div className="h-12 w-12 bg-accent/50 text-primary flex items-center justify-center rounded-lg flex-shrink-0">
                      <span className="material-symbols-outlined">location_on</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-lg">Address</h3>
                      <p className="text-gray-600">123 Elegant Avenue, Suite 456<br/>Fashion City, 78910</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start">
                   <div className="h-12 w-12 bg-accent/50 text-primary flex items-center justify-center rounded-lg flex-shrink-0">
                      <span className="material-symbols-outlined">call</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-lg">Phone</h3>
                      <p className="text-gray-600">(123) 456-7890</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start">
                   <div className="h-12 w-12 bg-accent/50 text-primary flex items-center justify-center rounded-lg flex-shrink-0">
                      <span className="material-symbols-outlined">email</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-lg">Email</h3>
                      <p className="text-gray-600">support@elegantstore.com</p>
                   </div>
                </div>
             </div>
             
             <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-sm border border-secondary/10 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-accent/20">
                    <span className="text-gray-500 font-medium">Map Placeholder</span>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};