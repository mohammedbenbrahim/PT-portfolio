"use client";

import { useState } from "react";
import { 
  MapPin, Briefcase, Code, Coffee, Search, 
  Layout, Database, Server, Globe, ChevronDown, ChevronUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// --- HELPER: Tech Stack Icons ---
const getTechIcon = (tech: string) => {
  if (tech.includes("React") || tech.includes("Next")) return <Layout className="w-3 h-3" />;
  if (tech.includes("Postgre") || tech.includes("SQL")) return <Database className="w-3 h-3" />;
  if (tech.includes("Django") || tech.includes("Node")) return <Server className="w-3 h-3" />;
  return <Globe className="w-3 h-3" />;
};

// --- SUB-COMPONENT: Single Timeline Item ---
// This handles the "Read More" state for each card individually
const TimelineItem = ({ item, index, isEven }: { item: any, index: number, isEven: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn(
      "relative flex flex-col md:flex-row gap-8 mb-12 md:mb-24",
      isEven ? "md:flex-row-reverse" : "" // Alternates left/right on desktop
    )}>
      
      {/* 1. SPACER (Desktop Only) - Pushes content to the side */}
      <div className="hidden md:block flex-1" />

      {/* 2. CENTRAL NODE (The Number) */}
      <div className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full border-4 border-background shadow-[0_0_20px_rgba(249,115,22,0.4)] shrink-0">
        <span className="text-white font-bold text-xl">{index}</span>
      </div>

      {/* 3. CONTENT CARD */}
      <div className={cn(
        "flex-1 pl-16 md:pl-0", // Add padding on mobile for the line
        isEven ? "md:pr-12 text-left" : "md:pl-12 text-left"
      )}>
        <Card className="relative p-6 md:p-8 bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group overflow-hidden">
          
          {/* Glow Effect behind card */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

          {/* Header: Date & Type */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="text-sm font-mono text-primary font-semibold tracking-wider">
              {item.date} • {item.company}
            </span>
            <Badge variant="secondary" className="capitalize bg-secondary text-secondary-foreground border border-border/50">
              {item.type}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-2 text-foreground">{item.title}</h3>
          
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            {item.location}
          </div>

          {/* Description with Expand Logic */}
          <div className="relative mb-6">
            <p className={cn(
              "text-muted-foreground text-base leading-relaxed",
              !expanded && "line-clamp-3" // Show only 3 lines if not expanded
            )}>
              {item.description}
            </p>
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-primary text-sm font-semibold mt-2 hover:underline flex items-center gap-1"
            >
              {expanded ? "Read less" : "Read more"}
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
            {item.tags.map((tag: string, i: number) => (
              <div 
                key={i} 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border text-xs font-semibold text-foreground shadow-sm group-hover:border-primary/30 transition-colors"
              >
                {getTechIcon(tag)}
                {tag}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const About = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");
  const [filterType, setFilterType] = useState<"all" | "internship" | "full-time">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { icon: MapPin, label: "Casablanca, Morocco" },
    { icon: Briefcase, label: t("about.experience") },
    { icon: Code, label: t("about.projects") },
    { icon: Coffee, label: t("about.coffees") },
  ];

  const allExperiences = [
    {
      id: 1,
      title: t("about.work1Title"),
      company: t("about.work1Company"),
      date: t("about.work1Year"),
      location: "Casablanca, Morocco",
      type: "full-time",
      description: t("about.work1Desc") + " Orchestrated the migration of legacy systems to modern microservices architecture. Improved system reliability by 40% through rigorous testing and CI/CD implementation. Mentored 3 junior developers.",
      tags: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"]
    },
    {
      id: 2,
      title: t("about.work2Title"),
      company: t("about.work2Company"),
      date: t("about.work2Year"),
      location: "Casablanca, Settat",
      type: "internship",
      description: t("about.work2Desc") + " Developed responsive frontend interfaces using React and Tailwind CSS. Collaborated with the UX team to implement pixel-perfect designs. Optimized backend API endpoints using Django Rest Framework.",
      tags: ["Django", "Rest Framework", "React", "PostgreSQL", "JavaScript"]
    },
    // Add more mock data to see the effect fully
    {
      id: 3,
      title: "Freelance Full Stack Dev",
      company: "Upwork",
      date: "2022 - 2023",
      location: "Remote",
      type: "freelance",
      description: "Delivered over 10 custom web solutions for international clients. Specialized in e-commerce platforms and custom dashboards.",
      tags: ["Next.js", "Tailwind", "Firebase", "Stripe"]
    }
  ];

  const education = [
    {
      year: t("about.exp1Year"),
      title: t("about.exp1Title"),
      company: t("about.exp1Company"),
      description: t("about.exp1Desc"),
    },
    {
      year: t("about.exp2Year"),
      title: t("about.exp2Title"),
      company: t("about.exp2Company"),
      description: t("about.exp2Desc"),
    },
  ];

  const expertise = [
    { name: "React Expert", color: "bg-primary" },
    { name: "Node.js", color: "bg-primary/80" },
    { name: "TypeScript", color: "bg-primary/60" },
  ];

  const filteredExperiences = allExperiences.filter(exp => {
    const matchesType = filterType === "all" || exp.type === filterType;
    const matchesSearch = 
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      exp.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <section id="about" className="py-24 px-4 bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            {t("about.title")} <span className="text-primary"></span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>

        {/* --- BIO & STATS --- */}
        <div className="grid lg:grid-cols-2 gap-12 mb-32 items-start">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="w-12 h-1.5 bg-primary rounded-full"></span>
                {t("about.whoAmI")}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t("about.whoAmIText")}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {expertise.map((item, idx) => (
                <Badge key={idx} className={`${item.color} text-white px-4 py-2 text-sm`}>
                  {item.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <Card key={idx} className="flex flex-col items-center justify-center p-6 border-border/50 bg-secondary/10 hover:bg-secondary/30 transition-colors hover:scale-105 duration-300 cursor-default">
                <stat.icon className="h-8 w-8 text-primary mb-4" />
                <span className="text-sm font-medium text-center text-foreground">{stat.label}</span>
              </Card>
            ))}
          </div>
        </div>

        {/* --- TIMELINE CONTROLS --- */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-20 sticky top-20 z-30 bg-background/95 backdrop-blur-sm py-4 border-b border-border/40">
          
          {/* Tabs */}
          <div className="flex p-1.5 bg-secondary/50 rounded-xl border border-border/50">
            <button
              onClick={() => setActiveTab("work")}
              className={cn(
                "px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300",
                activeTab === "work" 
                  ? "bg-primary text-white shadow-lg scale-105" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Professional
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={cn(
                "px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300",
                activeTab === "education" 
                  ? "bg-primary text-white shadow-lg scale-105" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Education
            </button>
          </div>

          {/* Filters */}
          {activeTab === "work" && (
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center">
              <div className="flex gap-2 bg-secondary/20 p-1 rounded-full border border-border/30">
                {["all", "internship", "full-time"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type as any)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize",
                      filterType === type
                        ? "bg-primary text-white shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64 bg-background border-border/50 focus:ring-primary focus:border-primary rounded-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* --- TIMELINE DISPLAY --- */}
        <div className="relative min-h-[600px]">
          
          {/* CENTRAL SPINE (Line) */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-1/2" />

          {activeTab === "work" ? (
            <div className="space-y-4">
              {filteredExperiences.length > 0 ? (
                filteredExperiences.map((item, idx) => (
                  <TimelineItem 
                    key={item.id} 
                    item={item} 
                    index={filteredExperiences.length - idx} 
                    isEven={idx % 2 === 0} 
                  />
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No experiences found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    onClick={() => {setFilterType('all'); setSearchQuery('')}} 
                    className="text-primary"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // Education Timeline (Vertical Stack)
            <div className="max-w-4xl mx-auto space-y-12 pl-8 md:pl-0">
              {education.map((item, idx) => (
                <div key={idx} className="relative md:grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center group">
                  
                  {/* Date (Left on desktop) */}
                  <div className="hidden md:block text-right">
                    <h3 className="text-2xl font-bold text-primary">{item.year}</h3>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-[-4px] md:relative md:left-auto w-3 h-3 bg-primary rounded-full ring-4 ring-background z-10" />

                  {/* Card (Right on desktop) */}
                  <Card className="p-6 bg-card/40 border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
                    <div className="md:hidden text-xl font-bold text-primary mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <div className="text-muted-foreground font-medium mb-2">{item.company}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;