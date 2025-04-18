// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaGithub, FaMedium, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Honeypot click tracking
  const trackFooterLink = (linkName) => {
    try {
      fetch('https://your-backend-url.com/log/click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          element: `footer-${linkName}`,
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
          userAgent: navigator.userAgent,
        }),
      });
    } catch (error) {
      // Silently fail
      console.error('Logging error:', error);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and mission */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-quantum to-primary-dark rounded-lg"></div>
              <span className="font-display font-bold text-xl">Ascend Quantum</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Pioneering the intersection of quantum computing, language models, and financial systems
              for unprecedented market intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/ascendquantum" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-quantum"
                onClick={() => trackFooterLink('twitter')}
              >
                <FaTwitter size={20} />
              </a>
              <a href="https://linkedin.com/company/ascendquantum" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-quantum"
                onClick={() => trackFooterLink('linkedin')}
              >
                <FaLinkedin size={20} />
              </a>
              <a href="https://github.com/ascendquantum" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-quantum"
                onClick={() => trackFooterLink('github')}
              >
                <FaGithub size={20} />
              </a>
              <a href="https://medium.com/@ascendquantum" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-quantum"
                onClick={() => trackFooterLink('medium')}
              >
                <FaMedium size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-quantum"
                  onClick={() => trackFooterLink('about')}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  className="text-gray-400 hover:text-quantum"
                  onClick={() => trackFooterLink('careers')}
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-quantum"
                  onClick={() => trackFooterLink('contact')}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/press" 
                  className="text-gray-400 hover:text-quantum"
                  onClick={() => trackFooterLink('press')}
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Research */}
          <div>
            <h3 className="font-bold text-lg mb-4">Research</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/research#llm" 
                  className="text-gray-400 hover:text-quantum"
                  onClick={() => trackFooterLink('research-llm')}
                >
                  Quantum LLM Architecture
                </Link>
              </li>
              <li>
                <Link 
                  to="/research#firmware" 
                  className="text-gray-400 hover:text-quantum"
                  onClick={() => trackFooterLink('research-firmware')}
                >
                  Embedded Firmware Systems
                </Link>
              </li>
              <li>
                <Link 
                  to="/research#markets" 
                  className="text-gray-400 hover:text-quantum"
                  onClick={() => trackFooterLink('research-markets')}
                >
                  Volatile Market Analysis
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources" 
                  className="text-gray-400 hover:text-quantum"
                  onClick={() => trackFooterLink('resources')}
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-gray-400 hover:text-quantum"
                  onClick={() => trackFooterLink('privacy')}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-400 hover:text-quantum"
                  onClick={() => trackFooterLink('terms')}
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link 
                  to="/cookie-policy" 
                  className="text-gray-400 hover:text-quantum"
                  onClick={() => trackFooterLink('cookies')}
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/security" 
                  className="text-gray-400 hover:text-quantum"
                  onClick={() => trackFooterLink('security')}
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Ascend Quantum Research Initiative. All rights reserved.
          </p>
          <div className="flex items-center">
            <a 
              href="mailto:info@ascendquantum.com" 
              className="flex items-center text-gray-400 hover:text-quantum"
              onClick={() => trackFooterLink('email')}
            >
              <FaEnvelope className="mr-2" />
              <span>info@ascendquantum.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
