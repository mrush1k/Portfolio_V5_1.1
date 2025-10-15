import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft, ExternalLink, Github, Code2, Star,
    ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from 'sweetalert2';

// ----------------------------------------------------------------------
// Project Data - Integrated directly into this file
// ----------------------------------------------------------------------
const PROJECTS_DATA = [
    {
        id: 1,
        Title: "LangGraph Memory Retention Chatbot",
        Description: "An advanced, ChatGPT-like chatbot leveraging **LangGraph** for robust memory retention and complex conversational flows. This agent intelligently remembers context across interactions, offering a more natural and personalized user experience.",
        Link: "Not Deployed Yet", // Update with a live demo URL if available
        Github: "https://github.com/KUSHRAJSINH/LangGraph_Chatbot",
        Img: "/images/langgraph_chatbot.png", // Ensure this path is correct in your public folder
        TechStack: ["Python", "LangGraph", "OpenAI API", "React"],
        Features: [
            "Maintains conversational history and context",
            "Dynamic routing for complex queries",
            "Supports multi-turn interactions",
            "Scalable architecture for future enhancements"
        ],
    },
    {
        id: 2,
        Title: "AI Game Agent (Number Guesser)",
        Description: "An interactive AI game agent designed to play a **number-guessing game** with you. It uses strategic algorithms to efficiently guess numbers, providing an engaging and challenging interactive experience.",
        Link: "Not Deployed Yet", // Update with a live demo URL if available
        Github: "https://github.com/KUSHRAJSINH/game_agent_1.1",
        Img: "/images/game_agent.png", // Ensure this path is correct
        TechStack: ["Python", "OpenAI API", "Javascript"],
        Features: [
            "Intelligent number guessing strategy",
            "Interactive command-line or web interface",
            "Provides hints and feedback",
            "Adaptable to different number ranges"
        ],
    },
    {
        id: 3,
        Title: "Real-time Car Detection (YOLOv8)",
        Description: "A high-performance **real-time car detection system** built with YOLOv8. It accurately identifies and tracks vehicles in live video feeds, perfect for traffic monitoring, autonomous driving research, or surveillance applications.",
        Link: "Not Deployed Yet",
        Github: "https://github.com/KUSHRAJSINH/YOLOv8-Car-Tracker",
        Img: "/images/car_tracker.png", // Ensure this path is correct
        TechStack: ["Python", "YOLOv8", "OpenCV"],
        Features: [
            "Detects multiple car types with high precision",
            "Processes video frames in real-time",
            "Provides bounding boxes and confidence scores",
            "Lightweight and optimized for performance"
        ],
    },
    {
        id: 4,
        Title: "RAG-Based Chatbot for Personal Documents",
        Description: "A **Retrieval-Augmented Generation (RAG) chatbot** tailored for personal document use cases. Upload your own documents (PDFs, text files, etc.), and the chatbot will provide accurate, context-aware answers grounded in your specific data, ideal for personal knowledge management.",
        Link: "Not Deployed Yet",
        Github: "https://github.com/KUSHRAJSINH/Rag_Chatbot",
        Img: "/images/rag_chatbot.png", // Ensure this path is correct
        TechStack: ["Python", "LangChain", "OpenAI API", "Streamlit"],
        Features: [
            "Answers questions based on user-provided documents",
            "Reduces LLM 'hallucinations' by grounding responses",
            "Supports various document formats",
            "Secure and private data handling for personal use"
        ],
    },
    {
        id: 5,
        Title: "Finance AI Agent with News Guidance",
        Description: "A smart AI agent designed for **financial analysis and guidance**, integrating the latest financial news to inform its recommendations. It helps users track investments, understand market movements, and make informed decisions with up-to-the-minute insights.",
        Link: "Not Deployed Yet",
        Github: "https://github.com/KUSHRAJSINH/Finance_AI_Agent",
        Img: "/images/finance_agent.png", // Ensure this path is correct
        TechStack: ["Python", "React", "Express", "Financial APIs"],
        Features: [
            "Aggregates and analyzes real-time financial news",
            "Provides personalized investment insights",
            "Tracks portfolio performance",
            "Generates comprehensive market reports"
        ],
    },
    {
    id: 6,
    Img: "/images/face_recognition_attendance.png", // New placeholder path (Ensure this image exists!)
    Title: "Face Recognition Attendance System",
    Description: "An automated attendance system that uses **OpenCV** for real-time **face recognition**. It eliminates manual entries by accurately identifying individuals from a video feed, ideal for academic or corporate environments.",
    Link: "Not Deployed Yet",
    Github: "https://github.com/KUSHRAJSINH/Face_Recognition_Attendance_System", // GitHub Link
    TechStack: ["Python", "OpenCV", "Machine Learning", "Database"],
    Features: [
        "Real-time face detection and recognition",
        "Automatic attendance logging with timestamps",
        "Integration potential with databases (e.g., SQLite, MySQL)"
    ],
  },
];

