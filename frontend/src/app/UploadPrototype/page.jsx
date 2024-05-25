"use client";

import { Fragment, useRef, useState } from "react";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const UploadPrototype = () => {
  const [file, setFile] = useState(null);

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
      console.log("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Fragment>
      <div>
        <div>
          <div>
            <div>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleUploadLocalFile}
              />
            </div>
          </div>
          <div>
            <button onClick={handleUploadS3}>S3 Upload</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UploadPrototype;
