"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import img from "../../../public/2.png";
import arrow from "../../../public/arrow.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation';

import { useState, useEffect } from "react";

// Loading component
function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-2xl font-bold">Loading...</p>
        </div>
    );
}

export default function Result() {
    const [file, setFile] = useState(null);
    const [diseaseName, setDiseaseName] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [fileName, setFileName] = useState(null);

    const searchParams = useSearchParams();
    const search = searchParams.get('fileName');

    useEffect(() => {
        if (search) {
            setFile(search);
        }
    }, [search]);

    useEffect(() => {
        const predictDisease = async () => {
            try {
                console.log(file);
                const response = await fetch(`http://172.203.225.191:8000/api/predict-disease-by-image-key/${file}`);
                const result = await response.json();
                setDiseaseName(result.Success);
            } catch (error) {
                setError('Failed to fetch data');
            }
        };
        if (file) {
            predictDisease();
        }
    }, [file]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://172.203.225.191:8000/api/disease/classif/${diseaseName}`);
                const result = await response.json();
                setData(result);
                console.log(result);
            } catch (error) {
                setError('Failed to fetch data');
            }
        };
        if (diseaseName) {
            fetchData();
        }
    }, [diseaseName]);

    // Conditionally render loading screen or main content
    if (!diseaseName) {
        return <Loading />;
    }

    return (
        <main className="flex flex-col justify-between w-full">
            <Navbar />
            <div className="flex relative h-screen w-full bg-white-1 justify-center">
                <div className="flex flex-col items-center mt-32 w-full mx-52">
                    <p className="text-green-4 text-6xl font-bold mb-10">
                        Result
                    </p>
                    <div className="flex flex-row w-full h-8/12">
                        <div className="flex w-5/12 p-10 items-center justify-center">
                            {/* <div className="relative w-full bg-black rounded-2xl shadow-xl">
                                <Image
                                    id="true"
                                    src={`https://soyscan-bucket.amazonaws.com/${file}`}
                                    width={100}
                                    height={100}
                                    alt="image"
                                    className="object-cover h-full w-full rounded-2xl border-2"
                                />
                            </div> */}
                        </div>
                        <div className="w-7/12 p-10 text-black-1">
                            <div className="">
                                <div className="flex flex-row font-bold text-4xl">
                                    <div className="text-black-1">
                                        Your Soy is
                                    </div>
                                    <div className={data && data.name === 'healthy' ? 'text-green-3' : 'text-red-3'}>
                                        {data && data.classifName === 'healthy' ? ' Healthy' : ' Diseased'}
                                    </div>
                                    <div className="text-black-1">
                                        !
                                    </div>
                                </div>
                                <p className="mt-6 font-semibold">
                                    Your soy is affected by:                
                                </p>
                                <Link href="/Disease/" className="flex w-1/2 h-20 mt-1 rounded-xl bg-white-0 shadow-xl shadow-green-1/50 border-2 border-green-1/50 justify-between p-3 transform transition-all duration-300 hover:bg-green-3 hover:text-white-0 hover:shadow-xl active:scale-95 hover:cursor-pointer hover:shadow-yellow-1">
                                    <div className="flex flex-row w-full items-center justify-between">
                                        <div className="">
                                            <p className="font-bold text-xl">
                                                {data.name}
                                            </p>
                                            <p className="font-light text-xs">
                                                Learn More
                                            </p>
                                        </div>
                                        <div className="flex h-full items-center justify-items-end">
                                            <Image
                                                id="true"
                                                src={arrow}
                                                alt="image"
                                                className="object-cover h-full w-full rounded-full"
                                            />
                                        </div>
                                    </div>
                                </Link>
                                <p className="mt-6 font-semibold">
                                    Suggestion:                
                                </p>
                                <p className="mt-1">
                                    {data.treatment}
                                </p>
                            </div>
                            <div className="w-full bg-black-1 h-0.5 mt-16" />
                            <div className="mt-16 w-5/12">
                                <p className="mb-3 font-semibold">
                                    Continue Identifying
                                </p>
                                <Link href="/Upload" className="flex w-full h-9 rounded-full bg-white-0 shadow-lg items-center pl-5 justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 hover:cursor-pointer">
                                    <p className="font-semibold text-green-3">
                                        Upload Image
                                    </p>
                                    <div className="flex h-4/6 border-green-3 border-2 rounded-full justify-items-end mr-2">
                                        <Image
                                            id="true"
                                            src={arrow}
                                            alt="image"
                                            className="object-cover h-full w-full rounded-full"
                                        />
                                    </div>
                                </Link>
                                <Link href="/Camera" className="flex w-full h-9 mt-3 rounded-full bg-white-0 shadow-lg items-center pl-5 justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 hover:cursor-pointer">
                                    <p className="font-semibold text-green-3">
                                        Take a Picture
                                    </p>
                                    <div className="flex h-4/6 border-green-3 border-2 rounded-full justify-items-end mr-2">
                                        <Image
                                            id="true"
                                            src={arrow}
                                            alt="image"
                                            className="object-cover h-full w-full rounded-full"
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
