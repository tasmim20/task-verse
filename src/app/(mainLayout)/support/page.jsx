"use client";
import { useState } from "react";
import featureIMG from "../../../../public/subscribeBg.jpg";
export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center py-32 text-center"
        style={{ backgroundImage: `url(${featureIMG.src})` }}
      >
        <h2 className="text-xl uppercase text-gray-300 animate-fadeIn font-bold">
        Support
        </h2>
        <h1 className="text-5xl font-bold mt-2 animate-slideUp text-orange-500">
        Need help? We are here for you!
        </h1>
      </div>
      <div className="bg-white text-black max-w-4xl mx-auto py-12 px-6">
        {/* Hero Section */}
      

        {/* FAQ Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold">How do I reset my password?</h3>
              <p className="text-gray-600">
                Go to settings and click on Reset Password. Follow the
                instructions.
              </p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold">How do I contact support?</h3>
              <p className="text-gray-600">
                Use the contact form below or email us at support@example.com.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          {submitted ? (
            <p className="text-green-600">
              Thank you for reaching out! Well get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
