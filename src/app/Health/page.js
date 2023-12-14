"use client";
import React, { useEffect, useState } from "react";
import CategoryCard from "../Component/CategoryCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // Import the spinner icon

export default function page() {
  const [Loading, setLoading] = useState(false);
  const [News, setNews] = useState();

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const data = await fetch(
        "https://newsapi.org/v2/top-headlines?country=in&category=Health&apiKey=399b61cd3a1642098b867542e0da4ef4"
      );
      const res = await data.json();
      setLoading(false);
      console.log(res.articles);
      setNews(res.articles);
    };
    getNews();
  }, []);

  return (
    <>


{Loading ?  <div style={{marginTop:"200px" , fontSize:"100px"}} className="text-center">
      <FontAwesomeIcon  icon={faSpinner} spin /> 
     </div> : null}


     {Loading ? null : <div className="container p-2" >

{News && News.length >= 0 ? <div style={{ borderRadius: "0px" , height:"100%" }} className="card text-white">
      <img
src={News?.[0]?.urlToImage ? News[0].urlToImage : 'https://plus.unsplash.com/premium_photo-1661255378914-d0934128d91d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}

        className="card-img"
        alt="Stony Beach"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "0",
          opacity:0.8
        }}
      />
      <div className="card-img-overlay d-flex flex-column justify-content-end">
        <h5 className="card-title">{News?.[0]?.title} </h5>
      </div>
    </div>  : null}

</div>}


<div className="container-fluid">
      <div className="row my-2">
        <CategoryCard data={News} Loading={Loading} />
      </div>
      </div>
    </>
  );
}
