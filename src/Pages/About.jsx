import React, { useEffect, memo } from "react";
import { FileText, Code, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <h2
      className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
      data-aos="zoom-in-up"
      data-aos-duration="600"
    >
      About Me
    </h2>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 p-2 pb-4">
    <div
      className="relative group"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="absolute -inset-6 opacity-[25%] hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] group-hover:scale-105 transition-all duration-700">
          <img
            src="/kush33.jpg"
            alt="Profile"
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
          />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  return (
    <div
      className="h-auto pb-[10%] text-white px-[5%] lg:px-[10%] mt-10"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span className="block mt-2 text-gray-200">
                KUSHRAJSINH ZALA
              </span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              Focused on agentic workflows and retrieval. I design and ship
              LangGraph-powered pipelines with robust tracing, testing, and
              observability via LangSmith.
            </p>

            <div className="flex flex-col lg:flex-row items-center gap-4">
              <a
                href="https://drive.google.com/uc?export=download&id=1IVoXHJgYCuXZKrkLy7JcFUYgy6YwIS38"
                className="w-full lg:w-auto"
              >
                <button className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" /> Download CV
                </button>
              </a>

              <a href="#Portofolio" className="w-full lg:w-auto">
                <button className="border border-[#a855f7]/50 text-[#a855f7] px-6 py-3 rounded-lg hover:bg-[#a855f7]/10 hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <Code className="w-5 h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>
      </div>
    </div>
  );
};

export default memo(AboutPage);
