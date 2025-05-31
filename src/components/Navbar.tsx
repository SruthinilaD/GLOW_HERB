import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Leaf } from 'lucide-react';
import { NavLink } from '../types';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemCount } = useCart();
  const location = useLocation();

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Products', href: '/#products' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = href;
    } else {
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center" onClick={() => handleNavClick('/')}>
            <Leaf className="h-8 w-8 text-green-700" />
            <span className={`ml-2 text-2xl font-semibold ${
              isScrolled || location.pathname !== '/' ? 'text-green-800' : 'text-white'
            }`}>Glow Herb</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`${
                  isScrolled || location.pathname !== '/' ? 'text-green-800' : 'text-white'
                } hover:text-green-600 transition-colors duration-200 font-medium`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative cursor-pointer">
              <ShoppingBag className={`h-6 w-6 ${
                isScrolled || location.pathname !== '/' ? 'text-green-800' : 'text-white'
              }`} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden focus:outline-none"
            >
              {isMenuOpen ? (
                <X className={`h-6 w-6 ${
                  isScrolled || location.pathname !== '/' ? 'text-green-800' : 'text-white'
                }`} />
              ) : (
                <Menu className={`h-6 w-6 ${
                  isScrolled || location.pathname !== '/' ? 'text-green-800' : 'text-white'
                }`} />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 bg-white rounded-lg shadow-lg">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-4 py-2 text-green-800 hover:bg-green-50"
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;