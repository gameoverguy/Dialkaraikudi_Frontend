import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";
import Carousel from "./Home/Carousel";
import Banner from "./Home/Banner";

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
    <Carousel />
      
  





<div className="py-10 text-center font-serif flex justify-center px-4 sm:px-6 md:px-10 lg:px-40">
  <div className="w-full max-w-8xl">
    <div className="category-section border-2 border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 transform hover:scale-105 transition-transform duration-300">
        Products & Services
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
        {serviceCategories.essentialServices.map((service, index) => (
          <a
            key={index}
            href={service.path}
            className="group flex flex-col items-center justify-center p-2 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-[60px] h-[60px] mb-2 bg-gradient-to-br from-gray-50 to-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-gradient-to-tr transition-all duration-300 border border-gray-100">
              <span className="text-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                {service.icon}
              </span>
            </div>
            <span className="text-xs text-center text-gray-400 font-medium group-hover:text-gray-900 transition-colors duration-300">
              {service.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  </div>
</div>









      {/* 22KT Jewelry Showcase */}
      <div className="bg-[#8e8dbb] py-8 sm:py-10 md:py-12 mt-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
      {/* Left Content */}
      <div className="text-white">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-3">Dial Karaikudi</h2>
        <div className="mb-6">
          <p className="text-base sm:text-lg mb-1">Grab for Advertising with us</p>
          <p className="text-lg sm:text-xl md:text-2xl font-light mb-4">
            Starting your own Business Now
          </p>
          <button className="bg-white text-blue-950 px-6 py-2 rounded-md hover:bg-gray-100 transition duration-300 uppercase text-sm font-semibold">
            Signup now
          </button>
        </div>
      </div>

      {/* Right Swiper */}
      <div>
        <Swiper
          spaceBetween={15}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 12 },
            768: { slidesPerView: 3, spaceBetween: 14 },
            1024: { slidesPerView: 4, spaceBetween: 15 },
            1280: { slidesPerView: 5, spaceBetween: 18 },
          }}
          className="jewelry-swiper"
        >
          {[
            "https://4.imimg.com/data4/DA/MJ/MY-2539624/plumber-services.png",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51yo6fFV1-sQ-9-CqK_TotKCEmtwpnvaFjQ&s",
            "https://acservicegurgaon.com/ac-repair-sushant-lok.jpg",
            "https://img.freepik.com/free-vector/hand-drawn-painter-cartoon-illustration_23-2151046691.jpg?semt=ais_hybrid&w=740",
            "https://www.safetyandhealthmagazine.com/ext/resources/images/safety-tips/welder.jpg?t=1483464014&width=768",
          ].map((src, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-lg overflow-hidden">
                <div className="lg:aspect-[3/4] overflow-hidden flex justify-center items-center">
                  <img
                    src={src}
                    alt={`Service ${i + 1}`}
                    className="w-[50%] h-[25vh] lg:w-full lg:h-[25vh] object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </div>
</div>


      <div className="grid grid-cols-1 gap-5 w-full px-4 lg:px-40 py-10">
  <div className="border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 bg-white text-center">
    
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <a href="/movies" className="group">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://thetigernews.org/wp-content/uploads/2025/02/UpdatedEmily-Henderson-Current-Animated-Movies-1670x1541-1.jpg"
            alt="Movies"
            className="w-full h-30 lg:h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4 bg-white">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              Movies
            </h3>
          </div>
        </div>
      </a>

      <a href="/grocery" className="group">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F2d4ea32ed14a1f75cf1b454748dfa99cd4a1fa62"
            alt="Grocery"
            className="w-full h-30 lg:h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4 bg-white">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              Grocery
            </h3>
          </div>
        </div>
      </a>

      <a href="/electricians" className="group">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/a/b9/ab974212-26d6-11ec-b389-fb7e012632e9/615df0fce4220.image.jpg?resize=1200%2C800"
            alt="Electricians"
            className="w-full  h-30 lg:h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4 bg-white">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              Electricians
            </h3>
          </div>
        </div>
      </a>

      <a href="/ac-service" className="group">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2024/12/476609932/HR/BY/GQ/83264471/package-ac-repair-and-service.jpg"
            alt="AC Service"
            className="w-full h-30 lg:h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4 bg-white">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              AC Service
            </h3>
          </div>
        </div>
      </a>

      <a href="/car-service" className="group">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://media.istockphoto.com/id/1589417945/photo/hand-of-mechanic-holding-car-service-and-checking.jpg?s=612x612&w=0&k=20&c=02eGeLsQDyppYAK7k7WwxGUyxgG2a5n43yetegKvIfI="
            alt="Car Service"
            className="w-full h-30 lg:h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
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
            className="w-full h-30 lg:h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
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



<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 px-4 md:px-10 lg:px-40 mb-4">
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
      className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[250px] bg-gray-200 rounded-lg"
    >
      {[
        "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_leads.webp",
        "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_bills_2024.webp",
        "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_hotels_2024.webp",
      ].map((src, i) => (
        <SwiperSlide key={i} className="flex items-center justify-center bg-gray-100">
          <img src={src} alt={`Slide ${i + 1}`} className="w-full h-full object-fit-cover rounded" />
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
        <SwiperSlide key={i} className="flex items-center justify-center bg-gray-100">
          <img src={src} alt={`Slide ${i + 4}`} className="w-full h-full object-fit-cover rounded" />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>





      <div className="grid grid-cols-1 gap-5 w-full mt-10 px-4 lg:px-40">
  <div className="mb-12 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 bg-white text-center">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
      {/* Optional: Title here */}
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <a href="/movies" className="group">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://thetigernews.org/wp-content/uploads/2025/02/UpdatedEmily-Henderson-Current-Animated-Movies-1670x1541-1.jpg"
            alt="Movies"
            className="w-full h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4 bg-white">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              Movies
            </h3>
          </div>
        </div>
      </a>

      <a href="/grocery" className="group">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F2d4ea32ed14a1f75cf1b454748dfa99cd4a1fa62"
            alt="Grocery"
            className="w-full h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4 bg-white">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              Grocery
            </h3>
          </div>
        </div>
      </a>

      <a href="/electricians" className="group">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/a/b9/ab974212-26d6-11ec-b389-fb7e012632e9/615df0fce4220.image.jpg?resize=1200%2C800"
            alt="Electricians"
            className="w-full h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4 bg-white">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              Electricians
            </h3>
          </div>
        </div>
      </a>

      <a href="/ac-service" className="group">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2024/12/476609932/HR/BY/GQ/83264471/package-ac-repair-and-service.jpg"
            alt="AC Service"
            className="w-full h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4 bg-white">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              AC Service
            </h3>
          </div>
        </div>
      </a>

      <a href="/car-service" className="group">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://media.istockphoto.com/id/1589417945/photo/hand-of-mechanic-holding-car-service-and-checking.jpg?s=612x612&w=0&k=20&c=02eGeLsQDyppYAK7k7WwxGUyxgG2a5n43yetegKvIfI="
            alt="Car Service"
            className="w-full h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4 bg-white">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              Car Service
            </h3>
          </div>
        </div>
      </a>

      <a href="/bike-service" className="group">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://img1.wsimg.com/isteam/ip/89b284c1-91d6-451e-a493-9b63171cfc6e/1000047769.jpg/:/cr=t:12.58%25,l:0%25,w:100%25,h:74.85%25/rs=w:600,h:300,cg:true"
            alt="Bike Service"
            className="w-full h-40 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
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


<Banner />
  
    
    </>
  );
};
export default HomePage;
