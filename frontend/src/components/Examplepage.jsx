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

  // Split images into two rows for a more dynamic look
  const row1 = allImages.slice(0, Math.ceil(allImages.length / 2));
  const row2 = allImages.slice(Math.ceil(allImages.length / 2));

  // Double the rows for seamless looping
  const fullRow1 = [...row1, ...row1];
  const fullRow2 = [...row2, ...row2];

  const TemplateCard = ({ template }) => (
    <div
      className="relative group w-[220px] h-[310px] md:w-[260px] md:h-[370px] rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer flex-shrink-0 mx-4"
      onClick={() => handleTemplateClick(template)}
    >
      <div className="w-full h-full overflow-hidden relative">
        <motion.img
          src={template.src}
          alt={`Template ${template.id}`}
          className="w-full object-cover absolute top-0 left-0"
          initial={{ top: 0 }}
          whileHover={{
            top: "-100%",
            transition: {
              duration: 4,
              ease: "linear"
            }
          }}
          style={{ top: 0, minHeight: '100%' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
        <span className="bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
          Quick Preview
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center py-6 bg-transparent overflow-hidden">

      {/* Row 1: Left to Right */}
      <div className="w-full relative py-4 mask-fade-custom">
        <div className="animate-marquee">
          {fullRow1.map((template, idx) => (
            <TemplateCard key={`${template.id}-r1-${idx}`} template={template} />
          ))}
        </div>
      </div>

      {/* Row 2: Right to Left */}
      <div className="w-full relative py-4 mask-fade-custom">
        <div className="animate-marquee-reverse">
          {fullRow2.map((template, idx) => (
            <TemplateCard key={`${template.id}-r2-${idx}`} template={template} />
          ))}
        </div>
      </div>

      {/* Gradient Fades for the sides */}
      <style>{`
        .mask-fade-custom {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>

      {/* Modal/Overlay for Selected Template */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview Image Side */}
              <div className="w-full md:w-[55%] h-[400px] md:h-auto bg-slate-100 dark:bg-slate-950 overflow-y-auto p-6 custom-scrollbar">
                <img
                  src={selectedTemplate.src}
                  alt={`Template ${selectedTemplate.id} Full Preview`}
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
              </div>

              {/* Action Side */}
              <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
                <div className="mb-8">
                  <div className="inline-block px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-bold mb-4 uppercase tracking-wider">
                    Premium Layout
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Template <span className="text-teal-500">#{selectedTemplate.id}</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      "ATS Optimized Architecture",
                      "Modern Professional Design",
                      "Fully Customizable Sections",
                      "Instant AI Content Analysis"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                        <div className="w-5 h-5 rounded-full bg-teal-500/10 flex items-center justify-center">
                          <Check size={14} className="text-teal-500" />
                        </div>
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full mt-auto">
                  <button
                    onClick={handleUseTemplate}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl shadow-teal-500/20 transition-all transform hover:-translate-y-1 active:translate-y-0"
                  >
                    Use This Template
                  </button>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="w-full py-4 px-8 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Browse Others
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