"use client";

import { useParams } from "next/navigation";
import Navbar from "../.././components/Navbar";

const DiseasePage: React.FC = () => {
  const params = useParams();
  const { disease } = params;

  // Mock data for demonstration. Replace with real data.
  const diseaseData = {
    "lorem-ipsum-disease": {
      name: "Lorem Ipsum Disease",
      cause: "Virus Infection",
      description: "Detailed information about Lorem Ipsum Disease...",
    },
    // Add more disease data here
  };

  const data = diseaseData[disease as string];

  if (!data) {
    return <div>Disease not found</div>;
  }

  return (
    <main className="flex flex-col justify-between w-full">
      <Navbar />
      <div className="flex relative h-screen w-full bg-white-1 items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-green-4 text-6xl font-bold ">{data.name}</h1>
          <p className="text-green-4 text-3xl font-normal mt-3">{data.cause}</p>
          <p className="text-green-4 text-lg font-normal mt-3">
            {data.description}
          </p>
        </div>
      </div>
    </main>
  );
};

export default DiseasePage;
