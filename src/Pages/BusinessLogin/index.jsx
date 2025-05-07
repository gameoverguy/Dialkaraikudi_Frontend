// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { API } from '../../../config/config';

// const LoginBusiness = () => {
//     const [activeTab, setActiveTab] = useState('user');
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleInputChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//         setError('');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');

//         try {
//             const endpoint = activeTab === 'user' ? '/users/login' : '/business/login';
//             const response = await axios.post(`${API}${endpoint}`, formData);

//             if (response.data.success) {
//                 sessionStorage.setItem('userData', JSON.stringify(response.data.data));
//                 sessionStorage.setItem('userType', activeTab);
//                 if (activeTab === 'business') {
//                     navigate('/business/dashboard');
//                 } else {
//                     navigate('/');
//                 }
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || 'Login failed. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
//             <Link 
//                 to="/"
//                 className="fixed top-8 left-8 bg-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-blue-600 font-medium border border-blue-100"
//             >
//                 Back to Home
//             </Link>

//             <div className="max-w-md w-full">
//                 <div className="bg-white p-8 rounded-3xl shadow-2xl transform transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
//                     <div className="text-center mb-10">
//                         <h2 className="text-3xl font-bold text-gray-900 mb-3">
//                             Welcome Back
//                         </h2>
//                         <p className="text-gray-600">
//                             Please sign in to your account
//                         </p>
//                     </div>

//                     <div className="bg-gray-100 p-1.5 rounded-2xl mb-10">
//                         <div className="grid grid-cols-2 gap-1.5">
//                             <button
//                                 className={`py-3.5 px-4 text-sm font-medium rounded-xl transition-all duration-300
//                                     ${activeTab === 'user'
//                                         ? 'bg-white text-blue-600 shadow-lg'
//                                         : 'text-gray-600 hover:bg-gray-50'
//                                     }`}
//                                 onClick={() => setActiveTab('user')}
//                             >
//                                 User Login
//                             </button>
//                             <button
//                                 className={`py-3.5 px-4 text-sm font-medium rounded-xl transition-all duration-300
//                                     ${activeTab === 'business'
//                                         ? 'bg-white text-blue-600 shadow-lg'
//                                         : 'text-gray-600 hover:bg-gray-50'
//                                     }`}
//                                 onClick={() => setActiveTab('business')}
//                             >
//                                 Business Login
//                             </button>
//                         </div>
//                     </div>

//                     <form className="space-y-8" onSubmit={handleSubmit}>
//                         <div className="space-y-6">
//                             <div className="relative">
//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     required
//                                     className="w-full px-4 pt-6 pb-2 border bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
//                                     value={formData.email}
//                                     onChange={handleInputChange}
//                                     placeholder=" "
//                                 />
//                                 <label 
//                                     htmlFor="email"
//                                     className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
//                                 >
//                                     Email Address
//                                 </label>
//                             </div>
//                             <div className="relative">
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type="password"
//                                     required
//                                     className="w-full px-4 pt-6 pb-2 border bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
//                                     value={formData.password}
//                                     onChange={handleInputChange}
//                                     placeholder=" "
//                                 />
//                                 <label 
//                                     htmlFor="password"
//                                     className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
//                                 >
//                                     Password
//                                 </label>
//                             </div>
//                         </div>

//                         {error && (
//                             <div className="bg-red-50 text-red-500 text-sm text-center p-4 rounded-xl border border-red-100">
//                                 {error}
//                             </div>
//                         )}

//                         <button
//                             type="submit"
//                             disabled={isLoading}
//                             className={`w-full py-4 px-6 rounded-xl text-white font-medium transition-all duration-300
//                                 ${isLoading
//                                     ? 'bg-blue-400 cursor-not-allowed'
//                                     : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0'
//                                 }`}
//                         >
//                             {isLoading ? 'Signing in...' : 'Sign in'}
//                         </button>

//                         <div className="text-center">
//                             <Link 
//                                 to="/register" 
//                                 className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
//                             >
//                                 Don't have an account? Register here
//                             </Link>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginBusiness;