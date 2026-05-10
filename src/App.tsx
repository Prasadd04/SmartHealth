/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import XRayAnalyzer from './pages/XRayAnalyzer';
import SymptomAnalyzer from './pages/SymptomAnalyzer';
import VitalsMonitor from './pages/VitalsMonitor';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Features from './pages/Features';
import Performance from './pages/Performance';
import Expertise from './pages/Expertise';
import { useStore } from './store/useStore';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { user } = useStore();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen font-sans selection:bg-medical-500 selection:text-white">
        {/* Cursor Glow Effect */}
        <div 
          className="fixed inset-0 cursor-glow pointer-events-none"
          style={{ 
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(12, 74, 110, 0.08) 0%, transparent 60%)` 
          }}
        />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile /> : <Navigate to="/" />} 
            />
            <Route 
              path="/analyze/xray" 
              element={user ? <XRayAnalyzer /> : <Navigate to="/" />} 
            />
            <Route 
              path="/analyze/symptoms" 
              element={user ? <SymptomAnalyzer /> : <Navigate to="/" />} 
            />
            <Route 
              path="/monitor/vitals" 
              element={user ? <VitalsMonitor /> : <Navigate to="/" />} 
            />
            <Route 
              path="/reports" 
              element={user ? <Reports /> : <Navigate to="/" />} 
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}
