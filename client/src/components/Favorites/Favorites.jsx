import React, {useEffect, useState} from "react"
import authService from "../../contexts/Authservice";
import { Button } from "@mui/material";
import { FavoriteURL } from "../../data";
import axios from "axios";


const Favorites = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userFavorite, setUserFavorite] = useState([]);

  
  
  useEffect(()=> {
    const user = authService.getCurrentUser();
    setCurrentUser(user);

    const token = localStorage.getItem("userToken")
    const userToken = parseJwt(token)
    const userFav = userToken.unique_name;

    const fetchData = async () => {
      try {
        const result = await axios.get(FavoriteURL(userFav));
        setUserFavorite(result.data);
      } catch (error) {
        console.error(error);
      }
      
    }
    
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  
  console.log(userFavorite);

  
  return (
    <div>
      {currentUser ? (
        <div className="all-cp">
        <table height="500" cellPadding="5" >
          <tr>
            <th></th>
            <th align="left">Coin</th>
            <th align="right">Fiyat $</th>
            <th align="right">Market Cap</th>
            <th align="right">Günlük Değişim</th>
            
          </tr>
          <tbody>
            {userFavorite?.map((coin, index) => (
              <tr key={coin.cryptoId}>
                <td align="right">
                  <Button style={{height:'100%'}}>

                    <img
                      style={{ width: "25px", height: "25px" }}
                      src="https://cdn-icons-png.flaticon.com/512/4208/4208420.png"
                      alt="fav"
                    />
                  </Button>

                </td>
                <td >
                  <Button href={`cryptos/${coin.cryptoId}`} style={{height:'100%',color:'white'}}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={coin.imageUrl} alt={coin.name} />
                    <div style={{ marginLeft: '20px',width:'150px'}}>
                      <div >{coin.symbol?.toUpperCase()}</div>
                      <div>{coin.name}</div>
                    </div>
                  </div>
                  </Button>
                </td>
                <td align="right">${coin.currentPrice["usd"]?.toFixed(2)}</td>
                <td align="right">
                  {numberWithCommas(coin.marketCap?.slice(0, -6))}M
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
      ) : (
        <div>
          Kayıt olmak için 
        </div>
      )}
      
      {/* <div className="btnn" style={{color:'white',marginTop:'15px'}}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Önceki
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Sonraki
        </button>
      </div> */}
    </div>
  )
}

export default Favorites


function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}