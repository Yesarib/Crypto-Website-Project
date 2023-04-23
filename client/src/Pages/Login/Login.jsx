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
      await authService.login(email,password).then(
        () => {
          navigate("/");
          window.location.reload();
        }
      )
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const response = await axios.post(LoginURL, {
    //     email,
    //     password,
    //   });
    //   if (response.status === 200) {
    //     const data = response.data;
    //     localStorage.setItem("token", data.token);
    //     console.log(data.token);
    //     // const userName = parseJwt(data.token);
    //     login({name: "name"});
    //     navigate("/");
    //   }
    // } catch (error) {
    //   console.log(error.message);
    // }
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
            <input
              type="text"
              required="required"
              name="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="user">Email</span>
          </div>
          <div className="inputs">
            <input
              type="password"
              required="required"
              name="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="user">Şifre</span>
          </div>

          <button className="enter"> Giriş </button>
          <div>
          <p>Henüz hesabın yok mu ?</p>
          <a style={{color:'white'}} href="/register">Hemen Kayıt Ol</a>
        </div>
        </div>
        
      </form>
    </div>
  );
};

export default Login;

