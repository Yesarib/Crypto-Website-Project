import React, { useEffect, useState } from "react";
import axios from "axios";
import "./allcp.css";
import { Button } from "@mui/material";
import { AllCryptos } from "../../data";
import Favorites from "../Favorites/Favorites";
import { AddFavoriteURL } from "../../data";

const AllCrypto = () => {
  const [crypto, setCrypto] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("userToken");
  const userToken = parseJwt(token);
  const userFav = userToken.unique_name;


  const addFavorite = (userId, cryptoId) => {
    axios
      .post(AddFavoriteURL, {
        userId: userId,
        cryptoId: cryptoId,
      })
      .then((res) => {
        try {
          if (res.status === 201) {
            alert("Favorilere eklendi");
          }
        } catch (error) {
          console.log(error.message);
        }
      });
  };

  const handleAddFavorite = (cryptoId) => {
    addFavorite(userFav, cryptoId);
  };

  const fetchData = async () => {
    const result = await axios.get(AllCryptos(currentPage));
    setCrypto(result.data.data.coins);

    setTotalPages(Math.ceil(result.headers["x-total-count"] / 10));
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
  
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  
    let filteredCryptos = [];
    if (showFavorites) {
      filteredCryptos = crypto.filter(
        (crypto) =>
          userToken.favorites?.includes(crypto.id) &&
          (searchTerm === "" || crypto.name.toLowerCase()?.includes(crypto.id))
      );
    } else {
      filteredCryptos = crypto.filter((crypto) =>
        searchTerm === "" || crypto.name.toLowerCase()?.includes(searchTerm)
      );
    }
  
    setCrypto(filteredCryptos);
    if (searchTerm === "") {
      if (showFavorites) {
        setCrypto(
          crypto.filter((crypto) => userToken.favorites?.includes(crypto.cryptoId))
        );
      } else {
        fetchData();
      }
    }
  };

  return (
    <>
      <div className="cp-cont">
        <div className="btns">
          <div>
            <Button className="opt" onClick={() => setShowFavorites(false)}>
              Tüm Kriptolar
            </Button>
            <Button className="opt" onClick={() => setShowFavorites(true)}>
              Favoriler
            </Button>
          </div>

          <div className="search">
            <input type="text" placeholder=" Kripto Ara" value={searchTerm} onChange={handleSearch} name="search" />

            <button>
              <i class="fa fa-search" style={{ fontSize: "18px" , marginTop:'5px'}}></i>
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
                        <Button
                          onClick={() => handleAddFavorite(coin.id)}
                          style={{ height: "100%" }}
                        >
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
            <div className="btnn">
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

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
