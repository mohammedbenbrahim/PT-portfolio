import { useLanguage } from "@/contexts/LanguageContext";
import { Monitor, Database, Smartphone, Zap, Code } from "lucide-react";

const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t("skills.frontend"),
      icon: Monitor,
      skills: [
        { name: "React / Next.js" },
        { name: "TypeScript" },
        { name: "Angular" },
        { name: "Tailwind CSS" },
        { name: "Vue.js" },
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "Sass" },
        { name: "Bootstrap" },
        { name: "JQuery" },
      ],
    },
    {
      title: t("skills.backend"),
      icon: Code,
      skills: [
        { name: "Node.js" },
        { name: "Express.js" },
        { name: "Python" },
        { name: "PHP" },
        { name: "Laravel" },
        { name: "Java" },
        { name: "C" },
        { name: "C#" },
        { name: "Firebase" },
        { name: ".NET" },
      ],
    },
    {
      title: t("skills.database"),
      icon: Database,
      skills: [
        { name: "MySQL" },
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "SQL" },
        { name: "Supabase" },
      ],
    },
    {
      title: t("skills.mobile"),
      icon: Smartphone,
      skills: [
        { name: "React Native" },
        { name: "Expo" },
        { name: "Swift" },
        { name: "Kotlin" },
        { name: "Flutter" },
      ],
    },
    {
      title: t("skills.tools"),
      icon: Zap,
      skills: [
        { name: "Agile/Scrum" },
        { name: "Git / GitHub" },
        { name: "VS Code" },
        { name: "Postman" },
        { name: "Figma" },
        { name: "Docker" },
        { name: "Jira" },
        { name: "PhpMyAdmin" },
        { name: "Xcode" },
        { name: "WordPress" },
        { name: "Shopify" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("skills.title")}</h2>
          <p className="text-muted-foreground text-lg">
            {t("skills.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="space-y-6 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h3 className="flex items-center text-xl font-semibold pb-3 border-b border-border">
                  <Icon className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="px-4 py-2 bg-secondary border border-border text-foreground rounded-md text-sm font-medium hover:bg-secondary/80 hover:border-primary/50 transition-colors cursor-default"
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;