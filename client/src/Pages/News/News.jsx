import React, { useEffect, useState } from "react";
import axios from "axios";
import "./news.css";

const News = () => {
  // c4a5b084f0d340359362caf7166170ec

  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coinstats.app/public/v1/news?skip=0&limit=10")
      .then((res) => {
        setNews(res.data.news);
      });
  }, []);
  return (
    <div className="news">
      {news.slice(0, 4).map((data) => {
        return (
          <a href={data.link} style={{ textDecoration: "none" }}>
            <div className="box">
              <div className="imgs">
                <img src={data.imgURL} alt="" />
              </div>
              <h5> {data.title} </h5>
              <p> {data.description} </p>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default News;
