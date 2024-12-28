import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote, X } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';
import 'swiper/css';
import 'swiper/css/pagination';
import { addTestimonial } from '../services/testimonialsServices';
import { useUser } from '../Context/UserContext';

const Testimonials = () => {
  const { activeTheme } = useTheme();
  const {userData} = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [testimonials, setTestimonials] = useState(userData?.testimonials);

  console.log(userData)

  const [formData, setFormData] = useState({
    name: '',
    roles: "",
    company: '',
    review: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await addTestimonial(formData)
      setFormData({
        name: '',
        roles: "",
        company: '',
        review: ''
      });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.message)
    } finally{
      setLoading(false)
    }
  };

  return (
    <div id='testimonials' className='py-10 bg-gray-100 relative'>
      <div className='max-w-6xl mx-auto px-5'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl lg:text-4xl font-bold'>Testimonials</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className='px-4 py-2 rounded-lg transition-colors'
            style={{
              backgroundColor: activeTheme,
              color: 'white'
            }}
          >
            Add Testimonial
          </button>
        </div>

        <Swiper
          style={{
            "--swiper-pagination-color": activeTheme,
          }}
          modules={[Pagination, Autoplay]}
          speed={600}
          autoplay={{ delay: 5000 }}
          slidesPerView={3}
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
        >
          {testimonials?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className='rounded-lg flex flex-col p-4' style={{ border: `1px solid ${activeTheme}` }}>
                <div className='flex justify-between items-center'>
                  <div>
                    <h3 className='font-semibold text-lg' style={{ color: activeTheme }}>{item.name}</h3>
                    <p className='text-sm mt-1'>{item.roles},{item.company}</p>
                  </div>
                  <Quote style={{ color: activeTheme }} />
                </div>
                <p className='py-3'>{item.review}</p>
              </div>
            </SwiperSlide>
          ))}
          <div className='swiper-pagination my-10 relative'></div>
        </Swiper>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md relative'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='absolute right-4 top-4'
            >
              <X />
            </button>
            <h2 className='text-xl font-bold mb-4' style={{ color: activeTheme }}>Add Testimonial</h2>
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className='w-full p-2 border rounded-lg'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Position</label>
                  <input
                    type="text"
                    value={formData.roles}
                    onChange={e => setFormData({ ...formData, roles: e.target.value })}
                    className='w-full p-2 border rounded-lg'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className='w-full p-2 border rounded-lg'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Testimonial</label>
                  <textarea
                    value={formData.review}
                    onChange={e => setFormData({ ...formData, review: e.target.value })}
                    className='w-full p-2 border rounded-lg h-32'
                    required
                  />
                </div>
                <button
                  type="submit"
                  className='w-full py-2 rounded-lg text-white disabled:bg-red-500'
                  style={{ backgroundColor: activeTheme }}
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;