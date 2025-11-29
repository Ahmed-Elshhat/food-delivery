import React, { useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";

function LoginPopup({ setShowLogin }) {
  const [currState, setCurrState] = useState("Sign Up");
  const [isFadeIn, setIsFadeIn] = useState(true);
  const [isFadeOut, setIsFadeOut] = useState(false);
  const [isFadeInOut, setIsFadeInOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsFadeIn(false)
    }, 500);
  },[])
  
  return (
    <div className={`login-popup ${isFadeOut ? "fade-out" : ""}`}>
      <form
        className={`login-popup-container ${isFadeIn ? "fade-in" : ""} ${isFadeInOut ? "fade-in-out" : ""}`}
      >
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => {
              setIsFadeOut(true);
              setTimeout(() => {
                setShowLogin(false);
                setIsFadeOut(false);
              }, 500);
            }}
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input type="text" placeholder="Your name" required />
          )}
          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account ?{" "}
            <span
              onClick={() => {
                setIsFadeInOut(true);
                setTimeout(() => {
                  setCurrState("Sign Up");
                }, 250);
                setTimeout(() => {
                  setIsFadeInOut(false);
                }, 500);
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account ?{" "}
            <span
              onClick={() => {
                setIsFadeInOut(true);
                setTimeout(() => {
                  setCurrState("Login");
                }, 250);
                setTimeout(() => {
                  setIsFadeInOut(false);
                }, 500);
              }}
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
