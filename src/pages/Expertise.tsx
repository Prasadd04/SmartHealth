import { Navbar } from "../components/Navbar";
import { motion } from "motion/react";
import { ArrowRight, Brain, Microscope, Stethoscope, Globe, Shield, Users, Award, HeartPulse } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const pillars = [
  {
    title: "Deep Learning Research",
    desc: "Our team includes PhD researchers from top AI institutions. We publish in peer-reviewed journals and continuously push the state-of-the-art.",
    icon: Brain
  },
  {
    title: "Clinical Validation",
    desc: "Every model is validated on multi-center, diverse datasets with radiologist and clinician oversight to ensure real-world reliability.",
    icon: Microscope
  },
  {
    title: "Medical Expertise",
    desc: "Advisory board of board-certified physicians ensures our solutions align with clinical workflows and medical best practices.",
    icon: Stethoscope
  },
  {
    title: "Global Health Standards",
    desc: "Designed to serve diverse populations with models trained on varied demographics and imaging equipment from around the world.",
    icon: Globe
  },
  {
    title: "Privacy & Security",
    desc: "HIPAA-compliant infrastructure with end-to-end encryption and strict data governance ensuring patient confidentiality.",
    icon: Shield
  },
  {
    title: " clinician-Centred Design",
    desc: "Every interface is crafted with heavy input from practicing doctors to minimize cognitive load and maximize efficiency.",
    icon: Users
  }
];

export default function ExpertisePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FDFBF7] overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center gap-6"
          >
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="px-4 py-2 bg-white border border-black/5 rounded-full shadow-sm">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Our Expertise</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-serif font-black leading-[0.95] tracking-tight text-[#0F172A]">
              Built by <br />
              <span className="italic text-[#4F46E5]">Experts</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-slate-500 max-w-2xl leading-relaxed">
              We combine cutting-edge AI research with deep medical domain knowledge to create tools that clinicians trust and patients rely on.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-[32px] border border-cream-200 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 bg-cream-100 rounded-2xl flex items-center justify-center text-[#0F172A] mb-6 group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
                  <pillar.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">{pillar.title}</h3>
                <p className="text-slate-500 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-4">Leadership Team</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              World-class talent bridging the gap between AI research and clinical practice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Sarah Chen", role: "CEO & Founder", bg: "from-indigo-500 to-purple-600" },
              { name: "Dr. Marcus Webb", role: "Chief Medical Officer", bg: "from-emerald-500 to-teal-600" },
              { name: "Dr. Alex Kim", role: "Head of AI Research", bg: "from-blue-500 to-indigo-600" }
            ].map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-slate-800 rounded-[32px] p-8 text-center border border-white/5"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${person.bg} flex items-center justify-center`}>
                  <Users size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{person.name}</h3>
                <p className="text-slate-400">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-[40px] p-12 md:p-16 border border-amber-100"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <Award className="mx-auto md:mx-0 mb-4 text-amber-500" size={40} />
                <h2 className="text-2xl md:text-3xl font-serif font-black text-[#0F172A] mb-2">Industry Recognition</h2>
                <p className="text-slate-600 max-w-md">
                  Recognized by leading healthcare organizations and regulatory bodies for excellence in AI-driven diagnostics.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {["FDA Breakthrough Device", "CE Mark Certified", "HIPAA Compliant", "ISO 13485"].map((badge, i) => (
                  <span key={i} className="px-4 py-2 bg-white rounded-full text-sm font-bold text-slate-700 border border-amber-200">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <h2 className="text-4xl font-serif font-black text-[#0F172A]">Trusted by professionals worldwide</h2>
            <p className="text-slate-500 text-lg max-w-xl">
              Join hundreds of clinics already using SmartHealth AI to enhance diagnostic accuracy and patient outcomes.
            </p>
            <Button onClick={() => navigate("/register")} size="lg" className="rounded-2xl bg-[#4F46E5] px-10 h-14 text-lg font-bold shadow-xl shadow-indigo-600/20 mt-4">
              Get Started <ArrowRight size={20} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-cream-200 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0F172A] rounded-lg flex items-center justify-center text-white">
              <HeartPulse size={20} />
            </div>
            <span className="font-serif font-bold text-lg tracking-tight">SmartHealth <span className="text-[#4F46E5]">AI</span></span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 SmartHealth Technologies. AI diagnosis is a support tool, not a replacement for expert doctors.</p>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-[#4F46E5]">Privacy</a>
            <a href="#" className="hover:text-[#4F46E5]">Ethics</a>
            <a href="#" className="hover:text-[#4F46E5]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
