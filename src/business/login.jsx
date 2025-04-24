import React, { useState } from 'react'

const BusinessLogin = () => {
     const [mobileNumber, setMobileNumber] = useState('');
     
     const mobileRegex = /^(?!.*([0-9])\1{5,})[6-9][0-9]{9}$/;

     const handleMobileNumberChange = (e) => {
          const value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
          if (value.length <= 10) {
               setMobileNumber(value);
          }
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          if (mobileNumber.length === 10 && mobileRegex.test(mobileNumber)) {
               console.log('Mobile number submitted:', mobileNumber);
          } else {
               alert('Please enter a valid 10-digit mobile number starting with 6-9 and without repeating digits more than 5 times');
          }
     };

     return (
          <div className="max-w-5xl mx-auto p-8 min-h-screen flex items-center">
               <div className="w-full">
                    <div className="text-gray-600 mb-12 flex items-center gap-2">
                         <span className="hover:text-blue-500 cursor-pointer">Home</span>
                         <span className="text-gray-400">›</span>
                         <span className="text-blue-500">Free Business Listing</span>
                    </div>

                    <div className="space-y-12">
                         <div className="text-center md:text-left">
                              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                                   List Your Business <span className="text-blue-500 inline-block">for FREE</span>
                              </h1>
                              <h2 className="text-xl md:text-3xl text-gray-600">
                                   with India's No. 1 Local Search Engine
                              </h2>
                         </div>

                         <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                              <div className="flex-1 flex items-center border-2 rounded-xl p-4 hover:border-blue-500 transition-colors">
                                   <div className="flex items-center gap-3 pr-4 border-r-2">
                                        <img
                                             src="public/flag.svg"
                                             alt="India flag"
                                             className="w-8 h-5 shadow-sm"
                                        />
                                        <span className="text-gray-700 font-medium">+91</span>
                                   </div>
                                   <input
                                        type="tel"
                                        inputMode="numeric"
                                        value={mobileNumber}
                                        onChange={handleMobileNumberChange}
                                        placeholder="Enter Mobile No."
                                        pattern="[0-9]{10}"
                                        required
                                        className="flex-1 ml-4 outline-none text-lg"
                                   />
                              </div>
                              <button
                                   type="submit"
                                   className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-lg text-lg font-medium"
                              >
                                   Start Now <span className="text-2xl">→</span>
                              </button>
                         </form>

                         <div className="space-y-8 mt-16 bg-gray-50 p-8 rounded-2xl">
                              <div className="flex items-center gap-6">
                                   <span className="text-green-500 text-3xl bg-green-50 p-2 rounded-full">✓</span>
                                   <p className="text-xl text-gray-700 font-medium">
                                        Get Discovered & Create Your Online Business
                                   </p>
                              </div>
                              <div className="flex items-center gap-6">
                                   <span className="text-green-500 text-3xl bg-green-50 p-2 rounded-full">✓</span>
                                   <p className="text-xl text-gray-700 font-medium">
                                        Respond to Customer Reviews & Questions
                                   </p>
                              </div>
                              <div className="flex items-center gap-6">
                                   <span className="text-green-500 text-3xl bg-green-50 p-2 rounded-full">✓</span>
                                   <p className="text-xl text-gray-700 font-medium">
                                        Showcase Your Product & Service Offerings
                                   </p>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default BusinessLogin;