// ----------------------------------------------------------------------
// TECH_ICONS mapping
// ----------------------------------------------------------------------
const TECH_ICONS = {
    React: Globe,
    Tailwind: Layout,
    Express: Cpu,
    Python: Code,
    Javascript: Code,
    HTML: Code,
    CSS: Code,
    LangGraph: Layers,
    LangChain: Package,
    "OpenAI API": Star,
    YOLOv8: Cpu,
    OpenCV: Code2,
    Streamlit: Layout,
    "Financial APIs": Globe,
    default: Package,
};

const TechBadge = ({ tech }) => {
    const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];

    return (
        <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
            <div className="relative flex items-center gap-1.5 md:gap-2">
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
                    {tech}
                </span>
            </div>
        </div>
    );
};

const FeatureItem = ({ feature }) => {
    return (
        <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
            <div className="relative mt-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
            </div>
            <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
                {feature}
            </span>
        </li>
    );
};

const ProjectStats = ({ project }) => {
    const techStackCount = project?.TechStack?.length || 0;
    const featuresCount = project?.Features?.length || 0;

    return (
        <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />

            <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
                <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
                    <Code2 className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
                </div>
                <div className="flex-grow">
                    <div className="text-lg md:text-xl font-semibold text-blue-200">{techStackCount}</div>
                    <div className="text-[10px] md:text-xs text-gray-400">Total Teknologi</div>
                </div>
            </div>

            <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg">
                <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
                    <Layers className="text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
                </div>
                <div className="flex-grow">
                    <div className="text-lg md:text-xl font-semibold text-purple-200">{featuresCount}</div>
                    <div className="text-[10px] md:text-xs text-gray-400">Fitur Utama</div>
                </div>
            </div>
        </div>
    );
};

