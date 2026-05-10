import "./Register.css";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "../store/useStore";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  HeartPulse,
  ShieldCheck,
  Users,
  Activity,
  User,
} from "lucide-react";

/* ── Password strength helper ── */
function getPasswordStrength(pw: string): { level: number; label: string } {
  if (!pw) return { level: 0, label: "" };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { level: 1, label: "Weak" };
  if (score === 2) return { level: 2, label: "Fair" };
  if (score === 3) return { level: 3, label: "Good" };
  return { level: 4, label: "Strong" };
}

const strengthClasses = ["", "weak", "fair", "good", "strong"];

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});
  const [shakeField, setShakeField] = useState<string | null>(null);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.terms = "You must agree to the terms";
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
       const firstKey = Object.keys(validationErrors)[0];
       triggerShake(firstKey);
       return;
     }

     setErrors({});
     setIsLoading(true);

     try {
       // Call real registration API
       const response = await fetch("/api/auth/register", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, password, name: fullName }),
       });

       const data = await response.json();

       if (!response.ok) {
         throw new Error(data.error?.message || "Registration failed");
       }

       setIsLoading(false);
       setIsSuccess(true);

       setTimeout(() => {
         // Set user in Zustand store
       setUser(
         { email: data.data.user.email, name: data.data.user.name, id: data.data.user.id },
         data.data.token
       );
         navigate("/dashboard");
       }, 800);
     } catch (error) {
       setIsLoading(false);
       // Handle specific error messages
       if ((error as any).message === "User with this email already exists") {
         setErrors({ email: "User with this email already exists" });
         triggerShake("email");
       } else {
         setErrors({ email: "Registration failed. Please try again." });
         triggerShake("email");
       }
       console.error("Registration error:", error);
     }
   };

   const handleSocialLogin = (provider: string) => {
     setUser(
       { id: `${provider}-user-id`, email: `user@${provider}.com`, name: `${provider} User` },
       `${provider}-token`
     );
     navigate("/dashboard");
   };

  return (
    <div className="register-page">
      {/* ============= LEFT PANEL — Decorative ============= */}
      <div className="register-left">
        {/* CSS Particle dots */}
        <div className="register-particles">
          {[...Array(18)].map((_, i) => (
            <span
              key={i}
              className="register-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

        {/* Robot illustration */}
        <div className="register-robot-wrapper">
          <div className="register-robot">
            {/* Head */}
            <div className="register-robot-head">
              <div className="register-robot-visor">
                <div className="register-robot-visor-glow" />
              </div>
              <div className="register-robot-ear register-robot-ear--left" />
              <div className="register-robot-ear register-robot-ear--right" />
              <div className="register-robot-antenna">
                <div className="register-robot-antenna-tip" />
              </div>
            </div>

            {/* Neck */}
            <div className="register-robot-neck" />

            {/* Body — Medical coat */}
            <div className="register-robot-body">
              {/* Lapel lines */}
              <div className="register-robot-lapel register-robot-lapel--left" />
              <div className="register-robot-lapel register-robot-lapel--right" />

              {/* Tie */}
              <div className="register-robot-tie">
                <div className="register-robot-tie-knot" />
                <div className="register-robot-tie-tail" />
              </div>

              {/* Pocket */}
              <div className="register-robot-pocket">
                <div className="register-robot-pocket-pen" />
              </div>

              {/* Badge */}
              <div className="register-robot-badge">
                <div className="register-robot-badge-line" />
                <div className="register-robot-badge-dot" />
              </div>

              {/* Stethoscope */}
              <div className="register-robot-stethoscope" />
            </div>

            {/* Arms */}
            <div className="register-robot-arm register-robot-arm--left" />
            <div className="register-robot-arm register-robot-arm--right" />
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="register-float-card register-float-card--1">
          <div className="register-float-card-icon">
            <ShieldCheck size={16} />
          </div>
          <div className="register-float-card-content">
            <span className="register-float-card-value">HIPAA</span>
            <span className="register-float-card-label">
              Fully Compliant
            </span>
          </div>
        </div>

        <div className="register-float-card register-float-card--2">
          <div className="register-float-card-icon register-float-card-icon--teal">
            <Users size={16} />
          </div>
          <div className="register-float-card-content">
            <span className="register-float-card-value">500+</span>
            <span className="register-float-card-label">Active Users</span>
          </div>
        </div>

        <div className="register-float-card register-float-card--3">
          <div className="register-float-card-icon register-float-card-icon--amber">
            <Activity size={16} />
          </div>
          <div className="register-float-card-content">
            <span className="register-float-card-value">Free</span>
            <span className="register-float-card-label">
              To Get Started
            </span>
          </div>
        </div>

        {/* Wordmark */}
        <div className="register-wordmark">
          <HeartPulse size={20} />
          <span>SmartHealth AI</span>
        </div>
      </div>

      {/* ============= RIGHT PANEL — Form ============= */}
      <div className="register-right">
        <div className="register-form-container">
          {/* Status badge */}
          <div className="register-status-badge">
            <span className="register-status-dot">
              <span className="register-status-dot-ping" />
              <span className="register-status-dot-core" />
            </span>
            <span>System operational</span>
          </div>

           {/* Header */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
           >
             <h1 className="register-title">Create account</h1>
             <p className="register-subtitle">
               Join SmartHealth and start your AI-powered diagnostics
             </p>
           </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="register-form"
            noValidate
          >
            {/* Full Name field */}
            <div className="register-field-group">
              <label htmlFor="register-name" className="register-label">
                Full Name
              </label>
              <div
                className={`register-input-wrapper ${errors.fullName ? "register-input-wrapper--error" : ""} ${shakeField === "fullName" ? "register-shake" : ""}`}
              >
                <User size={18} className="register-input-icon" />
                <input
                  id="register-name"
                  type="text"
                  placeholder="Dr. John Doe"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  className="register-input"
                  autoComplete="name"
                />
              </div>
              <AnimatePresence>
                {errors.fullName && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="register-error-text"
                  >
                    {errors.fullName}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Email field */}
            <div className="register-field-group">
              <label htmlFor="register-email" className="register-label">
                Email address
              </label>
              <div
                className={`register-input-wrapper ${errors.email ? "register-input-wrapper--error" : ""} ${shakeField === "email" ? "register-shake" : ""}`}
              >
                <Mail size={18} className="register-input-icon" />
                <input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className="register-input"
                  autoComplete="email"
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="register-error-text"
                  >
                    {errors.email}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Password field */}
            <div className="register-field-group">
              <label htmlFor="register-password" className="register-label">
                Password
              </label>
              <div
                className={`register-input-wrapper ${errors.password ? "register-input-wrapper--error" : ""} ${shakeField === "password" ? "register-shake" : ""}`}
              >
                <Lock size={18} className="register-input-icon" />
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className="register-input"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="register-eye-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Strength meter */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <div className="register-strength-bar">
                    {[1, 2, 3, 4].map((seg) => (
                      <div
                        key={seg}
                        className={`register-strength-segment ${
                          strength.level >= seg
                            ? `register-strength-segment--${strengthClasses[strength.level]}`
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`register-strength-label register-strength-label--${strengthClasses[strength.level]}`}
                  >
                    {strength.label}
                  </span>
                </motion.div>
              )}
              <AnimatePresence>
                {errors.password && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="register-error-text"
                  >
                    {errors.password}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Confirm Password field */}
            <div className="register-field-group">
              <label
                htmlFor="register-confirm-password"
                className="register-label"
              >
                Confirm Password
              </label>
              <div
                className={`register-input-wrapper ${errors.confirmPassword ? "register-input-wrapper--error" : ""} ${shakeField === "confirmPassword" ? "register-shake" : ""}`}
              >
                <Lock size={18} className="register-input-icon" />
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: undefined,
                    }));
                  }}
                  className="register-input"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="register-eye-btn"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {errors.confirmPassword && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="register-error-text"
                  >
                    {errors.confirmPassword}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Terms */}
            <div className="register-field-group">
              <label className="register-terms-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    setErrors((prev) => ({ ...prev, terms: undefined }));
                  }}
                  className="register-checkbox"
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="register-terms-link">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="register-terms-link">
                    Privacy Policy
                  </a>
                </span>
              </label>
              <AnimatePresence>
                {errors.terms && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="register-error-text"
                  >
                    {errors.terms}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`register-submit-btn ${isLoading ? "register-submit-btn--loading" : ""} ${isSuccess ? "register-submit-btn--success" : ""}`}
              id="register-submit"
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.span
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="register-btn-content"
                  >
                    <Check size={22} strokeWidth={3} /> Account Created
                  </motion.span>
                ) : isLoading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="register-btn-content"
                  >
                    <span className="register-spinner" /> Creating Account...
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="register-btn-content"
                  >
                    Create Account <ArrowRight size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Divider */}
            <div className="register-divider">
              <div className="register-divider-line" />
              <span className="register-divider-text">or sign up with</span>
              <div className="register-divider-line" />
            </div>

            {/* Social buttons */}
            <div className="register-social-row">
              <button
                type="button"
                className="register-social-btn"
                id="register-google"
                onClick={() => handleSocialLogin("google")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="register-social-btn"
                id="register-apple"
                onClick={() => handleSocialLogin("apple")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>

            {/* Login link */}
            <p className="register-login-text">
              Already have an account?{" "}
              <Link to="/login" className="register-login-link">
                Sign In <ArrowRight size={13} className="inline" />
              </Link>
            </p>
          </motion.form>

          {/* HIPAA badge */}
          <div className="register-hipaa">
            <Lock size={13} />
            <span>HIPAA Compliant · End-to-end encrypted</span>
          </div>
        </div>
      </div>

      {/* ============= MOBILE NAV BAR (shows only on small screens) ============= */}
      <div className="register-mobile-header">
        <HeartPulse size={22} />
        <span>SmartHealth AI</span>
      </div>
    </div>
  );
}
