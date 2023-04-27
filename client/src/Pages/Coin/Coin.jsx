import React from 'react'
import Upper from '../../components/CoinCom/Upper/Upper'
import Chart from '../../components/CoinCom/Chart/Chart'
import Trend from '../../components/Trending/Trend'

const Coin = () => {
  return (
    <div>
      <Upper />
      <br />
      <Chart />
      <p style={{marginTop:'25em'}}></p>
      <Trend />
    </div>
  )
}

export default Coin