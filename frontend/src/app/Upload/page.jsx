"use client";

import Image from "next/image";
import Navbar from ".././components/Navbar";
import upload from "../../../public/upload.png";
import { useState } from 'react';

export default function Upload() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    // Get a pre-signed URL from your backend
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: file.name, type: file.type })
    });

    const { url, fields } = await response.json();

    // Create a FormData object and append the fields and file
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('file', file);

    // Upload the file directly to S3
    await fetch(url, {
      method: 'POST',
      body: formData
    });

    // Notify the backend with the file name
    await fetch('/api/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filename: file.name })
    });

    setLoading(false);
  };







  
  return (
    <main className="flex flex-col justify-between w-full">
      <Navbar upload="true"/>
      <div className="flex relative h-screen w-full bg-white-1 items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-green-4 text-6xl font-bold ">
          Upload Image
          </p>
          <p className="text-green-4 text-3xl font-normal mt-3">
          Upload a soybean leaf image by pressing button below
          </p>
          <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} className="flex bg-white-1 text-green-1 font-bold border-4 border-green-1 shadow-xl shadow-green-1/30 py-2 px-4 rounded-xl w-56 h-16 mt-7 justify-center items-center hover:bg-purple-200 transition-transform duration-300 transform hover:scale-110 active:scale-95">
              <Image 
              alt=""
              className="mr-3"
              src={upload} />
              Upload Image
            </button>
          </div>

        </div>
      </div>

    </main>
  );
}
