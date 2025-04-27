"use client";
import Image from "next/image";
import HeroImage from "../../../public/pic.jpg";
import Features from "../components/Features/Features";
import Workspace from "../components/Workspace/Workspace";
import Extra from "../components/extra/extra";
import FAQ from "../components/faqSection/faqsection";
export default function Home() {
  return (
    <>
      <section className="relative text-white text-center py-24 lg:py-60 bg-cover bg-center">
        <Image
          src={HeroImage}
          alt="Hero"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 container mx-auto px-6 p-10 rounded-lg">
          <h1 className="text-5xl font-bold">
            Productivity is at the {" "}
            <span className="text-orange-400">Heart Of Every Organization!</span>
          </h1>
          <p className="mt-6 text-lg">
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
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-10">
          <p className="text-lg font-semibold">New to TaskVerse?</p>
          <p className="text-sm">Scroll down to learn more.</p>
          <div className="mt-2 animate-bounce">
            <span className="text-2xl">↓</span>
          </div>
        </div>
      </section>
      <Features />
      <Workspace />
      <Extra />
      <FAQ></FAQ>
    </>
  );
}