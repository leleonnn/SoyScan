import { Button } from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import HeroSection from "./section/Hero";
import Link from "next/link";

const Home = () => {
  return (
    <main>
      <Navbar shouldHideOnScroll className="bg-violet-400">
        <NavbarContent>
          <NavbarBrand>
            <h1 className="text-violet-800 font-semibold text-2xl select-none">
              Avocado
            </h1>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent>
          <NavbarItem className="hover:text-violet-700 transition-colors hover:underline cursor-pointer">
            Home
          </NavbarItem>
          <NavbarItem
            as={Link}
            href="/profile"
            className="hover:text-violet-700 transition-colors hover:underline cursor-pointer"
          >
            Profile
          </NavbarItem>
          <NavbarItem className="hover:text-violet-700 transition-colors hover:underline cursor-pointer">
            Content
          </NavbarItem>
          <NavbarItem className="hover:text-violet-700 transition-colors hover:underline cursor-pointer">
            About Us
          </NavbarItem>
          <NavbarItem className="hover:text-violet-700 transition-colors hover:underline cursor-pointer">
            Contacts
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <HeroSection></HeroSection>
      <Button className="bg-emerald-500 text-blue-800 rounded-none">
        Click me
      </Button>
    </main>
  );
};

export default Home;
