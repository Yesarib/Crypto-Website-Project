import React, { useEffect, useState } from "react";
import "./profile.css";
import { Button } from "@mui/material";
import axios from "axios";
import UserInfo from "../../components/Profile/UserInfo";
import PasswordChange from "../../components/Profile/PasswordChange";
import { getUserById } from "../../data";
import authService from "../../contexts/Authservice";


const Profile = () => {
  const [tab, setTab] = useState("user-info");
  const [user,setUser] = useState([]);


  const token = localStorage.getItem("userToken");
  const userToken = parseJwt(token);
  const userFav = userToken.unique_name;

  const getUser = async () => {
    axios.get(getUserById(userFav))
    .then((res)=> {
      setUser(res.data)
    })
  }

  useEffect(()=>{
    getUser();
  },[]);


  const logOut = () => {
    authService.logout();
  };
  const handleButton = (tab) => {
    setTab(tab);
  };
  return (
    <div className="profile">
      <div className="profile-left">
        <div className="profile-img"></div>
        <div style={{marginTop:'15px'}}> {user.name} </div>
        <div className="profile-upt">
          <div style={{ display: "flex", marginTop: "2rem" }}>
            <img
              style={{
                width: "25px",
                height: "25px",
                marginLeft: "15px",
                marginTop: "4px",
              }}
              src="images/person.png"
              alt="user"
            />
            <Button
              className="profile-btn"
              onClick={() => handleButton("user-info")}
            >
              Bilgiler
            </Button>
          </div>
          <hr />
          <div style={{ display: "flex", marginTop: "2rem" }}>
            <img
              style={{
                width: "25px",
                height: "25px",
                marginLeft: "15px",
                marginTop: "4px",
              }}
              src="https://icon-library.com/images/icon-password/icon-password-25.jpg"
              alt="user"
            />
            <Button
              className="profile-btn"
              onClick={() => setTab("passwordChange")}
            >
              Şifre Değiştirme
            </Button>
          </div>
          <hr />

          <div style={{ display: "flex", marginTop: "2rem" }}>
            <img
              style={{
                width: "25px",
                height: "25px",
                marginLeft: "15px",
                marginTop: "4px",
              }}
              src="images/logout-icon-png-3.jpg"
              alt="user"
            />

            <Button
              className="profile-btn"
              href="/"
              onClick={logOut}
            >
              Çıkış
            </Button>
          </div>
          <hr />

          {/* Bilgiler */}
          {/* Şifre değiştirme */}
          {/* çıkış */}
        </div>
      </div>
      <div className="profile-right">
        {tab === "user-info" && <UserInfo user={user} />}
        {tab === "passwordChange" && <PasswordChange />}
      </div>
    </div>
  );
};

export default Profile;


function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}