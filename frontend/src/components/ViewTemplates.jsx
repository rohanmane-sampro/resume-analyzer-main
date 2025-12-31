import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '../AuthContext';
import Navbar from './Navbar.jsx';

export default function ViewTemplates() {
  const navigate = useNavigate();
  const { user } = useAuth();
  // const titles=["","Simpler & Structured","Linear & Classic","Colourful & Attractive","Colourful & Highly Designed","Simpler & Linear","Highly Simpler & Classic"]
  const titles = ["",
    "Default Classic",
    "Simpler & Structured",
    "Linear & Classic",
    "Colourful & Attractive",
    "Colourful & Highly Designed",
    "Simpler & Linear",
    "Highly Simpler & Classic",
    "Elegant Modern Touch",
    "Creative Blocks",
    "Minimalist Professional",
    "Tech-Focused Resume",
    "Bold & Visual Design",
    "Professional Developer",
    "Clean Professional",
    "Minimalist Clean",
    "Photo Profile",
    "Dark Sidebar Professional",
    "Modern CV",
    "Professional Clean",
    "Creative Designer",
    "UX/UI Designer",
    "Cloud Engineer",
    "Product Manager Pro",
    "Supervisor Professional",
    "Finance Professional",
    "Master Student",
    "AEM Developer Pro",
    "Product Manager Classic",
    "Compositing Artist",
    "Marketing Assistant",
    "Full-Stack Developer",
    "ModernCV - Fresher",
    "RPI Graduate CV - Fresher",
    "Deedy Resume - Fresher",
    "HowToTeX Minimal - Fresher"
  ];

  const items = [
    {
      img: `${import.meta.env.BASE_URL}Temp/cv1.png`,
      title: titles[1],
      codeLink: "https://github.com/PrashantPKP/cv-templates/blob/main/cv1.html",
      templateLink: `${import.meta.env.BASE_URL}my-templates/cv1.html`,
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv2.png`,
      title: titles[2],
      codeLink: "https://github.com/PrashantPKP/cv-templates/blob/main/cv2.html",
      templateLink: `${import.meta.env.BASE_URL}my-templates/cv2.html`,
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv3.png`,
      title: titles[3],
      codeLink: "https://github.com/PrashantPKP/cv-templates/blob/main/cv3.html",
      templateLink: `${import.meta.env.BASE_URL}my-templates/cv3.html`,
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv4.png`,
      title: titles[4],
      codeLink: "https://github.com/PrashantPKP/cv-templates/blob/main/cv4.html",
      templateLink: `${import.meta.env.BASE_URL}my-templates/cv4.html`,
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv5.png`,
      title: titles[5],
      codeLink: "https://github.com/PrashantPKP/cv-templates/blob/main/cv5.html",
      templateLink: `${import.meta.env.BASE_URL}my-templates/cv5.html`,
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv6.png`,
      title: titles[6],
      codeLink: "https://github.com/PrashantPKP/cv-templates/blob/main/cv6.html",
      templateLink: `${import.meta.env.BASE_URL}my-templates/cv6.html`,
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv7.png`,
      title: titles[7],
      codeLink: "https://github.com/PrashantPKP/cv-templates/blob/main/cv7.html",
      templateLink: `${import.meta.env.BASE_URL}my-templates/cv7.html`,
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv8.png`,
      title: titles[8],
      codeLink: "https://github.com/PrashantPKP/cv-templates/blob/main/cv8.html",
      templateLink: `${import.meta.env.BASE_URL}my-templates/cv8.html`,
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv9.png`,
      title: titles[9],
      codeLink: "https://github.com/PrashantPKP/cv-templates/blob/main/cv9.html",
      templateLink: `${import.meta.env.BASE_URL}my-templates/cv9.html`,
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv10.png`,
      title: titles[10],
      codeLink: "https://github.com/PrashantPKP/cv-templates/blob/main/cv10.html",
      templateLink: `${import.meta.env.BASE_URL}my-templates/cv10.html`,
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv11.png`,
      title: titles[11],
      codeLink: "https://github.com/PrashantPKP/cv-templates/blob/main/cv11.html",
      templateLink: `${import.meta.env.BASE_URL}my-templates/cv11.html`,
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv12.png`,
      title: titles[12],
      codeLink: "https://github.com/PrashantPKP/cv-templates/blob/main/cv12.html",
      templateLink: `${import.meta.env.BASE_URL}my-templates/cv12.html`,
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv13.png`,
      title: titles[13],
      codeLink: "#/template/13",
      templateLink: "#/template/13",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv15.png`,
      title: titles[14],
      codeLink: "#/template/14",
      templateLink: "#/template/14",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv16.png`,
      title: titles[15],
      codeLink: "#/template/15",
      templateLink: "#/template/15",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv17.png`,
      title: titles[16],
      codeLink: "#/template/16",
      templateLink: "#/template/16",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv18.png`,
      title: titles[17],
      codeLink: "#/template/17",
      templateLink: "#/template/17",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv19.png`,
      title: titles[18],
      codeLink: "#/template/18",
      templateLink: "#/template/18",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv20.png`,
      title: titles[19],
      codeLink: "#/template/19",
      templateLink: "#/template/19",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv21.png`,
      title: titles[20],
      codeLink: "#/template/20",
      templateLink: "#/template/20",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv22.png`,
      title: titles[21],
      codeLink: "#/template/21",
      templateLink: "#/template/21",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv23.png`,
      title: titles[22],
      codeLink: "#/template/22",
      templateLink: "#/template/22",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv24.png`,
      title: titles[23],
      codeLink: "#/template/23",
      templateLink: "#/template/23",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv25.png`,
      title: titles[24],
      codeLink: "#/template/24",
      templateLink: "#/template/24",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv26.png`,
      title: titles[25],
      codeLink: "#/template/25",
      templateLink: "#/template/25",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv27.png`,
      title: titles[26],
      codeLink: "#/template/26",
      templateLink: "#/template/26",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv28.png`,
      title: titles[27],
      codeLink: "#/template/27",
      templateLink: "#/template/27",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv29.png`,
      title: titles[28],
      codeLink: "#/template/28",
      templateLink: "#/template/28",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv30.png`,
      title: titles[29],
      codeLink: "#/template/29",
      templateLink: "#/template/29",
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv30.png`,
      title: titles[30],
      codeLink: "#/template/30",
      templateLink: "#/template/30",
    },
  ];

  const handleTemplateClick = (templateIndex) => {
    // Navigate to FileUploadPage with the selected template
    navigate('/FileUploadPage', {
      state: {
        selectedTemplate: templateIndex + 1
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900 p-4">
      {/* Navbar */}
      <Navbar />

      <h3 className="mt-4 mb-2 text-3xl text-gray-600 dark:text-slate-200 font-bold">Generated Templates</h3>
      <h5 className="mb-4 text-sm md:text-base font-semibold text-gray-500 dark:text-gray-400">Note: Consider to View Templates only on desktop mode</h5>
      <div className="w-[200px] h-1 bg-blue-700 mb-16 mx-auto mt-1 rounded dark:bg-blue-500"></div>

      {/* Change grid-cols-1 to grid-cols-2 for mobile */}
      <div className="grid grid-cols-2 gap-14 sm:grid-cols-2 md:grid-cols-2 max-w-5xl mx-auto place-items-center">
        {items.map((item, index) => {
          const isGuest = user?.type === 'guest';
          const isLocked = isGuest && index >= 2;

          return (
            <div
              key={index}
              onClick={() => {
                if (isLocked) {
                  alert("Payment required to access this premium template.");
                  return;
                }
                handleTemplateClick(index);
              }}
              className={`group relative mb-6 bg-white dark:bg-slate-700 hover:shadow-2xl hover:scale-105 transition-transform duration-[250ms] border-2 dark:shadow-[0_-4px_10px_rgba(0,0,0,0.1)] border-gray-300 dark:border-gray-700 dark:shadow-gray-800 dark:hover:shadow-gray-600/50 rounded-lg overflow-hidden w-40 sm:w-44 md:w-48 lg:w-64 xl:w-72 flex flex-col items-center cursor-pointer ${isLocked ? 'opacity-75' : ''}`}
            >
              {/* Adjust image size */}
              <img src={item.img} alt={item.title} className="w-full h-auto object-cover dark:opacity-80 dark:brightness-80 dark:contrast-90" />

              {isLocked && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10">
                  <Lock className="text-white mb-2" size={32} />
                  <span className="text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full">Premium</span>
                </div>
              )}

              {!isLocked && (
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 dark:bg-slate-700 p-4 rounded-md opacity-0 group-hover:opacity-100 transition-transform flex justify-center items-center">
                  <button
                    className="text-white text-sm md:text-base bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Use This Template
                  </button>
                </div>
              )}
              <div className="font-semibold text-gray-600 dark:text-gray-200 text-xs pb-2 pt-1 md:text-base"> {item.title} </div>
            </div>
          );
        })}
      </div>
    </div>

  );
}
