import { Navbar } from "../components/Navbar";
import { motion, type Variants } from "motion/react";
import { ArrowRight, Activity, Database, HeartPulse } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate, Link } from "react-router-dom";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    }
  }
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const features = [
  {
    title: "X-Ray Vision",
    desc: "CNN-powered DenseNet121 detects 14 pulmonary pathologies with Grad-CAM explainability. Upload chest X-rays and receive instant AI-driven analysis with visual heatmaps highlighting areas of concern.",
    icon: Activity,
    link: "/analyze/xray",
    color: "from-emerald-400 to-teal-500"
  },
  {
    title: "Symptom Logic",
    desc: "BioBERT fine-tuned on medical journals identifies risk profiles with LIME feature highlighting. Describe your symptoms in natural language and let our NLP model surface potential conditions.",
    icon: Database,
    link: "/analyze/symptoms",
    color: "from-blue-400 to-indigo-500"
  },
  {
    title: "Vital Pulse",
    desc: "LSTM recurrent networks forecast health trends and flag physiological anomalies instantly. Monitor your vitals over time and receive early warnings before issues escalate.",
    icon: HeartPulse,
    link: "/monitor/vitals",
    color: "from-violet-400 to-purple-500"
  }
];

export default function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FDFBF7] overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center gap-6"
          >
            <motion.div variants={staggerItem} className="px-4 py-2 bg-white border border-black/5 rounded-full shadow-sm">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Diagnostic Modules</span>
            </motion.div>

            <motion.h1 variants={staggerItem} className="text-5xl md:text-7xl font-serif font-black leading-[0.95] tracking-tight text-[#0F172A]">
              Powered for <br />
              <span className="italic text-[#4F46E5]">Precision</span>
            </motion.h1>

            <motion.p variants={staggerItem} className="text-xl text-slate-500 max-w-2xl leading-relaxed">
              Three integrated AI engines working in concert to deliver accurate, explainable, and timely medical insights.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] border border-cream-200 shadow-sm group cursor-pointer hover:shadow-xl transition-all"
                onClick={() => navigate(feat.link)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors bg-gradient-to-br ${feat.color}`}>
                  <feat.icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#0F172A]">{feat.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{feat.desc}</p>
                <div className="flex items-center font-bold text-sm text-[#4F46E5] group-hover:translate-x-2 transition-transform">
                  Try Module <ArrowRight size={16} className="ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <h2 className="text-4xl font-serif font-black text-[#0F172A]">Ready to get started?</h2>
            <p className="text-slate-500 text-lg max-w-xl">
              Experience the future of healthcare diagnostics. Create your account and try all three modules today.
            </p>
            <Button onClick={() => navigate("/register")} size="lg" className="rounded-2xl bg-[#4F46E5] px-10 h-14 text-lg font-bold shadow-xl shadow-indigo-600/20 mt-4">
              Access Platform <ArrowRight size={20} className="ml-2" />
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
