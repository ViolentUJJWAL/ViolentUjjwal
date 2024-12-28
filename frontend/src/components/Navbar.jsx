import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Settings, PlusSquareIcon, MinusSquareIcon } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const Navbar = () => {
  const { activeTheme, particleIsConnect, changeTheme, changeParticleIsConnect, particleValue, changeParticleValue } = useTheme()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(particleIsConnect);
  const [isValue, setIsValue] = useState(particleValue);
  const [selectedColor, setSelectedColor] = useState(activeTheme);
  const dropdownRef = useRef(null);

  const [hoveredStates, setHoveredStates] = useState({
    home: false,
    about: false,
    experience: false,
    projects: false,
    testimonials: false,
    contact: false,
    settings: false
  });

  const getTextColorStyle = () => {
    return { color: activeTheme }
  }

  // Function to update hover state for a specific link
  const handleHover = (linkId, isHovered) => {
    setHoveredStates(prev => ({
      ...prev,
      [linkId]: isHovered
    }));
  }

  // Get style for individual link based on its hover state
  const getLinkStyle = (linkId) => {
    return {
      color: hoveredStates[linkId] ? activeTheme : 'black',
      borderBottom: hoveredStates[linkId] ? `2px solid ${activeTheme}` : '',
      transition: 'border 0.3s ease'
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const colors = [
    { label: 'Cyan', value: "#06b6d4", bg: 'bg-cyan-500' },
    { label: 'Purple', value: '#a855f7', bg: 'bg-purple-500' },
    { label: 'Green', value: '#22c55e', bg: 'bg-green-500' },
    { label: 'Red', value: '#ef4444', bg: 'bg-red-500' },
    { label: 'Yellow', value: '#eab308', bg: 'bg-yellow-500' }
  ];

  const SettingsPanel = ({ isMobile }) => (
    <div className={`${isMobile ? 'p-4' : 'absolute right-0 mt-2 w-64'} bg-white rounded-lg shadow-lg border border-gray-200 py-2`}>
      <div className="px-4 py-2 text-sm font-semibold border-b">
        Settings
      </div>

      <div className="p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Theme Color
        </label>
        <div className="grid grid-cols-6 gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => {
                setSelectedColor(color.value);
                changeTheme(color.value);
              }}
              className={`w-8 h-8 rounded-full ${color.bg} cursor-pointer 
                transition-transform hover:scale-110 relative
                ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
              title={color.label}
            >
              {selectedColor === color.value && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </span>
              )}
            </button>
          ))}
          <div>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.target.value);
                changeTheme(e.target.value);
              }}
              className="w-8 h-8 rounded-full border-0 bg-gradient-to-r from-pink-500 to-blue-500"
            />
          </div>
        </div>

        <h3 className='mt-4 mb-2 text-sm font-medium'>Particle Background</h3>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Particles Connect
          </label>
          <label
            className="relative inline-block h-6 w-[48px] cursor-pointer rounded-full bg-gray-900 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-[#1976D2]"
          >
            <input type="checkbox" id="AcceptConditions" className="peer sr-only"
              checked={isConnected}
              onChange={(e) => {
                setIsConnected(e.target.checked);
                changeParticleIsConnect(e.target.checked);
              }}
            />
            <span
              className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-gray-300 ring-[5px] ring-inset ring-white transition-all peer-checked:start-7 bg-gray-900 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"
            ></span>
          </label>
        </div>

        <div className="mt-4 w-full flex items-center justify-between">
          <label className="w-1/2 text-sm font-medium text-gray-700">
            Particles Value
          </label>
          <label className="w-1/2 items-end cursor-pointer flex space-x-4">
            <PlusSquareIcon className={isValue >= 500 ? "text-gray-200" : ""} onClick={() => {
              if (isValue < 500) {
                const value = 10 + isValue;
                setIsValue(value)
                changeParticleValue(value)
              }
            }} />
            <p>
              {isValue}
            </p>
            <MinusSquareIcon className={isValue <= 50 ? "text-gray-200" : ""} onClick={() => {
              if (isValue > 50) {
                const value = isValue - 10;
                setIsValue(value)
                changeParticleValue(value)
              }
            }}
            />
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background backdrop-blur-2xl supports-[backdrop-filter]:bg-background px-4 lg:px-0'>
      <div className='max-w-7xl mx-auto flex h-14 items-center'>
        <div className='md:mr-4 flex justify-between w-full'>
          <a href="#" className='mr-6 flex items-center font-bold text-3xl space-x-2'
            style={{
              fontFamily: '"Caveat", serif'
            }}
          >
            <img src="logo.png" className='h-8' />
            <span style={getTextColorStyle()}>Violent </span>UJJWAL
          </a>
          <nav className='md:flex hidden items-center space-x-6 text-lg font-medium'>
            <a
              href="#home"
              style={getLinkStyle('home')}
              onMouseEnter={() => handleHover('home', true)}
              onMouseLeave={() => handleHover('home', false)}
              className='transition-colors hover:font-bold'
            >
              Home
            </a>
            <a
              href="#about"
              style={getLinkStyle('about')}
              onMouseEnter={() => handleHover('about', true)}
              onMouseLeave={() => handleHover('about', false)}
              className='transition-colors hover:font-bold'
            >
              About
            </a>
            <a
              href="#experience"
              style={getLinkStyle('experience')}
              onMouseEnter={() => handleHover('experience', true)}
              onMouseLeave={() => handleHover('experience', false)}
              className='transition-colors hover:font-bold'
            >
              Experience
            </a>
            <a
              href="#projects"
              style={getLinkStyle('projects')}
              onMouseEnter={() => handleHover('projects', true)}
              onMouseLeave={() => handleHover('projects', false)}
              className='transition-colors hover:font-bold'
            >
              Projects
            </a>
            <a
              href="#testimonials"
              style={getLinkStyle('testimonials')}
              onMouseEnter={() => handleHover('testimonials', true)}
              onMouseLeave={() => handleHover('testimonials', false)}
              className='transition-colors hover:font-bold'
            >
              Testimonials
            </a>
            <a
              href="#contact"
              style={getLinkStyle('contact')}
              onMouseEnter={() => handleHover('contact', true)}
              onMouseLeave={() => handleHover('contact', false)}
              className='transition-colors hover:font-bold'
            >
              Contact
            </a>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Settings
                  className="w-5 h-5 text-foreground/60"
                  style={{
                    color: hoveredStates.settings ? activeTheme : 'rgb(115 115 115)',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={() => handleHover('settings', true)}
                  onMouseLeave={() => handleHover('settings', false)}
                />
              </button>

              {settingsOpen && <SettingsPanel isMobile={false} />}
            </div>
          </nav>
        </div>
        <button
          className='inline-flex items-center justify-center rounded-md md:hidden'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className='sr-only'>Open main menu</span>
          {mobileMenuOpen ? (
            <X className='h-6 w-6' aria-hidden="true" />
          ) : (
            <Menu className='h-6 w-6' aria-hidden="true" />
          )}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className='md:hidden'>
          <div className='space-y-1 px-2 pb-3 pt-2'>
            <a
              href="#about"
              style={getLinkStyle('about')}
              onMouseEnter={() => handleHover('about', true)}
              onMouseLeave={() => handleHover('about', false)}
              className='block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-50'
            >
              About
            </a>
            <a
              href="#projects"
              style={getLinkStyle('projects')}
              onMouseEnter={() => handleHover('projects', true)}
              onMouseLeave={() => handleHover('projects', false)}
              className='block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-50'
            >
              Projects
            </a>
            <a
              href="#testimonials"
              style={getLinkStyle('testimonials')}
              onMouseEnter={() => handleHover('testimonials', true)}
              onMouseLeave={() => handleHover('testimonials', false)}
              className='block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-50'
            >
              Testimonials
            </a>
            <a
              href="#contact"
              style={getLinkStyle('contact')}
              onMouseEnter={() => handleHover('contact', true)}
              onMouseLeave={() => handleHover('contact', false)}
              className='block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-50'
            >
              Contact
            </a>

            <SettingsPanel isMobile={true} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;