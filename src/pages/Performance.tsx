import { Navbar } from "../components/Navbar";
import { motion } from "motion/react";
import { ArrowRight, Users, Shield, Award, TrendingUp, CheckCircle, HeartPulse } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const metrics = [
  {
    value: "94%",
    label: "Recall Rate",
    sublabel: "Pneumonia Detection",
    description: "Industry-leading sensitivity for pneumonia identification on chest X-rays.",
    icon: Shield,
    color: "text-emerald-400"
  },
  {
    value: "89%",
    label: "NLP F1-Score",
    sublabel: "Symptom Analysis",
    description: "Fine-tuned BioBERT achieves top-tier performance on medical text classification.",
    icon: TrendingUp,
    color: "text-blue-400"
  },
  {
    value: "500+",
    label: "Active Clinics",
    sublabel: "Healthcare Partners",
    description: "Trusted by medical professionals across multiple countries and specialties.",
    icon: Users,
    color: "text-violet-400"
  }
];

const benchmarks = [
  "10M+ training medical samples",
  "Multi-center clinical validation",
  "FDA-cleared algorithms in development",
  "HIPAA-compliant infrastructure",
  "Real-time inference < 2 seconds",
  "Continuous model improvement"
];

export default function PerformancePage() {
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
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Model Performance</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-serif font-black leading-[0.95] tracking-tight text-[#0F172A]">
              Built on <br />
              <span className="italic text-[#4F46E5]">Evidence</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-slate-500 max-w-2xl leading-relaxed">
              Our AI models are rigorously validated against large, diverse datasets to ensure reliable performance across real-world scenarios.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Metrics */}
      <section className="py-24 px-6 bg-slate-900 overflow-hidden relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-4">Empirical Reliability</h2>
            <p className="text-slate-300 text-lg max-w-2xl">
              SmartHealth AI is trained on 10M+ medical samples ensuring state-of-the-art diagnostic recall across all modules.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6">
                  <metric.icon size={32} className="text-white" />
                </div>
                <div className="text-6xl md:text-7xl font-black font-serif text-white italic mb-2">
                  {metric.value}
                </div>
                <div className="text-base font-bold text-slate-200 mb-1">{metric.label}</div>
                <div className={`text-sm font-medium mb-3 ${metric.color}`}>{metric.sublabel}</div>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">{metric.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation Checklist */}
      <section className="py-24 px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#0F172A] mb-4">Validated Benchmarks</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Our models undergo rigorous testing against established medical standards and expert annotations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benchmarks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-cream-200 shadow-sm"
              >
                <CheckCircle className="text-emerald-500 flex-shrink-0" size={20} />
                <span className="text-slate-700">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[40px] p-12 md:p-20 text-center text-white"
          >
            <Award className="mx-auto mb-6 text-amber-400" size={48} />
            <h2 className="text-3xl md:text-4xl font-serif font-black mb-4 text-white">Recognized Excellence</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Winner of the 2025 Healthcare AI Innovation Award and certified by the International Medical Device Regulators Forum.
            </p>
            <Button variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/10">
              View Certifications <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <h2 className="text-4xl font-serif font-black text-[#0F172A]">See it in action</h2>
            <p className="text-slate-500 text-lg max-w-xl">
              Experience the accuracy and speed of SmartHealth AI firsthand. Create a free account to start.
            </p>
            <Button onClick={() => navigate("/register")} size="lg" className="rounded-2xl bg-[#4F46E5] px-10 h-14 text-lg font-bold shadow-xl shadow-indigo-600/20 mt-4">
              Try Free <ArrowRight size={20} className="ml-2" />
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
