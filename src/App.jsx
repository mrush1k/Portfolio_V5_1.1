import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useCallback } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import RAGChatbotWidget from "./Pages/RAGChatbotWidget";// 🚨 1. Import the chat widget
import Experience from "./components/Experience";
import { AnimatePresence } from 'framer-motion';

// --- Landing Page Component ---
// Now accepts the chat state handlers as props
const LandingPage = ({ showWelcome, setShowWelcome, onAIDemoClick }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          {/* 🚨 2. Pass the handler to the Navbar */}
          <Navbar onAIDemoClick={onAIDemoClick} /> 
          <AnimatedBackground />
          <Home />
          <About />
          <Experience />
          <Portofolio />
          <ContactPage />
          
          <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                © 2025{" "}
                <a href="https://flowbite.com/" className="hover:underline">
                  Kushraj™
                </a>
                . All Rights Reserved.
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

// --- Project Page Layout (Unchanged) ---
const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Kushraj™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

// --- Main App Component ---
function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  
  // 🚨 3. Define the chat state
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 🚨 4. Define the handler function
  const handleAIDemoClick = useCallback(() => {
    setIsChatOpen(true);
  }, []);

  return (
    <BrowserRouter>
      {/* 🚨 5. Render the RAG Chatbot Widget globally at the App level */}
      <RAGChatbotWidget 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
      
      <Routes>
        {/* Pass the handler down to LandingPage */}
        <Route 
          path="/" 
          element={<LandingPage 
            showWelcome={showWelcome} 
            setShowWelcome={setShowWelcome} 
            onAIDemoClick={handleAIDemoClick} // Pass the handler
          />} 
        />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;