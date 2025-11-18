import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ onAIDemoClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const navItems = [
    { href: "#Home", label: "Home", type: "internal" },
    { href: "#About", label: "About", type: "internal" },
    { href: "#experience", label: "Experience", type: "internal" },
    { href: "#Portofolio", label: "Portfolio", type: "internal" },
    { href: "#Contact", label: "Contact", type: "internal" },
    { href: "#ai-demo", label: "AI Assistant 🤖", type: "function" },
  ];

  const handleNavLinkClick = (e, item) => {
    setIsOpen(false);

    if (item.type === "function") {
      e.preventDefault();
      if (onAIDemoClick) onAIDemoClick(e);
      return;
    }

    if (item.href.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(item.href);
      if (section) {
        const top = section.offsetTop - 90;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  // Scroll Logic
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems
        .filter((i) => i.type === "internal")
        .map((i) => {
          const sec = document.querySelector(i.href);
          if (!sec) return null;
          return {
            id: i.href.replace("#", ""),
            top: sec.offsetTop - 200,
            bottom: sec.offsetTop + sec.offsetHeight,
          };
        })
        .filter(Boolean);

      const pos = window.scrollY;
      const active = sections.find((s) => pos >= s.top && pos < s.bottom);

      if (active) setActiveSection(active.id);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Disable Background Scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isOpen
          ? "bg-[#030014]"
          : scrolled
          ? "bg-[#030014]/60 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="#Home"
            onClick={(e) =>
              handleNavLinkClick(e, { href: "#Home", type: "internal" })
            }
            className="text-xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent"
          >
            KUSHRAJSINH ZALA
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavLinkClick(e, item)}
                className={`text-sm relative group font-medium ${
                  activeSection === item.href.replace("#", "")
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent"
                    : "text-[#e2d3fd] group-hover:text-white"
                }`}
              >
                {item.label}

                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] transition-all ${
                    activeSection === item.href.replace("#", "")
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </a>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-[#e2d3fd]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-[#030014] flex flex-col transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-6 px-6 pt-6 pb-10">

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavLinkClick(e, item)}
              className={`text-lg tracking-wide ${
                activeSection === item.href.replace("#", "")
                  ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                  : "text-[#e2d3fd] hover:text-white"
              }`}
            >
              {item.label === "AI Assistant 🤖" ? "AI 🤖" : item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
