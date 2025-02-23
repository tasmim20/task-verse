"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
// Import images
import WorkImage from "../../../../public/account-bg.jpg";
import orImg from "../../../../public/apple-touch-icon.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please try again.");
      }

      toast.success("Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", email); // Store email in local storage

      router.push("/"); // Navigate to home page
      setTimeout(() => {
        window.location.reload(); // Force page reload after navigation
      }, 100);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${WorkImage.src})` }}
    >
      <div className="relative border border-white p-8 md:p-12 lg:p-12 w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
        <h2 className="text-3xl font-semibold text-center text-white mb-6 md:mb-8">
          Sign in
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_0.2fr_2fr] gap-6 items-center">
          <div className="flex flex-col space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-700"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-700"
                required
              />
              <div className="flex justify-between items-center text-sm text-white">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Stay signed in
                </label>
                <a href="#" className="text-blue-300 hover">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-orange-500 transition"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign in"}
              </button>
            </form>
          </div>

          <div className="hidden md:flex justify-center">
            <Image src={orImg} alt="Image" />
          </div>

          <div className="flex flex-col space-y-4">
            <button
              className="flex items-center justify-center bg-white text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <FaGoogle className="mr-2" /> Sign in with Google
            </button>
            <button
              className="flex items-center justify-center bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition"
              onClick={() => (window.location.href = "/api/auth/github")}
            >
              <FaGithub className="mr-2" /> Sign in with GitHub
            </button>
          </div>
        </div>

        <div className="flex md:hidden justify-center my-3">
          <p className="text-white text-sm font-light">or</p>
        </div>

        <div className="text-center mt-6">
          <Link href="/signup">
            <span className="bg-orange-500 px-4 py-2 text-white rounded-lg hover:bg-orange-600">
              Create an account
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
