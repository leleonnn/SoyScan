"use client";
import { useRef, useState, useEffect } from 'react';
import Navbar from ".././components/Navbar";

function Cam() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });
  };

  const takePhoto = () => {
    const width = 400;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };

  return (
    <div className='flex flex-col h-full items-center'>
      <div className="flex flex-row mt-12 items-center justify-center h-11/12">
        <div type="camera" className="relative w-auto h-full rounded-2xl bg-green-4 mr-7 border-4 border-green-1 shadow-lg shadow-green-1/50">
        <video ref={videoRef} className="object-cover w-full h-full rounded-xl"></video>
        </div>
        <button onClick={takePhoto} className="flex bg-white-1 text-green-1 font-bold border-4 border-green-1 shadow-xl shadow-green-1/30 py-2 px-4 rounded-3xl w-16 h-16 mt-7 transform transition-all duration-300 active:bg-green-2 active:shadow-yellow-1 hover:border-yellow-1 hover:bg-white-0 "/>

      </div>
        <div className={`flex flex-col w-auto h-auto mt-10 justify-center p-6 px-4 pt-4 bg-white-1 shadow-xl shadow-yellow-1/50 rounded-2xl border-2 border-yellow-1 items-center ${hasPhoto ? '' : 'hidden'}`}>
        <canvas ref={photoRef} className={`justify-center rounded-xl border-2 border-yellow-1 ${hasPhoto ? '' : 'hidden'}`}/>
        <p className='text-green-3 font-semibold mt-4 items-center'>
          ---
        </p>
      </div>
    </div>
  );
}


export default function Camera() {

  return (
    <main className="flex flex-col justify-between w-full">
      <Navbar camera="true"/>
      <div className="flex relative h-screen w-full bg-white-1 justify-center">
        <div className="flex flex-col items-center  mt-32">
          <p className="text-green-4 text-6xl font-bold ">
          Take a Picture
          </p>
          <p className="text-green-4 text-3xl font-normal mt-3">
          Take a picture of soybean leaf image by pressing button below
          </p>
          <Cam/>
        </div>
      </div>
    </main>
  );
}
