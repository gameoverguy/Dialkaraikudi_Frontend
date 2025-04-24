import React, { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';

const FilterModal = ({ setFilterOpen, filterOpen }) => {

    const [selectedFilters, setSelectedFilters] = useState({});

    const filterData = [
        {
            "title": "Quick Filter",
            "items": [
                { "name": "Top Rated", "value": "" },
                { "name": "Jd Verified", "value": "" }
            ]
        },
        {
            "title": "Sort by",
            "items": [
                { "name": "Distance", "value": "" },
                { "name": "Rating", "value": "" },
                { "name": "Popular", "value": "" }
            ]
        },
        {
            "title": "Star Rating",
            "items": [
                { "name": "5 Star", "value": "" },
                { "name": "4 Star", "value": "" },
                { "name": "3 Star", "value": "" },
                { "name": "2 Star", "value": "" },
                { "name": "1 Star", "value": "" },
            ]
        },
    ];

    const handleFilterSelect = (title, name) => {
        setSelectedFilters(prev => ({
            ...prev,
            [title]: prev[title] === name ? '' : name
        }));
    };

    const resetFilters = () => {
        setSelectedFilters({});
    };

    return (
        <div>
            {filterOpen && (
                <>
                    <div className='bg-black/90 w-full h-screen fixed top-0 z-40 left-0' onClick={() => setFilterOpen()}></div>
                    <div className='fixed right-0 top-0 z-40 w-full md:w-4/12 lg:w-3/12 bg-white h-screen flex flex-col'>
                        {/* Header */}
                        <div className='bg-white shadow-md p-5 flex justify-between items-center'>
                            <h2 className='text-lg font-semibold'>Filters</h2>
                            <span
                                className='cursor-pointer text-red-500 text-xl'
                                onClick={() => {
                                    setFilterOpen(false)
                                    resetFilters()
                                }}
                            >
                                <ImCancelCircle />
                            </span>
                        </div>

                        {/* Scrollable content */}
                        <div className='flex-1 overflow-y-auto p-5 scrollbar-hide space-y-6'>
                            {filterData.map((filter, index) => (
                                <div key={index} className='space-y-3'>
                                    <h1 className='font-medium text-gray-700'>{filter.title}</h1>
                                    <div className='flex flex-wrap gap-2'>
                                        {filter.items.map((item, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleFilterSelect(filter.title, item.name)}
                                                className={`px-4 py-2 rounded-md text-sm transition-all
                                                    ${selectedFilters[filter.title] === item.name
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className='bg-white shadow-inner p-5 flex justify-between items-center'>
                            <button
                                onClick={resetFilters}
                                className='px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors'
                            >
                                Reset Filter
                            </button>
                            <button className='px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors'>
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FilterModal;