import Image from "next/image";
import React from "react";

const Features = () => {
  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto px-6">
        <h3 className="text-orange-500 text-lg font-semibold">About</h3>
        <h2 className="text-4xl font-bold text-gray-900 mt-2">
          The ultimate solution <br /> for every team
        </h2>

        <div className="grid md:grid-cols-3 gap-12 mt-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <Image src="/1.jpg" alt="Professional" width={48} height={48} className="mt-6" />
            <hr className="w-12 border-t-2 border-gray-300 my-4" />
            <h3 className="text-xl font-semibold text-gray-900">Maximize Your Productivity</h3>
            <p className="text-gray-600 mt-2">
              TaskQue will automatically assign tasks based on workload, preventing team members from being overwhelmed.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <Image src="/1.jpg" alt="Collaboration" width={48} height={48} className="mt-6" />
            <hr className="w-12 border-t-2 border-gray-300 my-4" />
            <h3 className="text-xl font-semibold text-gray-900">Collaboration Made Easy</h3>
            <p className="text-gray-600 mt-2">
              Enhance team communication with comments and discussion modules for better collaboration.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <Image src="/1.jpg" alt="Performance" width={48} height={48} className="mt-6" />
            <hr className="w-12 border-t-2 border-gray-300 my-4" />
            <h3 className="text-xl font-semibold text-gray-900">Monitor & Optimize Performance</h3>
            <p className="text-gray-600 mt-2">
              Gain insights through intelligent reports and analytics to improve business efficiency.
            </p>
          </div>
        </div>

        <div className="mt-8 text-right">
          <a href="/about" className="text-orange-500 font-semibold text-lg hover:underline">
            Explore more about TaskVerse →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
