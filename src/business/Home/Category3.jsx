import React from 'react'

function Category3() {
  return (
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
  )
}

export default Category3