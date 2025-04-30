import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
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
      {/* 22KT Jewelry Showcase */}
      <div className="bg-blue-950 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Content */}
            <div className="flex flex-col justify-center text-white">
              <h2 className="text-5xl font-serif mb-2">Dial Karaikudi</h2>
              <div className="mb-6">
                <p className="text-lg mb-1">Grab for Advertising with us</p>
                <p className="text-2xl font-light mb-4">starting your own Business Now</p>
                <button className="bg-white text-blue-950 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300 uppercase text-sm font-semibold">
                  Signup now
                </button>
              </div>
            </div>

            {/* Right Swiper */}
            <div>
              <Swiper
                spaceBetween={15}
                slidesPerView={4}
                navigation={true}
                modules={[Navigation]}
                className="jewelry-swiper"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 12
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 15
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 15
                  }
                }}
              >
                <SwiperSlide>
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src="https://4.imimg.com/data4/DA/MJ/MY-2539624/plumber-services.png"
                        alt="Plumbing"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51yo6fFV1-sQ-9-CqK_TotKCEmtwpnvaFjQ&s"
                        alt="Jewelry"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src="https://acservicegurgaon.com/ac-repair-sushant-lok.jpg"
                        alt="Jewelry"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src="https://img.freepik.com/free-vector/hand-drawn-painter-cartoon-illustration_23-2151046691.jpg?semt=ais_hybrid&w=740"
                        alt="Jewelry"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src="https://www.safetyandhealthmagazine.com/ext/resources/images/safety-tips/welder.jpg?t=1483464014&width=768"
                        alt="Jewelry"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="flex justify-end mt-4">
                <button className="bg-white text-blue-950 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300 text-sm font-semibold">
                  View Full Collection
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .jewelry-swiper .swiper-button-next,
          .jewelry-swiper .swiper-button-prev {
            color: white;
            width: 40px;
            height: 40px;
          }

          .jewelry-swiper .swiper-button-next:after,
          .jewelry-swiper .swiper-button-prev:after {
            font-size: 20px;
          }
        `}</style>


      </div>

      <div className="max-w-8xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Find the Product Requirement</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Pincode or City"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 font-medium">
                  CHANGE
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg flex items-center justify-center">
              <img
                src="https://img.freepik.com/free-vector/location-concept-illustration_114360-1266.jpg?w=740&t=st=1709707843~exp=1709708443~hmac=7823c4c604fb30fb02f841454774a4c6f1e71eb3a0f8a68d7e8f6dc8ce53f1b8"
                alt="Location illustration"
                className="max-w-[300px] h-auto"
              />
            </div>
          </div>
        </div>
    </div>




  );
};

export default HomePage;