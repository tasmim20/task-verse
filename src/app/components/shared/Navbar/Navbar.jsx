"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Check if user is authenticated based on session or token
    if (session || token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [session]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail"); // Clear user email from local storage

    if (session) {
      await signOut();
    }

    setIsAuthenticated(false);
    setIsDropdownOpen(false); // Close dropdown
    router.push("/login");
  };

  return (
    <nav
      className={`p-5 fixed z-[999] w-full transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-blue-700 to-indigo-900"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" passHref>
          <Image
            src="/logo2.svg"
            alt="TaskVerse Logo"
            width={120}
            height={80}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {["Features", "Pricing", "Support", "Blog"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} passHref>
              <span className="text-white hover:text-orange-500">{item}</span>
            </Link>
          ))}
          {isAuthenticated && ( // Change from isAuthenticated( to isAuthenticated &&
            <div>
              <Link href="/taskControl" passHref>
                <span className="text-white hover:text-orange-500">
                  Manage Your Task
                </span>
              </Link>
            </div>
          )}

          {/* Authentication Handling */}
          {!isAuthenticated ? (
            <Link href="/login" passHref>
              <span className="bg-orange-500 px-4 py-2 text-white rounded-lg hover:bg-orange-600">
                Log In
              </span>
            </Link>
          ) : (
            <div className="relative">
              {/* Profile Icon */}
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <Image
                  src={session?.user?.image || "/user.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                  <div className="p-4 text-center">
                    <p className="text-gray-800 font-semibold">
                      {session?.user?.name || "User"}
                    </p>
                  </div>

                  <div className="border-t">
                    <button
                      className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                      onClick={() => alert("Invite functionality coming soon!")}
                    >
                      Invite a Friend
                    </button>
                    <button
                      className="block w-full bg-orange-500 px-4 py-2 text-white rounded-lg hover:bg-orange-600"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
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

          {!isAuthenticated ? (
            <Link href="/login" passHref>
              <span
                className="bg-orange-500 px-4 py-2 text-white rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Log In
              </span>
            </Link>
          ) : (
            <>
              <button
                className="text-white"
                onClick={() => alert("Invite functionality coming soon!")}
              >
                Invite a Friend
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
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
