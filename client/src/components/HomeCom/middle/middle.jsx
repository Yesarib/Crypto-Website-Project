import React from "react";
import "./middle.css";
import { Button } from "@mui/material";
const Middle = () => {
  return (
    <>
    
      <div className="cont">
        <div className="left">
          <h2>Bir Kripto Yığını</h2>
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

          <Button href="/cryptos" className="mid-button" style={{textTransform:'none'}}>Göz At</Button>
        </div>
        <div className="right">
          <img src="images/rocket.png" alt="bitcoin" />
        </div>
      </div>

      
      <div className="conti">
        <div className="imgs">
          <img src="https://coinstats.app/_next/static/images/mockupDark-13e8bd4fddd525a0df64928edd6cf499.png" alt="cryptos" />
        </div>
        <div className="cent">
          <ul>
            <li style={{color:'white',fontSize:'36px'}}>CoinPaws ile </li>
            <li style={{color:'#ff9332',fontSize:'60px'}}>Anlık olarak </li>
            <li>Tüm kriptoları incelemek, </li>
            <li>Günlük,haftalık değişimleri incelemek,</li>
            <li>Ve istediğiniz kriptoları favorilemek için,</li>
          </ul>
          <div className="cta">
            <Button href="/login" style={{color:'white',textTransform:'none'}}>Kayıt Ol</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Middle;
