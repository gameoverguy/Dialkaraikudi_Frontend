import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { API } from '../../../../config/config';
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const VendorSubscription = () => {
  const { id } = useParams();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [businessData, setBusinessData] = useState(null);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get(`${API}/business/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('businessToken')}`,
          },
        });
        setBusinessData(response.data);
        if (response.data.subscription?.planName) {
          setSelectedPlan(response.data.subscription.planName);
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
        toast.error('Failed to fetch business details');
      }
    };

    fetchBusinessData();

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [id]);

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
      amount: 200,
      features: [
        'All Basic features',
        'Advertisement on home page',
        'Enhanced visibility'
      ]
    },
    {
      name: 'Premium',
      price: '₹250',
      amount: 250,
      features: [
        'All Home Page Ads features',
        'Under home page placement',
        'Priority listing'
      ]
    },
    {
      name: 'Business Pro',
      price: '₹300',
      amount: 300,
      features: [
        'All Premium features',
        'Top business advertisement',
        'Featured placement'
      ]
    },
    {
      name: 'Ultimate',
      price: '₹500',
      amount: 500,
      features: [
        'All Business Pro features',
        'Video advertisements',
        'Premium support',
        'Maximum visibility'
      ]
    }
  ];

  const handleSubscribe = async (plan) => {
    if (plan.price === 'Free') {
      try {
        await updateSubscription({
          planName: plan.name,
          amount: 0,
          isActive: true,
          paymentId: 'free_plan'
        });
        setSelectedPlan(plan.name);
        toast.success('Successfully subscribed to Free plan');
      } catch (error) {
        toast.error('Failed to subscribe to Free plan');
      }
      return;
    }

    // In the options object, update the handler function:
    
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: plan.amount * 100,
      currency: 'INR',
      name: 'DialKaraikudi',
      description: `Subscribe to ${plan.name} Plan`,
      handler: async function (response) {
        try {
          // Log the complete Razorpay response
          console.log('Razorpay Payment Response:', {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            fullResponse: response
          });         
    
          await updateSubscription({
            planName: plan.name,
            amount: plan.amount,
            isActive: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            paymentTimestamp: new Date().toISOString()
          });
    
          setPaymentSuccess(true);
          setSelectedPlan(plan.name);
          toast.success('Payment successful!');
          setTimeout(() => {
            setShowPaymentModal(false);
            setPaymentSuccess(false);
          }, 2000);
        } catch (error) {
          console.error('Payment update error:', error);
          toast.error('Failed to update subscription');
        }
      },
      prefill: {
        name: businessData?.businessName || '',
        email: businessData?.email || '',
      },
      theme: {
        color: '#2563EB'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const updateSubscription = async (subscriptionData) => {
    try {
      const response = await axios.put(`${API}/business/${id}`, subscriptionData, );
       setBusinessData(response.data);
      console.log(response.data, `${API}/business/${id}`);
      
    } catch (error) {
      console.error('Subscription update error:', error);
      throw error;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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
