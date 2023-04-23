import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RegisterURL } from "../../data";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const navigate = useNavigate();

  const registerSubmit = async (e) => {
    e.preventDefault();
    if (repassword !== password) {
      alert("Şifreler uyuşmuyor.");
    }
    try {
      const response = await axios.post(RegisterURL, {
        name,
        surname,
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        navigate("/login");
      }
    } catch (error) {
      alert("Kullanıcı adı veya şifre hatalı.");
    }
  };

  return (
    <div className="bg" style={{ marginTop: "5em" }}>
      <form onSubmit={registerSubmit}>
        <div className="left-bar" style={{ width: "55em", height: "65em" }}>
          <div>
            <h2>Kayıt Ol</h2>
            <p>En güncel kriptolar için hemen kayıt ol.</p>
          </div>
          <div className="inputs">
            <input
              type="text"
              required="required"
              name="name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="user">Adınız</span>
          </div>
          <div className="inputs">
            <input
              type="text"
              required="required"
              name="surname"
              autoComplete="off"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <span className="user">Soyadınız</span>
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
          <div className="inputs">
            <input
              type="password"
              required="required"
              name="password"
              autoComplete="off"
              value={repassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
            <span className="user">Tekrar Şifre</span>
          </div>

          <button className="enter"> Kayıt Ol </button>
          <div>
            <p>Hesabınız zaten var mı ?</p>
            <a style={{ color: "white" }} href="/login">
              {" "}
              Giriş Yap
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
