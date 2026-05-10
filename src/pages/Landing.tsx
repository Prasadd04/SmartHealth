import { Navbar } from "../components/Navbar";
import { Robot } from "../components/Robot";
import { motion, type Variants } from "motion/react";
import { ArrowRight, Star, Users, Database, ShieldCheck, Activity, ChevronDown, Facebook, Instagram, Phone as WhatsApp, HeartPulse } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "../store/useStore";

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

export default function Landing() {
  const navigate = useNavigate();
  const { setUser } = useStore();

       const handleStart = () => {
         // Create a temporary user object with a placeholder ID
         setUser({ id: "temp-guest-id", email: "guest@smarthealth.ai", name: "Guest User" }, "guest-token");
         navigate("/dashboard");
       };

  return (
    <div className="bg-[#FDFBF7] overflow-x-hidden">
      <Navbar />
      
      {/* Social Rail */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-40">
        {[Facebook, WhatsApp, Instagram].map((Icon, i) => (
          <motion.a
            key={i}
            href="#"
            whileHover={{ x: -10, color: "#4F46E5" }}
            className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-slate-400 transition-shadow hover:shadow-lg"
          >
            <Icon size={20} />
          </motion.a>
        ))}
        <div className="w-px h-24 bg-slate-200 mx-auto" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <motion.div variants={staggerItem} className="flex items-center gap-2 px-4 py-2 bg-white border border-black/5 rounded-full w-fit shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">World's Most Adopted Healthcare AI</span>
            </motion.div>

            <motion.h1 variants={staggerItem} className="text-6xl md:text-8xl font-serif font-black leading-[0.9] tracking-tight text-[#0F172A]">
              Personalized <br />
              <span className="font-normal italic text-[#4F46E5]">Care</span>, Driven By <br />
              Intelligence.
            </motion.h1>

            <motion.p variants={staggerItem} className="text-xl text-slate-500 max-w-lg leading-relaxed">
              Empowering clinics and patients with multimodal AI diagnostics. From X-ray vision to predictive vitals, we're redefining medical precision.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-4">
              <Button onClick={handleStart} size="lg" className="rounded-2xl bg-[#4F46E5] px-8 h-14 text-lg font-bold shadow-xl shadow-indigo-600/20 hover:bg-[#4338CA] transition-all">
                Access Platform <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-8 h-14 text-lg border-black/5 font-bold hover:bg-slate-50 transition-all">
                Interactive Demo
              </Button>
            </motion.div>


            <motion.div variants={staggerItem} className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-cream-200">
                    <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="Avatar" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-sm font-medium">Rated 5/5 · 1000+ Patients</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <Robot />
            
            {/* Floating Stat Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-cream-200 w-40"
            >
              <div className="flex items-center gap-2 mb-1">
                <Users className="text-medical-500" size={16} />
                <span className="text-xs font-bold uppercase text-muted-foreground">Patients</span>
              </div>
              <div className="text-2xl font-serif font-black">5,000+</div>
              <div className="text-[10px] text-green-600 font-bold">↑ 12% This month</div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-10 bg-white p-4 rounded-2xl shadow-xl border border-cream-200 w-40"
            >
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="text-medical-500" size={16} />
                <span className="text-xs font-bold uppercase text-muted-foreground">Accuracy</span>
              </div>
              <div className="text-2xl font-serif font-black">94.2%</div>
              <div className="text-[10px] text-muted-foreground">Top-tier Benchmarks</div>
            </motion.div>

            <motion.div 
              animate={{ x: [0, 10, 0], y: [0, -5, 0] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 left-10 bg-medical-900 text-white p-4 rounded-2xl shadow-xl border border-medical-500 w-48"
            >
              <div className="flex items-center gap-2 mb-1">
                <Database className="text-medical-500" size={16} />
                <span className="text-xs font-bold uppercase opacity-60 font-mono">Expert Neural Connect</span>
              </div>
              <div className="text-2xl font-serif font-black">300+ Doctors</div>
              <div className="text-[10px] opacity-70">Unified Digital Hub</div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-10 hidden xl:flex flex-col items-center gap-4 text-muted-foreground">
          <span className="vertical-text text-[10px] font-bold tracking-widest uppercase origin-center rotate-180">Scroll to Explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section id="metrics" className="relative py-20 px-6 overflow-hidden">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
        
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-white">
          <div className="flex flex-col gap-3 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full w-fit text-xs font-medium uppercase tracking-wider border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-slate-200">Validated Performance</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-white">
              Empirical Reliability.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              SmartHealth AI is trained on 10M+ medical samples ensuring state-of-the-art diagnostic recall across modules.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 flex-1 justify-items-end">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black font-serif text-emerald-400 italic">
                94%
              </div>
              <div className="text-xs uppercase font-bold tracking-widest mt-3 text-slate-300">
                Recall <span className="text-emerald-400">(Pneumonia)</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black font-serif text-blue-400 italic">
                89%
              </div>
              <div className="text-xs uppercase font-bold tracking-widest mt-3 text-slate-300">
                NLP <span className="text-blue-400">F1-Score</span>
              </div>
            </div>
            
            <div className="hidden md:block text-center">
              <div className="text-5xl md:text-6xl font-black font-serif text-violet-400 italic">
                500+
              </div>
              <div className="text-xs uppercase font-bold tracking-widest mt-3 text-slate-300">
                Active <span className="text-violet-400">Clinics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-black text-medical-900 mb-4">Diagnostic Modules.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg text-cream-700 font-bold italic">
              Experience the future of healthcare with our integrated multimodal system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "X-Ray Vision", 
                desc: "CNN-powered DenseNet121 detects 14 pulmonary pathologies with Grad-CAM explainability.",
                icon: Activity,
                link: "/analyze/xray"
              },
              { 
                title: "Symptom Logic", 
                desc: "BioBERT fine-tuned on medical journals identifies risk profiles with LIME feature highlighting.",
                icon: Database,
                link: "/analyze/symptoms"
              },
              { 
                title: "Vital Pulse", 
                desc: "LSTM recurrent networks forecast health trends and flag physiological anomalies instantly.",
                icon: HeartPulse,
                link: "/monitor/vitals"
              }
            ].map((feat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] border border-cream-200 shadow-sm group cursor-pointer hover:shadow-xl transition-all"
                onClick={handleStart}
              >
                <div className="w-14 h-14 bg-cream-100 rounded-2xl flex items-center justify-center text-medical-900 mb-6 group-hover:bg-medical-900 group-hover:text-white transition-colors">
                  <feat.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feat.title}</h3>
                <p className="text-muted-foreground leading-relaxed italic mb-8">{feat.desc}</p>
                <Link to="#" className="flex items-center font-bold text-sm text-medical-900 group-hover:text-medical-500">
                  Explore Module <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-cream-200 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-medical-900 rounded-lg flex items-center justify-center text-white">
              <HeartPulse size={20} />
            </div>
            <span className="font-serif font-bold text-lg tracking-tight">SmartHealth AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 SmartHealth Technologies. AI diagnosis is a support tool, not a replacement for expert doctors.</p>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-medical-900">Privacy</a>
            <a href="#" className="hover:text-medical-900">Ethics</a>
            <a href="#" className="hover:text-medical-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
