import React, { useEffect, useState } from 'react';
import hero from '../assets/Hero.png';
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaSquareWhatsapp } from "react-icons/fa6";
import reactLogo from '../assets/React.png';
import reduxLogo from '../assets/Redux.png';
import tailwind from '../assets/Tailwind Css.png';
import { useTheme } from '../Context/ThemeContext';
import { useUser } from '../Context/UserContext';
import { X } from 'lucide-react';

const Hero = () => {
  const { activeTheme } = useTheme();
  const { userData } = useUser();
  const [user, setUser] = useState(userData?.user);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getTextColorStyle = () => ({ color: activeTheme });

  const socialContainerStyle = {
    backgroundColor: isHovered ? activeTheme : '#e5e7eb',
    transition: 'all 0.3s ease',
  };

  const iconStyle = {
    color: isHovered ? 'white' : activeTheme,
    transition: 'color 0.3s ease'
  };

  const Modal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 relative">
          <button
            onClick={() => setShowModal(false)}
            className='absolute right-4 top-4'
          >
            <X />
          </button>
          <h2 className="text-xl font-bold mb-4">Send Message By</h2>
          <div>
            <div className='flex gap-16 justify-center'>
              <a href={`mailto:${user?.email}?body=${encodeURIComponent("Hello, Ujjwal Kumar\n")}`} target='__blank'>
                <div
                  className="overflow-x-visible relative w-20 h-20 overflow-y-clip group text-center"
                >
                  <MdEmail className="flex justify-center items-center w-20 h-20 rounded-full transition-all duration-300 absolute top-0 group-hover:scale-[.60] group-hover:origin-top text-black" style={{ color: activeTheme }} />
                  <div
                    className="absolute font-bold -bottom-5 left-1/2 text-sm text-center text-black whitespace-nowrap transition-all duration-100 transform -translate-x-1/2 group-hover:bottom-0"
                  >
                    Email
                  </div>
                </div>
              </a>
              <a href={`https://wa.me/${user?.phoneNumaber}?text=${encodeURIComponent("Hello, Ujjwal Kumar\n")}`} target='__blank'>
                <div
                  className="overflow-x-visible relative w-20 h-20 overflow-y-clip group text-center"
                >
                  <FaWhatsapp className="flex justify-center items-center w-20 h-20 transition-all duration-300 absolute top-0 group-hover:scale-[.60] group-hover:origin-top text-black" style={{ color: activeTheme }} />
                  <div
                    className="absolute font-bold -bottom-5 left-1/2 text-sm text-center text-black whitespace-nowrap transition-all duration-100 transform -translate-x-1/2 group-hover:bottom-0"
                  >
                    What'sApp
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div >
    );
  };

  // Existing MorphingText component
  const MorphingText = () => {
    const [currentText, setCurrentText] = useState('Hi There');
    const [isAnimating, setIsAnimating] = useState(false);
    const greetings = ['Hi There', 'Hello', 'Welcome', 'Namaste'];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length);
          setCurrentText(greetings[currentIndex]);
          setIsAnimating(false);
        }, 500);
      }, 2000);

      return () => clearInterval(interval);
    }, [currentIndex]);

    return (
      <span className={`font-mono inline-block ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-all duration-500 ease-in-out`}>
        {currentText},
      </span>
    );
  };

  // Existing TypingText component
  const TypingText = () => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const texts = user?.roles || [];
    const [arrayIndex, setArrayIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      const text = texts[arrayIndex];

      const timeout = setTimeout(() => {
        if (!isDeleting) {
          if (currentIndex <= text?.length) {
            setCurrentText(text?.slice(0, currentIndex));
            setCurrentIndex(prev => prev + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (currentIndex > 0) {
            setCurrentText(text?.slice(0, currentIndex));
            setCurrentIndex(prev => prev - 1);
          } else {
            setIsDeleting(false);
            setArrayIndex((prev) => (prev + 1) % texts?.length);
          }
        }
      }, isDeleting ? 50 : 100);

      return () => clearTimeout(timeout);
    }, [currentIndex, arrayIndex, isDeleting]);

    return (
      <p className="md:text-2xl text-xl mb-4 font-mono">
        {currentText}
        <span className="animate-pulse">|</span>
      </p>
    );
  };

  return (
    <section className='relative' id="home">
      <Modal />
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row items-center lg:h-[90vh] justify-between'>
          <div className='md:w-1/2 mb-8 md:mb-0 flex flex-col space-y-4 px-6 lg:px-0 lg:mt-0 mt-10'>
            <h1 className='lg:text-7xl text-4xl font-bold lg:leading-snug'><MorphingText /> <br />I'm <span style={getTextColorStyle()}>{user?.name}</span></h1>
            <p className='md:text-2xl text-xl mb-4'><TypingText /></p>
            <p className='mb-4'>{user?.description1}</p>
            <div className='flex'>
              <button className='bg-black text-white mr-3 px-3 py-2 w-max rounded-md'>
                <a href={user?.resume} download target='_blank'>Download CV</a>
              </button>
              <button
                className="text-white mx-3 px-3 py-2 w-max rounded-md"
                style={{ background: activeTheme }}
                onClick={() => setShowModal(true)}
              >
                Hire Me
              </button>
            </div>
          </div>
          <div className='md:w-1/2 relative flex justify-center items-end'>
            <img src={hero} alt="" className='lg:h-[90vh] h-96 z-10' />
            <img src={reactLogo} alt="" className='absolute w-10 top-36 left-8 rounded-full' />
            <img src={reduxLogo} alt="" className='absolute w-10 top-8 right-5' />
            <img src={tailwind} alt="" className='absolute w-10 rounded-full right-8 bottom-36' />
          </div>
        </div>
      </div>
      <div
        className='absolute bottom-4 right-52 md:flex gap-6 rounded-full p-4 z-20'
        style={socialContainerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="cursor-pointer" style={iconStyle}>
          <a href={user?.githubLink} target='__blank'>
            <FaGithub className="w-12 h-12" />
          </a>
        </div>
        <div className="cursor-pointer" style={iconStyle}>
          <a href={user?.linkedinLink} target='__blank'>
            <FaLinkedin className="w-12 h-12" />
          </a>
        </div>
        <div className="cursor-pointer" style={iconStyle}>
          <a href={`mailto:${user?.email}`} target='__blank'>
            <MdEmail className="w-12 h-12" />
          </a>
        </div>
        <div className="cursor-pointer" style={iconStyle}>
          <a href={`https://wa.me/${user?.phoneNumaber}`} target='__blank'>
            <FaSquareWhatsapp className="w-12 h-12" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;