import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { DecisionTreeAlgorithm } from '../../data'

const Knn = ({cryptoId}) => {
    const [decisionTree,setDecisionTree] = useState("");
    const getDecisionTree = () => {
        axios.get(DecisionTreeAlgorithm(cryptoId))
        .then((res) => {
            setDecisionTree(res.data)
        })
    };
    useEffect(()=> {
        getDecisionTree();
    });

  return (
    <div>
        <h5 > Önceki fiyatlarına göre {cryptoId} trend tahmini </h5>
        <h5 > {decisionTree} </h5>
    </div>
  )
}

export default Knn