"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import Navbar from "../../components/Navbar";
import img from "../../../../public/2.png";
import arrow from "../../../../public/arrow.svg";
import Link from "next/link";

export default function Result() {
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      // Get id from url
      const currentURL = window.location.href;
      const Id = currentURL.split("/").pop();

      // Create url to access API
      let url = "https://localhost:8000/api/disease/<name>";
      const param = new URLSearchParams();
      param.append("id", Id);
      url = url + "?" + param.toString();
      console.log(url);

      // Fetch data from API
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Set data to some variables
          console.log(data);
          // setEventData(data);
          // setDivisionList(data[0]["divisions"].split(", "));
          // loadAdmin(data);
          // loadImage();
        });
    } catch (err) {
      console.error(err);
    }
  });
  return (
    <main className="flex flex-col justify-between w-full">
      <Navbar />
      <div className="flex relative h-screen w-full bg-white-1 justify-center">
        <div className="flex flex-col items-center mt-32 w-full mx-52">
          <p className="text-green-4 text-6xl font-bold mb-10">Result</p>
          <div className="flex flex-row w-full h-8/12">
            <div className="flex w-5/12 p-10 items-center justify-center">
              <div
                type="square"
                className="relative w-full bg-black rounded-2xl shadow-xl"
              >
                <Image
                  id="true"
                  src={img}
                  alt="image"
                  className={`object-cover h-full w-full rounded-2xl border-2 `}
                />
              </div>
            </div>

            <div className="w-7/12 p-10 text-black-1	">
              <div className="">
                <div className="flex flex-row font-bold text-4xl">
                  <div className="text-black-1">Your Soy is</div>
                  <div className="text-green-3">Diseased</div>
                  <div className="text-black-1">!</div>
                </div>

                <p className="mt-6 font-semibold">Your soy is affected by:</p>
                <Link
                  href="/Disease/"
                  className="flex w-1/2 h-20 mt-1 rounded-xl bg-white-0 shadow-xl shadow-green-1/50 border-2 border-green-1/50 justify-between p-3 transform transition-all duration-300 hover:bg-green-3 hover:text-white-0 hover:shadow-xl active:scale-95 hover:cursor-pointer hover:shadow-yellow-1"
                >
                  <div className="flex flex-row w-full items-center justify-between">
                    <div className="">
                      <p className="font-bold text-xl">Lorem Ipsum Disease</p>
                      <p className="font-light text-xs">Learn More</p>
                    </div>
                    <div
                      type="square"
                      className="flex h-full items-center justify-items-end"
                    >
                      <Image
                        id="true"
                        src={arrow}
                        alt="image"
                        className={`object-cover h-full w-full rounded-full `}
                      />
                    </div>
                  </div>
                </Link>

                <p className="mt-6 font-semibold">Suggestion:</p>
                <p className="mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="w-full bg-black-1 h-0.5 mt-16" />

              <div className="mt-16 w-5/12">
                <p className="mb-3 font-semibold">Continue Identifying</p>
                <Link
                  href="/Upload"
                  className="flex w-full h-9 rounded-full bg-white-0 shadow-lg items-center pl-5 justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 hover:cursor-pointer"
                >
                  <p className="font-semibold text-green-3">Upload Image</p>
                  <div
                    type="square"
                    className="flex h-4/6 border-green-3 border-2 rounded-full justify-items-end mr-2"
                  >
                    <Image
                      id="true"
                      src={arrow}
                      alt="image"
                      className={`object-cover h-full w-full rounded-full `}
                    />
                  </div>
                </Link>
                <Link
                  href="/Camera"
                  className="flex w-full h-9 mt-3 rounded-full bg-white-0 shadow-lg items-center pl-5 justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 hover:cursor-pointer"
                >
                  <p className="font-semibold text-green-3">Take a Picture</p>
                  <div
                    type="square"
                    className="flex h-4/6 border-green-3 border-2 rounded-full justify-items-end mr-2"
                  >
                    <Image
                      id="true"
                      src={arrow}
                      alt="image"
                      className={`object-cover h-full w-full rounded-full `}
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
