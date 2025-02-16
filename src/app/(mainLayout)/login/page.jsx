"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import WorkImage from "../.././../../public/account-bg.jpg";
import orImg from "../.././../../public/apple-touch-icon.png";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${WorkImage.src})` }}
    >
      <div className="relative border border-white  p-8 md:p-12 lg:p-12 w-full max-w-lg md:max-w-2xl lg:max-w-3xl ">
        <h2 className="text-3xl font-semibold text-center text-white mb-6 md:mb-8">
          Sign in
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_0.2fr_2fr] gap-6 items-center">
          <div className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-700"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-700"
              required
            />
            <div className="flex justify-between items-center text-sm text-white">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Stay signed in
              </label>
              <a href="#" className="text-blue-300 hover">Forgot Password?</a>
            </div>
            <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-orange-500 transition">
              Sign in
            </button>
          </div>

          <div className="hidden md:flex justify-center">
            <Image src={orImg} alt="Image" />
          </div>

          <div className="flex flex-col space-y-4">
            <button
              className="flex items-center justify-center bg-white text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition"
              onClick={() => signIn("google", { callbackUrl: "/taskControl" })}
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
          <button className="bg-orange-500 text-white p-3 rounded-lg">
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
