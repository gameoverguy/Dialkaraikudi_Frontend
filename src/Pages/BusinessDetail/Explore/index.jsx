// import React, { useState } from "react";
// import { MdOutlineStar } from "react-icons/md";
// import { SlLocationPin } from "react-icons/sl";
// import { FaThumbsUp, FaRegComment, FaPhone } from "react-icons/fa6";
// import { PiWhatsappLogoFill } from "react-icons/pi";
// import { RiShareForwardLine } from "react-icons/ri";
// import { HiOutlinePencil } from "react-icons/hi2";

// const Explore = () => {
//   const [exploreData] = useState([
//     {
//       category: "Pandits",
//       businesses: [
//         {
//           id: 2,
//           name: "Divine Blessings",
//           image: "https://dummyimage.com/250x150/000/fff",
//           star: 4.8,
//           rating: 120,
//           address: "Kalanivasal, Karaikudi",
//           experience: "5 years",
//           contact: 9876543211,
//         },
//       ],
//     },
//     {
//       category: "Beauty parlour",
//       businesses: [
//         {
//           id: 1,
//           name: "Sri Beauty Parlour",
//           image: "https://dummyimage.com/250x150/000/fff",
//           star: 4.6,
//           rating: 85,
//           address: "Near Bus Stand, Karaikudi",
//           contact: 9988776655,
//         },
//         {
//           id: 3,
//           name: "KALS Bridal Studio & Academy",
//           image: "https://dummyimage.com/250x150/000/fff",
//           star: 4.9,
//           rating: 150,
//           address: "1st km, Karaikudi South...",
//           contact: 8877665544,
//         },
//         {
//           id: 4,
//           name: "Sri Natural Trends",
//           image: "https://dummyimage.com/250x150/000/fff",
//           star: 4.7,
//           rating: 95,
//           address: "Opp. Annamalaiyar...",
//           contact: 7766554433,
//         },
//       ],
//     },
//     {
//       category: "Caterers",
//       businesses: [
//         {
//           id: 5,
//           name: "Annapoorna Caterers",
//           image: "https://dummyimage.com/250x150/000/fff",
//           star: 4.5,
//           rating: 70,
//           address: "Main Road, Karaikudi",
//           contact: 6655443322,
//         },
//       ],
//     },
//     {
//       category: "Band",
//       businesses: [
//         {
//           id: 6,
//           name: "Melody Makers Band",
//           image: "https://dummyimage.com/250x150/000/fff",
//           star: 4.7,
//           rating: 110,
//           address: "Central Area, Karaikudi",
//           contact: 5544332211,
//         },
//       ],
//     },
//     {
//       category: "Decorator",
//       businesses: [
//         {
//           id: 7,
//           name: "Shiva Decorators",
//           image: "https://dummyimage.com/250x150/000/fff",
//           star: 4.6,
//           rating: 90,
//           address: "East Street, Karaikudi",
//           contact: 4433221100,
//         },
//       ],
//     },
//   ]);

//   const [selectedCategory, setSelectedCategory] = useState("Pandits");

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const currentCategoryData = exploreData.find(
//     (item) => item.category === selectedCategory
//   );
//   const currentBusinesses = currentCategoryData
//     ? currentCategoryData.businesses
//     : [];

//   return (
//     <React.Fragment>
//       <div
//         id="explore"
//         className="rounded-md border border-gray-200 mx-4 p-2 mb-4"
//       >
//         <h1 className="flex items-center font-bold text-xl mb-4 p-2">
//           You might want to explore
//         </h1>
//         <div className="overflow-x-auto">
//           <div className="flex gap-3 mb-4 px-2 whitespace-nowrap">
//             {exploreData.map((item) => (
//               <button
//                 key={item.category}
//                 className={`px-4 py-2 rounded text-sm font-medium shrink-0 transition-all duration-200 border-1 border-gray-200 ${
//                   selectedCategory === item.category
//                     ? "bg-blue-100 text-blue-600"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//                 onClick={() => handleCategoryClick(item.category)}
//               >
//                 {item.category}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {currentBusinesses.map((business) => (
//             <div
//               key={business.id}
//               className="flex flex-col p-4 border border-gray-300 rounded-md shadow-sm"
//             >
//               <img
//                 src={business.image}
//                 alt={business.name}
//                 className="w-full h-32 object-cover rounded-md mb-3"
//               />
//               <h2 className="text-base font-semibold text-gray-800 mb-1">
//                 {business.name}
//               </h2>
//               <div className="flex items-center gap-2 mb-1">
//                 <div className="flex items-center bg-green-600 text-white px-2 py-0.5 text-sm rounded">
//                   {business.star}
//                   <MdOutlineStar className="ml-1 text-sm" />
//                 </div>
//                 <span className="text-sm text-gray-500">
//                   {business.rating} Ratings
//                 </span>
//               </div>
//               <div className="flex items-center text-sm text-gray-600 mb-3">
//                 <SlLocationPin className="mr-1 text-gray-500" />
//                 {business.address}
//               </div>
//               <div className="flex gap-2 mt-auto">
//                 <button className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
//                   <FaPhone />
//                   Show Number
//                 </button>
//                 <button className="flex items-center gap-2 text-sm border px-3 py-1 rounded text-gray-800 bg-white hover:shadow">
//                   <PiWhatsappLogoFill className="text-[#25D366] text-xl" />
//                   WhatsApp
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Explore;
