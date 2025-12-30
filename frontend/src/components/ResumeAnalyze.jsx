import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    UploadCloud,
    FileText,
    Search,
    CheckCircle,
    AlertCircle,
    BarChart3,
    Zap,
    Target,
    TrendingUp,
    Award,
    BookOpen,
    ArrowRight,
    Loader2,
    X,
    Cpu,
    Briefcase,
    Shield,
    Sparkles,
    MousePointer2,
    Layers,
    PieChart as PieIcon,
    Flame
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    AreaChart,
    Area
} from "recharts";
import toast from "react-hot-toast";
import { parseResume } from "./ResumeParser";
import { ENDPOINTS, getAuthHeaders } from "../apiConfig";

const PREDEFINED_ROLES = [
    // Software Asset Management (SAM) Roles
    "Software Asset Manager",
    "Junior Software Asset Manager",
    "Senior Software Asset Manager",
    "SAM Analyst",
    "SAM Specialist",
    "Software License Manager",
    "Software Compliance Manager",
    "SAM Intern",

    // Hardware Asset Management (HAM) Roles
    "Hardware Asset Manager",
    "Junior Hardware Asset Manager",
    "Senior Hardware Asset Manager",
    "HAM Analyst",
    "HAM Specialist",
    "Hardware Lifecycle Manager",
    "HAM Intern",

    // IT Asset Management (ITAM) Roles
    "IT Asset Manager",
    "Junior IT Asset Manager",
    "Senior IT Asset Manager",
    "ITAM Specialist",
    "ITAM Analyst",
    "IT Asset Lifecycle Manager",
    "Asset Management Consultant",
    "Configuration Management Specialist",
    "CMDB Administrator",
    "ITAM Intern",


    // Data Analytics & Business Intelligence (Expanded)
    "Data Analyst",
    "Junior Data Analyst",
    "Senior Data Analyst",
    "Lead Data Analyst",
    "Data Analytics Intern",
    "Data Scientist",
    "Junior Data Scientist",
    "Senior Data Scientist",
    "Machine Learning Engineer",
    "AI/ML Engineer",
    "Business Intelligence Analyst",
    "BI Developer",
    "Data Engineer",
    "Junior Data Engineer",
    "Senior Data Engineer",
    "Big Data Engineer",
    "Analytics Manager",
    "Quantitative Analyst",
    "Research Analyst",
    "Statistical Analyst",

    // Mobile Development (Android & iOS)
    "Android Developer",
    "Junior Android Developer",
    "Senior Android Developer",
    "Android Engineer",
    "Android Application Developer",
    "iOS Developer",
    "Junior iOS Developer",
    "Senior iOS Developer",
    "Mobile App Developer",
    "Mobile Engineer",
    "React Native Developer",
    "Flutter Developer",
    "Mobile UI/UX Developer",
    "Mobile Development Intern",

    // Software Engineering (Expanded)
    "Software Engineer",
    "Junior Software Engineer",
    "Senior Software Engineer",
    "Staff Software Engineer",
    "Principal Software Engineer",
    "Software Engineering Intern",
    "Software Architect",
    "Solutions Architect",
    "Frontend Developer",
    "Junior Frontend Developer",
    "Senior Frontend Developer",
    "Backend Developer",
    "Junior Backend Developer",
    "Senior Backend Developer",
    "Full Stack Developer",
    "Full Stack Engineer",
    "Full Stack Intern",

    // Web Development
    "Web Developer",
    "Frontend Web Developer",
    "Backend Web Developer",
    "WordPress Developer",
    "Shopify Developer",
    "JavaScript Developer",
    "React Developer",
    "Angular Developer",
    "Vue.js Developer",
    "Node.js Developer",
    "Python Developer",
    "Java Developer",
    ".NET Developer",
    "PHP Developer",

    // DevOps & Cloud (Expanded)
    "DevOps Engineer",
    "Junior DevOps Engineer",
    "Senior DevOps Engineer",
    "Cloud Engineer",
    "AWS Engineer",
    "Azure Engineer",
    "GCP Engineer",
    "Cloud Architect",
    "Solutions Architect - Cloud",
    "Site Reliability Engineer",
    "Platform Engineer",
    "Infrastructure Engineer",
    "Kubernetes Engineer",
    "Docker Specialist",

    // Cybersecurity
    "Security Analyst",
    "Cybersecurity Analyst",
    "Information Security Analyst",
    "Security Engineer",
    "Penetration Tester",
    "Ethical Hacker",
    "Security Architect",
    "SOC Analyst",

    // Quality Assurance & Testing
    "QA Engineer",
    "QA Analyst",
    "Test Engineer",
    "Automation Test Engineer",
    "Manual Tester",
    "Software Tester",
    "QA Lead",

    // Product & Design
    "Product Manager",
    "Technical Product Manager",
    "Product Owner",
    "UI/UX Designer",
    "UI Designer",
    "UX Designer",
    "UX Researcher",
    "Graphic Designer",

    // IT Support & Administration
    "IT Support Specialist",
    "System Administrator",
    "Network Administrator",
    "Database Administrator",
    "Help Desk Technician",
    "IT Analyst",

    // Project Management
    "Project Manager",
    "IT Project Manager",
    "Technical Project Manager",
    "Scrum Master",
    "Agile Coach",
    "Program Manager",

    // Emerging Technologies
    "Blockchain Developer",
    "Game Developer",
    "Unity Developer",
    "VR/AR Developer",
    "IoT Engineer",
    "Robotics Engineer"
];

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316"];
const GRADIENTS = {
    primary: ["#6366f1", "#8b5cf6"],
    success: ["#10b981", "#34d399"],
    warning: ["#f59e0b", "#fbbf24"],
    danger: ["#ef4444", "#f87171"],
    info: ["#0ea5e9", "#38bdf8"]
};

