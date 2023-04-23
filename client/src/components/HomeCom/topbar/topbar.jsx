import React, { useEffect, useState } from "react";
import "./topbar.css";
import { Button } from "@mui/material";
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
      <div className="logo-section">CRYPTO</div>
      <div className="links">
        <ul className="list ">
          <li>
            <Button style={{ color: "white" }} href="/" className="btn">
              Anasayfa
            </Button>
          </li>
          <li>
            <Button style={{ color: "white" }} href="/news" className="btn">
              Haberler
            </Button>
          </li>
          <li>
            <Button style={{ color: "white" }} href="/cryptos" className="btn">
              Göz At
            </Button>
          </li>
          <li>
            {currentUser ? (
              <>
                <span style={{ color: "white" }}>
                  Merhaba <span style={{ color: "orange" }}> {user.name} </span>
                </span>
                <Button
                  style={{ color: "white" }}
                  href="/"
                  className="btn"
                  onClick={logOut}
                >
                  Çıkış
                </Button>
              </>
            ) : (
              <Button style={{ color: "white" }} href="/login" className="btn">
                Giriş
              </Button>
            )}
          </li>
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
