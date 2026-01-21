import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';

interface NavbarProps {
  onExpertiseClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onExpertiseClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, label: string, href: string) => {
    if (label === 'Expertise' && onExpertiseClick) {
      e.preventDefault();
      onExpertiseClick();
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bayl-black/95 backdrop-blur-sm py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
        <a href="#" className="relative z-50" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
          <Logo variant="light" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.label, link.href)}
              className="text-[11px] font-bold text-gray-300 hover:text-white uppercase tracking-[0.25em] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={onExpertiseClick}
            className="text-[11px] font-bold text-black bg-white px-6 py-2 uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors"
          >
            Partner
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white relative z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-bayl-black flex flex-col items-center justify-center gap-10 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.label, link.href)}
              className="text-3xl font-serif italic text-white hover:text-gray-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={onExpertiseClick}
            className="px-10 py-5 bg-white text-black font-bold uppercase tracking-[0.4em] text-[11px]"
          >
            Initiate Project
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;