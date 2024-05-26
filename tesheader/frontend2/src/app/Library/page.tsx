import Image from "next/image";
import Link from "next/link";
import Navbar from ".././components/Navbar";
import img from "../../../public/2.png";

const Card = ({ name, cause, link }) => {
  return (
    <Link href={link} passHref>
      <div className="w-64 h-80 bg-green-2 shadow-2xl shadow-green-1 rounded-xl py-4 px-4 transform transition-all hover:-translate-y-2 hover:shadow-yellow-1 duration-300 hover:cursor-pointer ">
        <div className="relative w-full bg-green-1 rounded-md">
          <Image
            src={img}
            alt="image"
            className="object-cover h-full w-full rounded-md"
          />
        </div>
        <div>
          <p className="font-semibold text-lg mt-4">{name}</p>
          <p className="font-light text-sm mt-1">{cause}</p>
        </div>
      </div>
    </Link>
  );
};

const Library = () => {
  return (
    <main className="flex flex-col justify-between w-full">
      <Navbar library="true" />
      <div className="flex relative h-screen w-full bg-white-1 justify-center">
        <div className="flex flex-col items-center mt-32">
          <p className="text-green-4 text-6xl font-bold mb-10">
            Disease Library
          </p>
          <Card
            name="Lorem Ipsum Disease"
            cause="Virus Infection"
            link="/Diseases/lorem-ipsum-disease"
          />
          {/* Add more cards here */}
        </div>
      </div>
    </main>
  );
};

export default Library;
