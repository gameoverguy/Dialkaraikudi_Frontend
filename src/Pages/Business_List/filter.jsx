import React from 'react';
import { ImCancelCircle } from 'react-icons/im';

const FilterModal = ({ setFilterOpen, filterOpen }) => {
    return (
        <div>
            {filterOpen && (
                <>
                    <div className='bg-black/90 w-full h-screen fixed top-0 z-40 left-0'></div>
                    <div className='fixed right-0 top-0 z-40 w-full md:w-3/12 bg-white h-screen flex flex-col'>

                        {/* Header */}
                        <div className='bg-white shadow-md p-5'>
                            <span
                                className='cursor-pointer text-red-500 font-medium'
                                onClick={() => setFilterOpen(false)}
                            >
                                <ImCancelCircle />
                            </span>
                        </div>

                        {/* Scrollable content */}
                        <div className='flex-1 overflow-y-auto p-5 scrollbar-hide'>


                        </div>

                        {/* Footer */}
                        <div className='bg-white shadow-inner p-5 justify-between flex px-10'>
                            <button className='bg-gray-400 px-2 py-1 rounded'>
                                Reset Filter
                            </button>
                            <button className='bg-blue-500 px-2 py-1 rounded'>
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
