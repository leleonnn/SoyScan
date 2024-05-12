import Image from "next/image";
import Navbar from ".././components/Navbar";

export default function Camera() {
  return (
    <main className="flex flex-col justify-between w-full">
      <Navbar camera="true"/>
      <div className="flex relative h-screen w-full bg-white-1 items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-green-4 text-6xl font-bold ">
          Take a Picture
          </p>
          <p className="text-green-4 text-3xl font-normal mt-3">
          Take a picture of soybean leaf image by pressing button below
          </p>
          <div className="flex flex-row mt-7 items-center">
            <div className="w-96 h-96 rounded-2xl bg-green-4 mr-7 border-4 border-green-1">

            </div>
            <button className="flex bg-white-1 text-green-1 font-bold border-4 border-green-1 shadow-xl shadow-green-1/30 py-2 px-4 rounded-3xl w-16 h-16 mt-7 transition-transform duration-300 transform hover:scale-110 active:scale-95">

            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
