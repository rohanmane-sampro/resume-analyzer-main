import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL || '/';

// Generate list of all available template images with IDs
const allImages = [
  'cv1.png', 'cv2.png', 'cv3.png', 'cv4.png', 'cv5.png',
  'cv6.png', 'cv7.png', 'cv8.png', 'cv9.png', 'cv10.png',
  'cv11.png', 'cv12.png', 'cv13.png',
  'cv15.png', 'cv16.png', 'cv17.png', 'cv18.png', 'cv19.png', 'cv20.png',
  'cv21.png', 'cv22.png', 'cv23.png', 'cv24.png', 'cv25.png', 'cv26.png', 'cv27.png'
].map(name => ({
  id: name.replace('cv', '').replace('.png', ''),
  src: `${BASE_URL}Temp/${name}`
}));

const Examplepage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      navigate('/FileUploadPage', { state: { selectedTemplate: selectedTemplate.id } });
    }
  };

  // Duplicate images for seamless looping
  // We use a single large row for a clean, museum-like gallery feel
  const galleryImages = [...allImages, ...allImages];

  const TemplateCard = ({ template }) => (
    <div
      className="relative group w-[280px] h-[400px] md:w-[320px] md:h-[450px] rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer flex-shrink-0 mx-6 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 z-0 hover:z-10"
      onClick={() => handleTemplateClick(template)}
    >
      <div className="w-full h-full overflow-hidden relative bg-slate-100 dark:bg-slate-900">
        {/* Image with slow scroll on hover */}
        <motion.img
          src={template.src}
          alt={`Template ${template.id}`}
          className="w-full object-cover absolute top-0 left-0"
          initial={{ top: 0 }}
          whileHover={{
            top: "-100%", // Scroll to bottom
            transition: {
              duration: 8, // Slower, smoother scroll
              ease: "linear"
            }
          }}
          style={{ top: 0, minHeight: '100%' }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* CTA Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100">
          <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full font-semibold tracking-wide hover:bg-white hover:text-slate-900 transition-colors shadow-2xl flex items-center gap-2">
            <Check size={18} /> Use Template
          </button>
        </div>

        {/* Template Label */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="text-white text-center">
            <p className="font-bold text-lg">Template {template.id}</p>
            <p className="text-xs text-slate-300 uppercase tracking-widest mt-1">Professional Series</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center py-10 overflow-hidden">

      {/* Modern Infinite Scroll Container */}
      <div className="w-full relative group/track">

        {/* The scrolling track */}
        <div className="flex animate-marquee-infinite hover:pause-animation will-change-transform">
          {galleryImages.map((template, idx) => (
            <TemplateCard key={`${template.id}-${idx}`} template={template} />
          ))}
        </div>

        {/* Left/Right Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
      </div>

      <style>{`
        @keyframes marquee-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        .animate-marquee-infinite {
          animation: marquee-infinite 60s linear infinite;
          width: max-content;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
        /* Fix for dark mode bg match */
        .dark .bg-gradient-to-r.from-slate-50 {
            --tw-gradient-from: #0f172a; /* slate-900 */
        }
      `}</style>

      {/* Modal/Overlay for Selected Template */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row border border-slate-200 dark:border-slate-700"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 p-8 flex items-center justify-center overflow-hidden relative">
                <img
                  src={selectedTemplate.src}
                  alt={`Template ${selectedTemplate.id}`}
                  className="w-full h-auto max-h-[70vh] object-contain shadow-lg rounded-lg"
                />
              </div>

              <div className="w-full md:w-96 p-8 flex flex-col justify-between bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Template {selectedTemplate.id}
                  </h3>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase">ATS Friendly</span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase">Premium</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    This professionally designed template features a clean layout optimized for applicant tracking systems. Perfect for senior roles and creative professionals alike.
                  </p>

                  <div className="space-y-3">
                    {['Clean & Modern Layout', 'Optimized for ATS Parsing', 'Easy to Read Typography', 'Professional Section Headers'].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                          <Check size={12} />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="flex-1 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUseTemplate}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] transition-all"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default Examplepage;