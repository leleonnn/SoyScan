"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import upload from "../../../public/upload.png";
import { useState } from "react";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const Bucket = process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET;
  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_S3_UPLOAD_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_UPLOAD_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET,
    },
  });

  const handleUploadLocalFile = (e) => {
    e.preventDefault();
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleUploadS3 = async (e) => {
    if (!file) return;
    e.preventDefault();
    const ext = file?.name.split(".").at(-1);
    const uid = uuidv4().replace(/-/g, "");
    const fileName = `${uid}${ext ? "." + ext : ""}`;

    try {
      const uploadToS3 = new PutObjectCommand({
        Bucket,
        Key: fileName,
        Body: file,
      });
      await s3.send(uploadToS3);
      setUploadedFileName(file.name);
      console.log("File uploaded successfully:", fileName);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <main className="flex flex-col justify-between w-full">
      <Navbar upload="true" />
      <div className="flex relative h-screen w-full bg-white-1 items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-green-4 text-6xl font-bold">Upload Image</p>
          <p className="text-green-4 text-3xl font-normal mt-3">
            Upload a soybean leaf image by pressing the button below
          </p>
          {!file ? (
            <div className="flex items-center justify-center mb-4">
              <label
                htmlFor="file-upload"
                className="flex bg-white-1 text-green-1 font-bold border-4 border-green-1 shadow-xl shadow-green-1/30 py-2 px-4 rounded-xl w-56 h-16 mt-7 justify-center items-center hover:bg-purple-200 transition-transform duration-300 transform hover:scale-110 active:scale-95"
              >
                <Image alt="" className="mr-3" src={upload} /> Upload Image
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleUploadLocalFile}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="mb-4 max-h-96"
              />
              {file.name && (
                <div className="mt-4">
                  <p>File Name: {file.name}</p>
                </div>
              )}
              <button
                onClick={handleUploadS3}
                className="flex bg-green-1 text-white font-bold py-2 px-4 rounded-xl mt-4"
              >
                Upload
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
