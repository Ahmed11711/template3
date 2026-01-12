import React from 'react';

export const About = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="relative h-[480px] flex items-center justify-center text-center px-4">
         <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `linear-gradient(rgba(26, 16, 34, 0.4), rgba(26, 16, 34, 0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9mKwwBvo_70UCY3DWD4n7MkjjTaPC0ge0nzmAG39Ht8fuZ-N0nsYZLMQqByrHVawAhNTlFILPXpeEKx6ZXNEt1s-PHq2FuTelPUxJwAWvzd990G3GKMKpPg4dS4M4y0iyYWI3GhjEa2fg1HladukAE-IwMULUZoLKHTNkTKuiqhh22EQV00ijCPOHV2be1VLjqx9FhaRnxexavrCFSuxyCNH7DfDbpqfJfEl2DayIDpRo6hLJmpWvdUpI2GgDiJXYTmam6GVADyY')`}}></div>
         <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Crafting Quality, Inspired by You.</h1>
            <p className="text-white/90 text-lg">Welcome to our brand. Discover the story, passion, and craftsmanship behind every product we create.</p>
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
               <h2 className="text-3xl font-bold mb-6">Our Story</h2>
               <p className="text-gray-600 leading-relaxed mb-6">Our journey began with a simple idea: to create beautiful, high-quality products that bring joy to everyday life. From a small workshop to a beloved brand, our passion for craftsmanship has been the driving force behind everything we do.</p>
               <p className="text-gray-600 leading-relaxed">We believe in thoughtful design, ethical sourcing, and building a community around our shared values of quality, integrity, and beauty.</p>
            </div>
         </div>
      </section>

      {/* Mission/Vision */}
      <section className="container mx-auto px-4">
         <div className="bg-accent/30 rounded-xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border-t-2 border-primary/50 pt-6">
               <h3 className="text-xl font-bold text-primary mb-2">Our Mission</h3>
               <p className="text-gray-700">To craft exceptional products with integrity, passion, and a commitment to sustainability that inspire moments of joy.</p>
            </div>
            <div className="border-t-2 border-primary/50 pt-6">
               <h3 className="text-xl font-bold text-primary mb-2">Our Vision</h3>
               <p className="text-gray-700">To become a globally recognized leader in thoughtful design and inspire a more beautiful and conscious world.</p>
            </div>
         </div>
      </section>
      
      {/* Commitment */}
      <section className="container mx-auto px-4 text-center">
         <h2 className="text-3xl font-bold mb-12">Our Commitment to You</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-xl shadow-lg border border-secondary/10 hover:-translate-y-2 transition-transform">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                   <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
                <p className="text-sm text-gray-500">Meticulous craftsmanship in every detail.</p>
             </div>
             <div className="bg-white p-8 rounded-xl shadow-lg border border-secondary/10 hover:-translate-y-2 transition-transform">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                   <span className="material-symbols-outlined text-3xl">eco</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Ethical Sourcing</h3>
                <p className="text-sm text-gray-500">Values of fairness and sustainability.</p>
             </div>
             <div className="bg-white p-8 rounded-xl shadow-lg border border-secondary/10 hover:-translate-y-2 transition-transform">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                   <span className="material-symbols-outlined text-3xl">support_agent</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Exceptional Service</h3>
                <p className="text-sm text-gray-500">Your satisfaction is our priority.</p>
             </div>
         </div>
      </section>
    </div>
  );
};