import Image from "next/image";
import HeroImage from "../../../public/pic.jpg"; 

export default function Home() {
  return (
    <>
      {/* Hero Section with Background Image */}
      <section
        className="relative text-white text-center py-24 lg:py-60 bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroImage.src})` }} // Use the imported image
      >
        <div className="container mx-auto px-6 p-10 rounded-lg">
          <h1 className="text-4xl font-bold">
            Productivity is at the{" "}
            <span className="text-orange-400">
              Heart Of Every Organization!
            </span>
          </h1>
          <p className="mt-4 text-lg">
            Enhancing your organization’s productivity is our priority.
          </p>
          <div className="mt-6 flex justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-l-lg w-64 text-black"
            />
            <button className="bg-orange-500 px-6 py-2 rounded-r-lg hover:bg-orange-600">
              Get Started For Free
            </button>
          </div>
        </div>

        {/* New to TaskVerse Section */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-lg font-semibold">New to TaskVerse?</p>
          <p className="text-sm ">Scroll down to learn more.</p>
          <div className="mt-2 animate-bounce">
            <span className="text-2xl">↓</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold">
            The ultimate solution for every team
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Maximize Productivity</h3>
              <p className="mt-2">Auto-assign tasks and enhance efficiency.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Collaboration Made Easy</h3>
              <p className="mt-2">Seamless task management for your team.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Monitor & Optimize</h3>
              <p className="mt-2">Track progress and improve workflow.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
