"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Briefcase, ExternalLink, Award, Menu, X, MapPin } from "lucide-react";

const PROFILE = {
  name: "P. Venugopal",
  rolePhrases: ["Data & Marketing Analyst", "SQL enthusiast", "Power BI developer", "Data storyteller"],
  tagline: "Aspiring data analyst with strong SQL and analytics skills, eager to drive insights and business success.",
  email: "pvenu1124@gmail.com",
  linkedin: "https://www.linkedin.com/in/venugopal-p-3bb1ba24a/",
  github: "https://github.com/Venu0604",
  resumeUrl: "https://drive.google.com/file/d/1LIwTD7cRm98bQ4KEHyWOdAO4QtB_VUq0/view?usp=drive_link",
};

const SKILLS = ["Python", "SQL", "C", "Power BI", "Tableau", "Excel", "Google Sheets", "Data Visualization", "Machine Learning"];

const EXPERIENCE = [
  {
    title: "Data & Marketing Analyst",
    company: "Nxtify Technologies Pvt Ltd",
    start: "Apr 2025",
    end: "Present",
    bullets: ["Tracked daily orders, transactions and deal performance", "Automated finance & campaign ROI reports", "Managed influencer data & reward programs"]
  },
  {
    title: "Data Analyst", 
    company: "Circle Health",
    start: "May 2024",
    end: "Mar 2025",
    bullets: ["SQL-driven analysis to optimize processes", "Built reports and dashboards for stakeholders", "Optimized queries for performance and clarity"]
  }
];

const PROJECTS = [
  {
    title: "Diabetes Prediction Model",
    description: "Built and deployed a ML model and Streamlit app for diabetes prediction.",
    tags: ["Python", "Streamlit", "ML"]
  },
  {
    title: "Rainfall Data Analysis",
    description: "Analyzed historical rainfall and its effect on agricultural productivity.", 
    tags: ["Python", "Pandas", "Visualization"]
  }
];

function goTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface Toast {
  type: "success" | "error";
  text: string;
}

