import Link from "next/link";
import Image from "next/image"; 
import logo from "../../../../../public/logo2.svg"; 

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-10 ">
      <div className="container mx-auto grid md:grid-cols-3 gap-6">
        {/* Branding with Logo */}
        <div>
          <Image 
            src={logo} 
            alt="TaskQue Logo" 
            width={150} // Adjust width as needed
            height={50} // Adjust height as needed
          />
          <p className="mt-2 text-sm">
            TaskVerse is a simple productivity environment for task management, built for teams and individuals.
          </p>
        </div>

        {/* Quick Links */}
        <div className="ms-8">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link href="/features" className="hover:text-orange-400">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-orange-400">Pricing</Link></li>
            <li><Link href="/blog" className="hover:text-orange-400">Blog</Link></li>
            <li><Link href="/support" className="hover:text-orange-400">Support</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-orange-400">Facebook</a>
            <a href="#" className="hover:text-orange-400">Twitter</a>
            <a href="#" className="hover:text-orange-400">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 text-sm opacity-70">
        © {new Date().getFullYear()} TaskVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
