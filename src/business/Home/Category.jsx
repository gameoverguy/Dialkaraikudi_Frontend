import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../config/config";
import menu from "../../assets/menu.png";

function Category() {
    const [productCategories, setProductCategories] = useState([]);
    const [serviceCategories, setServiceCategories] = useState([]);
    const navigate = useNavigate();
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API}/categories`);
                const allCategories = response.data.data;
                
                // Separate products and services based on category type
                const products = allCategories.filter(cat => cat.categoryType === 'product');
                const services = allCategories.filter(cat => cat.categoryType === 'service');
                
                setProductCategories(products);
                setServiceCategories(services);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        navigate(`/businesslist/${category}`);
    };

    const CategoryGrid = ({ categories, title }) => (
        <div className="category-section border-2 border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6 bg-white w-full">
            <div className="text-2xl font-semibold mb-6 text-gray-800 flex justify-center items-center">
                {title}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {categories && categories.length > 0 ? (
                    <>
                        {categories.slice(0, 11).map((category) => (
                            <div
                                key={category._id}
                                onClick={() => handleCategoryClick(category._id)}
                                className="group flex flex-col items-center justify-start p-2 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                <div className="w-[80px] h-[80px] mb-2 bg-gradient-to-br from-gray-50 to-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-gradient-to-tr transition-all duration-300 p-2">
                                    <span className="text-2xl transform group-hover:scale-110 transition-all duration-300">
                                        <img
                                            src={category.iconUrl}
                                            alt={category.displayName}
                                            className="w-full h-full text-[8px] rounded-xl"
                                        />
                                    </span>
                                </div>
                                <span className="text-xs text-center text-gray-400 font-semibold transition-colors duration-300">
                                    {category.displayName}
                                </span>
                            </div>
                        ))}
                        {categories.length > 11 && (
                            <div
                                onClick={() => handleCategoryClick('all')}
                                className="group flex flex-col items-center justify-start p-2 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                <div className="w-[80px] h-[80px] mb-2 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-gradient-to-tr transition-all duration-300 p-2">
                                    <span className="text-2xl transform group-hover:scale-110 transition-all duration-300">
                                        <img src={menu} alt="" />
                                    </span>
                                </div>
                                <span className="text-xs text-center text-gray-400 font-semibold transition-colors duration-300">
                                    See All
                                </span>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        No {title.toLowerCase()} available
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row justify-center items-start md:w-11/12 mx-auto gap-4">
            <div className="w-full md:w-6/12">
            
                <CategoryGrid categories={productCategories} title="Products" />
                
            </div>

            <div className="w-full md:w-6/12 relative">
                <CategoryGrid categories={serviceCategories} title="Services" />
                
            </div>
        </div>


    );
}

export default Category;