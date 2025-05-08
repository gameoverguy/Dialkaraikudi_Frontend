import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const VendorSubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      features: [
        'List your business',
        'Basic business profile',
        'Contact information display'
      ]
    },
    {
      name: 'Home Page Ads',
      price: '₹200',
      features: [
        'All Basic features',
        'Advertisement on home page',
        'Enhanced visibility'
      ]
    },
    {
      name: 'Premium',
      price: '₹250',
      features: [
        'All Home Page Ads features',
        'Under home page placement',
        'Priority listing'
      ]
    },
    {
      name: 'Business Pro',
      price: '₹300',
      features: [
        'All Premium features',
        'Top business advertisement',
        'Featured placement'
      ]
    },
    {
      name: 'Ultimate',
      price: '₹500',
      features: [
        'All Business Pro features',
        'Video advertisements',
        'Premium support',
        'Maximum visibility'
      ]
    }
  ];

  const handleSubscribe = (plan) => {
    setCurrentPlan(plan);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    setSelectedPlan(currentPlan.name);
    
    setTimeout(() => {
      console.log('Payment successful for:', {
        planName: currentPlan.name,
        price: currentPlan.price,
        features: currentPlan.features
      });
      setShowPaymentModal(false);
      setPaymentSuccess(false);
    }, 2000);
  };

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Complete Payment</h3>
          <button 
            onClick={() => setShowPaymentModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <MdClose size={24} />
          </button>
        </div>

        {paymentSuccess ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4 text-green-500">✓</div>
            <h4 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h4>
            <p className="text-gray-600">Your subscription has been activated</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-6">
              <h4 className="font-bold mb-2">Scan QR Code to Pay</h4>
              <p className="text-gray-600 mb-4">Amount: {currentPlan?.price}</p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                {/* Replace with actual QR code image */}
                <div className="w-48 h-48 mx-auto bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">QR Code</p>
                </div>
              </div>
            </div>
            <button
              onClick={handlePaymentSuccess}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Confirm Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {showPaymentModal && <PaymentModal />}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600">Select the perfect advertising package for your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 
                ${selectedPlan === plan.name ? 'ring-2 ring-green-500 bg-green-50' : ''}`}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6">{plan.price}</div>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <FaCheck className="text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`mt-8 w-full py-2 px-4 rounded-lg transition-colors duration-200 
                    ${selectedPlan === plan.name ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} 
                    text-white`}
                  onClick={() => handleSubscribe(plan)}
                  disabled={selectedPlan === plan.name}
                >
                  {selectedPlan === plan.name ? 'Subscribed' : (plan.price === 'Free' ? 'Get Started' : 'Subscribe Now')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorSubscription;
