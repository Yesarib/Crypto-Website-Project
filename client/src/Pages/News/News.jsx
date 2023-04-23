import React, { useEffect, useState } from "react";
import axios from "axios";
import "./news.css";

const News = () => {
  // c4a5b084f0d340359362caf7166170ec

  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=crypto&from=2023-04-01&sortBy=publishedAt&apiKey=c4a5b084f0d340359362caf7166170ec"
      )
      .then((res) => {
        setNews(res.data.articles);
        console.log(res)
      });
  }, []);
  return (
    <div className="news">
      {news.slice(0, 4).map((data) => {
        return (
          <div className="box">
            <div className="imgs">
                <img src={data.urlToImage} alt="" />
            </div>
            <h5 > {data.title} </h5>
            <p> {data.description} </p>
          </div>
        );
      })}
    </div>
  );
};

export default News;
