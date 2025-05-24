import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import FloatingInput from '../../Components/FloatingInput';
import FloatingTextarea from '../../Components/FloatingInput/FloatingTextarea';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const contactInfo = [
    {
      icon: <FaPhone className="w-6 h-6" />,
      title: "Phone",
      content: "+91 123-456-7890",
      link: "tel:+911234567890"
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: "Email",
      content: "info@dialkaraikudi.com",
      link: "mailto:info@dialkaraikudi.com"
    },
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      title: "Location",
      content: "Karaikudi, Tamil Nadu",
      link: "https://maps.google.com"
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, link: "#", label: "Facebook" },
    { icon: <FaTwitter />, link: "#", label: "Twitter" },
    { icon: <FaInstagram />, link: "#", label: "Instagram" }
  ];

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value) {
          error = 'Name is required';
        } else if (value.length < 3) {
          error = 'Name must be at least 3 characters';
        } else if (value.length > 25) {
          error = 'Name must not exceed 25 characters';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = 'Email is required';
        } else if (value.length < 10) {
          error = 'Email must be at least 10 characters';
        } else if (value.length > 50) {
          error = 'Email must not exceed 50 characters';
        } else if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'subject':
        if (!value) {
          error = 'Subject is required';
        }
        break;
      case 'message':
        if (!value) {
          error = 'Message is required';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    let hasErrors = false;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        hasErrors = true;
        newErrors[key] = error;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    console.log('Form Data:', formData);
    setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={fadeIn.transition}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-purple-600">Us</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help! Reach out to us through any of the following channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FloatingInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                maxLength={25}
                error={errors.name}
              />
              <FloatingInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                maxLength={50}
                error={errors.email}
              />
              <FloatingInput
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                error={errors.subject}
              />
              <FloatingTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                error={errors.message}
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-purple-600 text-white py-3 rounded-lg font-semibold ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-700'
                }`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
              
              {submitStatus && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center text-sm ${
                    submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {submitStatus.message}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-gray-600">{info.content}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Map Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Find Us</h3>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
                {/* Add your map component or iframe here */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Map placeholder
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    className="text-gray-600 hover:text-purple-600 text-2xl"
                    whileHover={{ scale: 1.2 }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;