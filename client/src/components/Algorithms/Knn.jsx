import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { KnnAlgorithm } from '../../data'

const Knn = ({cryptoId}) => {
    const [knn,setKnn] = useState(0);
    const getKnn = () => {
        axios.get(KnnAlgorithm(cryptoId))
        .then((res) => {
            setKnn(res.data)
        })
    };
    useEffect(()=> {
        getKnn();
    });

  return (
    <div>
        <h5 > K-NN Algoritmasına göre {cryptoId} günlük tahmini </h5>
        <h5 > ${knn} </h5>
    </div>
  )
}

export default Knn