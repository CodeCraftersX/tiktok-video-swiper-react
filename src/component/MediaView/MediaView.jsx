/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './MediaView.css'
import { formatTime } from '../VideoSection/formatTime'

function MediaView({savedFiles, setMediaPopOpened, mediaPopOpened}) {
  const [mediaPopIsOpened, setMediaPopIsOpened] = useState(mediaPopOpened)
  const [toBeViewed, setToBeViewed] = useState({url: "", type: "", name: ""})

  function getToBeViewed(id){
    savedFiles.map((item, index)=>{
      if(index == id){
        setToBeViewed(item)
      }
    })
  }

  return (
    <div className='mediaView' style={mediaPopIsOpened||mediaPopOpened==true?{display: 'block'}:{display: 'none'}}>
      <div className="mediaViewTop">
      <span className="back" onClick={()=>{
                    setMediaPopIsOpened(false)
                    setMediaPopOpened(false)
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.20711 0.792893C8.81658 0.402369 8.18342 0.402369 7.79289 0.792893L5 3.58579L2.20711 0.792893C1.81658 0.402369 1.18342 0.402369 0.792894 0.792893C0.402369 1.18342 0.402369 1.81658 0.792894 2.20711L4.29289 5.70711C4.68342 6.09763 5.31658 6.09763 5.70711 5.70711L9.20711 2.20711C9.59763 1.81658 9.59763 1.18342 9.20711 0.792893Z" fill="#6C7275"/>
                    </svg>
                    
                </span>
      </div>
      <div className="mediaViewMedia">
        <div className="displayContent">
              {
                toBeViewed.type=="Image"?
                  <img src={toBeViewed.url} alt="" />
                :toBeViewed.type=="Video"?
                  <video src={toBeViewed.url}></video>
                :null
              }
        </div>
      </div>
      <div className="mediaViewBottom">
        <ul className="mediaList">
          {
            savedFiles.length>0?savedFiles.map((item, index)=>{
                            return savedFiles.length>0?
                            item.type=="Image"?
                        <li className="mediaItem" key={index} id={index} onClick={()=> getToBeViewed(index)}>
                            <img src={item.url} alt={index+"item"} />
                        </li>

                        :item.type=="Video"?
                        <li className="mediaItem" key={index} id={index} onClick={()=> getToBeViewed(index)}>
                            <img src={item.thumbnail} alt="photo" />
                            <span className='timer'>
                            <b className="min">{formatTime(item.duration).minutes<10?"0"+formatTime(item.duration).minutes:formatTime(item.duration).minutes}</b>
                            {":"}
                            <b className="sec">{formatTime(item.duration).seconds<10?"0"+formatTime(item.duration).seconds:formatTime(item.duration).seconds}</b>
                        </span>
                        </li>      
                        
                :null:null
                    }):<><li className="mediaItem"></li></>

                                
          }
        </ul>
      </div>
    </div>
  )
}

export default MediaView