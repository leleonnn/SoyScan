"use client";
import React, { useState, useEffect } from "react";
import Navbar from ".././components/Navbar";

const Card = ({imglink, name, cause}) => {
  return(
  <a href={`/Disease?diseaseName=${name}`} className="w-64 h-80 bg-white-1 border-2 border-green-1 shadow-2xl shadow-green-1 rounded-xl py-4 px-4 transform transition-all hover:-translate-y-2 hover:shadow-yellow-1 duration-300 hover:cursor-pointer ">
      <div type="square" className="relative w-full bg-green-1 border-2 border-green-1 rounded-md">
        <img
          id="true"
          src={imglink}
          alt="image"
          className={`object-cover h-full w-full rounded-md`}
        />
      </div>
      <div className="text-green-3">
        <p className="font-bold text-lg mt-4">
          {name}
        </p>
        <p className="font-regular text-xs mt-1">
          {cause}
        </p>
      </div>
    </a>
  )
}

export default function Library() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://172.203.225.191:8000/api/diseases');
        const result = await response.json();
        setData(result);

        console.log(result);
      } catch (error) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  return (
    <main className="flex flex-col justify-between w-full">
      <Navbar library="true"/>
      <div className="flex relative h-screen w-full bg-white-1 justify-center">
        <div className="flex flex-col items-center mt-32">
          <p className="text-green-4 text-6xl font-bold mb-10">
            Disease Library
          </p>
				<div className="grid lg:grid-cols-4 md:grid-cols-2 auto-rows-max gap-8 ">
          {
            data.map((rows) => (
              <Card imglink={rows.imageLink} name={rows.name} cause={rows.rarity}/>
            ))
          }
        </div>
        </div>
      </div>

    </main>
  );
}
