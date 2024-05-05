/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import './PrivateSection.css'
import sendBtn from '../../assets/send-email-svgrepo-com.svg'
import cameraIcn from '../../assets/camera-minimalistic-svgrepo-com.svg'
import videoIcn from '../../assets/video-svgrepo-com.svg'
import filesIcn from '../../assets/files-svgrepo-com.svg'
import addIcn from '../../assets/add-svgrepo-com.svg'




function PrivateSection({backGroundImage}) {
    const [height, setHeight] = useState(0)
    const [maxHeight, setMaxHeight] = useState(0)
    const [addOptShown, setAddOptShown] = useState(false)
    const [showSaveFilesMini, setShowSaveFilesMini] = useState(false)
    const [showDetailed, setShowDetailed] = useState(false)
    const [currentTab, setCurrentTab] = useState("photos")

    const addOpt = useRef()
    const txtA = useRef()


    function textareaEnter(event){
        const lines = event.target.value.split('\n')
        // txtA.current.style.height = height + 'px';
        if(maxHeight > 50){
            setHeight(50)

        }else{
            if(lines.length > 0){
                setHeight(10 * lines.length)
            }
        }
        setMaxHeight(height)
    }
    function toggleAddOpts(event){

        if(event.target.parentElement.classList.contains("cancel") || event.target.classList.contains("cancel") || event.target.parentElement.parentElement.classList.contains("cancel")){
            setAddOptShown(false)
        }else{
            setAddOptShown(true)
        }
    }
    

    useEffect(() => {
        function runClick(event){
            if(event.target.parentElement.parentElement.classList.contains("addOptions")){
                return
            }else if(event.target.parentElement.classList.contains("addOptions")){
                return
            }else if(event.target.parentElement.parentElement.parentElement.classList.contains("addOptions")){
                return
            }else if(event.target.classList.contains("addOptions")){
                return
            }else if(event.target.classList.contains("addSec")){
                return
            }else if(event.target.parentElement.classList.contains("addSec")){
                return
            }else if(event.target.parentElement.parentElement.classList.contains("addSec")){
                return
            }else if(event.target.parentElement.parentElement.parentElement.classList.contains("addSec")){
                return
            }else{
                setAddOptShown(false)
            }
            
        }
        function addRemoveSavedMini(event){
            try {
                if(event.target.parentElement.parentElement.classList.contains("savedFiles")){
                    return
                }else if(event.target.parentElement.classList.contains("savedFiles")){
                    return
                }else if(event.target.parentElement.parentElement.parentElement.classList.contains("savedFiles")){
                    return
                    
                }else if(event.target.parentElement.parentElement.parentElement.parentElement.classList.contains("savedFiles")){
                    return
                }else if(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains("savedFiles")){
                    return
                }else if(event.target.classList.contains("savedFiles")){
                    return
                    
                }else if(event.target.classList.contains("showSveFile")){
                    return
                    
                }else if(event.target.parentElement.classList.contains("showSveFile")){
                    return
                    
                }else if(event.target.parentElement.parentElement.classList.contains("showSveFile")){
                    return
                    
                }else if(event.target.parentElement.parentElement.parentElement.classList.contains("showSveFile")){
                    return
                    
                }else{
                    setShowSaveFilesMini(false)
                }
            } catch (error) {
                setShowSaveFilesMini(false)
                
            }

        }


        document.addEventListener("click", runClick)
        document.addEventListener("click", addRemoveSavedMini)
    }, [])
    function addRemoveSavedMini(event){
        if(event.target.parentElement.parentElement.classList.contains("addOptions")){
            return
        }else if(event.target.parentElement.classList.contains("addOptions")){
            return
        }else if(event.target.parentElement.parentElement.parentElement.classList.contains("addOptions")){
            return
        }else if(event.target.classList.contains("addOptions")){
            return
        }else if(event.target.classList.contains("addSec")){
            return
        }else if(event.target.parentElement.classList.contains("addSec")){
            return
        }else if(event.target.parentElement.parentElement.classList.contains("addSec")){
            return
        }else if(event.target.parentElement.parentElement.parentElement.classList.contains("addSec")){
            return
        }else{
            setAddOptShown(false)
        }
        
    }
    

    useEffect(() => {
        if(height < 50){
            txtA.current.style.height = height + 'px';
        }
    }, [height])
    



  return (
    <div className='privatePage'>
        <div className="topSection">
            <h1>Private</h1>
            <button className='exitBtn'>Exit</button>
        </div>

        <div className="backgroundImage">
            <img src={backGroundImage} alt="background" />
        </div>

        <div className={showSaveFilesMini? "bottomSection toSaveFileMini": "bottomSection"}>
            <div className="addSec">
                <span className={addOptShown?"add cancel": "add"} onClick={toggleAddOpts}>
                   <img src={addIcn} alt="add icon" />
                </span>
                <ul ref={addOpt} className={addOptShown?"addOptions shown": "addOptions"}>
                    <li className="option">
                        <img src={cameraIcn} alt="camera" />
                        Screenshot</li>
                    <li className="option">
                        <img src={videoIcn} alt="video" />
                        Record Videos</li>
                    <li className="option showSveFile" onClick={()=>{
                            setShowSaveFilesMini(true)
                            setAddOptShown(false)
                        }}>
                        <img src={filesIcn} alt="file" />
                        Saved Files</li>
                </ul>
            </div>
            <div className="typingCont">
                <label htmlFor="textMessage">
                    <textarea ref={txtA} onInput={ textareaEnter} name="textMessage" id="textMessage"></textarea>
                </label>
                <button className='sendBtn'>
                    <img src={sendBtn} alt="sendBtn" />
                </button>
            </div>
            <div className="savedFiles">
                <div className="savedFilesMini">
                    <div className="saveTop">
                        <h3>saved files</h3>
                        <span className='btn-more' onClick={()=> {
                            setShowDetailed(true)
                            setShowSaveFilesMini(false)
                        }}>more</span>
                    </div>
                    <div className="mediaList">
                        <ul className="mediaItemsCont">
                            <li className="mediaItem"></li>
                            <li className="mediaItem"></li>
                            <li className="mediaItem"></li>
                            <li className="mediaItem"></li>
                            <li className="mediaItem"></li>
                        </ul>
                    </div>
                </div>
                <div className={!showSaveFilesMini&&showDetailed?"savedFilesDetailed shown":"savedFilesDetailed"}>
                        <span className="back" onClick={()=>{
                                setShowDetailed(false)
                                setShowSaveFilesMini(true)

                            }
                        }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.20711 0.792893C8.81658 0.402369 8.18342 0.402369 7.79289 0.792893L5 3.58579L2.20711 0.792893C1.81658 0.402369 1.18342 0.402369 0.792894 0.792893C0.402369 1.18342 0.402369 1.81658 0.792894 2.20711L4.29289 5.70711C4.68342 6.09763 5.31658 6.09763 5.70711 5.70711L9.20711 2.20711C9.59763 1.81658 9.59763 1.18342 9.20711 0.792893Z" fill="#6C7275"/>
                            </svg>
                        </span>
                        <div className="saveTop">
                            <span className={currentTab=="photos"?'photosTabNav naved':"photosTabNav"} onClick={()=> setCurrentTab("photos")}>Photos</span>
                            <span className={currentTab=="videos"?'videosTabNav naved':"videosTabNav"} onClick={()=> setCurrentTab("videos")}>Videos</span>
                        </div>
                        <div className="mediaList">
                            <ul className="mediaItemsCont">
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>

                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                                <li className="mediaItem"></li>
                            </ul>
                        </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default PrivateSection