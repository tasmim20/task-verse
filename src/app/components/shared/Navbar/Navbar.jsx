"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../../public/logo2.svg"; // Adjust the path to match your logo file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change navbar color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust the scroll distance to your preference
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Listen to the scroll event
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`p-5 fixed z-[999] w-full transition-all duration-300 ${
        isScrolled ? "bg-gradient-to-r from-blue-700 to-indigo-900" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="TaskQue Logo"
            width={120}
            height={80}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/features" className="text-white hover:text-orange-500">
            Features
          </Link>
          <Link href="/pricing" className="text-white hover:text-orange-500">
            Pricing
          </Link>
          <Link href="/support" className="text-white hover:text-orange-500">
            Support
          </Link>
          <Link href="/blog" className="text-white hover:text-orange-500">
            Blog
          </Link>
          <Link href="/login" className="bg-orange-500 px-4 py-2 text-white rounded-lg hover:bg-orange-600">
            Log In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-blue-800 p-4 space-y-4">
          <Link href="/features" className="text-white">
            Features
          </Link>
          <Link href="/pricing" className="text-white">
            Pricing
          </Link>
          <Link href="/support" className="text-white">
            Support
          </Link>
          <Link href="/blog" className="text-white">
            Blog
          </Link>
          <Link href="/login" className="bg-orange-500 px-4 py-2 text-white rounded-lg">
            Log In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
