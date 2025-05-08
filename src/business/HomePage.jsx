import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";
import Carousel from "./Home/Carousel";

import { API } from "../../config/config";
import { MdCategory } from "react-icons/md";
import TopProducts from "./Home/TopProducts";
import TopServices from "./Home/TopServices";
import LimitedOffer from "./Home/LimitedOffer";
import Category from "./Home/Category";

// const serviceCategories = {
//   essentialServices: [
//     { name: "Restaurants", icon: "🍽️", path: "/restaurants" },
//     { name: "Hotels", icon: "🏨", path: "/hotels" },
//     { name: "Hospitals", icon: "🏥", path: "/hospitals" },
//     { name: "Education", icon: "🎓", path: "/education" },
//     { name: "Beauty Spa", icon: "💆‍♀️", path: "/beauty-spa" },
//     { name: "Home Decor", icon: "🏠", path: "/home-decor" },
//     { name: "Wedding", icon: "👰", path: "/wedding" },
//     { name: "Rent & Hire", icon: "🔑", path: "/rent" },
//     { name: "Contractors", icon: "👷", path: "/contractors" },
//     { name: "Pet Shops", icon: "🐾", path: "/pet-shops" },
//     { name: "PG/Hostels", icon: "🛏️", path: "/hostels" },
//     { name: "Estate ", icon: "🏘️", path: "/estate" },
//     { name: "Dentists", icon: "🦷", path: "/dentists" },
//     { name: "Gym", icon: "💪", path: "/gym" },
//     { name: "Loans", icon: "💰", path: "/loans" },
//     { name: "Event ", icon: "🎉", path: "/events" },
//     { name: "Driving ", icon: "🚗", path: "/driving" },
//     { name: "Packers", icon: "📦", path: "/packers" },
//     { name: "Courier ", icon: "📬", path: "/courier" },
//     { name: "Popular Categories", icon: "📋", path: "/categories" },
//   ],
// };

