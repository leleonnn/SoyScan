"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";

const DiseasePage = () => {
  const searchParams = useSearchParams();
  const diseaseName = searchParams.get("diseaseName");
  const [diseaseData, setDiseaseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (diseaseName) {
      const fetchData = async () => {
        try {
          // Encode the disease name to handle spaces and special characters
          const encodedDiseaseName = encodeURIComponent(diseaseName);
          const response = await fetch(
            `http://172.203.225.191:8000/api/get-disease-by-name/${encodedDiseaseName}`
          );
          console.log(`Fetching data for: ${encodedDiseaseName}`);
          if (!response.ok) {
            console.error(`Failed to fetch data: ${response.statusText}`);
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          if (result.length === 0) {
            throw new Error("Disease not found");
          }
          console.log("Fetched data:", result[0]);
          setDiseaseData(result[0]); // Assuming the API returns an array of results
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data");
        }
      };
      fetchData();
    }
  }, [diseaseName]);

  if (error) {
    return (
      <div className="flex flex-col justify-between w-full">
        <Navbar />
        <div className="flex relative h-full w-full bg-white-1 items-center justify-center">
          <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-red-4 text-6xl font-bold">Error</h1>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!diseaseData) {
    return (
      <div className="flex flex-col justify-between w-full">
        <Navbar />
        <div className="flex relative h-full w-full bg-white-1 items-center justify-center">
          <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-green-4 text-6xl font-bold">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col justify-between w-full">
      <Navbar />
      <div className="flex relative h-full w-full bg-white-1 items-center justify-center">
        <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-green-4 text-6xl font-bold">
            {diseaseData.name}
          </h1>
          {diseaseData.imageLink && (
            <div className="w-full mt-4">
              <img
                src={diseaseData.imageLink}
                alt={diseaseData.name}
                className="object-cover h-48 w-full rounded-md"
              />
            </div>
          )}
          <div className="w-full mt-4">
            <p>
              <strong>Rarity:</strong> {diseaseData.rarity}
            </p>
            <p>
              <strong>Symptoms:</strong> {diseaseData.symptoms}
            </p>
            <p>
              <strong>Explanation:</strong> {diseaseData.explanation}
            </p>
            <p>
              <strong>Treatment:</strong> {diseaseData.treatment}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DiseasePage;
