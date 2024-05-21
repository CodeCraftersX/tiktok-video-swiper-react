/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import './VideoCamera.css'
import { formatTime } from './formatTime';

function VideoCamera({savedFiles, addPhotoToSavedFiles, addVideoToSavedFiles, cameraPopOpened, setCameraPopOpened, setMediaPopOpened}) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [mediaStream, setMediaStream] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [recording, setRecording] = useState(false);
    const videoContainerRef = useRef(null)
    const [photoImg, setPhotoImg] = useState("")
    const [videoObj, setVideoObj] = useState({videoUrl:"" , thumbnail:""})
    const [cameraPopIsOpened, setCameraPopIsOpened] = useState(cameraPopOpened)
    const [seconds, setSeconds] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0)
    
    

    
    useEffect(() => {
        if(photoImg !== ""){
            setTimeout(() => {
                setPhotoImg("")
            }, 3000);
        }
    }, [photoImg]);

    useEffect(() => {
        if (!mediaStream && videoRef.current) {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            } else if (navigator.getUserMedia) {
                return new Promise((resolve, reject) => {
                    navigator.getUserMedia({ video: true, audio: true }, resolve, reject);
                });
            } else {
                console.log('getUserMedia is not supported in this browser');
            }
        }
    }, [mediaStream]);

    // Function to start video recording

    // Function to start video recording
const startRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        const chunks = [];

        recorder.ondataavailable = function(e) {
            chunks.push(e.data);
        };

        recorder.onstop = function() {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const videoUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = videoUrl;
            a.download = 'video.webm';
            a.click();
            setVideoObj({videoUrl, thumbnail:takePhoto(false)})

            setRecording(false);
        };

        recorder.start();
        setRecording(true);
    }
};

    useEffect(() => {
            if(videoObj.videoUrl !== ""){
                addVideoToSavedFiles(videoObj.videoUrl, videoDuration, videoObj.thumbnail);
                setVideoObj({videoUrl:"" , thumbnail:""})
                setSeconds(0)
            }

        
    }, [videoObj])
    

    // Function to stop video recording
    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setRecording(false);
        }
    };

    // Function to take a photo
    const takePhoto = (photo) => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const photoUrl = canvas.toDataURL('image/jpeg');
            const a = document.createElement('a');
            a.href = photoUrl;
            a.download = 'photo.jpg';
            // a.click();
            
            if(photo){
                addPhotoToSavedFiles(photoUrl);
                setTimeout(() => {
                    setPhotoImg(photoUrl)
                }, 1000);
            }else{
                return photoUrl
            }
        }
    };


    useEffect(() => {
            
            if(recording){
                const interval = setInterval(() => {
                    setSeconds(prevSeconds => prevSeconds + 1);
                    }, 1000);
                return () => clearInterval(interval);
            }else{
                setVideoDuration(seconds)

                
            }
    }, [recording]);
    
    

    
    return (
        <div className='VideoCamera' style={cameraPopIsOpened||cameraPopOpened==true?{display: 'block'}:{display: 'none'}}>
            <div className="videoCameraTop">
                <span className="back" onClick={()=>{
                    setCameraPopIsOpened(false)
                    setCameraPopOpened(false)
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.20711 0.792893C8.81658 0.402369 8.18342 0.402369 7.79289 0.792893L5 3.58579L2.20711 0.792893C1.81658 0.402369 1.18342 0.402369 0.792894 0.792893C0.402369 1.18342 0.402369 1.81658 0.792894 2.20711L4.29289 5.70711C4.68342 6.09763 5.31658 6.09763 5.70711 5.70711L9.20711 2.20711C9.59763 1.81658 9.59763 1.18342 9.20711 0.792893Z" fill="#6C7275"/>
                    </svg>
                    
                </span>
                <div className="timerCont">
                    <div className="timer">
                            <b className="hr">{formatTime(seconds).hour}</b>
                            :
                            <b className="min">{formatTime(seconds).minutes}</b>
                            :
                            <b className="sec">{formatTime(seconds).seconds}</b>
                    </div>
                </div>
            </div>
            <video ref={videoRef} autoPlay></video>
            <div className="photoPop" style={photoImg==""?{display: 'none'}:{display: 'block'}}>
                {photoImg!==""?<img src={photoImg} alt="photo" />:null}
            </div>
            <br />
           
            <div className="videoCameraBottom">
                <div className="mostRecentPrev" onClick={()=>setMediaPopOpened(true)}>
                    {
                        savedFiles.length>0?
                            savedFiles[savedFiles.length-1].type=="Image"?
                                <img src={savedFiles[savedFiles.length-1].url} alt="photo" />
                            :savedFiles[savedFiles.length-1].type=="Video"?
                                <>
                                    <img src={savedFiles[savedFiles.length-1].thumbnail} alt="photo" />
                                    <span className='timer'>
                                        <b className="min">{formatTime(savedFiles[savedFiles.length-1].duration).minutes<10?"0"+formatTime(savedFiles[savedFiles.length-1].duration).minutes:formatTime(savedFiles[savedFiles.length-1].duration).minutes}</b>
                                        :
                                        <b className="sec">{formatTime(savedFiles[savedFiles.length-1].duration).seconds<10?"0"+formatTime(savedFiles[savedFiles.length-1].duration).seconds:formatTime(savedFiles[savedFiles.length-1].duration).seconds}</b>
                                    </span>
                                </>
                            :null:null}
                </div>
                <div  className="controls">
                    
                    <button className={!recording?'start':'stop'} onClick={!recording?startRecording:stopRecording}>
                        {
                            !recording?<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16.0102C9.78525 16.0102 7.98984 14.2147 7.98984 12C7.98984 9.78525 9.78525 7.98984 12 7.98984C14.2147 7.98984 16.0102 9.78525 16.0102 12C16.0102 14.2147 14.2147 16.0102 12 16.0102Z" fill="#0F0F0F"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z" fill="#0F0F0F"/>
                            </svg>:<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14 7C15.6569 7 17 8.34315 17 10V14C17 15.6569 15.6569 17 14 17H10C8.34315 17 7 15.6569 7 14V10C7 8.34315 8.34315 7 10 7H14ZM14 9C14.5523 9 15 9.44772 15 10V14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14V10C9 9.44772 9.44772 9 10 9H14Z" fill="#0F0F0F"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z" fill="#0F0F0F"/>
                                    </svg>
                        }
                    </button>
                    <button className='photo' onClick={()=>takePhoto(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                        <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </button>
                </div>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
}

export default VideoCamera;
