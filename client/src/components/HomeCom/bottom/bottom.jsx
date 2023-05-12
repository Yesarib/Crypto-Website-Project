import React, { useState, useEffect } from "react";
import "./bottom.css";
import axios from "axios";
import { BASEURL } from "../../../data";

const Bottom = () => {
  const [crypto, setCrypto] = useState([]);
  useEffect(() => {
    axios.get(BASEURL).then((res) => {
      setCrypto(res.data.data.coins);
    });
  }, []);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="bottom">
      <br />
      <div>
        <h3> En İyi 10 Kripto Listesi</h3>
      </div>
      <div className="crypto-header">
        <div className="data">
          <table height="500" cellPadding="5" cellSpacing="50">
            <tr>
              <th align="left">Coin</th>
              <th align="right">Fiyat $</th>
              <th align="right">Market Cap</th>
              <th align="right">Günlük Değişim</th>
            </tr>

            <tbody>
              {crypto.slice(0, 10).map((coin, index) => (
                <tr key={index}>
                  <td>
                    <div>
                      <img src={coin.icon} alt={coin.name} />
                      <div>
                        <div>{coin.symbol}</div>
                        <div>{coin.name}</div>
                      </div>
                    </div>
                  </td>
                  <td align="right">${coin.price?.toFixed(2)}</td>
                  <td align="right">
                    {numberWithCommas(coin.marketCap.toString().slice(0, -6))}M
                  </td>
                  <td align="right">
                    {coin.priceChange1d < 0 ? (
                      <p className="red">{coin.priceChange1d?.toFixed(2)}%</p>
                    ) : (
                      <p className="green">{coin.priceChange1d?.toFixed(2)}%</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
