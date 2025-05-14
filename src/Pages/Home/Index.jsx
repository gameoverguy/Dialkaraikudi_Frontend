import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config/config";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";
import Carousel from "./Carousel";
import TopProducts from "./TopProducts";
import TopServices from "./TopServices";
import LimitedOffer from "./LimitedOffer";
import Category from "./Category";
import Category1 from "./Category1";
import Advertisment from "./Advertisment";
import Category2 from "./Category2";
import VideoAdertisment1 from "./VideoAdertisment1";
import Category3 from "./Category3";
import VideoAdertisment2 from "./VideoAdertisment2";
axios.defaults.withCredentials = true;

const Index = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);

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

  return (
    <>
      <div className="flex flex-col gap-5">
        <Carousel />
        <Category
          productCategories={productCategories}
          serviceCategories={serviceCategories}
        />
        <Category1
          productCategories={productCategories}
          serviceCategories={serviceCategories}
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-semibold text-green-800">
            Top Products
          </h1>
          <Advertisment />
        </div>

        <Category2
          productCategories={productCategories}
          serviceCategories={serviceCategories}
        />
        <VideoAdertisment1 />
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-semibold text-cyan-700">Top Services</h1>
          <TopProducts />
        </div>
        {/* <Category3 /> */}
        <VideoAdertisment2 />

        {/* <TopServices /> */}
        <LimitedOffer />
      </div>
    </>
  );
};
export default Index;
