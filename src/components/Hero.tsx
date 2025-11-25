"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, Code2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18.901 1.144h3.68l-8.729 9.904 9.47 11.232h-7.6l-6.52-8.312-7.55 8.312h-3.68l9.02-10.37L1.31 1.144h8.399l5.85 7.55 3.342-7.55zM17.51 20.94H19.7L7.265 3.09h-2.18l12.424 17.85z" />
  </svg>
);
const Hero = () => {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-32 scroll-mt-28"
    >
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-72 h-72 md:w-80 md:h-80 bg-primary/10 rounded-full blur-3xl transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${mousePosition.x / 20}px, ${mousePosition.y / 20}px)`,
          }}
        />
        <div className="absolute top-20 right-20 w-56 h-56 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="absolute right-20 top-1/3 hidden lg:grid grid-cols-10 gap-1 opacity-20">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i} 
            className="w-0.5 h-0.5 bg-muted-foreground rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      <div className="absolute left-10 top-40 hidden lg:block animate-float">
        <Code2 className="h-6 w-6 text-primary/30" />
      </div>
      <div className="absolute right-20 bottom-40 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="h-6 w-6 text-primary/30" />
      </div>

      {/* --- MAIN CONTAINER --- */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">
          
          {/* Left Side - Text Content */}
          <div className="flex-1 text-center md:text-left space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs md:text-sm text-primary">
              <span className="inline-block mr-1">👋</span>
              {t("hero.welcome")}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
              <span className="block text-foreground">{t("hero.title")}</span>
              <span className="block text-primary">{t("hero.subtitle")}</span>
            </h1>
            
            <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
              <span className="text-base md:text-lg">{t("hero.role")}</span>
              <span className="animate-pulse text-primary">|</span>
            </div>

            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto md:mx-0 leading-relaxed">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2">
              <Button 
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-full transition-all hover:scale-105"
                onClick={() => scrollToSection("projects")}
              >
                {t("hero.viewProjects")}
                <ChevronDown className="ml-1 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary px-8 rounded-full transition-all hover:scale-105"
                onClick={() => scrollToSection("contact")}
              >
                {t("hero.contactMe")}
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start pt-4">
              <a 
                href="https://github.com/mohammedbenbrahim" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border hover:border-primary hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all hover:scale-110"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/mohammed-benbrahim-636456239/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border hover:border-primary hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/MedKaito"
                className="p-3 rounded-full border border-border hover:border-primary hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all hover:scale-110"
              >
                <XIcon className="h-5 w-5" /> {/* Use the custom component */}
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex-1 flex justify-center md:justify-end animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <div className="relative group w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-20 blur-2xl rounded-full -z-10 group-hover:opacity-30 transition-opacity" />
              <img 
                src="/me.png" 
                alt="Mohammed Benbrahim" 
                // FIX: Added mixBlendMode: 'screen' to make the black background transparent
                style={{ mixBlendMode: 'screen' }}
                className="w-full h-full rounded-full object-cover border-4 border-primary/20 shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
        <ChevronDown className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
      </div>
    </section>
  );
};

export default Hero;