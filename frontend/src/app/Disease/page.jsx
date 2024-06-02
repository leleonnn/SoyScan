"use client"

import { Suspense, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Navbar from "../components/Navbar";

const DiseasePage = () => {
  const [diseaseData, setDiseaseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { query } = window.location; // Access query from window.location
      const diseaseName = query.diseaseName; // Get diseaseName from query
      try {
        console.log(`Fetching data for: ${diseaseName}`);
        const response = await fetch(`http://172.203.225.191:8000/api/disease/classif/${diseaseName}`);
        const result = await response.json();
        if (response.ok) {
          setDiseaseData(result);
          console.log('Fetched data:', result);
        } else {
          throw new Error(result.message || 'Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== 'undefined') { // Check for window object before executing
      fetchData();
    }
  }, []);

  if (loading) {
    return (
      <main className="flex flex-col justify-between items-center w-full">
        <Navbar />
        <div className="flex relative h-screen w-2/3 mt-32 bg-white-1 items-center justify-center">
          <div className="flex flex-col items-center px-8 pb-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-green-4 text-6xl font-bold">Loading...</h1>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col justify-between items-center w-full">
        <Navbar />
        <div className="flex relative h-screen w-2/3 mt-32 bg-white-1 items-center justify-center">
          <div className="flex flex-col items-center px-8 pb-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-red-4 text-6xl font-bold">Error</h1>
            <p>{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-between items-center w-full">
      <Navbar />
      <div className="flex relative h-screen w-2/3 mt-32 bg-white-1 items-center justify-center">
        <div className="flex flex-col items-center px-8 pb-8 bg-white shadow-lg rounded-lg">
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

const SuspenseDiseasePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DiseasePage />
    </Suspense>
  );
};

export default SuspenseDiseasePage;
