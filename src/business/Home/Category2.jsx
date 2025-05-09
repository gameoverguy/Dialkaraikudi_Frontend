import React from 'react'

function Category2() {
  return (
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
  )
}

export default Category2