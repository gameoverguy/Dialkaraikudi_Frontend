import React, { useState } from 'react';
import FloatingInput from '../Components/FloatingInput';

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
                    <FloatingInput
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Business Name"
                        required
                    />

                    <FloatingInput
                        id="pincode"
                        name="pincode"
                        type="text"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                        maxLength={6}
                        required
                    />

                    <FloatingInput
                        id="plotNo"
                        name="plotNo"
                        value={formData.plotNo}
                        onChange={handleChange}
                        placeholder="Plot No. / Bldg No. / Wing / Shop No. / Floor"
                        required
                    />

                    <FloatingInput
                        id="buildingName"
                        name="buildingName"
                        value={formData.buildingName}
                        onChange={handleChange}
                        placeholder="Building Name / Market / Colony / Society"
                        required
                    />

                    <FloatingInput
                        id="streetName"
                        name="streetName"
                        value={formData.streetName}
                        onChange={handleChange}
                        placeholder="Street / Road Name"
                        required
                    />

                    <FloatingInput
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        placeholder="Landmark"
                        required
                    />

                    <FloatingInput
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        required
                    />

                    <FloatingInput
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
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