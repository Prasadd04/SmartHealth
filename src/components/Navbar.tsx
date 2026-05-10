import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, HeartPulse } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useStore } from "../store/useStore";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useStore();
  const navigate = useNavigate();

   const handleDemoLogin = () => {
     setUser({ id: "demo-user-id", email: "demo@example.com", name: "Demo User" }, "demo-token");
     navigate("/dashboard");
   };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-cream-100/70 border border-cream-200/50 rounded-full px-6 py-3">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-medical-900 rounded-lg flex items-center justify-center text-white">
            <HeartPulse size={20} />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight">SmartHealth <span className="text-medical-500">AI</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-muted-foreground">
          <Link to="/features" className="hover:text-primary transition-colors">Features</Link>
          <Link to="/performance" className="hover:text-primary transition-colors">Performance</Link>
          <Link to="/expertise" className="hover:text-primary transition-colors">Expertise</Link>
          
          {user ? (
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="rounded-full">
              Dashboard <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button variant="outline" onClick={() => navigate("/login")} className="rounded-full border-cream-300">Log In</Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 bg-white border border-cream-200 rounded-2xl p-4 shadow-xl"
        >
          <div className="flex flex-col gap-4">
            <Link to="/features" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-cream-100 rounded-lg">Features</Link>
            <Link to="/performance" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-cream-100 rounded-lg">Performance</Link>
            <Link to="/expertise" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-cream-100 rounded-lg">Expertise</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
