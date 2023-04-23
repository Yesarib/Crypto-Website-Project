import React from "react";
import "./middle.css";
import { Button } from "@mui/material";
const Middle = () => {
  return (
    <>
    
      <div className="cont">
        <div className="left">
          <h2>A Crypto Stack</h2>
          <p>
            Bir çok kripto seçeneği ile, istediğiniz kriptolarda anlık
            değişimlere ve grafiklere göz at.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt
            aperiam assumenda iusto sequi quas blanditiis officia iure
            perferendis. Exercitationem laborum dolorum maxime laudantium animi
            minus itaque quae vitae alias deserunt.
          </p>

          <button>Göz At</button>
        </div>
        <div className="right">
          <img src="images/rocket.png" alt="bitcoin" />
        </div>
      </div>

      
      <div className="conti">
        <div className="imgs">
          <img src="images/crypto.png" alt="cryptos" />
        </div>
        <div className="cent">
          <ul>
            <li>Tüm kriptoları incelemek, </li>
            <li>Günlük,haftalık değişimleri incelemek,</li>
            <li>Ve istediğiniz kriptoları favorilemek için,</li>
          </ul>
          <div className="cta">
            <Button href="/login" style={{color:'white'}}>Kayıt Ol</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Middle;
