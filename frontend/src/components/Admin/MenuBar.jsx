import React, { useState } from 'react';
import { Eye, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const MenuBar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full h-16 fixed top-0 z-50 flex justify-center">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-0 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md text-white z-50"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Items */}
      <ul className={`
        ${isMenuOpen ? 'flex' : 'hidden'} 
        md:inline-flex
        flex-col
        md:flex-row
        md:top-auto
        items-center
        px-2
        py-4
        md:py-0
        mt-4
        md:mt-4
        rounded-3xl
        bg-black/40
        backdrop-blur-md
        z-40
        md:z-auto
        ${isMenuOpen ? 'min-h-screen md:min-h-0' : ''}
      `}>
        <Link to="http://localhost:5173/" target='__blank'>
          <li
            className="relative px-4 py-3 mx-2 text-white font-bold cursor-pointer 
                       whitespace-nowrap hover:text-black group w-full md:w-auto 
                       text-center transition-colors duration-200"
          >
            <span className="relative z-10 flex">
              Preview <Eye className='ml-2' />
            </span>
            <div className="absolute inset-0 scale-0 rounded-3xl transition-transform 
                          duration-200 bg-gradient-to-b from-gray-200 to-gray-300 
                          group-hover:scale-110 -z-10 group-hover:shadow-lg" />
          </li>
        </Link>
        <li
          className="relative px-4 py-3 mx-2 text-white font-bold cursor-pointer 
                       whitespace-nowrap hover:text-black group w-full md:w-auto 
                       text-center transition-colors duration-200"
          onClick={() => {
            setIsMenuOpen(false)
            logout()
            navigate("/admin-login")
          }}
        >
          <span className="relative z-10 flex">
            LogOut <LogOut className='ml-2' />
          </span>
          <div className="absolute inset-0 scale-0 rounded-3xl transition-transform 
                          duration-200 bg-gradient-to-b from-gray-200 to-gray-300 
                          group-hover:scale-110 -z-10 group-hover:shadow-lg" />
        </li>
      </ul>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default MenuBar;