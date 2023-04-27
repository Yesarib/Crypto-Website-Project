import React from "react";
import AllCrypto from "../../components/CryptoCom/AllCrypto";
import Slider from "../../components/CryptoCom/Slider";
import CryptoInfo from "../../components/CryptoInfo/CryptoInfo";
import Trend from "../../components/Trending/Trend";

const Cryptos = () => {
  return (
    <div>
      <Slider/>
      <br /><br />
      <AllCrypto />
      <br /><br />
      <CryptoInfo />
      <br /><br /><br />
      <Trend />
    </div>
  );
};

export default Cryptos;



