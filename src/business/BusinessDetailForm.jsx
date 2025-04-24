import React, { useState } from 'react';

const BusinessDetailForm = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        pincode: '',
        plotNo: '',
        buildingName: '',
        streetName: '',
        landmark: '',
        city: '',
        state: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;


        if (name === 'pincode') {
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData(prevState => ({
                ...prevState,
                [name]: numericValue
            }));
            return;
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="max-w-5xl mx-auto p-8">
            <div className="text-gray-600 mb-8 flex items-center gap-2">
                <span className="hover:text-blue-500 cursor-pointer">Home</span>
                <span className="text-gray-400">›</span>
                <span className="text-blue-500">Enter Business Details</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-2xl font-bold mb-6">Enter Your Business Details</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Business Name"
                        className="w-full p-3 border-2 rounded-xl focus:border-blue-500 outline-none"
                        required
                    />

                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                        className="w-full p-3 border-2 rounded-xl focus:border-blue-500 outline-none"
                        maxLength={6}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                    />

                    <input
                        type="text"
                        name="plotNo"
                        value={formData.plotNo}
                        onChange={handleChange}
                        placeholder="Plot No. / Bldg No. / Wing / Shop No. / Floor"
                        className="w-full p-3 border-2 rounded-xl focus:border-blue-500 outline-none"
                        required
                    />

                    <input
                        type="text"
                        name="buildingName"
                        value={formData.buildingName}
                        onChange={handleChange}
                        placeholder="Building Name / Market / Colony / Society"
                        className="w-full p-3 border-2 rounded-xl focus:border-blue-500 outline-none"
                        required
                    />

                    <input
                        type="text"
                        name="streetName"
                        value={formData.streetName}
                        onChange={handleChange}
                        placeholder="Street / Road Name"
                        className="w-full p-3 border-2 rounded-xl focus:border-blue-500 outline-none"
                        required
                    />

                    <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        placeholder="Landmark"
                        className="w-full p-3 border-2 rounded-xl focus:border-blue-500 outline-none"
                        required
                    />

                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full p-3 border-2 rounded-xl focus:border-blue-500 outline-none"
                        required
                    />

                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        className="w-full p-3 border-2 rounded-xl focus:border-blue-500 outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg text-lg font-medium"
                >
                    Save and Continue
                </button>
            </form>
        </div>
    );
};

export default BusinessDetailForm;