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
        // FIX: Using the confirmed path /project_image/
        Img: "/project_image/langgraph_chatbot.png", 
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
        // FIX: Using the confirmed path /project_image/
        Img: "/project_image/ai_agent_game.png", 
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
        // FIX: Using the confirmed path /project_image/
        Img: "/project_image/car_detection.png", 
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
        // FIX: Using the confirmed path /project_image/
        Img: "/project_image/Rag_based_chatbot.png", 
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
        // FIX: Using the confirmed path /project_image/
        Img: "/project_image/financial_agent.png", 
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
    // FIX: Using the confirmed path /project_image/
    Img: "/project_image/face_attedence.png", 
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
// TECH_ICONS mapping (Only uses Lucide Icons, no custom image paths needed here)
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

    // ... (TechBadge rendering logic is correct for Lucide Icons)
    // The missing icons (Django, FastAPI, etc.) are likely custom images 
    // used in *another* component, as this component only uses Lucide Icons.
    
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

// ... (FeatureItem and ProjectStats components are unchanged)
// ... (ProjectDetails component logic is unchanged, it correctly uses project.Img)
// ... (Component export and CSS are unchanged)

export default ProjectDetails;