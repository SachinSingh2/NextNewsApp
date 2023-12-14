"use client";

import { useState, useEffect } from "react";
import TopStoriesCard from "./TopStoriesCard";

export default function TopStoriesComponent() {
  const [News, setNews] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [page, setpage] = useState(1);

  useEffect(() => {
    const getTopNews = async (page) => {
      setLoading(true);
      const data = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=399b61cd3a1642098b867542e0da4ef4&page=${page}&pageSize=8`);
      const res = await data.json();
      setLoading(false);
      console.log(res.articles);
      setNews(res.articles);
    };

    getTopNews(page); // Pass the current page value to the function

    // console.log(News[0])
  }, [page]);

  const limit = News.length;

  const renderData = [...News].reverse().map((article, index) => {
    return (
      <div key={index} className="col-md-3">
        <TopStoriesCard data={article} />
      </div>
    );
  });

  return (
    <>
      {Loading ? null : (
        <div className="container">
          <h1 style={{ textAlign: "center", margin: "30px 0px", fontSize: "45px", fontWeight: "700", letterSpacing: "2px" }}>TOP STORIES</h1>
          <div className="container">
            <div className="row">
              {renderData}
            </div>
          </div>
          {/* Button container */}
          {}
          <div className="container text-center my-5">
            <button onClick={() => setpage((prevPage) => Math.max(1, prevPage - 1))} className='btn btn-primary mx-2' disabled={page === 1}>Previous</button>
            {page}
            <button type="button" onClick={() => setpage((prevPage) => prevPage + 1)} className='btn btn-primary mx-2' disabled={limit < 7}>Next</button>
          </div>
        </div>
      )}
    </>
  );
}
