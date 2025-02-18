"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // To handle redirect after logout

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession(); // Check if session exists
  const router = useRouter(); // For redirect after log out

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle log out and redirect
  const handleLogout = async () => {
    await signOut();
    router.push("/login"); // Redirect to login page after logging out
  };

  return (
    <nav
      className={`p-5 fixed z-[999] w-full transition-all duration-300 ${
        isScrolled ? "bg-gradient-to-r from-blue-700 to-indigo-900" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" passHref>
          <Image src="/logo2.svg" alt="TaskVerse Logo" width={120} height={80} priority />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {["Features", "Pricing", "Support", "Blog"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} passHref>
              <span className="text-white hover:text-orange-500">{item}</span>
            </Link>
          ))}
          
          {/* Conditional Login/Logout */}
          {!session ? (
            <Link href="/login" passHref>
              <span className="bg-orange-500 px-4 py-2 text-white rounded-lg hover:bg-orange-600">
                Log In
              </span>
            </Link>
          ) : (
            <>
              <Link href="/taskControl" passHref>
                <span className="text-white hover:text-orange-500">Manage Task</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-orange-500 px-4 py-2 text-white rounded-lg hover:bg-orange-600"
              >
                Log Out
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-blue-800 p-4 space-y-4">
          {["Features", "Pricing", "Support", "Blog"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} passHref>
              <span className="text-white" onClick={() => setIsOpen(false)}>
                {item}
              </span>
            </Link>
          ))}
          
          {/* Conditional Login/Logout for Mobile */}
          {!session ? (
            <Link href="/login" passHref>
              <span className="bg-orange-500 px-4 py-2 text-white rounded-lg" onClick={() => setIsOpen(false)}>
                Log In
              </span>
            </Link>
          ) : (
            <>
              <Link href="/manage-task" passHref>
                <span className="text-white" onClick={() => setIsOpen(false)}>Manage Task</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false); // Close the mobile menu after logging out
                }}
                className="bg-orange-500 px-4 py-2 text-white rounded-lg hover:bg-orange-600"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
