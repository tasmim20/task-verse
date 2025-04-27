"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Image from "next/image";
import WorkImage from "../../../../public/account-bg.jpg";
import orImg from "../../../../public/apple-touch-icon.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const SignupPage = () => {
  // ✅ Ensure this state is defined!
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
 
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    try {
      const res = await fetch("http://localhost:7000/api/auth/register", { // ✅ Fixed API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text(); // Handle non-JSON errors
        throw new Error(errorText);
      }

      const data = await res.json();
      console.log(data);
      toast.success("Account created successfully!");
      router.push("/login"); // Redirect to login page
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${WorkImage.src})` }}
    >
      <div className="relative border border-white p-8 md:p-12 lg:p-12 w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Create an Account
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_0.2fr_2fr] gap-6 items-center">
          {/* Sign-Up Form */}
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              value={formData.fullName} // ✅ Now this will work
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-700"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-700"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-700"
              required
            />
            

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-orange-500 transition"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div className="hidden md:flex justify-center">
            <Image src={orImg} alt="Image" />
          </div>

          {/* Social Sign-Up */}
          <div className="flex flex-col space-y-4">
            <button
              className="flex items-center justify-center bg-white text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition"
              onClick={() => signIn("google", { callbackUrl: "/taskControl" })}
            >
              <FaGoogle className="mr-2" /> Sign up with Google
            </button>
            <button
              className="flex items-center justify-center bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition"
              onClick={() => signIn("github")}
            >
              <FaGithub className="mr-2" /> Sign up with GitHub
            </button>
          </div>
        </div>

        <div className="flex md:hidden justify-center my-3">
          <p className="text-white text-sm font-light">or</p>
        </div>

        <div className="text-center mt-6">
          <p className="text-white">
            Already have an account?{" "}
            <Link href="/login" passHref>
              <span className="bg-orange-500 px-4 py-2 text-white rounded-lg hover:bg-orange-600">
                Log In
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