const ResumeAnalyze = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [jobRole, setJobRole] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredRoles = PREDEFINED_ROLES.filter(role =>
        role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            if (uploadedFile.size > 10 * 1024 * 1024) {
                toast.error("File size exceeds 10MB");
                return;
            }
            setFile(uploadedFile);
            toast.success("Resume uploaded successfully");
        }
    };

    const handleRoleSelect = (role) => {
        setJobRole(role);
        setSearchTerm(role);
        setShowSuggestions(false);
    };

    const startAnalysis = async () => {
        if (!file || (!jobRole && !searchTerm)) {
            toast.error("Please select a file and a job role");
            return;
        }

        setIsAnalyzing(true);
        setAnalysisResult(null);

        try {
            const parseResult = await parseResume(file);
            if (!parseResult.success) {
                throw new Error(parseResult.error || "Failed to parse resume content");
            }

            const role = jobRole || searchTerm;

            const response = await fetch(ENDPOINTS.ANALYZE_RESUME, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    resumeText: parseResult.rawText,
                    jobRole: role
                }),
                signal: AbortSignal.timeout(60000)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || errorData.message || "Analysis service unavailable");
            }

            const result = await response.json();
            setAnalysisResult(result);
            toast.success("Intelligence report generated!");
        } catch (error) {
            console.error("Analysis error:", error);
            toast.error(error.message || "Failed to analyze resume. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#0a0f1d] selection:bg-indigo-500/30 transition-colors duration-500 font-sans">

            {/* Background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full"></div>
            </div>

            <main className="max-w-6xl mx-auto px-6 py-8 relative z-10">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/')}
                    className="mb-8 px-6 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all flex items-center gap-2 shadow-sm"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
                </motion.button>
                {!analysisResult && !isAnalyzing ? (
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-10"
                        >
                            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-black tracking-widest uppercase bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">
                                Advanced AI Analysis
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
                                Unlock Your <span className="text-indigo-600 dark:text-indigo-400">Professional potential</span>
                            </h2>
                            <p className="text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                                Our neural intelligence engine maps your experience against industry standards, identifying your unique strengths and critical growth paths.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                            {/* Upload Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl shadow-indigo-500/5 border border-slate-200 dark:border-slate-800 flex flex-col"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center">
                                        <FileText className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Professional Data</h3>
                                </div>

                                <div
                                    className={`flex-1 border-2 border-dashed rounded-3xl p-6 transition-all duration-300 text-center cursor-pointer flex flex-col items-center justify-center
                                        ${file ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-900/10' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                                    `}
                                    onClick={() => document.getElementById('resume-upload').click()}
                                >
                                    <input
                                        type="file"
                                        id="resume-upload"
                                        className="hidden"
                                        accept=".pdf,.docx"
                                        onChange={handleFileUpload}
                                    />
                                    {file ? (
                                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                                            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-300 dark:shadow-none">
                                                <FileText className="text-white w-10 h-10" />
                                            </div>
                                            <div className="text-slate-900 dark:text-white font-black text-xl mb-1">{file.name}</div>
                                            <div className="text-slate-400 text-sm">{(file.size / 1024).toFixed(1)} KB • Ready to analyze</div>
                                        </motion.div>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-6">
                                                <UploadCloud className="text-indigo-600 dark:text-indigo-400 w-8 h-8" />
                                            </div>
                                            <div className="text-lg font-bold text-slate-900 dark:text-white mb-2">Drop your resume here</div>
                                            <p className="text-slate-400 text-sm">PDF or DOCX (Max 10MB)</p>
                                        </>
                                    )}
                                </div>
                            </motion.div>

                            {/* Job Role Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl shadow-indigo-500/5 border border-slate-200 dark:border-slate-800"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center">
                                        <Briefcase className="text-purple-600 dark:text-purple-400 w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Target Context</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Search size={22} />
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 pl-12 pr-6 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400"
                                            placeholder="What's the job title?"
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setShowSuggestions(true);
                                                setJobRole(e.target.value);
                                            }}
                                            onFocus={() => setShowSuggestions(true)}
                                        />

                                        <AnimatePresence>
                                            {showSuggestions && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute z-50 w-full mt-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl shadow-indigo-500/10 overflow-hidden max-h-72 overflow-y-auto"
                                                >
                                                    {filteredRoles.length > 0 ? (
                                                        filteredRoles.map((role) => (
                                                            <button
                                                                key={role}
                                                                className="w-full text-left px-6 py-4 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 text-slate-700 dark:text-slate-200 font-semibold transition-colors flex items-center justify-between group"
                                                                onClick={() => handleRoleSelect(role)}
                                                            >
                                                                {role}
                                                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div className="px-6 py-4 text-slate-400 text-sm italic">Type to find a role...</div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            className={`w-full py-4 rounded-2xl font-black text-lg shadow-2xl transition-all duration-500 flex items-center justify-center gap-3
                                                ${file && searchTerm
                                                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white transform hover:scale-[1.02] active:scale-[0.98] shadow-indigo-500/30'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'}
                                            `}
                                            disabled={!file || !searchTerm}
                                            onClick={startAnalysis}
                                        >
                                            Analyze Intelligence <ArrowRight size={22} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                ) : isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <div className="relative w-48 h-48 mb-12">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-[6px] border-indigo-500/10 border-t-indigo-600 rounded-full"
                            ></motion.div>
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 border-[6px] border-purple-500/10 border-t-purple-500 rounded-full"
                            ></motion.div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Cpu className="text-indigo-600 w-12 h-12" />
                                </motion.div>
                            </div>
                        </div>
                        <motion.h3
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-2xl font-black text-slate-800 dark:text-white mb-3 tracking-tight"
                        >
                            Neural Intelligence Logic...
                        </motion.h3>
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-base text-center max-w-sm">
                            Mapping experience vectors and benchmarking role performance metrics.
                        </p>
                    </div>
                ) : (
                    <Dashboard data={analysisResult} onReset={() => setAnalysisResult(null)} />
                )}
            </main>
        </div>
    );
};

const Dashboard = ({ data, onReset }) => {
    const radarData = Object.entries(data.skillDistribution || {}).map(([name, value]) => ({
        subject: name,
        A: value,
        fullMark: 100,
    }));

    const barData = (data.missingSkills || []).map(item => ({
        name: item.skill,
        value: item.priority === "High" ? 95 : item.priority === "Medium" ? 65 : 35
    }));

    const keywordData = [
        { name: 'Aligned', value: (data.keywordRelevance || []).filter(k => k.found).length },
        { name: 'Gap', value: (data.keywordRelevance || []).filter(k => !k.found).length },
    ];

    const matchedPercentage = keywordData[0].value + keywordData[1].value > 0
        ? Math.round((keywordData[0].value / (keywordData[0].value + keywordData[1].value)) * 100)
        : 50;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 pb-12"
        >
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded-full uppercase tracking-widest">Analysis Result</span>
                        <h2 className="text-sm font-bold text-slate-400">Target Role: <span className="text-slate-900 dark:text-white">{data.jobRole || 'Professional'}</span></h2>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Intelligence Dashboard</h1>
                </div>
                <button
                    onClick={onReset}
                    className="group px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-sm transition-all flex items-center gap-2 hover:scale-105 active:scale-95 shadow-md"
                >
                    <RefreshIcon size={16} className="group-hover:rotate-180 transition-all duration-500" /> New Analysis
                </button>
            </div>

            {/* Top Grid - Main Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Skill Radar - Column 1-7 */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg">

                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center">
                                <BarChart3 className="text-indigo-600 w-3.5 h-3.5" />
                            </div>
                            Competency Radar
                        </h3>
                        <div className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-500">Benchmark Data</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <div className="md:col-span-3 h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#e2e8f0" strokeOpacity={0.5} />
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }}
                                    />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Competency"
                                        dataKey="A"
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                        fill="#6366f1"
                                        fillOpacity={0.15}
                                        animationDuration={2000}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <div className="p-3 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/20 dark:to-violet-950/20 rounded-xl border border-indigo-100/50 dark:border-indigo-800/20">
                                <PieIcon className="text-indigo-600 mb-1" size={16} />
                                <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed italic">
                                    "{radarData.length > 0 ? `Highest performance observed in ${radarData.sort((a, b) => b.A - a.A)[0]?.subject.toLowerCase()}.` : 'Mapping core skills...'}"
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-1.5">
                                {radarData.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-2 bg-slate-50/50 dark:bg-slate-800/50 rounded-lg">
                                        <span className="text-[10px] font-bold text-slate-500">{item.subject}</span>
                                        <span className="text-sm font-black text-indigo-600">{item.A}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Readiness Indicator - Column 8-12 */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    {/* Role Readiness Circle */}
                    <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full group-hover:scale-150 transition-all duration-1000"></div>

                        <div className="relative w-40 h-40 mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={keywordData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={70}
                                        paddingAngle={8}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={450}
                                    >
                                        <Cell fill="#6366f1" stroke="none" />
                                        <Cell fill="#f1f5f9" className="dark:fill-slate-800" stroke="none" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-3xl font-black text-slate-900 dark:text-white"
                                >
                                    {matchedPercentage}%
                                </motion.span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mt-0.5">Readiness</span>
                            </div>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Context Match Index</h3>
                        <p className="text-xs text-slate-500 font-semibold max-w-[200px]">Alignment with industry benchmarks.</p>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                            <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center mb-2 shadow-md">
                                <CheckCircle className="text-white w-3 h-3" />
                            </div>
                            <div className="text-xl font-black text-emerald-600 mb-0.5">{data.strengths?.length || 0}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Key Strengths</div>
                        </div>
                        <div className="bg-rose-50/50 dark:bg-rose-950/20 p-3 rounded-xl border border-rose-100 dark:border-rose-900/40">
                            <div className="w-6 h-6 bg-rose-500 rounded-lg flex items-center justify-center mb-2 shadow-md">
                                <AlertCircle className="text-white w-3 h-3" />
                            </div>
                            <div className="text-xl font-black text-rose-600 mb-0.5">{data.gaps?.length || 0}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Skill Gaps</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Grid - Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Keyword Analysis - Column 1-5 */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-violet-50 dark:bg-violet-900/40 flex items-center justify-center">
                            <Target className="text-violet-600 w-3.5 h-3.5" />
                        </div>
                        Keyword Heatmap
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {data.keywordRelevance?.map((kw, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-300
                                    ${kw.found
                                        ? 'bg-transparent border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-none'
                                        : 'bg-slate-50 text-slate-400 border border-slate-100 dark:bg-slate-800 dark:border-slate-700 opacity-60'}`}
                            >
                                {kw.found ? <Zap size={14} fill="currentColor" /> : <X size={14} />}
                                {kw.keyword}
                            </motion.span>
                        ))}
                    </div>
                    <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                            <span className="text-indigo-600 mr-1">Insider Tip:</span>
                            Integrating the missing keywords highlighted above could increase role alignment visibility by ~15-20%.
                        </p>
                    </div>
                </div>

                {/* Priority Growth Gaps - Column 6-12 */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center">
                            <TrendingUp className="text-blue-600 w-3.5 h-3.5" />
                        </div>
                        Priority Growth Vector
                    </h3>
                    <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} layout="vertical" margin={{ left: 30, right: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" opacity={0.3} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={120}
                                    tick={{ fill: '#64748b', fontSize: 13, fontWeight: 900 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                                    contentStyle={{
                                        borderRadius: '20px',
                                        border: 'none',
                                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
                                        fontWeight: 'black'
                                    }}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="#6366f1"
                                    radius={[0, 15, 15, 0]}
                                    barSize={24}
                                    animationDuration={1500}
                                >
                                    {barData.map((entry, index) => (
                                        <Cell key={index} fill={entry.value > 80 ? '#6366f1' : entry.value > 50 ? '#8b5cf6' : '#ec4899'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-8 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                            <span className="text-xs font-black text-slate-500">CRITICAL</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-violet-400"></div>
                            <span className="text-xs font-black text-slate-500">IMPORTANT</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Insights Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Strengths Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/30"></div>
                    <h3 className="text-xl font-black text-emerald-600 mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center shadow-md">
                            <Award size={18} />
                        </div>
                        Strategic Advantage
                    </h3>
                    <div className="space-y-2">
                        {data.strengths?.map((str, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-3 p-3 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-xl border border-emerald-100/50 dark:border-emerald-800/10 group hover:scale-[1.01] transition-all"
                            >
                                <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                                    <CheckCircle size={10} className="text-white" />
                                </div>
                                <span className="text-slate-800 dark:text-slate-200 font-bold text-sm leading-snug">{str}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Gaps Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500/30"></div>
                    <h3 className="text-xl font-black text-rose-500 mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950 flex items-center justify-center shadow-md">
                            <Shield size={18} strokeWidth={2.5} />
                        </div>
                        Observed Gaps
                    </h3>
                    <div className="space-y-2">
                        {data.gaps?.map((gap, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-3 p-3 bg-rose-50/30 dark:bg-rose-900/10 rounded-xl border border-rose-100/50 dark:border-rose-800/10 group hover:scale-[1.01] transition-all"
                            >
                                <div className="mt-0.5 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center shrink-0">
                                    <AlertCircle size={10} className="text-white" />
                                </div>
                                <span className="text-slate-800 dark:text-slate-200 font-bold text-sm leading-snug">{gap}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Improvement Suggestions & Roadmap Container */}
            <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600 dark:bg-gradient-to-br dark:from-purple-700 dark:via-violet-700 dark:to-fuchsia-700 rounded-2xl p-5 text-white shadow-xl shadow-purple-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12 scale-110">
                    <Flame size={200} />
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                    {/* Left: Suggestions Grid */}
                    <div className="w-full md:w-3/5 space-y-4">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-8 h-8 bg-white/20 rounded-lg backdrop-blur-xl flex items-center justify-center border border-white/20">
                                <Award size={18} strokeWidth={3} />
                            </div>
                            <h3 className="text-xl font-black tracking-tight">Level Up Path</h3>
                        </div>
                        <p className="text-purple-100 text-sm font-semibold max-w-lg mb-4">Strategic pivots to bypass role gatekeepers and demonstrate elite competency.</p>

                        <div className="grid grid-cols-1 gap-3">
                            {(() => {
                                // Group suggestions by category
                                const groupedSuggestions = (data.improvementSuggestions || []).reduce((acc, sug) => {
                                    const category = sug.category || 'General';
                                    if (!acc[category]) {
                                        acc[category] = [];
                                    }
                                    acc[category].push(sug.suggestion);
                                    return acc;
                                }, {});

                                // Render grouped suggestions
                                return Object.entries(groupedSuggestions).map(([category, suggestions], i) => (
                                    <motion.div
                                        key={category}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white/10 backdrop-blur-3xl border border-white/10 p-4 rounded-2xl shadow-xl group hover:bg-white/15 transition-all"
                                    >
                                        {/* Category Header */}
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all duration-500 shrink-0">
                                                <ArrowRight className="text-white w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="px-2.5 py-0.5 bg-white/20 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block mb-3">{category}</div>

                                                {/* All suggestions for this category */}
                                                <div className="space-y-2">
                                                    {suggestions.map((suggestion, idx) => (
                                                        <div key={idx} className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 shrink-0"></div>
                                                            <p className="text-base leading-relaxed font-bold text-white">{suggestion}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Do's and Don'ts */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/10">
                                            {/* Do's */}
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <CheckCircle className="w-3 h-3 text-emerald-300" />
                                                    <span className="text-[10px] font-black text-emerald-300 uppercase tracking-wider">Do</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-start gap-1.5">
                                                        <div className="w-1 h-1 bg-emerald-300 rounded-full mt-1.5 shrink-0"></div>
                                                        <span className="text-xs text-white/80 leading-tight">
                                                            {category === 'Technical' ? 'Build projects showcasing this skill' :
                                                                category === 'Experience' ? 'Quantify your achievements with metrics' :
                                                                    category === 'Keywords' ? 'Integrate naturally in context' :
                                                                        category === 'Soft Skills' ? 'Provide concrete examples from experience' :
                                                                            'Focus on practical application'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-start gap-1.5">
                                                        <div className="w-1 h-1 bg-emerald-300 rounded-full mt-1.5 shrink-0"></div>
                                                        <span className="text-xs text-white/80 leading-tight">
                                                            {category === 'Technical' ? 'Get certified if possible' :
                                                                category === 'Experience' ? 'Use action verbs and specifics' :
                                                                    category === 'Keywords' ? 'Match job description terms' :
                                                                        category === 'Soft Skills' ? 'Show impact on team/project outcomes' :
                                                                            'Demonstrate with examples'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Don'ts */}
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <X className="w-3 h-3 text-rose-300" />
                                                    <span className="text-[10px] font-black text-rose-300 uppercase tracking-wider">Don't</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-start gap-1.5">
                                                        <div className="w-1 h-1 bg-rose-300 rounded-full mt-1.5 shrink-0"></div>
                                                        <span className="text-xs text-white/80 leading-tight">
                                                            {category === 'Technical' ? 'List without proof or context' :
                                                                category === 'Experience' ? 'Use vague or generic terms' :
                                                                    category === 'Keywords' ? 'Stuff keywords unnaturally' :
                                                                        category === 'Soft Skills' ? 'Use clichés without backing them up' :
                                                                            'Make unverifiable claims'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-start gap-1.5">
                                                        <div className="w-1 h-1 bg-rose-300 rounded-full mt-1.5 shrink-0"></div>
                                                        <span className="text-xs text-white/80 leading-tight">
                                                            {category === 'Technical' ? 'Exaggerate proficiency level' :
                                                                category === 'Experience' ? 'Copy-paste job descriptions' :
                                                                    category === 'Keywords' ? 'Use irrelevant buzzwords' :
                                                                        category === 'Soft Skills' ? 'List traits without evidence' :
                                                                            'Ignore relevance to role'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ));
                            })()}
                        </div>
                    </div>

                    {/* Right: Growth Roadmap */}
                    <div className="w-full md:w-2/5 bg-slate-900/40 backdrop-blur-3xl rounded-2xl p-5 border border-white/10 self-stretch">
                        <h3 className="text-lg font-black mb-5 flex items-center gap-2">
                            <TrendingUp size={18} /> Growth Timeline
                        </h3>

                        <div className="relative space-y-8">
                            <div className="absolute left-[19px] top-2 bottom-2 w-1 bg-white/20"></div>

                            <div className="relative flex gap-6 group">
                                <div className="w-7 h-7 rounded-full bg-white text-purple-600 flex items-center justify-center font-black text-[8px] shadow-xl border-2 border-purple-600/30 z-10 transition-all group-hover:scale-110">NOW</div>
                                <div>
                                    <h4 className="text-[10px] font-black text-purple-300 uppercase tracking-widest mb-0.5">Phase 1: 0-30 Days</h4>
                                    <p className="text-base font-black text-white leading-snug">{data.roadmap?.immediate}</p>
                                </div>
                            </div>

                            <div className="relative flex gap-6 group">
                                <div className="w-7 h-7 rounded-full bg-purple-400 text-white flex items-center justify-center font-black text-[8px] shadow-xl border-2 border-purple-600/30 z-10 transition-all group-hover:scale-110">NEXT</div>
                                <div>
                                    <h4 className="text-[10px] font-black text-purple-300 uppercase tracking-widest mb-0.5">Phase 2: 1-3 Months</h4>
                                    <p className="text-base font-black text-white leading-snug">{data.roadmap?.shortTerm}</p>
                                </div>
                            </div>

                            <div className="relative flex gap-6 group">
                                <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-black text-[8px] shadow-xl border-2 border-purple-600/30 z-10 transition-all group-hover:scale-110">GOAL</div>
                                <div>
                                    <h4 className="text-[10px] font-black text-purple-300 uppercase tracking-widest mb-0.5">Phase 3: 3-6 Months</h4>
                                    <p className="text-base font-black text-white leading-snug">{data.roadmap?.mediumTerm}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final Conclusion Footer */}
            {/* <div className="pt-20 text-center">
                <p className="text-slate-400 font-bold mb-4">Neural Intelligence Report Generated by Bravers AI Engine</p>
                <div className="flex justify-center gap-4 text-xs font-bold text-indigo-600/40 uppercase tracking-tighter">
                    <span>Benchmark v4.2</span>
                    <span>•</span>
                    <span>Context-Aware Inference</span>
                    <span>•</span>
                    <span>No-Score Neutral Analysis</span>
                </div>
            </div> */}
        </motion.div>
    );
};

// Internal Components
const PlusIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const RefreshIcon = ({ size, className }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>;

export default ResumeAnalyze;
