import React, {useEffect,useState} from "react";
import axios from "axios";
import { BASEURL } from "../../data";

const Slider = () => {
  const [crypto, setCrypto] = useState([]);
  useEffect(() => {
    axios.get(BASEURL).then((res) => {
      setCrypto(res.data.data.coins);
      console.log(res);
    });
  }, []);
//   function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }
  return (
    <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
      <div style={{width:'80%'}}>
        <marquee scrollamount="8">
          {crypto.slice(0, 10).map((coin) => {
            return (
              <div key={coin.id} className="coin-row">
                <div>
                  <img src={coin.icon} alt={coin.name} className="coin-image" />
                </div>
                <div className="coin">
                  <div className="coin-symbol"> {coin.symbol} </div>
                  <div> {coin.name} </div>
                </div>
                <div className="coin-data">
                  {coin.priceChange1d < 0 ? (
                    <p className="coin-percent red">
                      {coin.priceChange1d.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="coin-percent green">
                      {coin.priceChange1d.toFixed(2)}%
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </marquee>
      </div>
    </div>
  );
};

export default Slider;
