import { Link } from 'react-router-dom';
import { Film, Twitter, Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-gold mb-4">
              <Film size={24} />
              <span className="text-xl font-heading font-bold">FlickTales</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Exploring the art of cinema through thoughtful reviews and analysis.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                aria-label="Twitter"
                className="text-gray-400 hover:text-gold transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                aria-label="Instagram"
                className="text-gray-400 hover:text-gold transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                aria-label="Facebook"
                className="text-gray-400 hover:text-gold transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-400 hover:text-gold transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog?category=classics" className="text-gray-400 hover:text-gold transition-colors">
                  Film Classics
                </Link>
              </li>
              <li>
                <Link to="/blog?category=indie" className="text-gray-400 hover:text-gold transition-colors">
                  Independent Cinema
                </Link>
              </li>
              <li>
                <Link to="/blog?category=directors" className="text-gray-400 hover:text-gold transition-colors">
                  Director Spotlights
                </Link>
              </li>
              <li>
                <Link to="/blog?category=analysis" className="text-gray-400 hover:text-gold transition-colors">
                  Film Analysis
                </Link>
              </li>
              <li>
                <Link to="/blog?category=news" className="text-gray-400 hover:text-gold transition-colors">
                  Cinema News
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest cinema insights.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow px-4 py-2 text-gray-900 bg-gray-100 rounded-l-md focus:outline-none"
                aria-label="Email address for newsletter"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors rounded-r-md"
                aria-label="Subscribe to newsletter"
              >
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} FlickTales. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;