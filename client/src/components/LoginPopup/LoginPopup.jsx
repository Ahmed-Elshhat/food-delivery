import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"

function LoginPopup({ setShowLogin }) {
  const {url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Sign Up");
  const [isFadeIn, setIsFadeIn] = useState(true);
  const [isFadeOut, setIsFadeOut] = useState(false);
  const [isFadeInOut, setIsFadeInOut] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  
  useEffect(() => {
    setTimeout(() => {
      setIsFadeIn(false);
    }, 500);
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl, data)

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
    } else {
      alert(response.data.message)
    }
  }



  return (
    <div className={`login-popup ${isFadeOut ? "fade-out" : ""}`}>
      <form
        className={`login-popup-container ${isFadeIn ? "fade-in" : ""} ${
          isFadeInOut ? "fade-in-out" : ""
        }`}
        onSubmit={onLogin}
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
            <input
              type="text"
              placeholder="Your name"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
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
