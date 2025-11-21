import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// The useTheme hook is not being used, so we remove the import to prevent errors.
// import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject"; // Assumed path
import TechStackIcon from "../components/TechStackIcon"; // Assumed path
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate"; // Assumed path
import { Code, Award, Boxes } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// ----------------------------------------------------------------------
// 🚨 UPDATED TECH STACKS
// Added new ML/AI technologies to the list
// ----------------------------------------------------------------------
const techStacks = [
  { icon: "/python.jpeg", language: "Python" },
  { icon: "ML.png", language: "Machine Learning" },
  { icon: "AI.webp", language: "AI / LLMs" },
  { icon: "/langchain.svg", language: "LangChain" },
  { icon: "/langgraph.svg", language: "LangGraph" },
  { icon: "/yolo.svg", language: "YOLOv8" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "/vectorstore.svg", language: "Vector DB" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "/git12.png", language: "Git" },
  { icon: "/django12.png", language: "Django" },
  { icon: "/fastapi.png", language: "FASTAPI" },
];

// ----------------------------------------------------------------------
// 🚀 UPDATED PROJECTS DATA
// Added your 5 new projects with specific details.
// NOTE: CardProject component is assumed to handle 'Link' as the GitHub URL.
// ----------------------------------------------------------------------
const projectsData = [
  {
    id: 1,
    // Ensure you place the image file in your assets folder!
    Img:"/images/langgraph_chatbot.png",
    Title: "LangGraph Memory Retention Chatbot",
    Description: "An advanced, ChatGPT-like chatbot leveraging LangGraph for robust memory retention and complex conversational flows. Uses a graph-based structure for intelligent context management.",
    Link: "https://github.com/KUSHRAJSINH/LangGraph_Chatbot", 
    TechStack: ["Python", "LangGraph", "OpenAI API", "React"],
    Features: ["Maintains conversational history and context", "Dynamic routing for complex queries", "Supports multi-turn interactions", "Scalable architecture for future enhancements"],
  },
  {
    id: 2,
    Img: "/images/game_agent.png",
    Title: "AI Game Agent (Number Guesser)",
    Description: "An interactive AI agent designed to efficiently guess numbers and play a game with you. It uses strategic algorithms for challenging and engaging interaction.",
    Link: "https://github.com/KUSHRAJSINH/game_agent_1.1", 
    TechStack: ["Python", "AI / LLMs", "Javascript"],
    Features: ["Intelligent number guessing strategy", "Interactive command-line or web interface", "Provides hints and feedback", "Adaptable to different number ranges"],
  },
  {
    id: 3,
    Img: "/images/car_tracker.png",
    Title: "Real-time Car Detection (YOLOv8)",
    Description: "A high-performance system for real-time car detection and tracking in video streams, built using the state-of-the-art YOLOv8 model for high accuracy.",
    Link: "https://github.com/KUSHRAJSINH/YOLOv8-Car-Tracker", 
    TechStack: ["Python", "YOLOv8", "OpenCV"],
    Features: ["Detects multiple car types with high precision", "Processes video frames in real-time", "Provides bounding boxes and confidence scores", "Lightweight and optimized for performance"],
  },
  {
    id: 4,
    Img:  "/images/rag_chatbot.png", 
    Title: "RAG-Based Chatbot for Documents",
    Description: "A Retrieval-Augmented Generation (RAG) chatbot tailored for personal documents. It provides context-aware answers grounded in your specific data, ideal for knowledge management.",
    Link: "https://github.com/KUSHRAJSINH/Rag_Chatbot", 
    TechStack: ["Python", "LangChain", "AI / LLMs", "Streamlit"],
    Features: ["Answers questions based on user-provided documents", "Reduces LLM 'hallucinations' by grounding responses", "Supports various document formats", "Secure and private data handling for personal use"],
  },
  {
    id: 5,
    Img:  "/images/finance_agent.png", 
    Title: "Finance AI Agent with News Guidance",
    Description: "A smart AI agent designed for **financial analysis and guidance**, integrating the latest financial news to inform its recommendations. It helps users track investments, understand market movements, and make informed decisions with up-to-the-minute insights.",
    Link: "https://github.com/KUSHRAJSINH/Finance_AI_Agent", 
    TechStack: ["Python", "React", "Express", "Financial APIs"],
    Features: ["Aggregates and analyzes real-time financial news", "Provides personalized investment insights", "Tracks portfolio performance", "Generates comprehensive market reports"],
  },
  {
    id: 6,
    Img: "/images/face_recognition_attendance.png", 
    Title: "Face Recognition Attendance System",
    Description: "An automated attendance system that uses **OpenCV** for real-time **face recognition**. It eliminates manual entries by accurately identifying individuals from a video feed, ideal for academic or corporate environments.",
    Link: "https://github.com/KUSHRAJSINH/Face_Recognition_Attendance_System", 
    TechStack: ["Python", "OpenCV", "Machine Learning", "Database"],
    Features: ["Real-time face detection and recognition", "Automatic attendance logging with timestamps", "Secure user enrollment process", "Integration potential with databases (e.g., SQLite, MySQL)"],
  },

  // Existing placeholders are commented out for a clean list:
  // {
  //   id: 6,
  //   Img: "path/to/to_do_list_image.jpg",
  //   Title: "To-Do List (Old)",
  //   Description: "A simple to-do list application built with Django.",
  //   Link: "https://github.com/yourusername/to_do_list",
  //   TechStack: ["Django", "Python", "HTML", "CSS"],
  // },
  // {
  //   id: 7,
  //   Img: "path/to/blog_api_image.jpg",
  //   Title: "Blog API (Old)",
  //   Description: "A RESTful API for a blog application built with Django.",
  //   Link: "https://github.com/yourusername/blog_api",
  //   TechStack: ["Django", "Python", "REST API"],
  // },
];

