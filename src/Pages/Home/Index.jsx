import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config/config";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";
import Carousel from "./Carousel";
import TopProducts from "./TopProducts";
import LimitedOffer from "./LimitedOffer";
import Category from "./Category";
import Category1 from "./Category1";

import Category2 from "./Category2";
import VideoAdertisment1 from "./VideoAdertisment1";
import Category3 from "./Category3";
import VideoAdertisment2 from "./VideoAdertisment2";
import AdPopup from "../AdPop/AdPopup";
import TopService from "./TopService";
import Offers from "./Offers";
import SeasonalProducts from "./SeasonalProducts";
import SeasonalServices from "./SeasonalServices";
axios.defaults.withCredentials = true;

const Index = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [fetchVideo1, setFetchVideo1] = useState([]);
  const [fetchVideo2, setFetchVideo2] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API}/categories`);
        const allCategories = response.data.data;

        // Separate products and services based on category type
        const products = allCategories.filter(
          (cat) => cat.categoryType === "product"
        );
        const services = allCategories.filter(
          (cat) => cat.categoryType === "service"
        );

        setProductCategories(products);
        setServiceCategories(services);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API}/adverts`);
        const ads = response.data.filter(ad => ad.slotId?.page === "home");
        if (ads.length > 0) {
          // Filter videos for Advertisement1 (1st and 3rd videos)
          const allVideos = ads.filter(ad => ad.slotId?._id === "682af722344e51b185a45062");
          setFetchVideo1(allVideos.filter((_, index) => index % 2 === 0)); // Get odd indexed videos (0, 2)
          setFetchVideo2(allVideos.filter((_, index) => index % 2 === 1)); // Get even indexed videos (1, 3)
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchAds();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3">
        <AdPopup />
        <Carousel />

        <Category
          productCategories={productCategories}
          serviceCategories={serviceCategories}
        />

        <div className="flex flex-col items-center justify-center md:gap-4">
          <h1 className="text-2xl lg:text-3xl font-semibold text-green-800">
            Top Products
          </h1>
          <TopProducts />
        </div>

        <div className="flex flex-col items-center justify-center md:gap-4">
          <h1 className="text-2xl lg:text-3xl font-semibold text-cyan-700">
            Top Services
          </h1>
          <TopService />
        </div>

        <Category1
          productCategories={productCategories}
          serviceCategories={serviceCategories}
        />

        <Offers />

        <VideoAdertisment1 videos={fetchVideo1} />

        <Category2
          productCategories={productCategories}
          serviceCategories={serviceCategories}
        />
        <VideoAdertisment2 videos={fetchVideo2} />

        {/* <Category3 /> */}

        <SeasonalProducts />
        <SeasonalServices />
        <LimitedOffer />
      </div>
    </>
  );
};
export default Index;
