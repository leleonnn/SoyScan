import Image from "next/image";
import Navbar from ".././components/Navbar";
import img from "../../../public/2.png"

const Card = ({name, cause}) => {
  return(
    <div className="w-64 h-80 bg-green-2 shadow-2xl shadow-green-1 rounded-xl py-4 px-4 transform transition-all hover:-translate-y-2 hover:shadow-yellow-1 duration-300 hover:cursor-pointer ">
      <div type="square" className="relative w-full bg-green-1 rounded-md">
        <Image
          id="true"
          src={img}
          alt="image"
          className={`object-cover h-full w-full rounded-md`}
        />
      </div>
      <div className="">
        <p className="font-semibold text-lg mt-4">
          {name}
        </p>
        <p className="font-light text-sm mt-1">
          {cause}
        </p>
      </div>
    </div>
  )
}

export default function Library() {
  return (
    <main className="flex flex-col justify-between w-full">
      <Navbar library="true"/>
      <div className="flex relative h-screen w-full bg-white-1 justify-center">
        <div className="flex flex-col items-center mt-32">
          <p className="text-green-4 text-6xl font-bold mb-10">
            Disease Library
          </p>
          <Card name="Lorem Ipsum Disease" cause="Virus Infection"/>
        </div>
      </div>

    </main>
  );
}
