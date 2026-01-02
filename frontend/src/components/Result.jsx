
import React, { useState, useEffect, useRef } from 'react';
import toast from "react-hot-toast";
import { useLocation, useNavigate } from 'react-router-dom';
import { html as html_beautify } from 'js-beautify';
import { T1, T1Css, T2, T2Css, T3, T3Css, T4, T4Css, T5, T5Css, T6, T6Css, T7, T7Css, T9, T9Css, T10, T10Css, T11, T11Css, T12, T12Css, T13, T13Css, T14, T14Css, T15, T15Css, T16, T16Css, T17, T17Css, T18, T18Css, T19, T19Css, T20, T20Css, T21, T21Css, T22, T22Css, T23, T23Css, T24, T24Css, T25, T25Css, T26, T26Css, T27, T27Css, T28, T28Css, T29, T29Css, T30, T30Css, T31, T31Css, T32, T32Css, T33, T33Css, T34, T34Css } from './Templates';
import DownloadModal from './DownloadModal.jsx';
import { ENDPOINTS } from '../apiConfig';

const Result = () => {
  const [status, setStatus] = useState('preparing'); // 'preparing', 'waking', 'processing', 'completed', 'error'
  const [retryCount, setRetryCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadStatus, setDownloadStatus] = useState({ pdf: false, html: false });
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isBuilt, setIsBuilt] = useState(false);
  const { jsonData, originalData, versionType, resumeId } = location.state || {};
  const navigateToDiv = useRef(null);
  const selectedTemplate = jsonData?.selectedTemplate || "1";
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 10000;

  // Use environment variable for Firebase URL
  const FIREBASE_URL = import.meta.env.VITE_FIREBASE_BUILT_URL;

  useEffect(() => {
    if (!jsonData) {
      setStatus('error');
      setErrorMessage("No resume data found. Please go back and enter your information.");
      return;
    }

    if (!isBuilt) {
      setTimeout(() => {
        setStatus('completed'); // Skip the automatic download and show ready state
        setIsBuilt(true);
      }, 1500); // Shorter delay for better UX
    }
  }, [jsonData]);

  const generateAndDownloadFiles = async () => {
    try {
      const unformattedHTML = document.getElementById('capture-content');

      if (!unformattedHTML) {
        throw new Error("Content element not found. Template may not be rendered correctly.");
      }

      if (!unformattedHTML.innerHTML.trim()) {
        throw new Error("Template content is empty. Please check the template rendering.");
      }

      console.log("Template HTML captured successfully");

      const getTemplateCss = () => {
        const templateMap = {
          '1': T1Css, '2': T2Css, '3': T3Css, '4': T4Css, '5': T5Css, '6': T6Css,
          '7': T7Css, '9': T9Css, '10': T10Css, '11': T11Css, '12': T12Css,
          '13': T13Css, '14': T14Css, '15': T15Css, '16': T16Css, '17': T17Css, '18': T18Css,
          '19': T19Css, '20': T20Css, '21': T21Css, '22': T22Css, '23': T23Css, '24': T24Css,
          '25': T25Css, '26': T26Css, '27': T27Css, '28': T28Css, '29': T29Css, '30': T30Css, '31': T31Css, '32': T32Css, '33': T33Css, '34': T34Css
        };
        return templateMap[selectedTemplate] || T1Css;
      };
      const Css = getTemplateCss();

      const generatedCode = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Designed by BRAVERS</title>
            <style>
              /* Global A4 Page Setup */
              * {
                box-sizing: border-box;
              }
              
              html, body {
                margin: 0;
                padding: 0;
                width: 210mm;
              }
              
              body {
                position: relative;
              }
              
              /* Resume container */
              .resume-container,
              .resume,
              .container,
              [class*="resume"],
              [class*="cv"] {
                width: 210mm !important;
                max-width: 210mm !important;
              }
              
              /* Ensure print colors work */
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              /* Print-specific rules */
              @media print {
                @page {
                  size: A4;
                  margin: 0;
                }
                
                html, body {
                  width: 210mm;
                  margin: 0;
                  padding: 0;
                }
              }
              
              /* Template-specific CSS */
              ${Css}
            </style>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
            <link rel="icon" href="https://prashantparshuramkar.host20.uk/cv-templates/resume-icon.png">
          </head>
          <body>
            ${unformattedHTML.innerHTML}
          </body>
        </html>
      `;

      const htmlContent = html_beautify(generatedCode);

      toast.success("Generating your PDF... \nThis may take some time.", { duration: 10000, position: "top-right" });


      console.log("Sending request to generate PDF...");
      setStatus('processing');

      try {
        const response = await fetch(ENDPOINTS.GENERATE_PDF, {

          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html: htmlContent })
        });


        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const pdfBlob = await response.blob();

        // Download PDF Blob
        const pdfUrl = window.URL.createObjectURL(pdfBlob);
        const pdfLink = document.createElement('a');
        pdfLink.href = pdfUrl;
        pdfLink.download = 'Resume.pdf';
        pdfLink.click();
        window.URL.revokeObjectURL(pdfUrl);
        console.log("PDF Downloaded Successfully", status);
        setDownloadStatus(prev => ({ ...prev, pdf: true }));

        // Generate HTML Blob for download
        const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
        const htmlUrl = window.URL.createObjectURL(htmlBlob);
        const htmlLink = document.createElement('a');
        htmlLink.href = htmlUrl;
        htmlLink.download = 'Resume.html';
        htmlLink.click();
        window.URL.revokeObjectURL(htmlUrl);
        setStatus('completed');

        console.log("HTML Downloaded Successfully", status);
        setDownloadStatus(prev => ({ ...prev, html: true }));

        // Generate JSON Blob for download
        // Generate JSON Blob for download
        const JsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        const JsonUrl = window.URL.createObjectURL(JsonBlob);
        const JsonLink = document.createElement('a');
        JsonLink.href = JsonUrl;
        JsonLink.download = 'Resume.json';
        JsonLink.click();
        window.URL.revokeObjectURL(JsonUrl);
        setStatus('completed');

        console.log("JSON Downloaded Successfully", status);
        setDownloadStatus(prev => ({ ...prev, json: true }));
        setIsBuilt(true);
        toast.success("PDF, HTML/CSS template and Our JSON formate downloaded successfully", { duration: 3000, position: "top-left" });

        setTimeout(() => {
          navigateToDiv.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 5000); // 5 seconds delay


      } catch (error) {
        console.error('API Error:', error);
        if (retryCount < MAX_RETRIES) {
          setRetryCount(prev => prev + 1);
          setErrorMessage(`Request failed: ${error.message}. Retrying in ${RETRY_DELAY / 1000} seconds...`);
          setTimeout(() => {
            setStatus('waking');
            generateAndDownloadFiles();
          }, RETRY_DELAY);
        } else {
          setErrorMessage(`Failed after ${MAX_RETRIES} attempts: ${error.message}`);
          setStatus('error');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message || "An unknown error occurred");
      setStatus('error');
    }
  };

  const renderSelectedTemplate = () => {
    const templateMap = {
      1: T1, 2: T2, 3: T3, 4: T4, 5: T5, 6: T6,
      7: T7, 9: T9, 10: T10, 11: T11, 12: T12,
      13: T13, 14: T14, 15: T15, 16: T16, 17: T17, 18: T18,
      19: T19, 20: T20, 21: T21, 22: T22, 23: T23, 24: T24,
      25: T25, 26: T26, 27: T27, 28: T28, 29: T29, 30: T30, 31: T31, 32: T32, 33: T33, 34: T34
    };
    const TemplateComponent = templateMap[selectedTemplate] || T1;
    return <TemplateComponent jsonData={jsonData} />;
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'preparing':
        return 'Preparing your resume...';
      case 'waking':
        return `Waking up our servers... ${retryCount > 0 ? `(Attempt ${retryCount + 1} of ${MAX_RETRIES + 1})` : ''}`;
      case 'processing':
        return 'Generating PDF...';
      case 'completed':
        return `Your resume ${downloadStatus.pdf ? '(PDF)' : ''} ${downloadStatus.html ? '(HTML)' : ''} has been downloaded!`;
      default:
        return 'Designing...';
    }
  };

  const handleTryAgain = () => {
    setRetryCount(0);
    setErrorMessage('');
    setStatus('preparing');
    setDownloadStatus({ pdf: false, html: false });
    setTimeout(() => {
      setStatus('waking');
      generateAndDownloadFiles();
    }, 1000);

    // Firebase update disabled - use environment variables instead
    // Updating resume count
    // Firebase update enabled
    if (FIREBASE_URL) {
      fetch(FIREBASE_URL)
        .then(res => res.json())
        .then(current => {
          const updated = (current || 0) + 1;

          return fetch(FIREBASE_URL, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updated),
          });
        })
        .catch(error => {
          console.error("Error updating resume count:", error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 dark:bg-slate-800 px-4 py-8 transition-colors duration-300">
      {/* Always render the template but keep it visible with proper sizing */}
      <style>
        {`
          /* Remove page breaks for Result preview only */
          #capture-content * {
            page-break-before: auto !important;
            page-break-after: auto !important;
            page-break-inside: auto !important;
          }
          
          #capture-content {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
          }
        `}
      </style>
      <div
        id="capture-content"
        className={`text-left transition-all duration-300 bg-white rounded-lg shadow-2xl p-8 ${status === 'completed' ? 'relative visible' : 'absolute invisible'}`}
        style={{ width: '950px', maxWidth: '95%' }}
      >
        {jsonData && renderSelectedTemplate()}
      </div>


      {/* Messages container - always positioned below */}
      <div className="w-full max-w-[95%] md:max-w-[80%] mt-0">
        {status !== 'completed' && status !== 'error' ? (
          <div className="w-full flex flex-row justify-center mb-6">
            <div className="relative w-[220px] h-[320px] rounded-[14px] overflow-hidden flex flex-col items-center justify-center shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a] transition-all duration-300">
              <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full bg-[#3449ff] dark:bg-gray-200 opacity-100 filter blur-[8px] animate-blob-bounce transition-colors duration-300"></div>
              <div className="absolute top-[5px] left-[5px] w-[210px] h-[310px] bg-white dark:bg-slate-950 backdrop-blur-[24px] rounded-[10px] outline outline-2 outline-white dark:outline-gray-600 flex flex-col items-center justify-center text-center text-[14px] text-[#3449ff] dark:text-blue-300 font-bold p-[10px] transition-colors duration-300">
                <p title='Server sometimes get sleep. waking them up may take some seconds. please wait'>{getStatusMessage()}</p>
                {status === 'waking' && (
                  <p className="text-xs mt-4 text-gray-500 dark:text-gray-400 max-w-[180px]">
                    Our server might be waking up from sleep mode. This can take up to a minute.
                  </p>
                )}
                {errorMessage && status !== 'error' && (
                  <p className="text-xs mt-4 text-yellow-600 dark:text-yellow-400 max-w-[180px]">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : status === 'error' ? (
          // Show error message if there's an error
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {errorMessage}</span>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleTryAgain}
            >
              Try Again
            </button>
          </div>
        ) : (
          // Show success message when completed
          <div ref={navigateToDiv} className="w-full flex flex-col items-center mt-8">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-full mb-6 text-left">
              <span className="block sm:inline">
                🎉 Your {versionType === 'enhanced' ? 'AI-Enhanced' : 'Original'} resume is ready! Choose your preferred format below to download.
                {versionType === 'enhanced' && <><br />🤖 This version includes AI improvements: enhanced content, keywords, and professional formatting.</>}
                {versionType === 'original' && <><br />📝 This is your original resume as you created it.</>}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
                onClick={() => setShowDownloadModal(true)}
              >
                📄 Choose Download Format
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate('/GetInfo', {
                  state: {
                    jsonData: jsonData,
                    fromResult: true
                  }
                })}
              >
                ← Back to Editor
              </button>
            </div>
          </div>
        )}

        {/* Download Modal */}
        {showDownloadModal && (
          <DownloadModal
            isOpen={showDownloadModal}
            onClose={() => setShowDownloadModal(false)}
            resumeData={jsonData}
            selectedTemplate={selectedTemplate}
            resumeId={resumeId}
          />
        )}
      </div>
    </div>
  );
};

export default Result;