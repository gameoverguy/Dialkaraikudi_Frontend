import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";
import Carousel from "./Home/Carousel";

const serviceCategories = {
  essentialServices: [
    { name: "Restaurants", icon: "🍽️", path: "/restaurants" },
    { name: "Hotels", icon: "🏨", path: "/hotels" },
    { name: "Hospitals", icon: "🏥", path: "/hospitals" },
    { name: "Education", icon: "🎓", path: "/education" },
    { name: "Beauty Spa", icon: "💆‍♀️", path: "/beauty-spa" },
    { name: "Home Decor", icon: "🏠", path: "/home-decor" },
    { name: "Wedding", icon: "👰", path: "/wedding" },
    { name: "Rent & Hire", icon: "🔑", path: "/rent" },
    { name: "Contractors", icon: "👷", path: "/contractors" },
    { name: "Pet Shops", icon: "🐾", path: "/pet-shops" },
  ],
  additionalServices: [
    { name: "PG/Hostels", icon: "🛏️", path: "/hostels" },
    { name: "Estate ", icon: "🏘️", path: "/estate" },
    { name: "Dentists", icon: "🦷", path: "/dentists" },
    { name: "Gym", icon: "💪", path: "/gym" },
    { name: "Loans", icon: "💰", path: "/loans" },
    { name: "Event ", icon: "🎉", path: "/events" },
    { name: "Driving ", icon: "🚗", path: "/driving" },
    { name: "Packers", icon: "📦", path: "/packers" },
    { name: "Courier ", icon: "📬", path: "/courier" },
    { name: "Popular Categories", icon: "📋", path: "/categories" },
  ],
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
    <>
    <div className="w-full">
    <Carousel />
    </div>
    
    <div className="p-5">
      
      
      
      
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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
              <img
                src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_leads.webp"
                alt="Slide 1"
                className=" w-fit md:w-[100%] h-[100%]  object-cover rounded"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center bg-gray-100 text-center">
              <img
                src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_bills_2024.webp"
                alt="Slide 2"
                className="w-[100%] h-[100%] object-cover rounded"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center bg-gray-100 text-center">
              <img
                src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_hotels_2024.webp"
                alt="Slide 3"
                className="w-[100%] h-[100%] object-cover rounded"
              />
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
              <img
                src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/summerweb.png"
                alt="Slide 4"
                className="w-full md:w-[100%] h-[100%] object-cover rounded"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center bg-gray-100 text-center">
              <img
                src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_interiordesigners_2024.webp"
                alt="Slide 5"
                className="w-[100%] h-[100%] object-cover rounded"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center bg-gray-100 text-center">
              <img
                src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/ipl2025web.png"
                alt="Slide 6"
                className="w-[100%] h-[100%] object-cover rounded"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div> */}





      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 text-center font-serif">
        <div className="category-section border-2 border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6 bg-white">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {serviceCategories.essentialServices.map((service, index) => (
              <a
                key={index}
                href={service.path}
                className="group flex flex-col items-center justify-center p-3 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-[80px] h-[80px] mb-3 bg-gradient-to-br from-gray-50 to-white rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-gradient-to-tr transition-all duration-300 border border-gray-100">
                  <span className="text-4xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {service.icon}
                  </span>
                </div>
                <span className="text-sm text-center text-gray-600 font-medium group-hover:text-gray-900 transition-colors duration-300">
                  {service.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="category-section border-2 border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6 bg-white">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {serviceCategories.additionalServices.map((service, index) => (
              <a
                key={index}
                href={service.path}
                className="group flex flex-col items-center justify-center p-3 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-[80px] h-[80px] mb-3 bg-gradient-to-br from-gray-50 to-white rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-gradient-to-tr transition-all duration-300 border border-gray-100">
                  <span className="text-4xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {service.icon}
                  </span>
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
                <p className="text-2xl font-light mb-4">
                  starting your own Business Now
                </p>
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
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 12,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 15,
                  },
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

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 container mx-auto px-4 mt-10">
        <div className="mb-12 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 bg-white text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <a href="/movies" className="group">
              <div className="rounded-xl overflow-hidden h-[250px]">
                <img
                  src="https://thetigernews.org/wp-content/uploads/2025/02/UpdatedEmily-Henderson-Current-Animated-Movies-1670x1541-1.jpg"
                  alt="Movies"
                  className="w-50 h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    Movies
                  </h3>
                </div>
              </div>
            </a>

            <a href="/grocery" className="group">
              <div className="rounded-xl overflow-hidden h-[250px]">
                <img
                  src="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F2d4ea32ed14a1f75cf1b454748dfa99cd4a1fa62"
                  alt="Grocery"
                  className="w-50 h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    Grocery
                  </h3>
                </div>
              </div>
            </a>

            <a href="/electricians" className="group">
              <div className="rounded-xl overflow-hidden h-[250px]">
                <img
                  src="https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/a/b9/ab974212-26d6-11ec-b389-fb7e012632e9/615df0fce4220.image.jpg?resize=1200%2C800"
                  alt="Electricians"
                  className="w-50 h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    Electricians
                  </h3>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="mb-12 border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 bg-white text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <a href="/ac-service" className="group">
              <div className="rounded-xl overflow-hidden h-[250px]">
                <img
                  src="https://5.imimg.com/data5/SELLER/Default/2024/12/476609932/HR/BY/GQ/83264471/package-ac-repair-and-service.jpg"
                  alt="AC Service"
                  className="w-50 h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    AC Service
                  </h3>
                </div>
              </div>
            </a>

            <a href="/car-service" className="group">
              <div className="rounded-xl overflow-hidden h-[250px]">
                <img
                  src="https://media.istockphoto.com/id/1589417945/photo/hand-of-mechanic-holding-car-service-and-checking.jpg?s=612x612&w=0&k=20&c=02eGeLsQDyppYAK7k7WwxGUyxgG2a5n43yetegKvIfI="
                  alt="Car Service"
                  className="w-50 h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    Car Service
                  </h3>
                </div>
              </div>
            </a>

            <a href="/bike-service" className="group">
              <div className="rounded-xl overflow-hidden h-[250px]">
                <img
                  src="https://img1.wsimg.com/isteam/ip/89b284c1-91d6-451e-a493-9b63171cfc6e/1000047769.jpg/:/cr=t:12.58%25,l:0%25,w:100%25,h:74.85%25/rs=w:600,h:300,cg:true"
                  alt="Bike Service"
                  className="w-50 h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    Bike Service
                  </h3>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 container mx-auto px-4 mt-5">
        <div className="mb-12 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 bg-white text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <a href="/movies" className="group">
              <div className="rounded-xl overflow-hidden h-[250px]">
                <img
                  src="https://itsastampede.com/wp-content/uploads/2021/06/list-of-kung-fu-panda-movies.jpg?w=600"
                  alt="Movies"
                  className="w-50 h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    Movies
                  </h3>
                </div>
              </div>
            </a>

            <a href="/grocery" className="group">
              <div className="rounded-xl overflow-hidden h-[250px]">
                <img
                  src="https://olamor.in/cdn/shop/files/GlistenKeratinShampoo1L.jpg?v=1700474623&width=1500"
                  alt="Grocery"
                  className="w-50 h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    Grocery
                  </h3>
                </div>
              </div>
            </a>

            <a href="/electricians" className="group">
              <div className="rounded-xl overflow-hidden h-[250px]">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIilimZGaeb0Hetalk2ncxe_JZeg0s2vttSQ&s"
                  alt="Electricians"
                  className="w-50 h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    Electricians
                  </h3>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="mb-12 border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 bg-white text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <a href="/ac-service" className="group">
              <div className="rounded-xl overflow-hidden h-[250px]">
                <img
                  src="https://electronicparadise.in/cdn/shop/files/Voltas_1.5_Ton_5_Star_Split_Air_Conditioner_185V_Vectra_Elite_5.webp?v=1728976295&width=1406"
                  alt="AC Service"
                  className="w-50 h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    AC Service
                  </h3>
                </div>
              </div>
            </a>

            <a href="/car-service" className="group">
              <div className="rounded-xl overflow-hidden h-[250px] ">
                <img
                  src="https://images.pexels.com/photos/100653/pexels-photo-100653.jpeg"
                  alt="Car Service"
                  className="w-50 h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    Car Service
                  </h3>
                </div>
              </div>
            </a>

            <a href="/bike-service" className="group">
              <div className="rounded-xl overflow-hidden h-[250px]">
                <img
                  src="https://images.moneycontrol.com/static-mcnews/2023/06/5-rahul-gandhi-bike-shop-delhi.jpg"
                  alt="Bike Service"
                  className=" w-50 h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    Bike Service
                  </h3>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default HomePage;
