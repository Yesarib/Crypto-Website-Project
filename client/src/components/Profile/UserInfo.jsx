import React from "react";
import "./style.css";
import { Button } from "@mui/material";

const UserInfo = ( { user } ) => {

  return (
    <div className="user-info">
      <div className="profile-img"></div>
      <div style={{ marginTop: "15px" }}>
        Merhaba {user.name} {user.surname}
        <p>Aşağıda bilgilerinizi görebilirsiniz.</p>
      </div>
      <div className="all-info">
        <div className="profile-user">
          <div style={{ marginTop: "5px" }}>İsim</div>
          <label
            style={{
              position: "relative",
              top: "31px",
              left: "8px",
              color: "black",
            }}
          >
            {user.name}
          </label>
          <input
            style={{ marginTop: "5px" }}
            type="text"
            name="name"
            id="user-name"
          />
        </div>
        <div className="profile-user">
          <div style={{ marginTop: "5px" }}>Soyisim</div>

          <label
            style={{
              position: "relative",
              top: "31px",
              left: "8px",
              color: "black",
            }}
          >
            {user.surname}
          </label>
          <input
            style={{ marginTop: "5px" }}
            type="text"
            name="name"
            id="user-name"
          />
        </div>
        <div className="profile-user">
          <div style={{ marginTop: "5px" }}>E-Mail</div>

          <label
            style={{
              position: "relative",
              top: "31px",
              left: "8px",
              color: "black",
            }}
          >
            {user.email}
          </label>

          <input
            style={{ marginTop: "5px" }}
            type="text"
            name="name"
            id="user-name"
          />
        </div>
        <Button className="save-btn"> Kaydet </Button>
      </div>
    </div>
  );
};

export default UserInfo;
