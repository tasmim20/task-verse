import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100 text-center">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.h3 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-orange-500 text-lg font-semibold uppercase tracking-wide"
        >
          About
        </motion.h3>
        
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-extrabold text-gray-900 mt-2 leading-tight"
        >
          The Ultimate Solution <br /> for Every Team
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12 mt-16">
          {/* Features */}
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Image src={feature.image} alt={feature.title} width={64} height={64} className="mt-4" />
              <hr className="w-12 border-t-2 border-orange-400 my-4" />
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          className="mt-12" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a href="/about" className="inline-block bg-orange-500 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300">
            Explore More →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const features = [
  {
    title: "Maximize Your Productivity",
    description: "TaskQue will automatically assign tasks based on workload, preventing team members from being overwhelmed.",
    image: "/1.jpg",
  },
  {
    title: "Collaboration Made Easy",
    description: "Enhance team communication with comments and discussion modules for better collaboration.",
    image: "/1.jpg",
  },
  {
    title: "Monitor & Optimize Performance",
    description: "Gain insights through intelligent reports and analytics to improve business efficiency.",
    image: "/1.jpg",
  },
];

export default Features;