const handleLinkClick = (link, type) => {
    if (!link || !link.startsWith('http')) {
        Swal.fire({
            icon: 'info',
            title: `${type} Not Available`,
            text: `Maaf, ${type === 'Live Demo' ? 'proyek ini belum di-deploy atau link tidak valid.' : 'source code untuk proyek ini tidak tersedia publik atau sedang disiapkan.'}`,
            confirmButtonText: 'Mengerti',
            confirmButtonColor: '#3085d6',
            background: '#030014',
            color: '#ffffff'
        });
        return false;
    }
    return true;
};

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Directly use the PROJECTS_DATA array defined above
        const selectedProject = PROJECTS_DATA.find((p) => String(p.id) === id);

        if (selectedProject) {
            // Ensure default values if any property is missing
            const enhancedProject = {
                ...selectedProject,
                Features: selectedProject.Features || [],
                TechStack: selectedProject.TechStack || [],
                Github: selectedProject.Github || 'Not Available',
                Link: selectedProject.Link || 'Not Deployed Yet',
            };
            setProject(enhancedProject);
        } else {
            // If project ID is not found, navigate back to the projects page or a 404
            navigate('/projects');
        }
    }, [id, navigate]);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#030014] flex items-center justify-center">
                <div className="text-center space-y-6 animate-fadeIn">
                    <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                    <h2 className="text-xl md:text-3xl font-bold text-white">Loading Project...</h2>
                </div>
            </div>
        );
    }

    // Helper function to check if the link is a valid URL
    const isLiveLinkValid = project.Link && project.Link.startsWith('http');
    const isGithubLinkValid = project.Github && project.Github.startsWith('http');

    return (
        <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
            {/* Background animations remain unchanged */}
            <div className="fixed inset-0">
                <div className="absolute -inset-[10px] opacity-20">
                    <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                    <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
                </div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </div>

            <div className="relative">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
                    <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
                        <button
                            onClick={() => navigate(-1)}
                            className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base"
                        >
                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                            <span>Back</span>
                        </button>
                        <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
                            <span>Projects</span>
                            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="text-white/90 truncate">{project.Title}</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
                        {/* Start of Left Column (Content) */}
                        <div className="space-y-6 md:space-y-10 animate-slideInLeft">
                            <div className="space-y-4 md:space-y-6">
                                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                                    {project.Title}
                                </h1>
                                <div className="relative h-1 w-16 md:w-24">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm" />
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
                                    {project.Description}
                                </p>
                            </div>

                            <ProjectStats project={project} />

                            <div className="flex flex-wrap gap-3 md:gap-4">
                                {/* Action buttons - Live Demo Link */}
                                <a
                                    href={isLiveLinkValid ? project.Link : '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 rounded-xl transition-all duration-300 backdrop-blur-xl overflow-hidden text-sm md:text-base
                                        ${isLiveLinkValid
                                            ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-blue-300 border border-blue-500/20 hover:border-blue-500/40'
                                            : 'bg-gray-700/50 text-gray-400 cursor-not-allowed border border-gray-600/50'
                                        }`}
                                    onClick={(e) => !isLiveLinkValid && e.preventDefault()}
                                >
                                    <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                                    <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                                    <span className="relative font-medium">{isLiveLinkValid ? 'Live Demo' : 'Not Deployed Yet'}</span>
                                </a>

                                {/* Action buttons - Github Link */}
                                <a
                                    href={isGithubLinkValid ? project.Github : '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 rounded-xl transition-all duration-300 backdrop-blur-xl overflow-hidden text-sm md:text-base
                                        ${isGithubLinkValid
                                            ? 'bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 border border-purple-500/20 hover:border-purple-500/40'
                                            : 'bg-gray-700/50 text-gray-400 cursor-not-allowed border border-gray-600/50'
                                        }`}
                                    onClick={(e) => !handleLinkClick(project.Github, "Source Code") && e.preventDefault()}
                                >
                                    <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                                    <Github className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                                    <span className="relative font-medium">{isGithubLinkValid ? 'Github' : 'Source Not Public'}</span>
                                </a>
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                <h3 className="text-lg md:text-xl font-semibold text-white/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                                    <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                                    Technologies Used
                                </h3>
                                {project.TechStack.length > 0 ? (
                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {project.TechStack.map((tech, index) => (
                                            <TechBadge key={index} tech={tech} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm md:text-base text-gray-400 opacity-50">No technologies added.</p>
                                )}
                            </div>
                        </div>
                        {/* End of Left Column */}

                        {/* Start of Right Column (Image and Features) */}
                        <div className="space-y-6 md:space-y-10 animate-slideInRight">
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                                {/* Placeholder for Project Screenshot */}
                                {project.Img ? (
                                    <img
                                        src={project.Img}
                                        alt={project.Title}
                                        className="w-full h-auto object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                                        onLoad={() => setIsImageLoaded(true)}
                                    />
                                ) : (
                                    <div className="w-full h-60 md:h-80 flex items-center justify-center bg-gray-800/50 text-gray-400 text-lg rounded-xl">
                                        No Image Available
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
                            </div>

                            {/* Key Features */}
                            <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300 group">
                                <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                                    <Star className="w-5 h-5 text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                                    Key Features
                                </h3>
                                {project.Features.length > 0 ? (
                                    <ul className="list-none space-y-2">
                                        {project.Features.map((feature, index) => (
                                            <FeatureItem key={index} feature={feature} />
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 opacity-50">No features added.</p>
                                )}
                            </div>
                        </div>
                        {/* End of Right Column */}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 10s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.7s ease-out;
                }
                .animate-slideInLeft {
                    animation: slideInLeft 0.7s ease-out;
                }
                .animate-slideInRight {
                    animation: slideInRight 0.7s ease-out;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default ProjectDetails;