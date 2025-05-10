import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import coursal1 from "../../assets/coursal1.jpg";

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
    { id: 2, image: coursal1 },
    { id: 3, image: coursal1 },
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
