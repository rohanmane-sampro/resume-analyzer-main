

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UploadCloud, Rocket, PenTool, X, Check, Loader2, FileText } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { parseResume } from './ResumeParser';

const FileUploadPage = () => {
  const [docUploaded, setDocUploaded] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [showParsingAnimation, setShowParsingAnimation] = useState(false);
  const [parsingProgress, setParsingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTemplate = location.state?.selectedTemplate;

  // Cleanup file preview URL on unmount
  useEffect(() => {
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [filePreviewUrl]);

  const parsingSteps = [
    { id: 1, label: "Parsing Resume", duration: 1500 },
    { id: 2, label: "Analyzing Content", duration: 1500 },
    { id: 3, label: "Optimizing Keywords", duration: 1000 },
    { id: 4, label: "Generating Insights", duration: 1000 }
  ];

  const handleDocUpload = async (event) => {
    const file = event.target.files[0];
    if (file && (file.type.includes("pdf") || file.type.includes("word") || file.name.endsWith('.docx'))) {
      setDocUploaded(false);
      setShowModal(false);
      setShowParsingAnimation(true);

      // Store the file and create preview URL for PDF
      setUploadedFile(file);
      if (file.type === 'application/pdf') {
        const url = URL.createObjectURL(file);
        setFilePreviewUrl(url);
      }

      // Simulate parsing animation
      let progress = 0;
      let stepIndex = 0;

      const progressInterval = setInterval(() => {
        progress += 2;
        setParsingProgress(progress);

        if (progress >= 25 && stepIndex === 0) {
          setCurrentStep(1);
          stepIndex = 1;
        } else if (progress >= 50 && stepIndex === 1) {
          setCurrentStep(2);
          stepIndex = 2;
        } else if (progress >= 75 && stepIndex === 2) {
          setCurrentStep(3);
          stepIndex = 3;
        }

        if (progress >= 100) {
          clearInterval(progressInterval);
        }
      }, 50);

      try {
        const result = await parseResume(file);

        // Wait for animation to complete (minimum 5 seconds)
        setTimeout(() => {
          clearInterval(progressInterval);
          setParsingProgress(100);
          setCurrentStep(4);

          if (result.success) {
            setJsonData(result.data);
            setDocUploaded(true);

            // Wait a bit more to show completion
            setTimeout(() => {
              setShowParsingAnimation(false);
              toast.success("Resume parsed successfully!", {
                duration: 2000,
                position: "top-right"
              });
              // Pass both jsonData and selectedTemplate
              navigate("/GetInfo", {
                state: {
                  jsonData: result.data,
                  selectedTemplate: selectedTemplate
                }
              });
            }, 1000);
          } else {
            setShowParsingAnimation(false);
            toast.error(`Parsing failed: ${result.error}`, {
              duration: 4000,
              position: "top-right"
            });
            setShowModal(true);
          }
        }, 5000);
      } catch (error) {
        setTimeout(() => {
          setShowParsingAnimation(false);
          toast.error("Failed to parse resume. Please try again or fill manually.", {
            duration: 4000,
            position: "top-right"
          });
          setShowModal(true);
        }, 5000);
      }
    } else {
      toast.error("Please upload a PDF or DOCX file.", { duration: 3000, position: "top-right" });
    }
  };

  const handleStartFromBlank = () => {
    setShowModal(false);
    navigate("/GetInfo", { state: { selectedTemplate: selectedTemplate } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
      <Toaster position="top-right" />

      {/* Parsing Animation Screen */}
      {showParsingAnimation && (
        <div className="fixed inset-0 bg-white dark:bg-slate-900 flex items-center justify-center z-50">
          <div className="max-w-6xl w-full px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Analyzing Your Resume
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Our AI is processing your resume to provide comprehensive insights
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Progress Steps */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">
                {/* Animated Icon */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-dashed border-purple-400 dark:border-purple-600 animate-spin-slow flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <FileText size={48} className="text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="space-y-4 mb-8">
                  {parsingSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${currentStep >= index + 1
                        ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                        : currentStep === index
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'
                          : 'bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600'
                        }`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= index + 1
                        ? 'bg-green-500'
                        : currentStep === index
                          ? 'bg-blue-500'
                          : 'bg-gray-300 dark:bg-slate-600'
                        }`}>
                        {currentStep >= index + 1 ? (
                          <Check size={18} className="text-white" />
                        ) : currentStep === index ? (
                          <Loader2 size={18} className="text-white animate-spin" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className={`font-medium ${currentStep >= index
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-400 dark:text-gray-500'
                        }`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Progress</span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">{parsingProgress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ease-out"
                      style={{ width: `${parsingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center italic">
                    Analyzing content quality...
                  </p>
                </div>
              </div>

              {/* Right Side - Resume Preview */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText size={24} className="text-purple-600 dark:text-purple-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Resume Preview</h3>
                </div>
                <div className="bg-gray-100 dark:bg-slate-700 rounded-xl overflow-hidden h-[500px]">
                  {filePreviewUrl && uploadedFile?.type === 'application/pdf' ? (
                    <iframe
                      src={filePreviewUrl}
                      className="w-full h-full border-0"
                      title="Resume Preview"
                    />
                  ) : uploadedFile ? (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <FileText size={64} className="text-purple-600 dark:text-purple-400 mb-4" />
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {uploadedFile.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {uploadedFile.type.includes('word') || uploadedFile.name.endsWith('.docx')
                          ? 'Word document preview not available. Processing content...'
                          : 'Processing your resume...'}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-pulse space-y-4">
                          <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-3/4 mx-auto"></div>
                          <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-full"></div>
                          <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-5/6 mx-auto"></div>
                          <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-full"></div>
                          <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-4/5 mx-auto"></div>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mt-8">Loading resume content...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowModal(false);
                navigate('/');
              }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              title="Close"
            >
              <X size={24} className="text-gray-600 dark:text-gray-400" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Import your existing resume
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Start faster by prefilling your resume content.
              </p>
            </div>

            {/* Import Resume Button */}
            <label className="block mb-4 cursor-pointer group">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl p-5 flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                <Rocket size={24} className="group-hover:rotate-12 transition-transform" />
                <span className="text-xl font-semibold">Import resume</span>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleDocUpload}
                className="hidden"
              />
            </label>

            {/* Start from Blank Button */}
            <button
              onClick={handleStartFromBlank}
              className="w-full bg-white dark:bg-slate-700 border-2 border-gray-300 dark:border-slate-600 hover:border-purple-500 dark:hover:border-purple-500 text-gray-800 dark:text-white rounded-2xl p-5 flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg group"
            >
              <PenTool size={24} className="text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-transform" />
              <span className="text-xl font-semibold">Start from blank</span>
            </button>

            {/* Helper Text */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Upload PDF or DOCX resume. Our AI will extract and structure the data automatically (Free!)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadPage;
