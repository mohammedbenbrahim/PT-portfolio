import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
      theme: "Thème",
    },
    hero: {
      welcome: "Bienvenue sur mon portfolio",
      title: "Mohammed",
      subtitle: "Benbrahim",
      role: "Développeur Full-Stack",
      description: "Passionné par la création d'expériences web modernes et performantes. Je transforme vos idées en solutions digitales innovantes avec React, Node.js et les dernières technologies.",
      viewProjects: "Voir mes projets",
      contactMe: "Me contacter",
    },
    about: {
      title: "À propos de moi",
      subtitle: "Développeur passionné par la création d'applications web modernes et performantes.",
      whoAmI: "Qui suis-je ?",
      whoAmIText: "Passionné par les technologies web depuis mes études, j'ai développé une expertise complète en développement full-stack. J'aime créer des solutions élégantes qui allient performance technique et expérience utilisateur exceptionnelle.",
      experience: "1+ an d'expérience",
      projects: "3+ projets réalisés",
      coffees: "∞ cafés consommés",
      journey: "Mon parcours",
      exp1Year: "2026",
      exp1Title: "Licence Professionnelle",
      exp1Company: "ENSET Mohammedia",
      exp1Desc: "Développement d'applications web (React, Node.js, Architecture Cloud).",
      exp2Year: "2025",
      exp2Title: "Technicien Spécialisé en Informatique",
      exp2Company: "Ifiag",
      exp2Desc: "Acquisition des bases solides de la programmation et du développement.",
      exp3Year: "2023",
      exp3Title: "Baccalauréat",
      exp3Company: "Lycée Authenticité",
      exp3Desc: "Baccalauréat en Sciences Physiques.",
    },
    skills: {
      title: "Mes compétences",
      subtitle: "Une expertise technique complète pour créer des solutions web modernes.",
      frontend: "Frontend",
      backend: "Backend",
      database: "Base de données",
      mobile: "Mobile",
      tools: "Outils & Design",
    },
    projects: {
      title: "Mes projets",
      subtitle: "Une sélection de mes réalisations récentes",
      code: "Code",
      demo: "Démo",
      project1Title: "Plateforme E-Commerce",
      project1Desc: "Une plateforme de commerce électronique complète avec gestion des paiements, inventaire et analytics en temps réel.",
      project2Title: "SaaS de Gestion de Tâches",
      project2Desc: "Outil de gestion de projets collaboratif avec mises à jour en temps réel et fonctionnalités d'équipe avancées.",
      project3Title: "Portfolio Personnel",
      project3Desc: "Site portfolio moderne et responsive avec animations fluides et design élégant.",
    },
    contact: {
      title: "Contact",
      subtitle: "N'hésitez pas à me contacter pour discuter de vos projets",
      email: "Email",
      phone: "Téléphone",
      location: "Localisation",
      available: "Disponible pour des projets freelance et des opportunités professionnelles.",
      sendMessage: "Envoyer un message",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      theme: "Theme",
    },
    hero: {
      welcome: "Welcome to my portfolio",
      title: "Mohammed",
      subtitle: "Benbrahim",
      role: "Full-Stack Developer",
      description: "Passionate about creating modern and performant web experiences. I transform your ideas into innovative digital solutions with React, Node.js, and the latest technologies.",
      viewProjects: "View my projects",
      contactMe: "Contact me",
    },
    about: {
      title: "About me",
      subtitle: "Passionate developer creating modern and performant web applications.",
      whoAmI: "Who am I?",
      whoAmIText: "Passionate about web technologies since my studies, I have developed comprehensive expertise in full-stack development. I love creating elegant solutions that combine technical performance and an exceptional user experience.",
      experience: "1+ year of experience",
      projects: "3+ projects completed",
      coffees: "∞ coffees consumed",
      journey: "My journey",
      exp1Year: "2026",
      exp1Title: "Professional License",
      exp1Company: "ENSET Mohammedia",
      exp1Desc: "Web application development (React, Node.js, Cloud Architecture).",
      exp2Year: "2025",
      exp2Title: "Specialized Technician in IT",
      exp2Company: "Ifiag",
      exp2Desc: "Mastered the fundamentals of programming and development.",
      exp3Year: "2023",
      exp3Title: "Baccalaureate",
      exp3Company: "Authenticité High School",
      exp3Desc: "Baccalaureate in Physical Sciences.",
    },
    skills: {
      title: "My skills",
      subtitle: "Complete technical expertise to create modern and performant web solutions.",
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      mobile: "Mobile",
      tools: "Tools & Design",
    },
    projects: {
      title: "My projects",
      subtitle: "A selection of my recent work",
      code: "Code",
      demo: "Demo",
      project1Title: "E-Commerce Platform",
      project1Desc: "A complete e-commerce platform with payment management, inventory, and real-time analytics.",
      project2Title: "Task Management SaaS",
      project2Desc: "Collaborative project management tool with real-time updates and advanced team features.",
      project3Title: "Personal Portfolio",
      project3Desc: "Modern and responsive portfolio site with smooth animations and elegant design.",
    },
    contact: {
      title: "Contact",
      subtitle: "Feel free to contact me to discuss your projects",
      email: "Email",
      phone: "Phone",
      location: "Location",
      available: "Available for freelance projects and professional opportunities.",
      sendMessage: "Send a message",
    },
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      return saved || "fr";
    }
    return "fr";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};