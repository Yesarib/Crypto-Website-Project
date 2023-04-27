import React, { useEffect, useState } from "react";
import axios from "axios";
import { HistoricalChart } from "../../../data";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { chartDays } from "../../../data";
import Knn from "../../Algorithms/Knn";
import DecisionTree from '../../Algorithms/DecisionTree'
import authService from "../../../contexts/Authservice";
import { Button } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import "./chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Chart = () => {
  const { id } = useParams();
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  
  const fetchCoin = async () => {
    const { data } = await axios.get(HistoricalChart(id, days));
    setflag(true);
    setHistoricData(data.data.prices);
    // console.log(data.prices);
  };



  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);

    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
    <div className="chart">
      <Line
        data={{
          labels: historicData?.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),

          datasets: [
            {
              data: historicData?.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in usd`,
              borderColor: "#EEBC1D",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
      <div
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {chartDays?.map((day) => (
          <Button
            style={{
              color: "white",
              backgroundColor: "orange",
              fontSize: "12px",
            }}
            key={day.value}
            onClick={() => {
              setDays(day.value);
              setflag(false);
            }}
            selected={day.value === days}
          >
            {day.label}
          </Button>
        ))}
      </div>
    </div>
    {currentUser ? (
      <div className="algorithms">
      <div className="algorithm">
        <h3>KNN</h3>
        <Knn cryptoId={id} />
      </div>
      <div className="algorithm">
        <h3>Karar Ağacı</h3>
        <DecisionTree cryptoId={id} />
      </div>
    </div>
    ) : (
      <div></div>
    )}
    
  </>
  );
};

export default Chart;


