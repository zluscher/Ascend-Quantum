// src/pages/HomePage.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBrain, FaMicrochip, FaChartLine } from 'react-icons/fa';

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Log visit to backend (would connect to your FastAPI server)
  const logVisit = async () => {
    try {
      await fetch('https://your-backend-url.com/log/visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: 'home',
          timestamp: new Date().toISOString(),
          referrer: document.referrer,
          userAgent: navigator.userAgent,
        }),
      });
    } catch (error) {
      // Silently fail to not alert visitors
      console.error('Logging error:', error);
    }
  };

  // Call the logging function when component mounts
  useState(() => {
    logVisit();
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-quantum-dark via-quantum to-primary-light text-white">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Next-Gen Quantum LLM Alignment & <br />
              Real-Time Economic Modeling
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Pioneering the intersection of quantum computing, language models, and financial systems
              for unprecedented market intelligence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/careers"
                  className="bg-white text-quantum-dark font-bold py-3 px-8 rounded-lg inline-flex items-center"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="mr-2">We're Hiring</span>
                  <FaArrowRight className={`transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/resources"
                  className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg"
                >
                  Explore Our Research
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Research Areas */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-center mb-16">Research Domains</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* LLM Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-quantum-dark mb-4 text-4xl">
                <FaBrain />
              </div>
              <h3 className="text-2xl font-bold mb-4">Quantum LLM Architecture</h3>
              <p className="text-gray-600 mb-6">
                Developing post-classical language models optimized for quantum hardware 
                with unprecedented reasoning capabilities.
              </p>
              <Link to="/research#llm" className="text-quantum inline-flex items-center font-medium">
                Learn more <FaArrowRight className="ml-2" />
              </Link>
            </div>
            
            {/* Firmware Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-quantum-dark mb-4 text-4xl">
                <FaMicrochip />
              </div>
              <h3 className="text-2xl font-bold mb-4">Embedded Firmware Systems</h3>
              <p className="text-gray-600 mb-6">
                Creating quantum-resistant firmware solutions for next-generation computational infrastructure.
              </p>
              <Link to="/research#firmware" className="text-quantum inline-flex items-center font-medium">
                Learn more <FaArrowRight className="ml-2" />
              </Link>
            </div>
            
            {/* Market Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-quantum-dark mb-4 text-4xl">
                <FaChartLine />
              </div>
              <h3 className="text-2xl font-bold mb-4">Volatile Market Analysis</h3>
              <p className="text-gray-600 mb-6">
                Quantum-powered real-time economic modeling for unprecedented market intelligence and forecasting.
              </p>
              <Link to="/research#markets" className="text-quantum inline-flex items-center font-medium">
                Learn more <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup / Honeypot */}
      <section className="py-16 bg-gradient-to-r from-primary-dark to-quantum-dark text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Research Network</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Stay updated with our latest breakthroughs and exclusive access to pre-release research papers.
          </p>
          
          <form className="max-w-md mx-auto" onSubmit={(e) => {
            e.preventDefault();
            // Log the email to your backend
            const email = e.target.email.value;
            console.log("Email captured:", email);
            // Here you would send this to your logging endpoint
          }}>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg text-gray-900"
                required
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary-dark px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Subscribe
              </button>
            </div>
            {/* Hidden honeypot field */}
            <input type="text" name="company_position" className="opacity-0 absolute -z-10 h-0" tabIndex="-1" />
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
