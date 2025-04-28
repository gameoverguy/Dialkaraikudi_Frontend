import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
const allCategories = [
  "Aquarium Fish Dealers",
  "Pet Shops",
  "Aquariums",
  "Fish Tank Dealers",
  "Dog Food Retailers",
  "Pet Food Dealers",
  "Cat Food Retailers",
  "Pet Accessory Dealers",
  "Restaurants"
];

const BusinessCategory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSelect = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    setSearchQuery("");
  };

  const handleRemove = (category) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
  };

  const filteredSuggestions = allCategories.filter(
    (category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedCategories.includes(category)
  );

  return (
    <div className="grid grid-cols-2 gap-6">
      <div></div>
      <div className="mt-4 relative">
        <h1 className="font-bold text-2xl mt-2">Add Business Category</h1>
        <p className="text-md mt-2">
          Choose the right business categories so your customer can easily find you
        </p>

        <div className="mt-5 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Type Business Category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          {searchQuery && filteredSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full mt-1 rounded-md shadow-md max-h-40 overflow-y-auto">
              {filteredSuggestions.map((cat, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(cat)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedCategories.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Selected Categories</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((cat, index) => (
                <div
                  key={index}
                  className="bg-blue-600 text-white px-3 py-2 rounded-full flex items-center gap-2 text-sm"
                >
                  {cat}
                  <button
                    onClick={() => handleRemove(cat)}
                    className="text-white font-bold hover:text-gray-200"
                  >
                    <IoClose/>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCategory;
