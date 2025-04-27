import Image from "next/image";
import priceImage from "../../../../public/pricing-top-bg.jpg";
export default function PricingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center py-20 text-center" style={{ backgroundImage: `url(${priceImage.src})` }}>
        <h2 className="text-xl uppercase text-gray-300 animate-fadeIn">Pricing & Plans</h2>
        <h1 className="text-5xl font-bold mt-2 animate-slideUp text-orange-500">Move work forward</h1>
      </div>

      {/* Pricing Section */}
      <div className="max-w-5xl mx-auto py-16 px-6">
        <h3 className="text-lg text-gray-400">State-of-the-art</h3>
        <h2 className="text-3xl font-bold mt-2">Plans Available for Every Team</h2>

        {/* Features */}
        <div className="mt-6 space-y-3">
          <p className="flex items-center space-x-2">
            <span className="text-orange-500">✔</span>
            <span>Automatic Task Assignments</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="text-orange-500">✔</span>
            <span>Productivity Tools</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="text-orange-500">✔</span>
            <span>Collaboration Tools</span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className="bg-gray-400 p-6 rounded-lg text-center transform transition duration-300 hover:scale-105">
            <h3 className="text-xl font-bold">Basic</h3>
            <p className="text-4xl font-bold my-2">$0</p>
            <p className="text-gray-800">Free for life</p>
            <p className="mt-2 text-gray-300">Up to 10 Users</p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">Get Started</button>
          </div>

          {/* Free Trial */}
          <div className="bg-gray-200 p-6 rounded-lg text-center transform transition duration-300 hover:scale-105">
            <h3 className="text-xl font-bold">Free Trial</h3>
            <p className="text-4xl font-bold my-2">60</p>
            <p className="text-gray-800">Days</p>
            <p className="mt-2 text-gray-800">Experience premium features for free</p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">Get Started</button>
          </div>

          {/* Business Plan */}
          <div className="bg-gray-200 p-6 rounded-lg text-center transform transition duration-300 hover:scale-105">
            <h3 className="text-xl font-bold">Business</h3>
            <p className="text-4xl font-bold my-2">$5</p>
            <p className="text-gray-400">Per User Per Month</p>
            <p className="mt-2 text-gray-800">With 100 MB Attachment Limit & 5 GB Storage</p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}