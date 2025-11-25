"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, MapPin, Phone, Send, Copy, Check, 
  Github, Linkedin, Twitter, ExternalLink 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const Contact = () => {
  const { t } = useLanguage();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const contactInfo = [
    {
      id: "email",
      icon: Mail,
      label: t("contact.email"),
      value: "mohammedbenbrahim474@gmail.com",
      action: "copy", // Logic to copy to clipboard
    },
    {
      id: "phone",
      icon: Phone,
      label: t("contact.phone"),
      value: "+212 696 149 750",
      action: "copy",
    },
    {
      id: "location",
      icon: MapPin,
      label: t("contact.location"),
      value: "Casablanca, Morocco",
      action: "none",
    },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            {t("contact.title")} <span className="text-primary">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* --- LEFT COLUMN: Contact Info --- */}
          <div className="space-y-8">
            <div className="prose dark:prose-invert">
              <h3 className="text-2xl font-bold mb-4">Let's talk about everything!</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("contact.available") || "I am currently available for freelance projects and open to full-time opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!"}
              </p>
            </div>

            <div className="grid gap-4">
              {contactInfo.map((info) => (
                <Card 
                  key={info.id}
                  className={cn(
                    "group bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300",
                    info.action === "copy" && "cursor-pointer hover:border-primary/50 hover:shadow-md"
                  )}
                  onClick={() => info.action === "copy" && handleCopy(info.value, info.id)}
                >
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">{info.label}</p>
                        <p className="text-base md:text-lg font-semibold text-foreground">{info.value}</p>
                      </div>
                    </div>

                    {/* Copy Feedback Icon */}
                    {info.action === "copy" && (
                      <div className="text-muted-foreground group-hover:text-primary transition-colors">
                        {copiedField === info.id ? (
                          <Check className="h-5 w-5 animate-in zoom-in duration-300" />
                        ) : (
                          <Copy className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/mohammedbenbrahim" },
                  { icon: Linkedin, href: "https://linkedin.com/in/mohammed-benbrahim-636456239/" },
                  { icon: Twitter, href: "https://x.com/MedKaito" },
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/50 border border-border hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 group"
                  >
                    <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Contact Form --- */}
          <Card className="bg-card/30 backdrop-blur-md border-border/50 shadow-xl overflow-hidden relative">
             {/* Form loading overlay */}
             {isSuccess && (
              <div className="absolute inset-0 z-20 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you soon.</p>
              </div>
            )}

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                    <Input 
                      id="name" 
                      placeholder="name" 
                      required
                      className="bg-secondary/30 border-border/50 focus:border-primary/50 transition-colors h-11" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@example.com" 
                      required
                      className="bg-secondary/30 border-border/50 focus:border-primary/50 transition-colors h-11" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                  <Input 
                    id="subject" 
                    placeholder="Project discussion" 
                    required
                    className="bg-secondary/30 border-border/50 focus:border-primary/50 transition-colors h-11" 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell me about your project..." 
                    className="min-h-[150px] bg-secondary/30 border-border/50 focus:border-primary/50 transition-colors resize-none" 
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg font-semibold bg-primary hover:bg-primary/90 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      Sending... <span className="animate-pulse">...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t("contact.sendMessage") || "Send Message"} <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default Contact;