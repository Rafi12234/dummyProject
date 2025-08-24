// LoginPage.jsx
import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

// ✅ Correct Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc4TfOAXIRl9R-PVWxGUtJtll4btIoNpI",
  authDomain: "student-login-e95e7.firebaseapp.com",
  projectId: "student-login-e95e7",
  storageBucket: "student-login-e95e7.appspot.com", // ✅ fixed
  messagingSenderId: "995330773071",
  appId: "1:995330773071:web:da293dd3ef135811855a3a",
  measurementId: "G-RYSGKJSTC5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginPage = ({ onSwitchToRegister }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/dashboard");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!credentials.password) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      console.log("User logged in:", userCredential.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Failed to login. Please try again.";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address format.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled.";
          break;
        default:
          errorMessage = error.message;
      }
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side */}
        <div className="login-left">
          <div className="login-content">
            <div className="login-logo">
              <i className="fas fa-users"></i>
              <span>ClubPortal</span>
            </div>
            <h1>Welcome Back!</h1>
            <p>Sign in to access your club dashboard, events, and more.</p>
            <div className="login-features">
              <div className="feature">
                <i className="fas fa-calendar-alt"></i>
                <span>Manage event registrations</span>
              </div>
              <div className="feature">
                <i className="fas fa-user-friends"></i>
                <span>Connect with your clubs</span>
              </div>
              <div className="feature">
                <i className="fas fa-bell"></i>
                <span>Get important updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="login-right">
          <div className="login-form-container">
            <div className="form-header">
              <h2>Sign In</h2>
              <p>Enter your credentials to access your account</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {errors.submit && (
                <div className="error-message">{errors.submit}</div>
              )}

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleInputChange}
                    className={errors.email ? "error" : ""}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <span className="field-error">{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className={errors.password ? "error" : ""}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <span className="field-error">{errors.password}</span>
                )}
              </div>

              {/* Options */}
              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#forgot" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i> Sign In
                  </>
                )}
              </button>
            </form>

            <div className="divider">
              <span>Or continue with</span>
            </div>

            {/* Social */}
            <div className="social-login">
              <button className="social-button google">
                <i className="fab fa-google"></i> Google
              </button>
              <button className="social-button facebook">
                <i className="fab fa-facebook-f"></i> Facebook
              </button>
            </div>

            <div className="signup-link">
              Don't have an account?{" "}
              <button onClick={onSwitchToRegister}>Sign up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
