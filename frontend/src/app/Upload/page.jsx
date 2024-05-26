import Image from "next/image";
import Navbar from ".././components/Navbar";
import upload from "../../../public/upload.png";

export default function Upload() {
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
          <button className="flex bg-white-1 text-green-1 font-bold border-4 border-green-1 shadow-xl shadow-green-1/30 py-2 px-4 rounded-xl w-56 h-16 mt-7 justify-center items-center transition-transform duration-300 transform hover:scale-110 active:scale-95">
            <Image 
              alt=""
              className="mr-3"
            src={upload} />
              Upload Image
          </button>
        </div>
      </div>

    </main>
  );
}
