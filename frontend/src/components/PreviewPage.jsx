import React, { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Download, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ENDPOINTS } from '../apiConfig';
import { T1, T2, T3, T4, T5, T6, T7, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30 } from './Templates';

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resumeData, originalData } = location.state || {};

  const [aiEnhancedData, setAiEnhancedData] = useState(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('original');
  const [atsScores, setAtsScores] = useState(null);
  const [showAtsModal, setShowAtsModal] = useState(false);

  // Redirect back if no data - using useEffect to avoid render issues
  useEffect(() => {
    if (!resumeData) {
      navigate('/');
    }
  }, [resumeData, navigate]);

  // Show loading while no data
  if (!resumeData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-white font-bold text-4xl">S</span>
          </div>
          <p className="text-gray-300">Loading preview...</p>
        </div>
      </div>
    );
  }

  const enhanceWithAI = async () => {
    setIsEnhancing(true);
    try {
      const response = await fetch(ENDPOINTS.COMPLETE_RESUME, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData: resumeData,
          action: 'complete_and_enhance'
        })
      });

      if (response.ok) {
        const data = await response.json();

        // Check if the response contains an error or the original data unchanged
        if (data.error || (data.enhancedResume && JSON.stringify(data.enhancedResume) === JSON.stringify(resumeData))) {
          throw new Error(data.error || 'No enhancements made');
        }

        const cleanedData = cleanupMarkdownInNonTargetSections(data.enhancedResume);
        setAiEnhancedData(cleanedData);
        setSelectedVersion('enhanced');

        // Store ATS scores if available
        if (data.atsScore) {
          setAtsScores(data.atsScore);
          setShowAtsModal(true); // Show the ATS score popup
        }

        toast.success('Resume enhanced with AI!');
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || errorData.message || 'Enhancement failed';

        // Check for quota error
        if (errorMessage.includes('quota') || errorMessage.includes('rate limit') || errorMessage.includes('429')) {
          toast.error('API quota exceeded. Using built-in enhancements instead.', { duration: 4000 });
        } else {
          toast.error(errorMessage);
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('AI enhancement error:', error);

      // Show appropriate message based on error type
      const errorMsg = error.message || '';
      if (errorMsg.includes('quota') || errorMsg.includes('rate limit') || errorMsg.includes('429')) {
        toast.info('API limit reached. Using built-in AI enhancements...', { duration: 3000 });
      }

      // Fallback enhancement
      const fallbackEnhanced = createFallbackEnhancement(resumeData);
      setAiEnhancedData(fallbackEnhanced);
      setSelectedVersion('enhanced');
      toast.success('Resume enhanced with built-in improvements!');
    }
    setIsEnhancing(false);
  };

  const cleanupMarkdownInNonTargetSections = (data) => {
    // Remove markdown (**text**) from sections where we don't parse it
    const cleaned = JSON.parse(JSON.stringify(data));

    // Clean description/profile summary - no markdown
    if (cleaned.Description?.UserDescription) {
      cleaned.Description.UserDescription = cleaned.Description.UserDescription.replace(/\*\*/g, '');
    }

    // Clean skills - no markdown
    if (cleaned.skills?.hardSkills) {
      cleaned.skills.hardSkills = cleaned.skills.hardSkills.replace(/\*\*/g, '');
    }
    if (cleaned.skills?.softSkills) {
      cleaned.skills.softSkills = cleaned.skills.softSkills.replace(/\*\*/g, '');
    }

    // Clean contact info - no markdown
    if (cleaned.contactInfo) {
      Object.keys(cleaned.contactInfo).forEach(key => {
        if (typeof cleaned.contactInfo[key] === 'string') {
          cleaned.contactInfo[key] = cleaned.contactInfo[key].replace(/\*\*/g, '');
        }
      });
    }

    // Clean education - no markdown
    if (cleaned.education && Array.isArray(cleaned.education)) {
      cleaned.education.forEach(edu => {
        Object.keys(edu).forEach(key => {
          if (typeof edu[key] === 'string') {
            edu[key] = edu[key].replace(/\*\*/g, '');
          }
        });
      });
    }

    // Keep markdown in: projects (toolsTechUsed), workExperience (keyAchievements)
    // These sections will parse the markdown to bold text

    return cleaned;
  };

  const createFallbackEnhancement = (data) => {
    const enhanced = JSON.parse(JSON.stringify(data));

    // Enhance contact info
    if (!enhanced.contactInfo.jobTitle || enhanced.contactInfo.jobTitle.length < 10) {
      enhanced.contactInfo.jobTitle = enhanced.contactInfo.jobTitle || 'Professional';
    }

    // ALWAYS enhance skills to show visible improvement - NO MARKDOWN FORMATTING
    const jobTitle = enhanced.contactInfo.jobTitle.toLowerCase();
    const additionalSkills = getSkillSuggestions(jobTitle);

    if (enhanced.skills.hardSkills) {
      // Add additional skills if not already present
      const existingSkills = enhanced.skills.hardSkills.toLowerCase();
      const skillsToAdd = additionalSkills.split(', ').filter(skill =>
        !existingSkills.includes(skill.toLowerCase())
      );
      if (skillsToAdd.length > 0) {
        enhanced.skills.hardSkills = `${enhanced.skills.hardSkills}, ${skillsToAdd.slice(0, 3).join(', ')}`;
      }
    } else {
      enhanced.skills.hardSkills = additionalSkills;
    }

    if (enhanced.skills.softSkills) {
      const softSkillsToAdd = ['Strategic Thinking', 'Analytical Skills', 'Adaptability'];
      const existingSoftSkills = enhanced.skills.softSkills.toLowerCase();
      const newSoftSkills = softSkillsToAdd.filter(skill =>
        !existingSoftSkills.includes(skill.toLowerCase())
      );
      if (newSoftSkills.length > 0) {
        enhanced.skills.softSkills = `${enhanced.skills.softSkills}, ${newSoftSkills.join(', ')}`;
      }
    } else {
      enhanced.skills.softSkills = 'Communication, Problem Solving, Leadership, Teamwork, Time Management, Adaptability';
    }

    // Clean up any markdown from skills
    if (enhanced.skills.hardSkills) {
      enhanced.skills.hardSkills = enhanced.skills.hardSkills.replace(/\*\*/g, '');
    }
    if (enhanced.skills.softSkills) {
      enhanced.skills.softSkills = enhanced.skills.softSkills.replace(/\*\*/g, '');
    }

    // ALWAYS enhance description to show improvement - NO MARKDOWN
    if (enhanced.Description?.UserDescription && enhanced.Description.UserDescription.length > 20) {
      // Improve existing description
      const desc = enhanced.Description.UserDescription;
      if (!desc.toLowerCase().includes('proven')) {
        enhanced.Description.UserDescription = `Proven and ${desc.charAt(0).toLowerCase()}${desc.slice(1)}`;
      }
    } else {
      enhanced.Description = enhanced.Description || {};
      const skills = enhanced.skills.hardSkills?.split(',').slice(0, 3).map(s => s.trim()).join(', ') || 'various technologies';
      enhanced.Description.UserDescription = `Experienced ${enhanced.contactInfo.jobTitle} with proven expertise in ${skills}. Demonstrated track record in delivering high-quality solutions and driving team success through effective collaboration and innovative problem-solving.`;
    }

    // Clean up any markdown from description
    if (enhanced.Description?.UserDescription) {
      enhanced.Description.UserDescription = enhanced.Description.UserDescription.replace(/\*\*/g, '');
    }

    // ALWAYS enhance work experience with better formatting - KEEP MARKDOWN
    if (enhanced.workExperience && Array.isArray(enhanced.workExperience)) {
      enhanced.workExperience = enhanced.workExperience.map((exp, index) => {
        if (exp.keyAchievements && exp.keyAchievements.length > 50) {
          // Improve existing achievements by adding action verbs
          let achievements = exp.keyAchievements;
          if (!achievements.includes('**')) {
            // Add some emphasis if not already there
            achievements = achievements.replace(/\b(developed|implemented|created|designed|built|improved|optimized|achieved|delivered|led|managed)\b/gi, '**$1**');
          }
          return { ...exp, keyAchievements: achievements };
        } else {
          return {
            ...exp,
            keyAchievements: `**Delivered** high-quality results and **contributed** to team success. **Implemented** innovative solutions that **improved** efficiency by 25% and **collaborated** with cross-functional teams to **achieve** measurable results.`
          };
        }
      });
    }

    // Enhance projects with better tech descriptions - KEEP MARKDOWN
    if (enhanced.projects && Array.isArray(enhanced.projects)) {
      enhanced.projects = enhanced.projects.map(project => {
        if (project.toolsTechUsed && project.toolsTechUsed.length > 20) {
          // Add emphasis to key technologies
          let tools = project.toolsTechUsed;
          if (!tools.includes('**')) {
            // Emphasize first few technologies
            const techArray = tools.split(',').map((t, i) => i < 3 ? `**${t.trim()}**` : t.trim());
            tools = techArray.join(', ');
          }
          return { ...project, toolsTechUsed: tools };
        }
        return project;
      });
    }

    return enhanced;
  };

  const getSkillSuggestions = (jobTitle) => {
    const skillMap = {
      'developer': 'JavaScript, Python, React, Node.js, Git, SQL',
      'designer': 'Figma, Adobe Creative Suite, Sketch, Prototyping, UI/UX',
      'manager': 'Project Management, Agile, Scrum, Leadership, Analytics',
      'analyst': 'Excel, SQL, Python, Data Visualization, Statistics',
      'marketing': 'Digital Marketing, SEO, Social Media, Analytics, Content Creation',
      'sales': 'CRM, Lead Generation, Negotiation, Customer Relations, Sales Analytics'
    };

    for (const [key, skills] of Object.entries(skillMap)) {
      if (jobTitle.includes(key)) {
        return skills;
      }
    }
    return 'Microsoft Office, Communication, Problem Solving, Time Management';
  };

  const getTemplateComponent = () => {
    const templateIndex = resumeData.selectedTemplate;
    const templateComponents = { T1, T2, T3, T4, T5, T6, T7, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30 };
    return templateComponents[`T${templateIndex}`] || T1;
  };

  const getCurrentData = () => {
    return selectedVersion === 'enhanced' && aiEnhancedData ? aiEnhancedData : resumeData;
  };

  const renderTemplate = () => {
    try {
      const TemplateComponent = getTemplateComponent();
      const currentData = getCurrentData();

      // Validate essential data exists
      if (!currentData || Object.keys(currentData).length === 0) {
        return (
          <div className="p-8 text-center text-gray-500">
            <p>No resume data available. Please go back and fill out the form.</p>
          </div>
        );
      }

      return <TemplateComponent jsonData={currentData} />;
    } catch (error) {
      console.error('Template rendering error:', error);
      return (
        <div className="p-8 text-center text-red-500">
          <p>Error rendering resume template. Please try refreshing or go back to edit.</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      );
    }
  };

  const handleProceedToDownload = () => {
    navigate('/Result', {
      state: {
        jsonData: getCurrentData(),
        originalData: resumeData,
        versionType: selectedVersion
      }
    });
  };

  const handleBackToEdit = () => {
    // Navigate back to edit page with current resume data
    const dataToPass = selectedVersion === 'enhanced' && aiEnhancedData ? aiEnhancedData : resumeData;
    navigate('/GetInfo', {
      state: {
        jsonData: dataToPass,
        fromPreview: true
      }
    });
  };

  // ATS Score Modal Component
  const ATSScoreModal = () => {
    if (!showAtsModal || !atsScores) return null;

    const { original, enhanced, improvement } = atsScores;
    const improvementColor = improvement > 0 ? 'text-green-400' : improvement < 0 ? 'text-red-400' : 'text-yellow-400';
    const showWarning = enhanced.score < 70;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-700 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-center flex-shrink-0">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-white" />
            <h2 className="text-3xl font-bold text-white mb-2">ATS Score Analysis</h2>
            <p className="text-blue-100">Your resume has been enhanced!</p>
          </div>

          {/* Score Comparison */}
          <div className="p-8 overflow-y-auto flex-1">
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Original Score */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 text-center">
                <p className="text-gray-400 text-sm mb-2 uppercase tracking-wide">Original Score</p>
                <div className="text-5xl font-bold text-gray-300 mb-2">{original.score}</div>
                <div className="text-gray-500 text-sm">out of {original.maxScore}</div>
                <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gray-500 to-gray-400 transition-all duration-500"
                    style={{ width: `${original.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Enhanced Score */}
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500 text-center">
                <p className="text-purple-300 text-sm mb-2 uppercase tracking-wide">Enhanced Score</p>
                <div className="text-5xl font-bold text-white mb-2">{enhanced.score}</div>
                <div className="text-purple-200 text-sm">out of {enhanced.maxScore}</div>
                <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${enhanced.score}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Improvement Badge */}
            <div className="text-center mb-6">
              <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gray-800 border ${improvement > 0 ? 'border-green-500' : 'border-yellow-500'
                }`}>
                <span className="text-gray-300 mr-2">Improvement:</span>
                <span className={`text-2xl font-bold ${improvementColor}`}>
                  {improvement > 0 ? '+' : ''}{improvement} points
                </span>
              </div>
            </div>

            {/* Recommendation */}
            <div className={`rounded-xl p-4 mb-6 ${showWarning
              ? 'bg-yellow-900/20 border border-yellow-600'
              : 'bg-green-900/20 border border-green-600'
              }`}>
              <p className={`text-sm ${showWarning ? 'text-yellow-200' : 'text-green-200'}`}>
                <strong className="block mb-1">Recommendation:</strong>
                {enhanced.recommendation}
              </p>
            </div>

            {/* Warning for low score */}
            {showWarning && (
              <div className="bg-orange-900/20 border border-orange-600 rounded-xl p-4 mb-6">
                <p className="text-orange-200 text-sm">
                  <strong className="block mb-1">⚠️ Action Required:</strong>
                  Add more skills and adapt skills within your domain to increase your ATS score.
                  Include quantifiable achievements and specific technologies relevant to your field.
                </p>
              </div>
            )}

            {/* Score Breakdown */}
            <div className="bg-gray-800/30 rounded-xl p-4 mb-6">
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Score Breakdown:</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {Object.entries(enhanced.breakdown).map(([category, score]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-gray-400 capitalize">{category}:</span>
                    <span className="text-white font-medium">{Math.round(score)} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowAtsModal(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Continue to Enhanced Resume
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Use regular CSS instead of styled-jsx */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .preview-container {
              max-height: none !important;
              overflow: visible !important;
            }
            .resume {
              page-break-inside: avoid;
              max-height: none !important;
              height: auto !important;
              max-width: none !important;
              width: 100% !important;
            }
          }
          
          .resume {
            max-height: none;
            overflow: visible;
          }
          
          .preview-container {
            max-height: 85vh;
            overflow: auto;
            scrollbar-width: thin;
            scrollbar-color: #4a5568 #1a202c;
          }
          
          .preview-container::-webkit-scrollbar {
            width: 6px;
          }
          
          .preview-container::-webkit-scrollbar-track {
            background: #1a202c;
          }
          
          .preview-container::-webkit-scrollbar-thumb {
            background: #4a5568;
            border-radius: 3px;
          }
          
          /* Force readable text colors in preview */
          .resume-preview-content * {
            color: inherit !important;
          }
          
          .resume-preview-content {
            color: #000000 !important;
          }
          
          .resume-preview-content h1,
          .resume-preview-content h2,
          .resume-preview-content h3,
          .resume-preview-content h4,
          .resume-preview-content h5,
          .resume-preview-content h6 {
            color: #1a1a1a !important;
          }
          
          .resume-preview-content p,
          .resume-preview-content div,
          .resume-preview-content span,
          .resume-preview-content li {
            color: #2d2d2d !important;
          }
          
          /* Keep specific styled elements */
          .resume-preview-content .TextLight,
          .resume-preview-content [class*="text-"],
          .resume-preview-content [class*="color"] {
            opacity: 1 !important;
          }
        `
      }} />

      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleBackToEdit}
              className="flex items-center text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Edit
            </motion.button>
            <h1 className="text-2xl font-bold">Resume Preview</h1>
          </div>

          {/* Top Controls */}
          <div className="flex items-center space-x-4">
            {/* AI Enhancement Button */}
            {!isEnhancing && !aiEnhancedData && (
              <motion.button
                onClick={enhanceWithAI}
                className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Brain className="w-5 h-5 mr-2" />
                Resume Enhanced by AI
              </motion.button>
            )}

            {isEnhancing && (
              <div className="flex items-center text-blue-400">
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                AI is enhancing your resume...
              </div>
            )}

            {/* Version Selector */}
            {aiEnhancedData && (
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setSelectedVersion('original')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedVersion === 'original'
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-400 hover:text-white'
                    }`}
                >
                  Original
                </button>
                <button
                  onClick={() => setSelectedVersion('enhanced')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedVersion === 'enhanced'
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <Sparkles className="w-4 h-4 mr-1 inline" />
                  AI Enhanced
                </button>
              </div>
            )}

            {/* Download Button */}
            <motion.button
              onClick={handleProceedToDownload}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5 mr-2" />
              Select Format & Download
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Status Banner */}
          {aiEnhancedData && (
            <div className={`mb-6 p-4 rounded-lg text-center ${selectedVersion === 'enhanced'
              ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700 text-purple-200'
              : 'bg-gray-800/50 border border-gray-700 text-gray-300'
              }`}>
              {selectedVersion === 'enhanced'
                ? '✨ Viewing AI-Enhanced Resume with improved content, keywords, and professional formatting'
                : '📝 Viewing Original Resume as you created it'
              }
            </div>
          )}

          {!aiEnhancedData && (
            <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-center text-gray-300">
              📝 Viewing Original Resume - Click "Resume Enhanced by AI" to see improved version
            </div>
          )}

          {/* Resume Display */}
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-2xl overflow-auto max-w-[950px] w-full preview-container">
              <div className="p-8 resume-preview-content">
                {renderTemplate()}
              </div>
            </div>
          </div>

          {/* AI Enhancement Info */}
          {aiEnhancedData && selectedVersion === 'enhanced' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-800"
            >
              <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                AI Enhancements Applied
              </h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Added relevant skills based on your job role</li>
                <li>• Enhanced professional summary for better impact</li>
                <li>• Completed missing sections with appropriate content</li>
                <li>• Optimized for ATS (Applicant Tracking System) compatibility</li>
                <li>• Improved formatting and professional language</li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>

      {/* ATS Score Modal */}
      <ATSScoreModal />
    </div>
  );
};

export default PreviewPage;