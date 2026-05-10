import { motion } from "motion/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Scissors as Scan, MessageSquare, Activity, FileText, Settings, LogOut, Bell, HeartPulse, User } from "lucide-react";
import { useStore } from "../store/useStore";
import { Button } from "./ui/button";
import * as React from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Scan, label: "X-Ray Analyzer", href: "/analyze/xray" },
  { icon: MessageSquare, label: "Symptom Check", href: "/analyze/symptoms" },
  { icon: Activity, label: "Vital Monitor", href: "/monitor/vitals" },
  { icon: FileText, label: "Health Reports", href: "/reports" },
  { icon: User, label: "Profile", href: "/profile" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7]">
      {/* Sidebar */}
      <aside className="w-[300px] border-r border-black/5 bg-white flex flex-col">
        <div className="p-10 flex flex-col gap-12 flex-1">
          <Link to="/dashboard" className="flex items-center gap-3">
            <HeartPulse size={24} className="text-[#4F46E5]" />
            <span className="font-serif font-bold text-xl text-[#0F172A] tracking-tight">SmartHealth AI</span>
          </Link>

          <div>
            <span className="text-[10px] uppercase tracking-[0.1em] text-[#94A3B8] font-bold block mb-4">Modules</span>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.href
                      ? "bg-white text-[#0F172A] shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-black/5"
                      : "text-[#94A3B8] hover:text-[#0F172A]"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto">
            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-black/5">
              <span className="text-[10px] uppercase tracking-[0.1em] text-[#94A3B8] font-bold block mb-2">Current OKR</span>
              <div className="font-serif text-2xl font-bold text-[#0F172A] mb-2">500+ <span className="text-sm font-sans font-normal opacity-60">Users</span></div>
              <div className="h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: '89%' }}></div>
              </div>
              <div className="text-[11px] text-[#059669] font-bold mt-2 italic">On track for Q4 goal</div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-black/5 space-y-1">
          <button className="flex items-center gap-3 px-4 py-2.5 w-full text-sm font-medium text-[#94A3B8] hover:text-[#0F172A] transition-all">
            <Settings size={18} /> Settings
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-sm font-medium text-red-400 hover:text-red-600 transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-[#f8f9fa] overflow-hidden">
        <header className="h-[72px] border-b border-black/5 bg-white/80 backdrop-blur-md px-12 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(5,150,105,0.6)]"></div>
              World's Most Adopted Healthcare AI
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="tech-tag">v2.0.4 - Production</span>
            <div className="flex items-center gap-3 border-l border-black/5 pl-6">
              <div className="w-8 h-8 rounded-full bg-[#e2e8f0] ring-2 ring-white shadow-sm overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${user?.email}`} alt="User" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

