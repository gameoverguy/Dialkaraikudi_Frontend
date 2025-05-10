import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import menu from "../../assets/menu.png";

function Category({ productCategories, serviceCategories }) {
    const [showAllModal, setShowAllModal] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/businesslist/${category}`);
    };

    const handleSeeAll = (type) => {
        setSelectedType(type);
        setShowAllModal(true);
    };

    const Modal = ({ isOpen, onClose, categories, title }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex md:items-center justify-center z-50">
                <div className="bg-white md:w-8/12 md:rounded-lg p-6 md:relative overflow-hidden">
                    <button 
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-600 hover:text-gray-800"
                    >
                        ✕
                    </button>
                    <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-4 overflow-y-auto max-h-[calc(100vh-120px)] md:max-h-[70vh] p-2">
                        {categories.map((category) => (
                            <div
                                key={category._id}
                                onClick={() => {
                                    handleCategoryClick(category._id);
                                    onClose();
                                }}
                                className="group flex flex-col items-center justify-start p-2 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                <div className=" w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-gradient-to-tr transition-all duration-300">
                                    <span className="text-2xl transform group-hover:scale-110 transition-all duration-300">
                                        <img
                                            src={category.iconUrl}
                                            alt={category.displayName}
                                            className="w-[full] h-full text-[8px] rounded-xl p-1 md:p-2"
                                        />
                                    </span>
                                </div>
                                <span className="text-xs text-center text-gray-400 font-semibold transition-colors duration-300">
                                    {category.displayName}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const CategoryGrid = ({ categories, title }) => (
        <div className="category-section border-2 border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out px-6 bg-white w-full mx-4 md:m-0">
            <div className="text-2xl font-semibold py-1 md:py-4 text-gray-800 flex justify-center items-center">
                {title}
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 py-2 md:py-0">
                {categories && categories.length > 0 ? (
                    <>
                        {categories.slice(0, 11).map((category) => (
                            <div
                                key={category._id}
                                onClick={() => handleCategoryClick(category._id)}
                                className="group flex flex-col items-center justify-start p-2 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                <div className="w-[60px] h-[60px] mb-2 bg-gradient-to-br from-gray-50 to-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-gradient-to-tr transition-all duration-300 p-2">
                                    <span className="text-2xl transform group-hover:scale-110 transition-all duration-300">
                                        <img
                                            src={category.iconUrl}
                                            alt={category.displayName}
                                            className="w-full h-full text-[8px] rounded-xl p-1"
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
                                onClick={() => handleSeeAll(title.toLowerCase())}
                                className="group flex flex-col items-center justify-start p-2 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                <div className="w-[60px] h-[60px] mb-2 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-gradient-to-tr transition-all duration-300 p-2">
                                    <span className="text-2xl transform group-hover:scale-110 transition-all duration-300">
                                        <img src={menu} alt="" className="p-1" />
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
        <>
            <div className="flex flex-col md:flex-row justify-center items-stretch md:w-11/12 mx-auto gap-4">
                <div className="w-full md:w-6/12 flex">
                    <CategoryGrid categories={productCategories} title="Products" />
                </div>
                <div className="w-full md:w-6/12 flex">
                    <CategoryGrid categories={serviceCategories} title="Services" />
                </div>
            </div>

            <Modal 
                isOpen={showAllModal} 
                onClose={() => setShowAllModal(false)}
                categories={selectedType === 'products' ? productCategories : serviceCategories}
                title={selectedType === 'products' ? 'All Products' : 'All Services'}
            />
        </>
    );
}

export default Category;