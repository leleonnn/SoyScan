"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import dropdown from "../../../public/dropdown-icon.svg";
import dropdown_alt from "../../../public/dropdown-icon-alt.svg";
import hamburger from "../../../public/menu.png";
import { useState } from "react";

export default function Navbar({ upload, camera, library }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed bg-green-2 min-w-full top-0 z-40 h-20">
      <div className="max-w-[1150px] 2xl:max-w-[1200px] h-full flex flex-wrap items-center justify-between mx-auto px-4 sm:px-0">
        <div className=" w-44 h-full flex content-center">
          <Link className="flex w-full items-center gap-2 md:gap-3" href="/">
            <Image alt="" className="m-3" src={logo} />
          </Link>
        </div>

        <div className="flex flex-rows h-full content-center  md:show">
          <div className="relative group">
            <div
              className={`flex flex-rows items-center h-full px-5 hover:bg-green-3 hover:cursor-pointer ${
                upload || camera
                  ? "bg-green-3 text-green-1 font-bold"
                  : "bg-green-2 text-white font-semibold"
              }`}
            >
              Disease Identification
              <Image
                className={`ml-3 ${upload || camera ? "hidden" : "show"}`}
                alt=""
                src={dropdown}
              />
              <Image
                className={`ml-3 ${upload || camera ? "show" : "hidden"}`}
                alt=""
                src={dropdown_alt}
              />
            </div>

            <div className="absolute z-10 hidden bg-green-3 group-hover:block w-60  shadow-lg">
              <Link
                href="/Upload"
                className={`block px-4 py-2 mx-1 my-2 rounded-md hover:bg-green-4 ${
                  upload
                    ? "bg-green-4 text-green-1 font-bold"
                    : "bg-green-3 text-white font-semibold"
                }`}
              >
                Upload Image
              </Link>
              <Link
                href="/Camera"
                className={`block px-4 py-2 mx-1 my-2 rounded-md hover:bg-green-4 ${
                  camera
                    ? "bg-green-4 text-green-1 font-bold"
                    : "bg-green-3 text-white font-semibold"
                }`}
              >
                Take a Picture
              </Link>
            </div>
          </div>

          <div>
            <Link
              href="/Library"
              className={`flex flex-rows items-center h-full px-5 hover:bg-green-3 ${
                library
                  ? "bg-green-3 text-green-1 font-bold"
                  : "bg-green-2 text-white font-semibold"
              }`}
            >
              Disease Information
            </Link>
          </div>

          {/* <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none focus:bg-gray-700 px-2 py-1 rounded-md"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>
                <div
                    className={`${
                        isOpen ? 'block' : 'hidden'
                    } md:block md:flex space-x-4`}
                >
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/about">
                        About
                    </Link>
                </div> */}
        </div>
      </div>
    </nav>
  );
}
