import React, { useState, useEffect } from 'react';
import { FaCheck, FaInfoCircle } from 'react-icons/fa';
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
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showMediaPopup, setShowMediaPopup] = useState(true);

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
      name: 'Home Page Banner',
      price: '₹1',
      amount: 1,
      features: [
        'Prime visibility on home page',
        'Large banner display',
        'High-impact placement',
        'Custom banner design support'
      ]
    },
    {
      name: 'Top Product',
      price: '₹800',
      amount: 800,
      features: [
        'Featured in top products section',
        'Priority product placement',
        'Enhanced product visibility',
        'Product highlights'
      ]
    },
    {
      name: 'Seasonal Product',
      price: '₹600',
      amount: 600,
      features: [
        'Seasonal campaign feature',
        'Targeted promotion',
        'Seasonal offers highlight',
        'Limited-time placement'
      ]
    },
    {
      name: 'Offered Product',
      price: '₹500',
      amount: 500,
      features: [
        'Special offers section',
        'Discount highlights',
        'Deal promotions',
        'Offer period flexibility'
      ]
    },
    {
      name: 'Limited Time Offers',
      price: '₹400',
      amount: 400,
      features: [
        '10-day intensive promotion',
        'Countdown timer feature',
        'Urgency messaging',
        'Flash sale promotion'
      ]
    },
    {
      name: 'Listing Page Banner',
      price: '₹700',
      amount: 700,
      features: [
        'Category page visibility',
        'Search results presence',
        'Custom banner placement',
        'Category targeting'
      ]
    },
    {
      name: 'Listing Page First',
      price: '₹900',
      amount: 900,
      features: [
        'Top position in listings',
        'Priority search results',
        'Category leadership',
        'Enhanced visibility'
      ]
    },
    {
      name: 'Brand Promotion',
      price: '₹1200',
      amount: 1200,
      features: [
        'Brand spotlight feature',
        'Logo prominence',
        'Brand story highlight',
        'Cross-platform promotion'
      ]
    },
    {
      name: 'Video Advertisement',
      price: '₹1500',
      amount: 1500,
      features: [
        'Video content display',
        'Prime video placement',
        'Multi-page visibility',
        'Extended duration'
      ]
    },
    {
      name: 'Popup Ads',
      price: '₹300',
      amount: 300,
      features: [
        'Strategic popup timing',
        'Custom targeting',
        'Mobile optimization',
        'Performance tracking'
      ]
    },
    {
      name: 'Ballon Ads',
      price: '₹300',
      amount: 300,
      features: [
        'Strategic popup timing',
        'Custom targeting',
        'Mobile optimization',
        'Performance tracking'
      ]
    },
    {
      name: 'Sticky Ads',
      price: '₹300',
      amount: 300,
      features: [
        'Strategic popup timing',
        'Custom targeting',
        'Mobile optimization',
        'Performance tracking'
      ]
    },
      ];

  const MediaRequirementsPopup = () => (
    <div className="fixed inset-0 bg-black/70  flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notice</h3>
        <div className="text-gray-600 space-y-3">
          <p>Please note the following regarding media content:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>After payment, we will upload your provided videos/images to the website</li>
            <li>If you have media content ready, please provide it to us</li>
            <li>If you don't have media content, our team will create high-quality images and videos</li>
            <li>The media content created by our team will be final and cannot be changed</li>
          </ul>
        </div>
        <button
          onClick={() => setShowMediaPopup(false)}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          I Understand
        </button>
      </div>
    </div>
  );

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

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: plan.amount * 100,
      currency: 'INR',
      name: 'DialKaraikudi',
      description: `Subscribe to ${plan.name} Plan`,
      handler: async function (response) {
        try {
          await updateSubscription({
            planName: plan.name,
            amount: plan.amount,
            isActive: true,
            paymentId: response.razorpay_payment_id,
            paymentTimestamp: new Date().toISOString()
          });

          setPaymentSuccess(true);
          setSelectedPlan(plan.name);
          toast.success('Payment successful!');
        } catch (error) {
          console.error('Payment update error:', error);
          toast.error('Payment verification failed');
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
      {showMediaPopup && <MediaRequirementsPopup />}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Advertisement Plans</h1>
          <p className="text-lg text-gray-600 mb-4">Choose the perfect advertising solution for your business</p>
          <button
            onClick={() => setShowDisclaimer(!showDisclaimer)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaInfoCircle />
            View Advertising Guidelines
          </button>
        </div>

        {showDisclaimer && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">Important Information:</h3>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>All advertisements are subject to review and approval</li>
              <li>Pricing is per advertisement slot for the specified duration</li>
              <li>Content must comply with our advertising policies</li>
              <li>Placement is subject to availability</li>
              <li>Refunds are not available for active advertisements</li>
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 
                ${selectedPlan === plan.name ? 'ring-2 ring-green-500 bg-green-50' : ''}`}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">{plan.price}</div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 text-sm">
                      <FaCheck className="text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 px-4 rounded-lg transition-colors duration-200 
                    ${selectedPlan === plan.name 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-700'} 
                    text-white font-semibold`}
                  onClick={() => handleSubscribe(plan)}
                  disabled={selectedPlan === plan.name}
                >
                  {selectedPlan === plan.name ? 'Active Plan' : (plan.price === 'Free' ? 'Get Started' : 'Add On')}
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
