/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import './MediaView.css'
import { formatTime } from '../VideoSection/formatTime'
import MediaRange from './MediaRange'
import play from '../../assets/play-svgrepo-com.svg'
import { getCurrentPlaybackPercent, percentToSeconds } from './timing'




function MediaView({savedFiles, setMediaPopOpened, mediaPopOpened}) {
  const videoRef = useRef(null);
  const [mediaPopIsOpened, setMediaPopIsOpened] = useState(mediaPopOpened)
  const [toBeViewed, setToBeViewed] = useState({url: "", type: "", name: ""})
  const [inpVal, setInpVal] = useState(0)
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false)


  function getToBeViewed(id){
    savedFiles.map((item, index)=>{
      if(index == id){
        setToBeViewed(item)
      }
    })
  }
  useEffect(() => {
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
        videoElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
        if (videoElement) {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        }
    };
}, []);
function setToPlaying(){
  const video = videoRef.current;
  if(playing){
      video.pause()
      setPlaying(false)
  }else if(!playing){
      video.play()
      setPlaying(true)
  }
}
useEffect(() => {
  try {
    videoRef.current.currentTime = inpVal
  } catch (error) {
    return
  }
}, [inpVal]);
useEffect(() => {
  try {
    if(currentTime == toBeViewed.duration+1){
      console.log(currentTime);
      setPlaying(false)
    }
  } catch (error) {
    return
  }
}, [currentTime]);



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
                  <>
                    <video ref={videoRef} src={toBeViewed.url} controls></video>
                    <div className="mediaControls">
                      <div className="play" onClick={setToPlaying}>
                          {
                              playing? <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="800px" height="800px" viewBox="0 0 32 32" version="1.1">
                                          <path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.44 0.576t-0.576 1.44v16.16zM18.016 24.096q0 0.832 0.608 1.408t1.408 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.408 0.576t-0.608 1.44v16.16z"/>
                                      </svg>
                                      : <img src={play} alt="play" />
                          }
                      </div>
                      <div className="mediaTiming">
                        <b className="currentTime">{formatTime(currentTime).minutes<10?"0"+formatTime(currentTime).minutes:formatTime(currentTime).minutes}:{formatTime(currentTime).seconds<10?"0"+formatTime(currentTime).seconds:formatTime(currentTime).seconds}</b>
                        <MediaRange setValue={val=> setInpVal(percentToSeconds(val, toBeViewed.duration))} click={()=>setInpVal(percentToSeconds(inpVal), toBeViewed.duration)} value={getCurrentPlaybackPercent(currentTime, toBeViewed.duration)}/>
                        <b className="totalTime">{formatTime(toBeViewed.duration).minutes<10?"0"+formatTime(toBeViewed.duration).minutes:formatTime(toBeViewed.duration).minutes}:{formatTime(toBeViewed.duration).seconds<10?"0"+formatTime(toBeViewed.duration).seconds:formatTime(toBeViewed.duration).seconds}</b>
                      </div>
                     
                    </div>
                  </>
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