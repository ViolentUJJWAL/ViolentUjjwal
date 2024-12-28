import React, { useState } from 'react';
import { useTheme } from '../Context/ThemeContext';
import Lottie from 'lottie-react';
import contact from '../assets/Contact.json';
import { contactServices } from '../services/contactusServices';
import { MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { useUser } from '../Context/UserContext';

const Contact = () => {
  const { activeTheme } = useTheme();
  const { userData } = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""

  })

  const handleContactus = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await contactServices.addContact(formData)
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <section id='contact' className='bg-gray-800 relative px-5 md:px-0 pt-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='md:w-1/2 mb-8 ml-2 md:mb-0'>
            <h2 className='text-3xl font-bold mb-3' style={{ color: activeTheme }}>Get in Touch</h2>
            <p className='mb-2 text-white/85'>I'm always open to new opportunities and collaboration. Feel free to reach out!</p>
            <div className='flex flex-col'>
              <a href={`mailto:${userData?.user?.email}`} target='__blank' className='flex space-x-2 hover:underline cursor-pointer' style={{ color: activeTheme }}>
                <MdEmail className='h-6 w-6'/>
                <p>{userData?.user?.email}</p>
              </a>
              <a href={`https://wa.me/${userData?.user?.phoneNumaber}`} target='__blank' className='flex space-x-2 hover:underline cursor-pointer' style={{ color: activeTheme }}>
                <FaWhatsapp className='h-6 w-6' />
                <p>{userData?.user?.phoneNumaber}</p>
              </a>
            </div>
            <Lottie animationData={contact} className='w-[350px] mx-auto lg:w-[500px]' />
          </div>

          <form className='w-full md:w-1/2 bg-gray-100 rounded-lg border shadow-lg p-10'
            style={{ borderColor: activeTheme, boxShadow: `0 10px 15px -3px ${activeTheme}20` }}
            onSubmit={handleContactus}
          >
            <h1 className='text-gray-900 text-4xl font-bold mb-7'>Contact Me</h1>
            <div className='mb-4'>
              <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Name</label>
              <input type="text" id='name'
                placeholder='Full Name'
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50'
                style={{ '--tw-ring-color': activeTheme }}
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
              <input type="email" id='email' placeholder='Email'
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50'
                style={{ '--tw-ring-color': activeTheme }}
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="message" className='block text-sm font-medium text-gray-700'>Message</label>
              <textarea id='message' placeholder='Enter Your Message'
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50'
                style={{ '--tw-ring-color': activeTheme }}
                required
                minLength={20}
              />
            </div>
            <div className='flex justify-center'>
              <button
                disabled={loading}
                className='px-3 py-2 border-2 rounded-lg text-white transition-colors'
                style={{
                  backgroundColor: activeTheme,
                  borderColor: activeTheme,
                  ':hover': {
                    backgroundColor: 'transparent',
                    color: activeTheme
                  }
                }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;