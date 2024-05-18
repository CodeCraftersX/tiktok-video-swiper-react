/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import './ScreenRecorder.css'
import html2canvas from 'html2canvas';
import RecordRTC from 'recordrtc';


function ScreenRecorder({contentToCap}) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    let recorder = useRef(null);
    const [recording, setRecording] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    const [screenshotUrl, setScreenshotUrl] = useState(null);
    const divRef = contentToCap;

    let mediaRecorder = useRef(null);
    let recordedChunks = useRef([]);


    useEffect(() => {
        if (recording) {
            const intervalId = setInterval(() => {
                captureStreamFromDiv();
            }, 1); // Adjust the interval as needed
            return () => clearInterval(intervalId);
        }
    }, [recording]);
    
    const startRecording = async () => {
        try {
            const stream = await captureStreamFromDiv();
            mediaRecorder.current = new MediaRecorder(stream);

            mediaRecorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.current.push(event.data);
                }
            };

            mediaRecorder.current.onstop = () => {
                const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                console.log('Recording stopped. Video URL:', url);
                setVideoUrl(url)
            };

            mediaRecorder.current.start();
            setRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };
    // const startRecording = () => {
    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext('2d');
    //     const areaToRecord = divRef.current;

    //     // Render the content behind the box onto the canvas
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.drawImage(areaToRecord, 0, 0, canvas.width, canvas.height);

    //     // Capture stream from the canvas
    //     const stream = canvas.captureStream();

    //     // Start recording
    //     mediaRecorder.current = new MediaRecorder(stream);
    //     mediaRecorder.current.ondataavailable = (event) => {
    //         if (event.data.size > 0) {
    //             recordedChunks.current.push(event.data);
    //         }
    //     };
    //     mediaRecorder.current.onstop = () => {
    //         const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
    //         const url = URL.createObjectURL(blob);
    //         console.log('Recording stopped. Video URL:', url);
    //     };
    //     mediaRecorder.current.start();
    //     setRecording(true);
    // };

    const stopRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
            mediaRecorder.current.stop();
            setRecording(false);
        }
    };
    const captureStreamFromDiv = async () => {
        const canvas = canvasRef.current;
        const divElement = divRef.current;
        canvas.width = divElement.clientWidth;
        canvas.height = divElement.clientHeight;

        try {
            const canvasData = await html2canvas(divElement, { backgroundColor: null });
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            ctx.drawImage(canvasData, 0, 0); // Draw the content of the div onto the canvas
            const stream = canvas.captureStream();
            return stream;
        } catch (error) {
            console.error('Error capturing stream:', error);
            throw error;
        }
    };

    // const captureStreamFromDiv = async () => {
    //     const divElement = divRef.current;
    //     const canvas = canvasRef.current;
    //     canvas.width = divElement.clientWidth;
    //     canvas.height = divElement.clientHeight;
    //     const ctx = canvas.getContext('2d');
    
    //     try {
    //         const canvasData = await html2canvas(divElement, { backgroundColor: null });
    //         ctx.drawImage(canvasData, 0, 0);

            
    //         const stream = canvas.captureStream();
    //         return stream;
    //     } catch (error) {
    //         console.error('Error capturing stream:', error);
    //         throw error;
    //     }
    // };
    

    function takeScreenshot() {
        html2canvas(document.body).then(canvas => {
            const screenshotUrl = canvas.toDataURL('image/png');
            // Use the screenshotUrl as needed
            setScreenshotUrl(screenshotUrl)
        });
    }

    return (
        <div className='recordScreen'>
            <video ref={videoRef} autoPlay style={{ width: '100%' }}></video>
            {videoUrl!==""?<video src={videoUrl} className='showVid' autoPlay controls style={{ width: '100%' }}></video>:null}
            <br />
            <canvas
                ref={canvasRef}
                width={300}
                height={200}
                style={{ display: 'none' }}
            />            <div className="displayImg">
                {screenshotUrl && <img src={screenshotUrl} alt="Screenshot" />}
            </div>
            <button onClick={startRecording} disabled={recording}>Start Recording</button>
            <button onClick={stopRecording} disabled={!recording}>Stop Recording</button>
            <button onClick={takeScreenshot}>Take Screenshot</button>
        </div>
    );
}





export default ScreenRecorder;
