import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../contexts/Authservice";

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
      await authService.signup(email, password, name, surname).then(() => {
        navigate("/login");
        window.location.reload();
      });
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
            <label>Adınız</label>
            <input
              type="text"
              required="required"
              name="name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="inputs">
            <label>Soyadınız</label>

            <input
              type="text"
              required="required"
              name="surname"
              autoComplete="off"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="inputs">
            <label>Email</label>

            <input
              type="text"
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
          <div className="inputs">
            <label>Tekrar Şifre</label>

            <input
              type="password"
              required="required"
              name="password"
              autoComplete="off"
              value={repassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>

          <button className="enter"> Kayıt Ol </button>
          <div className="login-alt">
            <p>Hesabınız zaten var mı ?</p>
            <a href="/login">
              Giriş Yap
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
