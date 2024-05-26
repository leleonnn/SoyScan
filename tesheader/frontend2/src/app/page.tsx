// src/app/index.tsx

import Link from "next/link";
import Navbar from "./components/Navbar";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-1">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-green-4">SoyScan</h1>
        <p className="text-2xl text-green-3 mt-2">
          Soybean Disease Identification at Your Fingertips
        </p>
        <div className="mt-10 flex space-x-4">
          <Link
            href="/Camera"
            className="flex items-center justify-center bg-green-1 text-green-4 font-bold py-4 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Take a Picture
          </Link>
          <Link
            href="/Upload"
            className="flex items-center justify-center bg-green-1 text-green-4 font-bold py-4 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Upload Image
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
