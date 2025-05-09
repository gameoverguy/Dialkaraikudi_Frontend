import React from 'react'

function Category1() {
  return (
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
  )
}

export default Category1