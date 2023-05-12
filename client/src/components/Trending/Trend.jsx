import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrendURL } from "../../data";
import "./trend.css";

const Trend = () => {
  const [trendCoins, setTrendCoins] = useState([]);

  const fetchData = async () => {
    await axios.get(TrendURL).then((res) => {
      setTrendCoins(res.data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "block",
        justifyContent: "center",
        color: "white",
        alignItems: "center",
        marginLeft: "20em",
      }}
    >
      <div>
        <h2>Öne Çıkan Coin'ler</h2>
      </div>
      <div className="card-container">
        {trendCoins.coins?.map((coin) => (
          <div key={coin.item.id} className="card">
            <div className="img">
              <img src={coin.item.small} alt="" />
              <div className="coin-namee">
                <div>{coin.item.name}</div>
                <div style={{marginLeft:'10px',color:'gray'}}>{coin.item.symbol}</div>
              </div>
              {/* <div className="coin-price">
                {coin.item.price_btc} BTC
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trend;
