import "./Login.css";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "../store/useStore";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, HeartPulse, ShieldCheck, Users, Activity } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [shakeField, setShakeField] = useState<string | null>(null);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }
    return newErrors;
  };

  const triggerShake = (field: string) => {
    setShakeField(field);
    setTimeout(() => setShakeField(null), 500);
  };

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     const validationErrors = validate();

     if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors);
       if (validationErrors.email) triggerShake("email");
       else if (validationErrors.password) triggerShake("password");
       return;
     }

     setErrors({});
     setIsLoading(true);

     try {
       // Call real authentication API
       const response = await fetch("/api/auth/login", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, password }),
       });

       const data = await response.json();

       if (!response.ok) {
         throw new Error(data.error?.message || "Login failed");
       }

       setIsLoading(false);
       setIsSuccess(true);

       setTimeout(() => {
         // Set user in Zustand store
          setUser(
            { id: data.data.user.id, email: data.data.user.email, name: data.data.user.name },
            data.data.token
          );
         navigate("/dashboard");
       }, 800);
     } catch (error) {
       setIsLoading(false);
       setErrors({ email: "Invalid email or password" });
       triggerShake("email");
       console.error("Login error:", error);
     }
   };

   const handleSocialLogin = (provider: string) => {
     setUser({ id: `${provider}-user-id`, email: `user@${provider}.com`, name: `${provider} User` }, `${provider}-token`);
     navigate("/dashboard");
   };

  return (
    <div className="login-page">
      {/* ============= LEFT PANEL — Decorative ============= */}
      <div className="login-left">
        {/* CSS Particle dots */}
        <div className="login-particles">
          {[...Array(18)].map((_, i) => (
            <span key={i} className="login-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
            }} />
          ))}
        </div>

        {/* Robot illustration */}
        <div className="login-robot-wrapper">
          <div className="login-robot">
            {/* Head */}
            <div className="login-robot-head">
              <div className="login-robot-visor">
                <div className="login-robot-visor-glow" />
              </div>
              <div className="login-robot-ear login-robot-ear--left" />
              <div className="login-robot-ear login-robot-ear--right" />
              <div className="login-robot-antenna">
                <div className="login-robot-antenna-tip" />
              </div>
            </div>

            {/* Neck */}
            <div className="login-robot-neck" />

            {/* Body — Medical coat */}
            <div className="login-robot-body">
              {/* Lapel lines */}
              <div className="login-robot-lapel login-robot-lapel--left" />
              <div className="login-robot-lapel login-robot-lapel--right" />

              {/* Tie */}
              <div className="login-robot-tie">
                <div className="login-robot-tie-knot" />
                <div className="login-robot-tie-tail" />
              </div>

              {/* Pocket */}
              <div className="login-robot-pocket">
                <div className="login-robot-pocket-pen" />
              </div>

              {/* Badge */}
              <div className="login-robot-badge">
                <div className="login-robot-badge-line" />
                <div className="login-robot-badge-dot" />
              </div>

              {/* Stethoscope */}
              <div className="login-robot-stethoscope" />
            </div>

            {/* Arms */}
            <div className="login-robot-arm login-robot-arm--left" />
            <div className="login-robot-arm login-robot-arm--right" />
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="login-float-card login-float-card--1">
          <div className="login-float-card-icon">
            <ShieldCheck size={16} />
          </div>
          <div className="login-float-card-content">
            <span className="login-float-card-value">94%</span>
            <span className="login-float-card-label">Diagnostic Accuracy</span>
          </div>
        </div>

        <div className="login-float-card login-float-card--2">
          <div className="login-float-card-icon login-float-card-icon--teal">
            <Users size={16} />
          </div>
          <div className="login-float-card-content">
            <span className="login-float-card-value">500+</span>
            <span className="login-float-card-label">Active Users</span>
          </div>
        </div>

        <div className="login-float-card login-float-card--3">
          <div className="login-float-card-icon login-float-card-icon--amber">
            <Activity size={16} />
          </div>
          <div className="login-float-card-content">
            <span className="login-float-card-value">89%</span>
            <span className="login-float-card-label">Early Detection</span>
          </div>
        </div>

        {/* Wordmark */}
        <div className="login-wordmark">
          <HeartPulse size={20} />
          <span>SmartHealth AI</span>
        </div>
      </div>

      {/* ============= RIGHT PANEL — Form ============= */}
      <div className="login-right">
        <div className="login-form-container">
          {/* Status badge */}
          <div className="login-status-badge">
            <span className="login-status-dot">
              <span className="login-status-dot-ping" />
              <span className="login-status-dot-core" />
            </span>
            <span>System operational</span>
          </div>

           {/* Header */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
           >
             <h1 className="login-title">Welcome back</h1>
             <p className="login-subtitle">Sign in to your SmartHealth dashboard</p>
           </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="login-form"
            noValidate
          >
            {/* Email field */}
            <div className="login-field-group">
              <label htmlFor="login-email" className="login-label">Email address</label>
              <div className={`login-input-wrapper ${errors.email ? "login-input-wrapper--error" : ""} ${shakeField === "email" ? "login-shake" : ""}`}>
                <Mail size={18} className="login-input-icon" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                  className="login-input"
                  autoComplete="email"
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="login-error-text">{errors.email}</motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Password field */}
            <div className="login-field-group">
              <label htmlFor="login-password" className="login-label">Password</label>
              <div className={`login-input-wrapper ${errors.password ? "login-input-wrapper--error" : ""} ${shakeField === "password" ? "login-shake" : ""}`}>
                <Lock size={18} className="login-input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: undefined })); }}
                  className="login-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-eye-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="login-error-text">{errors.password}</motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Remember + Forgot */}
            <div className="login-meta-row">
              <label className="login-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="login-checkbox"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="login-forgot-link">Forgot password?</a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`login-submit-btn ${isLoading ? "login-submit-btn--loading" : ""} ${isSuccess ? "login-submit-btn--success" : ""}`}
              id="login-submit"
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.span key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} className="login-btn-content">
                    <Check size={22} strokeWidth={3} /> Signed In
                  </motion.span>
                ) : isLoading ? (
                  <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="login-btn-content">
                    <span className="login-spinner" /> Authenticating...
                  </motion.span>
                ) : (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="login-btn-content">
                    Sign In <ArrowRight size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Divider */}
            <div className="login-divider">
              <div className="login-divider-line" />
              <span className="login-divider-text">or continue with</span>
              <div className="login-divider-line" />
            </div>

            {/* Social buttons */}
            <div className="login-social-row">
              <button type="button" className="login-social-btn" id="login-google" onClick={() => handleSocialLogin("google")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </button>
              <button type="button" className="login-social-btn" id="login-apple" onClick={() => handleSocialLogin("apple")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span>Apple</span>
              </button>
            </div>

            {/* Register link */}
            <p className="login-register-text">
              Don't have an account?{" "}
              <Link to="/register" className="login-register-link">Register <ArrowRight size={13} className="inline" /></Link>
            </p>
          </motion.form>

          {/* HIPAA badge */}
          <div className="login-hipaa">
            <Lock size={13} />
            <span>HIPAA Compliant · End-to-end encrypted</span>
          </div>
        </div>
      </div>

      {/* ============= MOBILE NAV BAR (shows only on small screens) ============= */}
      <div className="login-mobile-header">
        <HeartPulse size={22} />
        <span>SmartHealth AI</span>
      </div>
    </div>
  );
}
