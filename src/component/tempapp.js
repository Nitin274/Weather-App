import React, { useEffect, useState } from 'react';
import "./css/style.css"
let main = "./img4.jpeg"
let sun = "./imgsun.jpeg";
let snow = "./imgsnow.jpeg";
console.log(sun);
const Tempapp = ()=>{
    const [city,setCity]=useState(null);
    const [search,setSearch]=useState("Mumbai");
    const [css,setproper]=useState(0.2);
    const [bgimg,setimg]=useState(`${sun}`);
    useEffect(()=>{
       fetchApi();
    },[search])
    const fetchApi = async () =>{
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=1bcc853cb0de848a0cf594a6ff5f4449 `
        const response = await fetch(url);
        const resJson = await response.json();
        setCity(resJson.main);
    }
    const bgImage = [
        "",
        sun,
        snow
      ]  
      useEffect(()=>{
          if(city&&city.temp>20)
          {
            setimg(`url(${bgImage[1]})`)  
          }
          else if(city&&city.temp<20)
          {
            setimg(`url(${bgImage[2]})`)  
          }
      },[search])
    const cssp={
        opacity:css,
    };
    const cssimg={
        backgroundimage:{bgimg},
        backgroundPosition: `center`,
        backgroundRepeat: `no-repeat`,
        backgroundSize: `cover`
    }
    return (
           <div style={cssp}
            className="box"
            onClick={()=>{
                setproper(0.5);
                }}  
            >
             <div className="inputData" style={cssimg}>
             <input 
             type="search"
             className="inputFeild"
             onChange={(event)=>{
              setSearch(event.target.value)
             }}
             />
             { 
                 !city ? (
                     <p style={{textAlign:"center",color:'darkcyan'}}> No Data Found</p>
                 ) : (
                     <div>
                    <div className="info">
                    <h1 className="location">
                    <i className="fas fa-street-view"></i>{search}
                    </h1>
                    <div class="inner" style={{display:'inline-block'}}>
                    <h1 className="t_mins"
                    style={{color:'darkblack'}}
                    >
                    <label>Current-Temp- </label>
                     {city.temp}
                    </h1>
                    <h2 style={{color:'darkblack'}}>
                    <label>Feels-Like- </label>
                    {city.feels_like}
                    </h2>
                    <h2 style={{color:'darkblack',padding:'auto'}}>
                     <label>humidity- </label>
                     {city.humidity}
                   % </h2>
                    </div>
                    </div>
                   </div>
                 ) 
                }

        </div>
        </div>
    )
}
export default Tempapp; 