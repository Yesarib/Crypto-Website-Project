import React, { useEffect, useState } from "react";
import "./topbar.css";
import authService from "../../../contexts/Authservice";

const Topbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const logOut = () => {
    authService.logout();
  };
  const token = localStorage.getItem("userToken");
  const user = parseJwt(token);

  return (
    <div className="tp-bar">
      <div className="logo-section">
        <a className="logo-section" href="/">
          <img style={{width:'50px',height:'50px'}} src="images/logo.png" alt="logo" />
          <h6>CoinPaws</h6>
        </a>
        
      </div>
      <div className="links">
        <ul className="list">
          <li>
            <a style={{ color: "white", textDecoration: "none" }} href="/">
              {" "}
              Ana Sayfa
            </a>
          </li>
          <li>
            <a style={{ color: "white", textDecoration: "none" }} href="/news">
              {" "}
              Haberler{" "}
            </a>
          </li>
          <li>
            <a
              style={{ color: "white", textDecoration: "none" }}
              href="/cryptos"
            >
              {" "}
              Göz At
            </a>
          </li>
          {currentUser && (
            <li className="menu-list">
              <span className="dropdown">
                <span style={{ color: "white" }}>
                  Merhaba
                  <span style={{ color: "orange" }}> {user.name} </span>
                </span>
                <ul className="dropdown-content">
                  <li>
                    <a style={{ color: "white", textDecoration: "none" }} href="%">
                      Profil
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      style={{ color: "white", textDecoration: "none" }}
                      onClick={logOut}
                    >
                      Çıkış
                    </a>
                  </li>
                </ul>
              </span>
            </li>
          )}
          {!currentUser && (
            <li>
              <a className="login-bg"
                href="/login"
              >
                Giriş
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Topbar;

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}