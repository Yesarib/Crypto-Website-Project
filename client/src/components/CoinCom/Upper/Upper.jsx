import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../../../data";
import "./upper.css";

const Upper = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);
  
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    console.log(data);
    setCoin(data.data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="container">
      <div>
        <div className="leftside">
          <div className="first">
            <div className="coin-image">
              <img
                style={{ marginTop: "15px" }}
                src={coin?.image?.small}
                alt=""
              />
            </div>
            <div className="coin-info">
              <div className="coin-name">{coin.name}</div>
              <div className="coin-symbol">{coin?.symbol?.toUpperCase()}</div>
            </div>
            <div>
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  marginLeft: "25px",
                  marginBottom: "15px",
                }}
                src="https://cdn-icons-png.flaticon.com/512/4208/4208420.png"
                alt="fav"
              />
            </div>
          </div>

          <div className="first">
            <div className="rank">Rank #{coin.market_cap_rank}</div>
            <div style={{ marginLeft: "20px" }}>
              Community Score {coin.community_score}
            </div>
          </div>
          <div className="first">
            <div className="link" style={{ width: "75px", marginLeft: "15px" }}>
              <Button className="btn" href={coin?.links?.homepage[0]}>
                {coin?.links?.homepage[0]?.substring(7)}
              </Button>
            </div>
            <div className="link" style={{ marginLeft: "35px" }}>
              <Button className="btn" href={coin?.links?.blockchain_site[0]}>
                {coin?.links?.blockchain_site[0]?.substring(7)}
              </Button>
            </div>
            <div className="link">
              <Button className="btn" href={coin?.links?.blockchain_site[1]}>
                {coin?.links?.blockchain_site[1]?.substring(7)}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="midside">
        <div className="price-header">
          {coin?.name} Price ( {coin?.symbol?.toUpperCase()} )
        </div>
        <div className="price">
          <div>
            $
            {coin.tickers && coin.tickers.length > 0
              ? coin.tickers[0].last
              : "N/A"}
          </div>
          <div className="price-change">
            {coin?.market_data?.price_change_percentage_24h < 0 ? (
              <div className="red">
                {coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%
              </div>
            ) : (
              <div className="green">
                {coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%
              </div>
            )}
          </div>
        </div>
        <div className="market-datas">
          <div className="marketcap">
            <div style={{ color: "gray", marginTop: "25px" }}>Market Cap</div>
            <div className="market-datas">
              <div style={{ marginTop: "5px", fontSize: "16px" }}>
                $
                {numberWithCommas(
                  coin?.market_data?.market_cap?.usd?.toString()
                )}
              </div>
              <div style={{ marginLeft: "20px", marginTop: "7px" }}>
                {coin?.market_data?.market_cap_change_percentage_24h < 0 ? (
                  <div className="red">
                    {coin?.market_data?.market_cap_change_percentage_24h?.toFixed(
                      2
                    )}
                    %
                  </div>
                ) : (
                  <div className="green">
                    
                    {coin?.market_data?.market_cap_change_percentage_24h?.toFixed(
                      2
                    )}
                    %
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="volume">
            <div className="alt">
                High 24h
            </div>
            <div style={{ marginTop: "5px", fontSize: "16px" }}>
              ${numberWithCommas(coin?.market_data?.high_24h?.usd?.toString())}
            </div>
          </div>
          <div className="volume">
            <div className="alt">
                Low 24h
            </div>
            <div style={{ marginTop: "5px", fontSize: "16px" }}>
              ${numberWithCommas(coin?.market_data?.low_24h?.usd?.toString())}
            </div>
          </div>
          <div className="volume">
            <div className="alt">
                Circulating Supply
            </div>
            <div style={{ marginTop: "5px", fontSize: "16px" }}>
              {numberWithCommas(coin?.market_data?.circulating_supply?.toString())}
            </div>
          </div>
          <div className="volume">
            <div className="alt">
              All Time High
            </div>
            <div style={{ marginTop: "5px", fontSize: "16px" }}>
              ${numberWithCommas(coin?.market_data?.ath?.usd?.toString())}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upper;
