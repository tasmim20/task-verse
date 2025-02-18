"use client";
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import WorkImage from "../.././../../public/account-bg.jpg";
import orImg from "../.././../../public/apple-touch-icon.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { toast } from "react-hot-toast"; // Import toast for notifications

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Initialize the router for redirection
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (res?.error) {
      toast.error("Login failed. Please try again.");
    } else {
      toast.success("Login successful! Redirecting...");
      setLoginSuccess(true); // Set login success flag
    }
  };

  // Redirect after successful login
  useEffect(() => {
    if (loginSuccess) {
      router.push("/"); // Redirect to homepage after success
    }
  }, [loginSuccess, router]); // Run only when loginSuccess changes

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
            <form onSubmit={handleSubmit}>
            <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-700"
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
              <div className="flex justify-between items-center text-sm pt-2 pb-2 text-white">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Stay signed in
                </label>
                <a href="#" className="text-blue-300 hover">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3  pt-2 rounded-lg hover:bg-orange-500 transition"
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
              onClick={() => signIn("github")}
            >
              <FaGithub className="mr-2" /> Sign in with GitHub
            </button>
          </div>
        </div>

        <div className="flex md:hidden justify-center my-3">
          <p className="text-white text-sm font-light">or</p>
        </div>

        <div className="text-center mt-6">
          <Link href="/signup" passHref>
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
