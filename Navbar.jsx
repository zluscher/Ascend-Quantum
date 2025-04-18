// src/components/layout/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaLock } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-quantum font-medium' : 'text-gray-700 hover:text-quantum';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-quantum to-primary-dark rounded-lg"></div>
            <span className="font-display font-bold text-xl text-gray-900">Ascend Quantum</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
            <Link to="/research" className={isActive('/research')}>Research</Link>
            <Link to="/careers" className={isActive('/careers')}>Careers</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            <Link to="/ai-model" className={isActive('/ai-model')}>AI Demo</Link>
            
            <Link 
              to="/login" 
              className="bg-quantum hover:bg-quantum-dark text-white py-2 px-4 rounded-lg flex items-center"
            >
              <FaLock className="mr-2" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-quantum focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className={isActive('/')} onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/about" className={isActive('/about')} onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/research" className={isActive('/research')} onClick={() => setIsMenuOpen(false)}>Research</Link>
              <Link to="/careers" className={isActive('/careers')} onClick={() => setIsMenuOpen(false)}>Careers</Link>
              <Link to="/contact" className={isActive('/contact')} onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link to="/ai-model" className={isActive('/ai-model')} onClick={() => setIsMenuOpen(false)}>AI Demo</Link>
              <Link 
                to="/login" 
                className="bg-quantum hover:bg-quantum-dark text-white py-2 px-4 rounded-lg flex items-center w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaLock className="mr-2" />
                <span>Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
