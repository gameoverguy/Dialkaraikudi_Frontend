import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";
import Carousel from "./Home/Carousel";


import { MdCategory } from "react-icons/md";
import TopProducts from "./Home/TopProducts";
import TopServices from "./Home/TopServices";
import LimitedOffer from "./Home/LimitedOffer";
import Category from "./Home/Category";
import Category1 from "./Home/Category1";
import Advertisment from "./Home/Advertisment";
import Category2 from "./Home/Category2";
import VideoAdertisment1 from "./Home/VideoAdertisment1";
import Category3 from "./Home/Category3";
import VideoAdertisment2 from "./Home/VideoAdertisment2";

const HomePage = () => {
  

  return (
    <>
      <div className="flex flex-col gap-2">
      <Carousel />
      <Category />
      <Category1 />
      <Advertisment />
      <Category2 />
      <VideoAdertisment1 />
      <Category3 />
      <VideoAdertisment2 />
      <TopProducts />
      <TopServices />
      <LimitedOffer />
      </div>
    </>
  );
};
export default HomePage;
