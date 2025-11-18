import React, { useEffect, memo, useMemo, useState } from "react";
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// =============================
// Memoized Components
// =============================

const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
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
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div
      className="relative group"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Background glows (desktop only) */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />

          {/* Overlays (desktop only) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

          <img
            src="/kush33.jpg"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          {/* Extra hover effects (desktop only) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span
          className="text-4xl font-bold text-white"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p
          className="text-sm uppercase tracking-wider text-gray-300 mb-2"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p
            className="text-xs text-gray-400"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

// =============================
// Main About Page
// =============================

const AboutPage = () => {
  // Projects & certificates count
  const { totalProjects, totalCertificates } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    return {
      totalProjects: storedProjects.length,
      totalCertificates: 5, // fixed for now
    };
  }, []);

  // Animated Years + Months Counter (from April 2025)
  const [expDisplay, setExpDisplay] = useState({ years: 0, months: 0 });

  useEffect(() => {
    const startDate = new Date("2025-04-01");
    const now = new Date();

    // Calculate actual difference in months
    let diffYears = now.getFullYear() - startDate.getFullYear();
    let diffMonths = now.getMonth() - startDate.getMonth();

    if (now.getDate() < startDate.getDate()) {
      diffMonths -= 1;
    }

    let totalMonths = diffYears * 12 + diffMonths;
    if (totalMonths < 0) totalMonths = 0; // safety

    const finalYears = Math.floor(totalMonths / 12);
    const finalMonths = totalMonths % 12;

    if (totalMonths === 0) {
      setExpDisplay({ years: finalYears, months: finalMonths });
      return;
    }

    // Animate 0 → totalMonths
    let current = 0;
    const frames = 60;
    const increment = totalMonths / frames;

    const animate = () => {
      current += increment;

      if (current >= totalMonths) {
        setExpDisplay({ years: finalYears, months: finalMonths });
        return;
      }

      const y = Math.floor(current / 12);
      const m = Math.floor(current % 12);

      setExpDisplay({ years: y, months: m });
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  // AOS init
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
      });
    };

    initAOS();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Timeline scroll progress line
  useEffect(() => {
    const progressLine = document.getElementById("timeline-progress");

    const onScroll = () => {
      const expSection = document.getElementById("experience");
      if (!expSection || !progressLine) return;

      const rect = expSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalHeight = rect.height;
      const visible = Math.min(windowHeight - rect.top, totalHeight);

      const percentage = Math.max(0, Math.min(visible / totalHeight, 1)) * 100;
      progressLine.style.height = `${percentage}%`;
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // run once

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stats section data
  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#6366f1] to-[#a855f7]",
        value: totalProjects,
        label: "Total Projects",
        description: "Building AI-powered and cutting-edge web solutions.",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-[#a855f7] to-[#6366f1]",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-[#6366f1] to-[#a855f7]",
        value: `${expDisplay.years} Yr ${expDisplay.months} Mo`,
        label: "Experience",
        description: "Growing every month",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates, expDisplay]
  );

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm:mt-0"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        {/* Top section: intro + profile */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                KUSHRAJSINH ZALA
              </span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Focused on agentic workflows and retrieval. I design and ship
              LangGraph-powered pipelines with robust tracing, testing, and
              observability via LangSmith.
            </p>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a
                href="https://drive.google.com/uc?export=download&id=1mVsHLzr76VxBL16GlFLEf_JBSeFTLJr_"
                className="w-full lg:w-auto"
              >
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl animate-bounce-slow"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                </button>
              </a>
              <a href="#Portofolio" className="w-full lg:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10 animate-bounce-slow delay-200"
                >
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        {/* ================================
            PREMIUM EXPERIENCE TIMELINE
        ================================= */}
        <div className="mt-24 relative" id="experience">
          {/* Title */}
          <h3
            className="text-3xl md:text-5xl font-bold text-center mb-14"
            data-aos="zoom-in"
            data-aos-duration="800"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
              Work Experience
            </span>
          </h3>

          {/* Static Line */}
          <div className="absolute left-8 sm:left-14 top-0 bottom-0 w-1 bg-white/10 rounded-full" />

          {/* Scroll Progress Line */}
          <div
            id="timeline-progress"
            className="absolute left-8 sm:left-14 top-0 w-1 bg-gradient-to-b from-[#6366f1] via-[#a855f7] to-pink-500 rounded-full shadow-lg"
            style={{ height: "0%" }}
          />

          <div className="ml-16 sm:ml-24 space-y-16 relative">
            {/* TIMELINE ITEM 1 – LogicRays */}
            <div
              className="relative"
              data-aos="fade-right"
              data-aos-duration="900"
            >
              {/* Dots */}
              <span className="absolute -left-12 top-2 w-10 h-10 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full shadow-lg animate-ping opacity-40" />
              <span className="absolute -left-12 top-2 w-6 h-6 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full shadow-xl" />

              {/* Card */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-[0_0_30px_rgba(120,119,198,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(120,119,255,0.45)] hover:border-white/20 relative overflow-hidden">
                {/* Glow */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.5),transparent_50%)]" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logos/logicrays.png"
                      alt="LogicRays Logo"
                      className="w-10 h-10 rounded-lg object-contain shadow-lg"
                    />
                    <h4 className="text-xl sm:text-2xl font-semibold text-white">
                      AIML Engineer — LogicRays Technologies
                    </h4>
                  </div>

                  <span className="text-sm text-gray-300 whitespace-nowrap">
                    Nov 2025 – Present
                  </span>
                </div>

                <p className="text-gray-300 mt-3 text-sm">
                  Building AI/LLM automation workflows with advanced agentic
                  systems.
                </p>

                <ul className="mt-4 space-y-2 text-gray-300 text-[15px]">
                  <li>• Developed multi-agent LangGraph pipelines</li>
                  <li>• Built RAG systems using FAISS + BGE embeddings</li>
                  <li>• Created tools with OpenAI + LangChain</li>
                  <li>• Optimized inference cost using model tuning + caching</li>
                </ul>
              </div>
            </div>

            {/* TIMELINE ITEM 2 – Petpooja */}
            <div
              className="relative"
              data-aos="fade-right"
              data-aos-duration="900"
            >
              {/* Dots */}
              <span className="absolute -left-12 top-2 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg animate-ping opacity-40" />
              <span className="absolute -left-12 top-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-xl" />

              {/* Card */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-[0_0_30px_rgba(240,80,230,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(240,80,255,0.45)] hover:border-white/20 relative overflow-hidden">
                {/* Glow */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,80,150,0.4),transparent_50%)]" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logos/petpooja2.png"
                      alt="Petpooja Logo"
                      className="w-10 h-10 rounded-lg object-contain shadow-lg"
                    />
                    <h4 className="text-xl sm:text-2xl font-semibold text-white">
                      Data Science Intern — Petpooja
                    </h4>
                  </div>

                  <span className="text-sm text-gray-300 whitespace-nowrap">
                    Apr 2025 – Nov 2025
                  </span>
                </div>

                <p className="text-gray-300 mt-3 text-sm">
                  Hands-on ML model building & analytics for production
                  workflows.
                </p>

                <ul className="mt-4 space-y-2 text-gray-300 text-[15px]">
                  <li>• Built ML predictive models & preprocessing pipelines</li>
                  <li>• Performed analytics using Pandas, NumPy, Scikit-Learn</li>
                  <li>• Helped create internal automation tools</li>
                  <li>• Assisted FastAPI model serving</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes spin-slower {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
