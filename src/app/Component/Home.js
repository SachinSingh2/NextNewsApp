"use client"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // Import the spinner icon
import TopNewsScrollCard from "./TopNewsScrollCard";
import '../Css/Home.css'
import TopStoriesComponent from '../Component/TopStoriesComponent'

export default function page() {

  const [News , setNews] = useState([])
  const [Loading , setLoading] = useState(false)
  

  useEffect(()=>{
    const getAllNews = async()=>{
    setLoading(true)
      const data =await fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=a0c03cb08142445488e48e18eda2a101')
      const res = await data.json()
      setLoading(false)
      console.log(res.articles)
      setNews(res.articles)
    }
    getAllNews()

    // console.log(News[0])
  },[])
  return (
    <>

    {Loading ?  <div style={{marginTop:"200px" , fontSize:"100px"}} className="text-center">
      <FontAwesomeIcon  icon={faSpinner} spin /> 
     </div> : null}

<div className="container scrollable-box">
        <div className="row">

          {Loading ? null : <div className="col-sm-8 py-2" >

          {News && News.length >= 5 ? <div style={{ borderRadius: "0px" , height:"100%" }} className="card text-white">
                <img
                  src={News?.[5]?.urlToImage ? News[5].urlToImage : 'https://plus.unsplash.com/premium_photo-1661255378914-d0934128d91d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}

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
                  <h5 className="card-title">{News?.[5]?.title} </h5>
                </div>
              </div>  : null}

          </div>}

        
          

          {/* Second Box */}
          <div className="scrollable-box2 p-2 col-sm-4">
            <div className="multi-carousel vertical">
              <div className="multi-carousel-inner">
                {News && News.map((data,index)=>{
                  return <div key={index}> <TopNewsScrollCard Loading={Loading} data={data}  /></div>
                })}
                
              </div>
            </div>
          </div>

        </div>
      </div>



{/* Top stroies Components */}
<TopStoriesComponent Loading={Loading} />


    </>
  )
}
