import { motion } from "motion/react";

export function Robot() {
  return (
    <motion.div 
      initial={{ y: 0, rotate: 0 }}
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="relative w-80 h-96 mx-auto"
    >
      {/* Robot Head */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-slate-200 rounded-2xl border-4 border-medical-900 overflow-hidden">
        {/* Scanning Visor */}
        <div className="absolute top-8 left-0 w-full h-8 bg-medical-900 flex items-center justify-center">
          <motion.div 
            animate={{ x: [-40, 40, -40] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-2 bg-medical-500 rounded-full shadow-[0_0_15px_#0ea5e9]"
          />
        </div>
        {/* Ears/Antennae */}
        <div className="absolute top-6 -left-2 w-4 h-12 bg-medical-900 rounded-full" />
        <div className="absolute top-6 -right-2 w-4 h-12 bg-medical-900 rounded-full" />
      </div>

      {/* Robot Neck */}
      <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-400" />

      {/* Robot Body / Medical Coat */}
      <div className="absolute top-[140px] left-1/2 -translate-x-1/2 w-48 h-64 bg-white rounded-t-3xl border-4 border-slate-200 shadow-xl overflow-hidden">
        {/* Coat Lapels */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-1/2 -translate-x-[110%] w-24 h-64 bg-white border-r border-slate-100 ORIGIN-top-right rotate-[-5deg]" />
          <div className="absolute top-0 left-1/2 translate-x-[10%] w-24 h-64 bg-white border-l border-slate-100 ORIGIN-top-left rotate-[5deg]" />
        </div>
        
        {/* Shirt & Tie */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-full bg-slate-50 flex flex-col items-center pt-2">
          <div className="w-8 h-4 bg-medical-900 rounded-b-lg" /> {/* Tie Knot */}
          <div className="w-4 h-24 bg-medical-900 rounded-b-full" /> {/* Tie Tail */}
        </div>

        {/* Pocket & Stethoscope */}
        <div className="absolute top-16 left-6 w-12 h-14 bg-slate-50 border border-slate-200 rounded-b-md">
          <div className="absolute top-2 left-2 w-8 h-1 bg-medical-500 rounded-full" />
        </div>

        {/* Badge */}
        <div className="absolute top-16 right-6 w-10 h-12 bg-medical-900 rounded-sm flex flex-col items-center justify-center gap-1">
          <div className="w-6 h-1 bg-white/30 rounded-full" />
          <div className="w-4 h-4 rounded-full border-2 border-medical-500 animate-pulse" />
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: [0, 1, 0], y: -200, x: (i - 2) * 40 }}
          transition={{ 
            duration: 4 + Math.random() * 4, 
            repeat: Infinity, 
            delay: i * 0.8 
          }}
          className="absolute bottom-0 left-1/2 w-2 h-2 bg-medical-500 rounded-full blur-sm"
        />
      ))}
    </motion.div>
  );
}
