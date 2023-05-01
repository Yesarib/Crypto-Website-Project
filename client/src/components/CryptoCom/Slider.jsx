import React, {useEffect,useState, useRef} from "react";
import axios from "axios";
import { BASEURL } from "../../data";
import './slider.css'
const Slider = () => {
  const [crypto, setCrypto] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    axios.get(BASEURL).then((res) => {
      setCrypto(res.data.data.coins);
    });
  }, []);

  useEffect(() => {
    let timeout = null;
    if (sliderRef.current) {
      timeout = setInterval(() => {
        sliderRef.current.style.transition = "all 1s ease-in-out";
        sliderRef.current.style.transform = `translateX(-${sliderRef.current.children[0].offsetWidth}px)`;
        setTimeout(() => {
          sliderRef.current.style.transition = "";
          sliderRef.current.style.transform = "";
          sliderRef.current.appendChild(sliderRef.current.children[0]);
        }, 1000);
      }, 3000);
    }

    return () => clearInterval(timeout);
  }, [crypto]);

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <div className="slider-container">
    <div className="slider" ref={sliderRef}>
      {crypto.slice(0, 5).map((coin) => {
        return (
          <div key={coin.id} className="slider-row">
            <div>
              <img src={coin.icon} alt={coin.name} className="slider-image" />
            </div>
            <div className="slider-coin">
              <div className="slider-symbol"> {coin.symbol} </div>
              <div> {coin.name} </div>
            </div>
            <div className="slider-price">
              ${coin.price.toFixed(2)}
            </div>
            <div className="slider-data">
              {coin.priceChange1d < 0 ? (
                <p className="slider-percent red">
                  {coin.priceChange1d.toFixed(2)}%
                </p>
              ) : (
                <p className="slider-percent green">
                  {coin.priceChange1d.toFixed(2)}%
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
  </div>
  );
};

export default Slider;
