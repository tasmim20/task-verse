"use client";
import { useState } from "react";
import Image from "next/image";

const categories = [
  "All",
  "Customer data",
  "Customer experience",
  "Loyalty programs",
  "Digital Product Passport",
  "Product updates",
];

const blogs = [
  {
    category: "Customer data",
    title: "Help me collect my customer data!",
    description:
      "Learn how to collect valuable insights on your customers to sell even more.",
    image: "/blog-image-1.jpg",
  },
  {
    category: "Customer experience",
    title: "Layerise Takes Part in Danish Standards Committee on...",
    description:
      "Layerise is proud to announce our participation in the Danish Standards...",
    image: "/blog-image-2.jpg",
  },
  {
    category: "Product updates",
    title: "Layerise Joins CIRPASS-2: Advancing the Future of...",
    description:
      "Layerise is thrilled to announce our active participation in the CIRPASS-2...",
    image: "/blog-image-3.png",
  },
  {
    category: "Loyalty programs",
    title: "Layerise Joins CIRPASS-2: Advancing the Future of...",
    description:
      "Layerise is thrilled to announce our active participation in the CIRPASS-2...",
    image: "/blog-image-2.jpg",
  },
  {
    category: "Digital Product Passport",
    title: "Layerise Joins CIRPASS-2: Advancing the Future of...",
    description:
      "Layerise is thrilled to announce our active participation in the CIRPASS-2...",
    image: "/blog-image-3.png",
  },
  {
    category: "Customer experience",
    title: "Layerise Joins CIRPASS-2: Advancing the Future of...",
    description:
      "Layerise is thrilled to announce our active participation in the CIRPASS-2...",
    image: "/blog-image-1.jpg",
  },
  {
    category: "Product updates",
    title: "Layerise Joins CIRPASS-2: Advancing the Future of...",
    description:
      "Layerise is thrilled to announce our active participation in the CIRPASS-2...",
    image: "/blog-image-2.jpg",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[300px] flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center">
        <h1 className="text-6xl font-extrabold">Welcome to Our Blog</h1>
      </div>

      {/* Blog Section */}
      <div className="bg-white text-black max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-5xl font-bold">Blog</h1>
        <div className="flex space-x-4 mt-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg transition font-semibold whitespace-nowrap ${
                activeCategory === category
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {filteredBlogs.map((blog, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={500}
                height={300}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-xl font-bold mt-4">{blog.title}</h3>
              <p className="text-gray-600 mt-2">{blog.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}