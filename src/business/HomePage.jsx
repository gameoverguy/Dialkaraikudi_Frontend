import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/bundle';

const serviceCategories = {
  essentialServices: [
    { name: 'Restaurants', icon: '🍽️', path: '/restaurants' },
    { name: 'Hotels', icon: '🏨', path: '/hotels' },
    { name: 'Hospitals', icon: '🏥', path: '/hospitals' },
    { name: 'Education', icon: '🎓', path: '/education' },
    { name: 'Beauty Spa', icon: '💆‍♀️', path: '/beauty-spa' },
    { name: 'Home Decor', icon: '🏠', path: '/home-decor' },
    { name: 'Wedding', icon: '👰', path: '/wedding' },
    { name: 'Rent & Hire', icon: '🔑', path: '/rent' },
    { name: 'Contractors', icon: '👷', path: '/contractors' },
    { name: 'Pet Shops', icon: '🐾', path: '/pet-shops' },
  ],
  additionalServices: [
    { name: 'PG/Hostels', icon: '🛏️', path: '/hostels' },
    { name: 'Estate ', icon: '🏘️', path: '/estate' },
    { name: 'Dentists', icon: '🦷', path: '/dentists' },
    { name: 'Gym', icon: '💪', path: '/gym' },
    { name: 'Loans', icon: '💰', path: '/loans' },
    { name: 'Event ', icon: '🎉', path: '/events' },
    { name: 'Driving ', icon: '🚗', path: '/driving' },
    { name: 'Packers', icon: '📦', path: '/packers' },
    { name: 'Courier ', icon: '📬', path: '/courier' },
    { name: 'Popular Categories', icon: '📋', path: '/categories' },
    
  ]
};

const HomePage = () => {
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .swiper-button-next, .swiper-button-prev {
        color: grey !important;
        font-size: 1.2rem !important;
        width: 50px !important;
        height: 50px !important;
      }
      .swiper-button-next::after, .swiper-button-prev::after {
        font-size: 1.2rem !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="p-5">
      {/* Swiper section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>

        <div className="swiper-container">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full h-[250px] bg-gray-200 rounded-lg"
          >
            <SwiperSlide className="flex items-center justify-center bg-gray-100 text-center">
              <img src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_leads.webp" alt="Slide 1" className=" w-fit md:w-[100%] h-[100%]  object-cover rounded" />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center bg-gray-100 text-center">
              <img src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_bills_2024.webp" alt="Slide 2" className="w-[100%] h-[100%] object-cover rounded" />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center bg-gray-100 text-center">
              <img src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_hotels_2024.webp" alt="Slide 3" className="w-[100%] h-[100%] object-cover rounded" />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Second Swiper */}
        <div className="swiper-container">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full h-[250px] bg-gray-200 rounded-lg"
          >
            <SwiperSlide className="flex items-center justify-center bg-gray-100 text-center">
              <img src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/summerweb.png" alt="Slide 4" className="w-full md:w-[100%] h-[100%] object-cover rounded" />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center bg-gray-100 text-center">
              <img src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_interiordesigners_2024.webp" alt="Slide 5" className="w-[100%] h-[100%] object-cover rounded" />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center bg-gray-100 text-center">
              <img src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/ipl2025web.png" alt="Slide 6" className="w-[100%] h-[100%] object-cover rounded" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 text-center font-serif">
        <div className="category-section border-2 border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6 bg-white">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 transform hover:scale-105 transition-transform duration-300">Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {serviceCategories.essentialServices.map((service, index) => (
              <a
                key={index}
                href={service.path}
                className="group flex flex-col items-center justify-center p-3 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-[80px] h-[80px] mb-3 bg-gradient-to-br from-gray-50 to-white rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-gradient-to-tr transition-all duration-300 border border-gray-100">
                  <span className="text-4xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">{service.icon}</span>
                </div>
                <span className="text-sm text-center text-gray-600 font-medium group-hover:text-gray-900 transition-colors duration-300">
                  {service.name}
                </span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="category-section border-2 border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6 bg-white">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 transform hover:scale-105 transition-transform duration-300">Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {serviceCategories.additionalServices.map((service, index) => (
              <a
                key={index}
                href={service.path}
                className="group flex flex-col items-center justify-center p-3 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-[80px] h-[80px] mb-3 bg-gradient-to-br from-gray-50 to-white rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-gradient-to-tr transition-all duration-300 border border-gray-100">
                  <span className="text-4xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">{service.icon}</span>
                </div>
                <span className="text-sm text-center text-gray-600 font-medium group-hover:text-gray-900 transition-colors duration-300">
                  {service.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;