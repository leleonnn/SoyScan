import { Button, Image } from "@nextui-org/react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <main className="w-full min-h-screen bg-violet-200 flex flex-row justify-center items-center">
      <div className="flex flex-row items-center gap-16">
        <div className="text-center flex flex-col gap-12">
          <div className="">
            <h1 className="text-6xl font-semibold">
              Hi, I&apos;m Muhammad Razza!
            </h1>
            <h2 className="text-4xl font-semibold text-violet-600">
              I'm a Gamer
            </h2>
          </div>
          <div>
            <Button
              as={Link}
              target="_blank"
              href="https://www.linkedin.com/in/muhammad-razza-titian-jiwani/"
              className="bg-violet-600 text-white"
            >
              Visit
            </Button>
          </div>
        </div>
        <div className="w-96">
          <Image
            src="https://storage.googleapis.com/al_fukad/this-guy.webp"
            className="object-cover"
            alt="profile"
            radius="full"
          />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