const certificatesData = [
  {
    Img: "certificates/AI with Python.png",
  },
  {
    Img: "certificates/Data Structure.png",
  },
  {
    Img: "certificates/Machine Learning with Python.png",
  },
  {
    Img: "certificates/Web-Development.png",
  },
  {
    Img: "certificates/Exploratory Data Analysis for Machine Learning.png",
  },
];

export default function FullWidthTabs() {
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  // NOTE: This logic for initialItems relies on window being defined. 
  // It's best practice to use window in useEffect or a context provider, but 
  // kept here as per your original code pattern.
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur repeatedly on scroll
    });
    // This is necessary if you want to use the updated projects in the details page
    // as your ProjectDetails component loads from localStorage.
    // NOTE: If you are already setting localStorage elsewhere, you can remove this.
    localStorage.setItem("projects", JSON.stringify(projectsData));
    
    // Refresh AOS whenever the tab/content changes to ensure proper animation detection
    AOS.refresh();
  }, [value]); // Added value to dependency array to refresh AOS on tab change

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = (type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  };

  const displayedProjects = showAllProjects ? projectsData : projectsData.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificatesData : certificatesData.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        {/* Tab Panel: Projects */}
        <TabPanel value={value} index={0}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {displayedProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : index % 3 === 2 ? "fade-up-left" : "fade-up"}
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                >
                  <CardProject
                    Img={project.Img}
                    Title={project.Title}
                    Description={project.Description}
                    Link={project.Link} // Passes the GitHub link
                    id={project.id}
                  />
                </div>
              ))}
            </div>
          </div>
          {projectsData.length > initialItems && (
            <div className="mt-6 w-full flex justify-start">
              <ToggleButton
                onClick={() => toggleShowMore('projects')}
                isShowingMore={showAllProjects}
              />
            </div>
          )}
        </TabPanel>

        {/* Tab Panel: Certificates */}
        <TabPanel value={value} index={1}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
              {displayedCertificates.map((certificate, index) => (
                <div
                  key={index}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : index % 3 === 2 ? "fade-up-left" : "fade-up"}
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                >
                  <Certificate ImgSertif={certificate.Img} />
                </div>
              ))}
            </div>
          </div>
          {certificatesData.length > initialItems && (
            <div className="mt-6 w-full flex justify-start">
              <ToggleButton
                onClick={() => toggleShowMore('certificates')}
                isShowingMore={showAllCertificates}
              />
            </div>
          )}
        </TabPanel>

        {/* Tab Panel: Tech Stack */}
        <TabPanel value={value} index={2}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : index % 3 === 2 ? "fade-up-left" : "fade-up"}
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                >
                  <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}