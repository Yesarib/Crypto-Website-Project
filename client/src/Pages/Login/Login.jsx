import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import authService from "../../contexts/Authservice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password).then(() => {
        navigate("/");
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg">
      <form onSubmit={loginSubmit}>
        <div className="left-bar">
          <div>
            <h2>Giriş</h2>
            <p>
              Get started with our app, just create an account and enjoy the
              experience.
            </p>
          </div>
          <div className="inputs">
            <label>Email</label>
            <input
              type="email"
              required="required"
              name="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputs">
            <label>Şifre</label>

            <input
              type="password"
              required="required"
              name="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="enter"> Giriş </button>
          <div className="login-alt">
            <p>Henüz hesabın yok mu ?</p>
            <a href="/register">
              Hemen Kayıt Ol
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
