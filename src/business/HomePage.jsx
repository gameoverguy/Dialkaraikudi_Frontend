import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
     const [activeSection, setActiveSection] = useState(null);

     const serviceIcons = [
          { id: 1, title: 'Plumbing', icon: '🔧' },
          { id: 2, title: 'Electrical', icon: '⚡' },
          { id: 3, title: 'Cleaning', icon: '🧹' },
          { id: 4, title: 'Painting', icon: '🎨' },
          { id: 5, title: 'Carpentry', icon: '🔨' },
     ];

     const productIcons = [
          { id: 1, title: 'Electronics', icon: '📱' },
          { id: 2, title: 'Furniture', icon: '🪑' },
          { id: 3, title: 'Clothing', icon: '👕' },
          { id: 4, title: 'Books', icon: '📚' },
          { id: 5, title: 'Sports', icon: '⚽' }
     ];

     const categories = [
          {
               title: 'Wedding Requisites',
               items: [
                    { id: 1, name: 'Banquet Halls', image: 'https://www.iraluxe.com/public/uploads/blogs/20230616102042.jpg' },
                    { id: 2, name: 'Bridal Requisite', image: 'https://static.india.com/wp-content/uploads/2017/08/bridal-accessories.jpg?impolicy=Medium_Resize&w=1200&h=800' },
                    { id: 3, name: 'Caterers', image: 'https://www.weddingsutra.com/images/Vendor_Images/Catering/gyanjee-caterers/gyanjee-caterers-10.jpg' },
               ]
          },
          {
               title: 'Beauty & Spa',
               items: [
                    { id: 1, name: 'Beauty Parlours', image: 'https://www.glittergirlsbeautyparlour.com/assets/img/services/bridal1.png' },
                    { id: 2, name: 'Spa & Massages', image: 'https://content.jdmagicbox.com/v2/comp/karur/e7/9999p4324.4324.181016121143.h6e7/catalogue/apple-spa-karur-karur-body-massage-centres-01tb0mszeh.jpg' },
                    { id: 3, name: 'Salons', image: 'https://t4.ftcdn.net/jpg/04/33/36/05/360_F_433360513_EyYtlNaz3fCJU5UHaPhURBodPCwNIMVN.jpg' },
               ]
          },
          {
               title: 'Repairs & Services',
               items: [
                    { id: 1, name: 'AC Service', image: 'https://www.rightcliq.in/blogs/images/blogs/ac-repair-service.jpg' },
                    { id: 2, name: 'Car Service', image: 'https://www.seat.ps/content/dam/public/seat-website/seat-cars/car-maintenance/article-single-image-maintenance/seat-services-and-repair-maintenance.jpg' },
                    { id: 3, name: 'Bike Service', image: 'https://5.imimg.com/data5/SELLER/Default/2023/5/311462412/PQ/NQ/ZL/22874813/bike-repairing-services.jpg' },
               ]
          },

     ];



     return (
          <div className=" container mx-auto px-4">

               {/* <div className="flex  py-4">
        <h1 className="text-xl">Search across <span className="font-bold">'4.7 Crore+'</span> Businesses</h1>

      </div> */}
               {/* 

      <div className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Search Location"
          className="border p-2 rounded-lg w-1/4"
        />
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search for Pest Control Services"
            className="border p-2 rounded-lg w-full"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">🎤</span>
        </div>
      </div> */}

               {/* 
      <div className="grid grid-cols-4 gap-4 mb-8">
        {serviceCategories.map(service => (
          <div key={service.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-3xl mb-2">{service.icon}</div>
            <h3 className="font-bold">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.subtitle}</p>
          </div>
        ))}
      </div> */}


               <div className=" flex  justify-center py-8 items-center   gap-6 mb-8">
                    <div className=" w-4/12 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                         <h3 className="text-2xl font-bold mb-3">Services</h3>
                         <p className="mb-4">Find the best services near you</p>
                         <button
                              onClick={() => setActiveSection(activeSection === 'services' ? null : 'services')}
                              className="bg-white text-blue-600 px-3 py-3 rounded-md hover:bg-blue-50 transition-colors w-40"
                         >
                              Explore Services
                         </button>
                    </div>
                    <div className="  w-4/12 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                         <h3 className="text-2xl font-bold mb-3">Products</h3>
                         <p className="mb-4">Discover quality products</p>
                         <button
                              onClick={() => setActiveSection(activeSection === 'products' ? null : 'products')}
                              className="bg-white text-purple-600 px-3 py-3 rounded-md hover:bg-purple-50 transition-colors w-40"
                         >
                              Browse Products
                         </button>
                    </div>
               </div>


               {activeSection && (
                    <>
                         <div className=''></div>
                         <div className="bg-black/70 h-screen fixed inset-0 bg-opacity-10 flex items-center justify-center z-1">
                              <div className="bg-white rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
                                   <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-bold">
                                             {activeSection === 'services' ? 'Services' : 'Products'}
                                        </h2>
                                        <button
                                             onClick={() => setActiveSection(null)}
                                             className="text-gray-500 hover:text-gray-700"
                                        >
                                             ✕
                                        </button>
                                   </div>
                                   <div className="grid grid-cols-5 gap-4">
                                        {(activeSection === 'services' ? serviceIcons : productIcons).map(item => (
                                             <div key={item.id} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                                  <span className="text-3xl mb-2">{item.icon}</span>
                                                  <span className="text-sm text-center">{item.title}</span>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </div>
                    </>
               )}

               {/* Dynamic Icons Section */}
               {/* {activeSection && (
        <div className="grid grid-cols-5 gap-4 mb-8 bg-gray-50 p-6 rounded-lg">
          {(activeSection === 'services' ? serviceIcons : productIcons).map(item => (
            <div key={item.id} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl mb-2">{item.icon}</span>
              <span className="text-sm text-center">{item.title}</span>
            </div>
          ))}
        </div>
      )} */}

               {/* Business Categories Grid */}
               {/* <div className="grid grid-cols-5 gap-8">
        {businessCategories.map(category => (
          <Link key={category.id} to={`/category/${category.title.toLowerCase()}`} className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-2">
              <span className="text-2xl">{category.icon}</span>
            </div>
            <span className="text-sm text-center">{category.title}</span>
          </Link>
        ))}
      </div> */}
               <div className="mb-8">
                    {categories.map((category) => (
                         <div key={category.title} className="mb-8">
                              <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
                              <div className="grid grid-cols-3 gap-4">
                                   {category.items.map((item) => (
                                        <Link key={item.id} to={`/category/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                             className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                                             <img
                                                  src={item.image}
                                                  alt={item.name}
                                                  className="w-full h-48 object-cover"
                                             />
                                             <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                                                  <p className="text-center">{item.name}</p>
                                             </div>
                                        </Link>
                                   ))}
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default HomePage;