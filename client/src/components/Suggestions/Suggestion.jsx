import React, { useEffect, useState } from "react";
import axios from "axios";
import "./suggestions.css";
import { SuggestionURL } from "../../data";

const Suggestion = ({ cryptoId }) => {
  const [coin, setCoin] = useState([]);

  useEffect(() => {
    axios.get(SuggestionURL(cryptoId)).then((res) => {
      setCoin(res.data.OtherCryptos);
    });
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div style={{ color: "white", marginLeft: "10em", marginTop: "15rem" }}>
        <h2>Beğenebileceğiniz ilgili coinler</h2>
      </div>
      <div className="suggestion">
        {coin?.slice(2, 8).map((coin) => (
          <div class="sugg">
            <div>
              <div class="wrapper">
                <div class="banner-image">
                  <img src={coin.imageUrl} alt="" />
                </div>
                <div className="h4"> {coin.name} </div>
                <div className="h5"> {coin.symbol} </div>
                <div className="p">
                  $ {coin.price.toFixed(2)} <br /> <br />
                  {coin.priceChange1d < 0 ? (
                    <div className="red">{coin.priceChange1d.toFixed(2)}%</div>
                  ) : (
                    <div className="green">{coin.priceChange1d.toFixed(2)}%</div>
                  )}
                </div>
              </div>
              <div class="button-wrapper">
                {/* <button class="btn outline">DETAILS</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Suggestion;
