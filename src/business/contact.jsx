import React, { useState } from 'react';
import FloatingInput from '../Components/FloatingInput';

const ContactDetails = () => {
    const [formData, setFormData] = useState({
        title: 'Mr',
        contactPerson: '',
        mobileNumber: '',
        additionalMobileNumbers: [],
        whatsappNumber: '',
        additionalWhatsappNumbers: [],
        landlineNumbers: [],
        email: '',
        additionalEmails: []
    });

    const [sameAsMobile, setSameAsMobile] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'mobileNumber' || name === 'whatsappNumber') {
            // Only allow numbers and limit to 10 digits
            const numericValue = value.replace(/\D/g, '');
            if (numericValue.length <= 10) {
                setFormData(prev => ({
                    ...prev,
                    [name]: numericValue
                }));

                if (name === 'mobileNumber' && sameAsMobile) {
                    setFormData(prev => ({
                        ...prev,
                        whatsappNumber: numericValue
                    }));
                }
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSameAsMobileChange = (e) => {
        setSameAsMobile(e.target.checked);
        if (e.target.checked) {
            setFormData(prev => ({
                ...prev,
                whatsappNumber: formData.mobileNumber
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleAddMobileNumber = () => {
        if (formData.additionalMobileNumbers.length < 2) {
            setFormData(prev => ({
                ...prev,
                additionalMobileNumbers: [...prev.additionalMobileNumbers, '']
            }));
        }
    };

    const handleAddWhatsappNumber = () => {
        if (formData.additionalWhatsappNumbers.length < 2) {
            setFormData(prev => ({
                ...prev,
                additionalWhatsappNumbers: [...prev.additionalWhatsappNumbers, '']
            }));
        }
    };

    const handleAddLandline = () => {
        if (formData.landlineNumbers.length < 1) {
            setFormData(prev => ({
                ...prev,
                landlineNumbers: [...prev.landlineNumbers, '']
            }));
        }
    };

    const handleAddEmail = () => {
        if (formData.additionalEmails.length < 2) {
            setFormData(prev => ({
                ...prev,
                additionalEmails: [...prev.additionalEmails, '']
            }));
        }
    };

    const handleAdditionalMobileChange = (index, value) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 10) {
            setFormData(prev => {
                const newNumbers = [...prev.additionalMobileNumbers];
                newNumbers[index] = numericValue;
                return {
                    ...prev,
                    additionalMobileNumbers: newNumbers
                };
            });
        }
    };

    const handleAdditionalWhatsappChange = (index, value) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 10) {
            setFormData(prev => {
                const newNumbers = [...prev.additionalWhatsappNumbers];
                newNumbers[index] = numericValue;
                return {
                    ...prev,
                    additionalWhatsappNumbers: newNumbers
                };
            });
        }
    };

    const handleAdditionalEmailChange = (index, value) => {
        setFormData(prev => {
            const newEmails = [...prev.additionalEmails];
            newEmails[index] = value;
            return {
                ...prev,
                additionalEmails: newEmails
            };
        });
    };

    const handleLandlineChange = (index, value) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 11) {  // Allow up to 11 digits for landline (STD + number)
            setFormData(prev => {
                const newNumbers = [...prev.landlineNumbers];
                newNumbers[index] = numericValue;
                return {
                    ...prev,
                    landlineNumbers: newNumbers
                };
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Add Contact Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-4 items-center">
                    <div className="w-32 mb-4">
                        <select
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        >
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                            <option value="Dr">Dr</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <FloatingInput
                            id="contactPerson"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleInputChange}
                            placeholder="Contact Person Name"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <FloatingInput
                        id="mobileNumber"
                        name="mobileNumber"
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        placeholder="Mobile Number"
                        required
                        maxLength={10}
                        prefix={
                            <div className="flex items-center gap-2">
                                <img src="/flag.svg" alt="India flag" className="w-6 h-4" />
                                +91
                            </div>
                        }
                    />
                    {formData.additionalMobileNumbers.map((number, index) => (
                        <div key={`mobile-${index}`} className="mt-6">
                            <FloatingInput
                                id={`additionalMobile-${index}`}
                                type="tel"
                                value={number}
                                onChange={(e) => handleAdditionalMobileChange(index, e.target.value)}
                                placeholder={`Additional Mobile Number ${index + 1}`}
                                maxLength={10}
                                prefix={
                                    <div className="flex items-center gap-2">
                                        <img src="/flag.svg" alt="India flag" className="w-6 h-4" />
                                        +91
                                    </div>
                                }
                            />
                        </div>
                    ))}
                    {formData.additionalMobileNumbers.length < 2 && (
                        <button 
                            type="button" 
                            onClick={handleAddMobileNumber}
                            className="text-blue-500 text-sm mt-6"
                        >
                            + Add Another Mobile Number
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    <FloatingInput
                        id="whatsappNumber"
                        name="whatsappNumber"
                        type="tel"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                        placeholder="WhatsApp Number"
                        required
                        maxLength={10}
                        disabled={sameAsMobile}
                        prefix={
                            <div className="flex items-center gap-2">
                                <img src="/flag.svg" alt="India flag" className="w-6 h-4" />
                                +91
                            </div>
                        }
                    />
                    <div className="mt-2">
                        <input
                            type="checkbox"
                            checked={sameAsMobile}
                            onChange={handleSameAsMobileChange}
                            className="rounded mr-2"
                        />
                        <span className="text-sm text-blue-500">Same As Mobile Number</span>
                    </div>
                    {formData.additionalWhatsappNumbers.map((number, index) => (
                        <div key={`whatsapp-${index}`} className="mt-6">
                            <FloatingInput
                                id={`additionalWhatsapp-${index}`}
                                type="tel"
                                value={number}
                                onChange={(e) => handleAdditionalWhatsappChange(index, e.target.value)}
                                placeholder={`Additional WhatsApp Number ${index + 1}`}
                                maxLength={10}
                                prefix={
                                    <div className="flex items-center gap-2">
                                        <img src="/flag.svg" alt="India flag" className="w-6 h-4" />
                                        +91
                                    </div>
                                }
                            />
                        </div>
                    ))}
                    {formData.additionalWhatsappNumbers.length < 2 && (
                        <button 
                            type="button" 
                            onClick={handleAddWhatsappNumber}
                            className="text-blue-500 text-sm mt-6"
                        >
                            + Add WhatsApp Number
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    {formData.landlineNumbers.map((number, index) => (
                        <div key={`landline-${index}`} className="mt-6">
                            <FloatingInput
                                id={`landline-${index}`}
                                type="tel"
                                value={number}
                                onChange={(e) => handleLandlineChange(index, e.target.value)}
                                placeholder={`Landline Number ${index + 1}`}
                                maxLength={11}
                            />
                        </div>
                    ))}
                    {formData.landlineNumbers.length < 1 && (
                        <button 
                            type="button" 
                            onClick={handleAddLandline}
                            className="text-blue-500 text-sm mt-6"
                        >
                            + Add Landline Number
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    <FloatingInput
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                    />
                    {formData.additionalEmails.map((email, index) => (
                        <div key={`email-${index}`} className="mt-6">
                            <FloatingInput
                                id={`additionalEmail-${index}`}
                                type="email"
                                value={email}
                                onChange={(e) => handleAdditionalEmailChange(index, e.target.value)}
                                placeholder={`Additional Email Address ${index + 1}`}
                            />
                        </div>
                    ))}
                    {formData.additionalEmails.length < 2 && (
                        <button 
                            type="button" 
                            onClick={handleAddEmail}
                            className="text-blue-500 text-sm mt-6"
                        >
                            + Add Another Email
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Save and Continue
                </button>
            </form>
        </div>
    );
};

export default ContactDetails;