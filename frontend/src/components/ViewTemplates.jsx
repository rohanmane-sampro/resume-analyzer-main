import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from './Navbar.jsx';

export default function ViewTemplates() {
  const navigate = useNavigate();
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
    "Bold & Visual Design"
  ];

  const items = [
    {
      img: `${import.meta.env.BASE_URL}Temp/cv1.png`,
      title: titles[1],
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv2.png`,
      title: titles[2],
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv3.png`,
      title: titles[3],
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv4.png`,
      title: titles[4],
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv5.png`,
      title: titles[5],
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv6.png`,
      title: titles[6],
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv7.png`,
      title: titles[7],
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv8.png`,
      title: titles[8],
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv9.png`,
      title: titles[9],
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv10.png`,
      title: titles[10],
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv11.png`,
      title: titles[11],
    },
    {
      img: `${import.meta.env.BASE_URL}Temp/cv12.png`,
      title: titles[12],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900 p-4">
      {/* Navbar */}
      <Navbar />

      <h3 className="mt-4 mb-2 text-3xl text-gray-600 dark:text-slate-200 font-bold">Template Gallery</h3>
      <h5 className="mb-4 text-sm md:text-base font-semibold text-gray-500 dark:text-gray-400">Select a template to preview</h5>
      <div className="w-[200px] h-1 bg-blue-700 mb-16 mx-auto mt-1 rounded dark:bg-blue-500"></div>

      <div className="grid grid-cols-2 gap-14 sm:grid-cols-2 md:grid-cols-2 max-w-5xl mx-auto place-items-center">
        {items.map((item, index) => (
          <div key={index} className="group relative mb-6 bg-white dark:bg-slate-700 hover:shadow-2xl hover:scale-105 transition-transform duration-[250ms] border-2 dark:shadow-[0_-4px_10px_rgba(0,0,0,0.1)] border-gray-300 dark:border-gray-700 dark:shadow-gray-800 dark:hover:shadow-gray-600/50 rounded-lg overflow-hidden w-40 sm:w-44 md:w-48 lg:w-64 xl:w-72 flex flex-col items-center">
            <img src={item.img} alt={item.title} className="w-full h-auto object-cover dark:opacity-80 dark:brightness-80 dark:contrast-90" />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 dark:bg-slate-700 p-4 rounded-md opacity-0 group-hover:opacity-100 transition-transform flex justify-center items-center gap-2">
              <button
                onClick={() => navigate('/FileUploadPage')}
                className="text-white text-sm md:text-base bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Use Template
              </button>
            </div>
            <div className="font-semibold text-gray-600 dark:text-gray-200 text-xs pb-2 pt-1 md:text-base"> {item.title} </div>
          </div>
        ))}
      </div>
    </div>
  );
}