const HomePage = () => {
  

  return (
    <>
      <div className="w-full flex justify-center">
        <Carousel />
      </div>

      <Category />
    

      <div
        className="w-full px-2 md:px-0 py-10 md:w-11/12 md:mx-auto"
        data-aos="fade-up"
        data-aos-delay="700"
        data-aos-duration="1500"
      >
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/movies",
              title: "Movies",
              image:
                "https://thetigernews.org/wp-content/uploads/2025/02/UpdatedEmily-Henderson-Current-Animated-Movies-1670x1541-1.jpg",
            },
            {
              href: "/grocery",
              title: "Grocery",
              image:
                "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F2d4ea32ed14a1f75cf1b454748dfa99cd4a1fa62",
            },
            {
              href: "/electricians",
              title: "Electricians",
              image:
                "https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/a/b9/ab974212-26d6-11ec-b389-fb7e012632e9/615df0fce4220.image.jpg?resize=1200%2C800",
            },
            {
              href: "/ac-service",
              title: "AC Service",
              image:
                "https://5.imimg.com/data5/SELLER/Default/2024/12/476609932/HR/BY/GQ/83264471/package-ac-repair-and-service.jpg",
            },
            {
              href: "/car-service",
              title: "Car Service",
              image:
                "https://media.istockphoto.com/id/1589417945/photo/hand-of-mechanic-holding-car-service-and-checking.jpg?s=612x612&w=0&k=20&c=02eGeLsQDyppYAK7k7WwxGUyxgG2a5n43yetegKvIfI=",
            },
            {
              href: "/bike-service",
              title: "Bike Service",
              image:
                "https://img1.wsimg.com/isteam/ip/89b284c1-91d6-451e-a493-9b63171cfc6e/1000047769.jpg/:/cr=t:12.58%25,l:0%25,w:100%25,h:74.85%25/rs=w:600,h:300,cg:true",
            },
          ].map((item, index) => (
            <a
              key={item.title}
              href={item.href}
              className="group bg-white rounded-xl shadow-md hover:shadow-blue-200 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 hover:ring-2 hover:ring-blue-100"
              data-aos={index % 2 === 0 ? "zoom-in" : "fade-up"}
              data-aos-delay={100 + index * 100}
              data-aos-duration="600"
            >
              <div className="overflow-hidden rounded-t-xl h-40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-md font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <div className="w-6 h-1 mt-2 mx-auto bg-blue-400 rounded-full transition-all duration-300 group-hover:w-10 group-hover:bg-blue-700"></div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 px-2 md:px-0 mb-4 md:w-11/12 mx-auto">
        {/* First Swiper */}
        <div className="swiper-container w-full">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full h-[200px] md:h-[240px] bg-gray-200 rounded-lg"
          >
            {[
              "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_leads.webp",
              "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_bills_2024.webp",
              "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_hotels_2024.webp",
            ].map((src, i) => (
              <SwiperSlide
                key={i}
                className="flex items-center justify-center bg-gray-100"
              >
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-full object-fit-cover rounded"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Second Swiper */}
        <div className="swiper-container w-full">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[250px] bg-gray-200 rounded-lg"
          >
            {[
              "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/summerweb.png",
              "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_interiordesigners_2024.webp",
              "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/ipl2025web.png",
            ].map((src, i) => (
              <SwiperSlide
                key={i}
                className="flex items-center justify-center bg-gray-100"
              >
                <img
                  src={src}
                  alt={`Slide ${i + 4}`}
                  className="w-full h-full object-fit-cover rounded"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div
        className="w-full px-2 md:px-0 py-16 bg-gradient-to-b from-gray-50 via-white to-gray-100 md:w-11/12 mx-auto"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800"
      >
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/movies",
              title: "Movies",
              image:
                "https://thetigernews.org/wp-content/uploads/2025/02/UpdatedEmily-Henderson-Current-Animated-Movies-1670x1541-1.jpg",
            },
            {
              href: "/grocery",
              title: "Grocery",
              image:
                "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F2d4ea32ed14a1f75cf1b454748dfa99cd4a1fa62",
            },
            {
              href: "/electricians",
              title: "Electricians",
              image:
                "https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/a/b9/ab974212-26d6-11ec-b389-fb7e012632e9/615df0fce4220.image.jpg?resize=1200%2C800",
            },
            {
              href: "/ac-service",
              title: "AC Service",
              image:
                "https://5.imimg.com/data5/SELLER/Default/2024/12/476609932/HR/BY/GQ/83264471/package-ac-repair-and-service.jpg",
            },
            {
              href: "/car-service",
              title: "Car Service",
              image:
                "https://media.istockphoto.com/id/1589417945/photo/hand-of-mechanic-holding-car-service-and-checking.jpg?s=612x612&w=0&k=20&c=02eGeLsQDyppYAK7k7WwxGUyxgG2a5n43yetegKvIfI=",
            },
            {
              href: "/bike-service",
              title: "Bike Service",
              image:
                "https://img1.wsimg.com/isteam/ip/89b284c1-91d6-451e-a493-9b63171cfc6e/1000047769.jpg/:/cr=t:12.58%25,l:0%25,w:100%25,h:74.85%25/rs=w:600,h:300,cg:true",
            },
          ].map((item, index) => (
            <a
              key={item.title}
              href={item.href}
              className="relative group bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:ring-2 hover:ring-blue-300"
              data-aos="flip-left"
              data-aos-delay={index * 150}
              data-aos-duration="900"
            >
              {/* Top image with float-in effect */}
              <div className="h-48 overflow-hidden relative rounded-t-3xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>

              {/* Text content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-black text-gray-800 tracking-wide transition-colors duration-500 group-hover:text-blue-700 group-hover:translate-y-[-1px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                  Discover amazing {item.title.toLowerCase()} services around
                  you.
                </p>
                <span className="block mt-3 w-10 h-1 bg-blue-400 rounded-full mx-auto transition-all duration-500 group-hover:w-16 group-hover:bg-blue-700"></span>
              </div>

              {/* Bottom gradient line effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Shine animation */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-[-60%] w-[50%] h-full bg-white/20 rotate-12 transform animate-[shimmer_2.5s_infinite]" />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="w-full md:w-11/12 mx-auto md:h-[50vh] relative overflow-hidden shadow-xl group">
        {/* Video Background */}
        <video
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/dstm2ouer/video/upload/v1746611951/banner3_uebtno.mov" // Replace with your actual video path
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Overlay */}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg animate-fade-up">
            Welcome to Shree Jewellery
          </h1>
          <p className="mt-4 text-sm md:text-lg text-gray-100 max-w-xl animate-fade-up delay-300">
            Your one-stop hub for services, shopping, and entertainment in
            Karaikudi.
          </p>
          <a
            href="#services"
            className="md:mt-6 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md transition duration-300 border border-white/30"
          >
            Explore Now
          </a>
        </div>

        {/* Glow Border (optional animation) */}
      </div>

      <div
        className="w-full md:w-11/12 mx-auto px-2 md:px-0 py-12 bg-gradient-to-b from-white via-gray-50 to-gray-100"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800"
      >
        <div className="space-y-10">
          {[
            {
              href: "/movies",
              title: "Movies",
              image:
                "https://thetigernews.org/wp-content/uploads/2025/02/UpdatedEmily-Henderson-Current-Animated-Movies-1670x1541-1.jpg",
            },
            {
              href: "/grocery",
              title: "Grocery",
              image:
                "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F2d4ea32ed14a1f75cf1b454748dfa99cd4a1fa62",
            },
            {
              href: "/electricians",
              title: "Electricians",
              image:
                "https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/a/b9/ab974212-26d6-11ec-b389-fb7e012632e9/615df0fce4220.image.jpg?resize=1200%2C800",
            },
            {
              href: "/ac-service",
              title: "AC Service",
              image:
                "https://5.imimg.com/data5/SELLER/Default/2024/12/476609932/HR/BY/GQ/83264471/package-ac-repair-and-service.jpg",
            },
            {
              href: "/car-service",
              title: "Car Service",
              image:
                "https://media.istockphoto.com/id/1589417945/photo/hand-of-mechanic-holding-car-service-and-checking.jpg?s=612x612&w=0&k=20&c=02eGeLsQDyppYAK7k7WwxGUyxgG2a5n43yetegKvIfI=",
            },
            {
              href: "/bike-service",
              title: "Bike Service",
              image:
                "https://img1.wsimg.com/isteam/ip/89b284c1-91d6-451e-a493-9b63171cfc6e/1000047769.jpg/:/cr=t:12.58%25,l:0%25,w:100%25,h:74.85%25/rs=w:600,h:300,cg:true",
            },
          ].map((item, index) => (
            <a
              key={item.title}
              href={item.href}
              className={`flex flex-col md:flex-row ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              } group transition-all duration-700`}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              data-aos-duration="900"
            >
              {/* Image Panel */}
              <div className="w-full md:w-1/2 h-40 md:h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Text Content */}
              <div className="w-full md:w-1/2 flex items-center justify-center bg-white/80 backdrop-blur-md px-4 py-6 md:py-0 shadow-blue-100 shadow-2xl">
                <div className="text-center md:text-left space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-all duration-500">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Explore premium {item.title.toLowerCase()} services nearby.
                  </p>
                  <div className="text-blue-500 font-medium group-hover:underline transition-all text-sm">
                    Discover →
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="w-full md:w-11/12 mx-auto md:h-[50vh] relative overflow-hidden shadow-xl group">
        {/* Video Background */}
        <video
          className="w-full md:h-full object-cover"
          src="https://res.cloudinary.com/dstm2ouer/video/upload/v1746611943/banner2_mfjknu.mov" // Replace with your actual video path
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Overlay */}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg animate-fade-up">
            Welcome to Shree Jewellery
          </h1>
          <p className="md:mt-4 text-sm md:text-lg text-gray-100 max-w-xl animate-fade-up delay-300">
            Your one-stop hub for services, shopping, and entertainment in
            Karaikudi.
          </p>
          <a
            href="#services"
            className="mt-6 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md transition duration-300 border border-white/30"
          >
            Explore Now
          </a>
        </div>

        {/* Glow Border (optional animation) */}
      </div>

      <TopProducts />
      <TopServices />
      <LimitedOffer />
    </>
  );
};
export default HomePage;
