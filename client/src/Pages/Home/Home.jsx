import React from 'react'
import Bottom from '../../components/HomeCom/bottom/bottom'
import Middle from '../../components/HomeCom/middle/middle'

const Home = () => {
  return (
    <div>
        <Middle />
        <br />
        <br />
        <hr style={{marginTop:'10rem',width:'80%',height:'5px',backgroundColor:'whitesmoke',borderRadius:'10px'}}/>
        <Bottom />
    </div>
  )
}

export default Home