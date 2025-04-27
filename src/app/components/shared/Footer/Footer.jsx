import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-10">
      <div className="container mx-auto grid md:grid-cols-3 gap-6">
        {/* Branding with Logo */}
        <div>
          <Image 
            src="/logo2.svg" 
            alt="TaskVerse company logo" 
            width={150} 
            height={50} 
            priority
          />
          <p className="mt-2 text-sm">
            TaskVerse is a simple productivity environment for task management, built for teams and individuals.
          </p>
        </div>

        {/* Quick Links */}
        <div className="ms-8">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/features" passHref>
                <span className="hover:text-orange-400">Features</span>
              </Link>
            </li>
            <li>
              <Link href="/pricing" passHref>
                <span className="hover:text-orange-400">Pricing</span>
              </Link>
            </li>
            <li>
              <Link href="/blog" passHref>
                <span className="hover:text-orange-400">Blog</span>
              </Link>
            </li>
            <li>
              <Link href="/support" passHref>
                <span className="hover:text-orange-400">Support</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="mt-2 space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">
              LinkedIn
            </a>
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
