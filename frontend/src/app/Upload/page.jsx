"use client";

import React, { useState} from "react";

import Image from "next/image";
import Navbar from ".././components/Navbar";
import upload from "../../../public/upload.png";

export default function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (e) => {
    // getBase64(e.target, (e) => {
    //   setEventProfileUrl(e);
    // });
    // console.log(thisEventProfileUrl);
    // setHasEventProfileUrl(true);
    
    const file = e.target.files[0];
    console.log(file);
    setSelectedImage(file);

    const formData = new FormData();
    formData.append('image', selectedImage);
    console.log(formData);

    try {
      const response = await fetch(`https://localhost:3000/x`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      // setImageError('true');
      console.error('Error uploading image:', error);
    }
  };

  // const getBase64 = (fileInput, callback) => {
  //   if (fileInput.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const base64Image = event.target.result;
  //       callback(base64Image);
  //       setThisEventProfileUrl(base64Image);
  //     };
  //     reader.readAsDataURL(fileInput.files[0]);
  //   }
  // };


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
          <label
              className="flex bg-white-1 text-green-1 font-bold border-4 border-green-1 shadow-xl shadow-green-1/30 py-2 px-4 rounded-xl w-56 h-16 mt-7 justify-center items-center hover:bg-purple-200 transition-transform duration-300 transform hover:scale-110 active:scale-95 hover:cursor-pointer"
              htmlFor="files"
          >
            <input
              type="file"
              className="mt-6 items-center justify-center rounded-xl border-none absolute hidden "
              id="files"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleImageChange}
            />
            <Image 
              alt=""
              className="mr-3"
              src={upload} 
            />
            <p>
              Upload Image
            </p>
          </label>
        </div>
      </div>

    </main>
  );
}
