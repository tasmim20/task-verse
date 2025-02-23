"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import featureIMG from "../../../../public/subscribeBg.jpg";

export default function Extra() {
  const [activeTab, setActiveTab] = useState("Enterprise");

  const tabContent = {
    Enterprise: {
      title: "Enterprise Time Tracking Software",
      description:
        "Monitor work hours and boost productivity with our enterprise-level employee tracking software. Features include screen capture, productivity analytics, remote team management, and more.",
    },
    Business: {
      title: "Business Productivity Suite",
      description:
        "Streamline operations, enhance collaboration, and integrate with various platforms using our advanced productivity suite.",
    },
    Agencies: {
      title: "Agency Management Tools",
      description:
        "Manage multiple clients seamlessly with project tracking, automated invoicing, and efficient resource allocation tools.",
    },
    Freelancers: {
      title: "Freelancer Work Optimization",
      description:
        "Track work hours, manage invoices, and optimize your workflow to enhance productivity and efficiency.",
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center py-32 text-center text-white shadow-lg"
        style={{ backgroundImage: `url(${featureIMG.src})` }}
      >
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-lg uppercase font-semibold">
          Features
        </motion.h2>
        <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="text-5xl font-bold mt-2 text-orange-500">
          Empower Your Team
        </motion.h1>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Powerful Features for Maximum Productivity</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {[
            { img: "/col.jpg", title: "Seamless Collaboration", desc: "Real-time team collaboration with advanced sharing tools." },
            { img: "/auto.png", title: "Task Automation", desc: "Automate repetitive tasks and focus on high-priority work." },
            { img: "/ana.png", title: "Advanced Analytics", desc: "Gain insights and optimize performance with smart analytics." },
          ].map((feature, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Image src={feature.img} width={60} height={60} alt={feature.title} />
              <h3 className="text-xl font-semibold mt-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">Simple Tool for Keeping Record of Work Time</h2>
        <div className="flex mt-8 border-b rounded overflow-hidden">
          {Object.keys(tabContent).map((tab) => (
            <button
              key={tab}
              className={`px-6 py-4 flex-1 font-medium text-lg transition ${activeTab === tab ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-800"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900">{tabContent[activeTab].title}</h3>
          <p className="mt-4 text-gray-700">{tabContent[activeTab].description}</p>
        </motion.div>
      </div>
    </div>
  );
}
