import React, { useEffect, useState } from "react";
import axios from "axios";
import "./allcp.css";
import { Button } from "@mui/material";
import { AllCryptos } from "../../data";
import Favorites from "../Favorites/Favorites";

const AllCrypto = () => {
  const [crypto, setCrypto] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await axios.get(AllCryptos(currentPage));
        console.log(result);
        setCrypto(result.data.data.coins);
        console.log(result.data);

        setTotalPages(Math.ceil(result.headers["x-total-count"] / 10));
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [currentPage]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const nextPage = () => {
    setCurrentPage(currentPage + 10);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 10);
  };
  return (
    <>
      <div className="cp-cont">
        <div className="btns">
          <div>
            <Button className="opt"
              onClick={() => setShowFavorites(false)}
            >
              Tüm Kriptolar
            </Button>
            <Button className="opt"
              onClick={() => setShowFavorites(true)}
            >
              Favoriler
            </Button>
          </div>
          
          <div className="search">
            <input type="text"
                      placeholder=" Search Courses"
                      name="search" />
                  <button>
                      <i class="fa fa-search"
                          style={{fontSize: "18px"}}>
                      </i>
                  </button>
          </div>
        </div>
        

        {!showFavorites ? (
          <div className="cp-cont">
            <div className="all-cp">
              <table height="500" cellPadding="5">
                <tr>
                  <th></th>
                  <th align="left">Coin</th>
                  <th align="right">Fiyat $</th>
                  <th align="right">Market Cap</th>
                  <th align="right">Günlük Değişim</th>
                </tr>
                <tbody>
                  {crypto.slice(0, 10).map((coin, index) => (
                    <tr key={coin.id}>
                      <td align="right">
                        <Button style={{ height: "100%" }}>
                          <img
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn-icons-png.flaticon.com/512/4208/4208420.png"
                            alt="fav"
                          />
                        </Button>
                      </td>
                      <td>
                        <Button
                          href={`cryptos/${coin.id}`}
                          style={{ height: "100%", color: "white" }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img src={coin.icon} alt={coin.name} />
                            <div style={{ marginLeft: "20px", width: "150px" }}>
                              <div>{coin.symbol.toUpperCase()}</div>
                              <div>{coin.name}</div>
                            </div>
                          </div>
                        </Button>
                      </td>
                      <td align="right">${coin.price.toFixed(2)}</td>
                      <td align="right">
                        {numberWithCommas(
                          coin.marketCap.toString().slice(0, -6)
                        )}
                        M
                      </td>
                      <td align="right">
                        {coin.priceChange1d < 0 ? (
                          <p className="red">
                            {coin.priceChange1d.toFixed(2)}%
                          </p>
                        ) : (
                          <p className="green">
                            {coin.priceChange1d.toFixed(2)}%
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="btnn" style={{ color: "white", marginTop: "15px" }}>
              <button onClick={prevPage} disabled={currentPage === 1}>
                Önceki
              </button>
              <button onClick={nextPage} disabled={currentPage === totalPages}>
                Sonraki
              </button>
            </div>
          </div>
        ) : (
          <Favorites />
        )}
      </div>
    </>
  );
};

export default AllCrypto;