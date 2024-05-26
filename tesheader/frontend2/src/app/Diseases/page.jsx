"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";

interface DiseaseData {
  name: string;
  imageLink: string;
  rarity: string;
  symptoms: string;
  suggestions: string;
}

const DiseasePage: React.FC = () => {
  const searchParams = useSearchParams();
  const diseaseName = searchParams.get("diseaseName");
  const [diseaseData, setDiseaseData] = useState<DiseaseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (diseaseName) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://172.203.225.191:8000/api/diseases/${encodeURIComponent(
              diseaseName
            )}`
          );
          const result = await response.json();
          setDiseaseData(result);
        } catch (error) {
          setError("Failed to fetch data");
        }
      };
      fetchData();
    }
  }, [diseaseName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!diseaseData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col justify-between w-full">
      <Navbar />
      <div className="flex relative h-full w-full bg-white-1 items-center justify-center">
        <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-green-4 text-6xl font-bold">
            {diseaseData.name}
          </h1>
          <div className="w-full mt-4">
            <img
              src={diseaseData.imageLink}
              alt={diseaseData.name}
              className="object-cover h-48 w-full rounded-md"
            />
          </div>
          <div className="w-full mt-4">
            <p>
              <strong>Rarity:</strong> {diseaseData.rarity}
            </p>
            <p>
              <strong>Symptoms:</strong> {diseaseData.symptoms}
            </p>
            <p>
              <strong>Suggestions:</strong> {diseaseData.suggestions}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DiseasePage;
