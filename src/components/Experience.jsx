import React, { useEffect, useState, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Globe, ArrowUpRight } from "lucide-react";

const StatCard = ({ icon: Icon, color, value, label, description }) => (
  <div className="relative group">
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:scale-105 transition-all duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20`} />
      <div className="relative flex items-center justify-between">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span className="text-4xl font-bold text-white">{value}</span>
      </div>
      <p className="text-gray-300 mt-4 text-sm uppercase">{label}</p>
      <div className="flex items-center justify-between text-gray-400 text-xs">
        {description}
        <ArrowUpRight className="w-4 h-4 text-white/50" />
      </div>
    </div>
  </div>
);

const Experience = () => {
  // Animated Experience Counter
  const [expDisplay, setExpDisplay] = useState({ years: 0, months: 0 });

  useEffect(() => {
    const startDate = new Date("2025-04-01");
    const now = new Date();

    let diffYears = now.getFullYear() - startDate.getFullYear();
    let diffMonths = now.getMonth() - startDate.getMonth();
    if (now.getDate() < startDate.getDate()) diffMonths -= 1;

    let totalMonths = diffYears * 12 + diffMonths;
    if (totalMonths < 0) totalMonths = 0;

    const finalYears = Math.floor(totalMonths / 12);
    const finalMonths = totalMonths % 12;

    let current = 0;
    const frames = 60;
    const increment = totalMonths / frames;

    const animate = () => {
      current += increment;
      if (current >= totalMonths) {
        setExpDisplay({ years: finalYears, months: finalMonths });
        return;
      }
      setExpDisplay({
        years: Math.floor(current / 12),
        months: Math.floor(current % 12),
      });
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  // Stats Calculation
  const statsData = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    return [
      {
        icon: Code,
        color: "from-[#6366f1] to-[#a855f7]",
        value: storedProjects.length,
        label: "Projects",
        description: "Built with modern AI workflows",
      },
      {
        icon: Award,
        color: "from-[#a855f7] to-[#6366f1]",
        value: 5,
        label: "Certificates",
        description: "Validated technical excellence",
      },
      {
        icon: Globe,
        color: "from-[#6366f1] to-[#a855f7]",
        value: `${expDisplay.years} Yr ${expDisplay.months} Mo`,
        label: "Experience",
        description: "Learning every month",
      },
    ];
  }, [expDisplay]);

  // AOS init
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  // Scroll animation for timeline line
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
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="experience" className="relative mt-28 px-[5%] lg:px-[10%] pb-20 text-white">
      <h3
        className="text-3xl md:text-5xl font-bold text-center mb-14 bg-clip-text text-transparent bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in"
      >
        Work Experience
      </h3>

      {/* TIMELINE SECTION */}
      <div className="relative">
        {/* Static Timeline Line */}
        <div className="absolute left-8 sm:left-14 top-0 bottom-0 w-1 bg-white/10 rounded-full"></div>

        {/* Dynamic Scroll Line */}
        <div
          id="timeline-progress"
          className="absolute left-8 sm:left-14 top-0 w-1 bg-gradient-to-b from-[#6366f1] via-[#a855f7] to-pink-500 rounded-full shadow-md"
          style={{ height: "0%" }}
        />

        {/* Timeline Cards */}
        <div className="ml-16 sm:ml-24 space-y-16 relative z-20">

          {/* LOGICRAYS */}
          <div className="relative" data-aos="fade-right">
            <span className="absolute -left-12 top-2 w-10 h-10 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full animate-ping opacity-40"></span>
            <span className="absolute -left-12 top-2 w-6 h-6 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full shadow-xl"></span>

            <div className="bg-white/10 p-8 rounded-3xl border border-white/10 backdrop-blur-lg shadow-lg hover:scale-[1.03] transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/logos/logicrays.png" className="w-10 h-10 rounded-lg" />
                  <h4 className="text-xl sm:text-2xl font-semibold">AIML Engineer — LogicRays</h4>
                </div>
                <span className="text-sm text-gray-300">Nov 2025 – Present</span>
              </div>

              <p className="mt-3 text-gray-300 text-sm">Building AI/LLM automation pipelines.</p>

              <ul className="mt-4 space-y-2 text-gray-300 text-[15px]">
                <li>• Multi-agent LangGraph pipelines</li>
                <li>• RAG systems using FAISS + BGE</li>
                <li>• OpenAI tools + LangChain</li>
                <li>• Optimized inference & caching</li>
              </ul>
            </div>
          </div>

          {/* PETPOOJA */}
          <div className="relative" data-aos="fade-right">
            <span className="absolute -left-12 top-2 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-ping opacity-40"></span>
            <span className="absolute -left-12 top-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-xl"></span>

            <div className="bg-white/10 p-8 rounded-3xl border border-white/10 backdrop-blur-lg shadow-lg hover:scale-[1.03] transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/logos/petpooja2.png" className="w-10 h-10 rounded-lg" />
                  <h4 className="text-xl sm:text-2xl font-semibold">Data Science Intern — Petpooja</h4>
                </div>
                <span className="text-sm text-gray-300">Apr 2025 – Nov 2025</span>
              </div>

              <p className="mt-3 text-gray-300 text-sm">Hands-on ML model building.</p>

              <ul className="mt-4 space-y-2 text-gray-300 text-[15px]">
                <li>• ML predictive models</li>
                <li>• Analytics with Pandas, NumPy, Sklearn</li>
                <li>• Automation tools</li>
                <li>• FastAPI model serving</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* STATS SECTION */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
