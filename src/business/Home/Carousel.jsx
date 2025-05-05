// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { API } from "../../../config/config";



// const Carousel = () => {
//   const [ads, setAds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 1500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     arrows: true,
//     cssEase: "linear",
//     lazyLoad: "progressive",
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           arrows: false,
//           dots: true,
//         },
//       },
//     ],
//   };

//   useEffect(() => {
//     const fetchAds = async () => {
//       try {
//         const response = await axios.get(`${API}/advertisement/slots/home`);
//         const activeAds = response.data.filter((ad) => ad.isActive);
//         setAds(activeAds);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching ads:", err);
//         setError("Failed to load advertisements");
//         setLoading(false);
//       }
//     };

//     fetchAds();
//   }, []);

  
//   if (loading) {
//     return (
//       <div className="overflow-hidden w-10/12 h-[50vh] flex items-center justify-center bg-gray-100 rounded-lg">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="overflow-hidden w-10/12 h-[50vh] flex items-center justify-center bg-gray-100 rounded-lg">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   if (!ads.length) {
//     return (
//       <div className="overflow-hidden w-10/12 h-[50vh] flex items-center justify-center bg-gray-100 rounded-lg">
//         <p className="text-gray-500">No advertisements available</p>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-hidden w-11/12">
//       <Slider {...settings}>
//         {ads.map((ad, i) => (
//           <div key={i}>
//             {ad.type === "image" ? (
//               <a
//                 href={ad.link || "#"}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   src={ad.image}
//                   alt={ad.title || "Advertisement"}
//                   className="bg-cover shadow-lg w-full md:h-[50vh] rounded-lg"
//                   loading="lazy"
//                 />
//               </a>
//             ) : (
//               <div
//                 className="w-full md:h-[50vh] rounded-lg"
//                 dangerouslySetInnerHTML={{ __html: ad.htmlContent }}
//               />
//             )}
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Carousel;


//new

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import coursal1 from "../../assets/coursal1.jpg";
import coursal2 from "../../assets/coursal2.avif";
import coursal3 from "../../assets/coursal3.avif";



const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500, // Increased for smoother effect
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    cssEase: "linear", // Smooth animation
    lazyLoad: "progressive", // Improves loading performance

    responsive: [
      {
        breakpoint: 768, // Screens below 768px (Tablets & Mobile)
        settings: {
          arrows: false, // Hide arrows on small screens
          dots: true,
        },
      },
    ],
  };

  const coursal = [
    { id: 1, image: coursal1 },
    { id: 2, image: coursal2 },
    { id: 3, image: coursal3 },
  ];

  return (
    <div className="overflow-hidden w-10/12">
      <Slider {...settings}>
        {coursal.map((item) => (
          <div key={item.id}>
            <img
              src={item.image}
              alt="Slide"
              className="bg-cover shadow-lg w-full md:h-[50vh] rounded-lg"
              loading="lazy" // Ensures smooth loading
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