export default function DarkPortfolio() {
  const [active, setActive] = useState("home");
  const [openNav, setOpenNav] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [result, setResult] = useState("");

  const sectionIds = useMemo(() => ["home", "about", "experience", "projects", "skills", "certifications", "contact"], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.45 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    setToast({ type: "success", text: "Sending message..." });
    
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "b6d0f110-90fc-45d2-84ad-9834605f084e");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        setToast({ type: "success", text: "Message sent successfully!" });
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
        setToast({ type: "error", text: "Failed to send message" });
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Something went wrong!");
      setToast({ type: "error", text: "Failed to send message" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white`}
        >
          {toast.text}
        </motion.div>
      )}

      {/* Navigation */}
      <header className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-md z-40 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <button
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
            onClick={() => goTo("home")}
          >
            Venugopal
          </button>
          
          <nav className="hidden md:flex gap-2">
            {sectionIds.map((id) => (
              <button
                key={id}
                onClick={() => goTo(id)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  active === id ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <button onClick={() => setOpenNav(!openNav)} className="p-2 text-gray-400 hover:text-white">
                {openNav ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {openNav && (
          <div className="md:hidden bg-gray-800/95 px-4 pb-4 border-t border-gray-700">
            {sectionIds.map((id) => (
              <button
                key={id}
                onClick={() => { goTo(id); setOpenNav(false); }}
                className={`block w-full text-left px-3 py-2 rounded ${active === id ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white" : "text-gray-300 hover:bg-gray-700"}`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              className="w-40 h-40 mx-auto rounded-full border-4 border-gradient-to-r from-cyan-400 to-blue-400 shadow-2xl mb-8 overflow-hidden relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <Image
                src="/P_Venugopal_image.jpg"
                alt="P. Venugopal"
                fill
                className="object-cover"
                priority
                sizes="160px"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-bold mb-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {PROFILE.name}
              </span>
            </motion.h1>

            <motion.div className="text-xl sm:text-2xl mb-8 text-cyan-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              Data & Marketing Analyst
            </motion.div>

            <motion.p className="max-w-2xl mx-auto text-gray-400 text-lg mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              {PROFILE.tagline}
            </motion.p>

            <motion.div className="flex justify-center gap-6 text-2xl mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <a href={`mailto:${PROFILE.email}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin />
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github />
              </a>
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <button
                onClick={() => goTo("projects")}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                View Projects
              </button>
              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:border-gray-500 transition-all"
              >
                Download Resume
              </a>
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-16 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.h3 className="text-3xl font-bold text-center mb-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">About Me</span>
            </motion.h3>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
            >
              <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
                <h4 className="text-2xl font-bold mb-6 text-white">
                  Data Analyst | Turning Data into Actionable Insights
                </h4>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  I&apos;m passionate about uncovering patterns in data and transforming them into impactful business insights. 
                  My journey spans healthcare, marketing, and finance, giving me a versatile problem-solving mindset. 
                  I thrive on translating raw data into clear, actionable stories that guide strategic decisions and help 
                  organizations grow by making data work smarter.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-16 bg-gray-900">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.h3 className="text-3xl font-bold mb-10 flex items-center justify-center gap-3" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Briefcase className="text-cyan-400" />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Experience</span>
            </motion.h3>

            {EXPERIENCE.map((exp, idx) => (
              <motion.div
                key={idx}
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500/50 transition-all">
                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {exp.title} — <span className="text-cyan-400">{exp.company}</span>
                    </h4>
                    <p className="text-sm text-gray-400">{exp.start} — {exp.end}</p>
                  </div>
                  <ul className="list-disc ml-6 text-gray-300">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.h3 className="text-3xl font-bold mb-10 flex items-center justify-center gap-3" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <ExternalLink className="text-cyan-400" />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-6">
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500/50 transition-all hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <h4 className="text-xl font-semibold text-white mb-3">{project.title}</h4>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-16 bg-gray-900">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.h3 className="text-3xl font-bold mb-10 text-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Skills & Technologies</span>
            </motion.h3>

            <motion.div className="flex flex-wrap gap-3 justify-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-300 px-4 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:scale-110 transition-all"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.h3 className="text-3xl font-bold mb-10 text-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
                <Award className="text-cyan-400" />
                Certifications
              </span>
            </motion.h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-gray-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-blue-400 mb-2">📊</div>
                <div className="font-semibold">Business Intelligence using Power BI</div>
                <div className="text-sm text-gray-400 mt-2">Skill Nation</div>
              </motion.div>
              
              <motion.div 
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-gray-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-green-400 mb-2">📈</div>
                <div className="font-semibold">Data Analytics</div>
                <div className="text-sm text-gray-400 mt-2">Jobaaj Learnings</div>
              </motion.div>
              
              <motion.a 
                href="https://www.hackerrank.com/certificates/iframe/f0597bab2b68" 
                target="_blank" 
                rel="noreferrer"
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-gray-300 text-center hover:border-cyan-500/50 transition-all hover:scale-105 block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-2xl mb-2">💻</div>
                <div className="font-semibold">SQL (Advanced) Certificate</div>
                <div className="text-sm text-green-400 mt-2 font-semibold">HackerRank</div>
              </motion.a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.h3 className="text-3xl font-bold mb-10 text-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Get In Touch</span>
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-10">
              <motion.div className="space-y-6" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-gray-400">{PROFILE.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Location</h4>
                    <p className="text-gray-400">Bangalore, India</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-gray-400 mb-4">
                    I am currently available for freelance work and full-time opportunities. 
                    Let&apos;s discuss how I can help bring your data projects to life!
                  </p>
                  <div className="flex gap-4">
                    <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all">
                      <Linkedin size={24} />
                    </a>
                    <a href={PROFILE.github} target="_blank" rel="noreferrer" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all">
                      <Github size={24} />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.form onSubmit={onSubmit} className="space-y-4" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105"
                >
                  Send Message
                </button>
                {result && <p className="text-center text-gray-300">{result}</p>}
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {PROFILE.name} — Built with ❤️ 
          </p>
        </div>
      </footer>
    </div>
  );
}