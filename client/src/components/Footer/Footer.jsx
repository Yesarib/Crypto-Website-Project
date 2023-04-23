import React from "react";
import "./footer.css";


const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="sym">
          <ul className="liste">
            <li>
              <h2>Crypto</h2>
            </li>
          </ul>
        </div>
        <div className="cols">
          <div className="col2">
            <ul className="liste">
              <li>
                <h3>Kaynaklar</h3>
              </li>
              <li>Site</li>
              <li>Market Data Api</li>
            </ul>
          </div>
          <div className="col3">
            <ul className="liste">
              <li>
                <h3>Destek</h3>
              </li>
              <li>lorem@gmail.com</li>
              <li>+90 555 222 1122</li>
            </ul>
          </div>
        </div>
        <div className="social">
            <ul>
                <li><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="" /></li>
                <li><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/584px-Twitter-logo.svg.png" alt="" /></li>
                <li><img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="" /></li>
            </ul>
        </div>
      </footer>
      <div className="copy">
        <h5>Made by Barış Yesari</h5>
        <a style={{color:'white'}} href="https://github.com/Yesarib">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
