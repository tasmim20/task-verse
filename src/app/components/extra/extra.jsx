"use client";
import Image from "next/image";
import { useState } from "react";
import featureIMG from "../../../../public/subscribeBg.jpg"; // Ensure the path is correct

export default function Extra() {
  const [activeTab, setActiveTab] = useState("Enterprise");

  const tabContent = {
    Enterprise: {
      title: "Enterprise Time Tracking Software",
      description:
        "Are you in search of a tool that can help you keep track of work time and enhance productivity? Look no further than our Employee Monitoring and Time-Tracking Software designed specifically for enterprises. Our software offers a range of features including Screen Capture Software for visual documentation, Productivity Analytics for performance insights, Application Usage Tracking for efficient resource allocation, Remote Team Management for seamless collaboration, and Staff Monitoring Tools for accountability.",
    },
    Business: {
      title: "Business Productivity Suite",
      description:
        "Our Business Productivity Suite is designed to streamline your operations and enhance team collaboration. With automated reporting, advanced analytics, and integration with multiple platforms, your business can scale efficiently.",
    },
    Agencies: {
      title: "Agency Management Tools",
      description:
        "Manage multiple clients with ease using our agency management tools. From project tracking to automated invoicing, we provide everything your agency needs to stay ahead of the competition.",
    },
    Freelancers: {
      title: "Freelancer Work Optimization",
      description:
        "Track your work hours, manage invoices, and stay organized with our freelancer tools. Optimize your workflow and improve productivity effortlessly.",
    },
  };

  return (
    <div className="bg-white">
      {/* Features Section */}
      <div className="bg-white">
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center py-32 text-center"
          style={{ backgroundImage: `url(${featureIMG.src})` }} // Ensure this path works
        >
          <h2 className="text-xl uppercase text-gray-300 animate-opacity font-bold">
            Features
          </h2>
          <h1 className="text-5xl font-bold mt-2 animate-slideUp text-orange-500">
            Empower Your Team
          </h1>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto py-16 px-6">
          <h3 className="text-lg text-gray-800 font-bold">
            Discover What We Offer
          </h3>
          <h2 className="text-3xl font-bold mt-2 text-orange-500">
            Powerful Features for Maximum Productivity
          </h2>

          {/* Feature List */}
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-400 p-6 rounded-lg text-center transform transition duration-300 hover:scale-105">
              <Image src="/col.jpg" width={50} height={50} alt="Feature Icon" />
              <h3 className="text-xl font-bold mt-4">Seamless Collaboration</h3>
              <p className="font-semibold mt-2">
                Work together in real-time with easy sharing tools.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-500 p-6 rounded-lg text-center transform transition duration-300 hover:scale-105">
              <Image
                src="/auto.png"
                width={50}
                height={50}
                alt="Feature Icon"
              />
              <h3 className="text-xl font-bold mt-4">Task Automation</h3>
              <p className="font-semibold mt-2">
                Automate repetitive tasks and focus on important work.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-400 p-6 rounded-lg text-center transform transition duration-300 hover:scale-105">
              <Image src="/ana.png" width={50} height={50} alt="Feature Icon" />
              <h3 className="text-xl font-bold mt-4">Advanced Analytics</h3>
              <p className="font-semibold mt-2">
                Gain insights into your performance with in-depth reports.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center">
          Simple Tool for Keeping Record of Work Time
        </h2>
        <div className="flex mt-8 border-b rounded">
          {Object.keys(tabContent).map((tab) => (
            <button
              key={tab}
              className={`px-6 py-6 font-medium flex-1 transition ${
                activeTab === tab
                  ? "bg-orange-500 text-white"
                  : "bg-blue-600 text-white"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-8 bg-gray-400 p-6 rounded-lg">
          <h3 className="text-2xl font-bold">{tabContent[activeTab].title}</h3>
          <p className="mt-4 text-black">{tabContent[activeTab].description}</p>
        </div>
      </div>
    </div>
  );
}
