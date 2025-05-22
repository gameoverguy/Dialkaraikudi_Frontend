import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Shipping Policy</h1>
          <p className="text-purple-100 mt-2">Last Updated: March 15, 2024</p>
        </div>

        <div className="px-8 py-6 space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">1. Service Delivery</h2>
            <div className="text-gray-600 space-y-3">
              <p>1.1 Service Activation:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Business listing services will be activated within 24 hours of successful payment</li>
                <li>Premium features will be enabled immediately after subscription confirmation</li>
                <li>Digital content delivery is automatic upon payment verification</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">2. Service Availability</h2>
            <div className="text-gray-600 space-y-3">
              <p>Our services are available:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>24/7 access to business listings and directory services</li>
                <li>Customer support: Monday to Saturday (9:00 AM - 6:00 PM IST)</li>
                <li>Technical support: Available during business hours</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">3. Service Area Coverage</h2>
            <div className="text-gray-600 space-y-3">
              <p>Our services are primarily available in:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Karaikudi and surrounding areas</li>
                <li>Selected regions within Tamil Nadu</li>
                <li>Service expansion to other regions will be announced separately</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">4. Service Activation Time</h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-700">Standard Activation Times:</p>
              <ul className="list-disc list-inside ml-4 text-blue-600 space-y-1">
                <li>Basic Listings: Within 24 hours</li>
                <li>Premium Listings: Within 12 hours</li>
                <li>Emergency Listings: Within 2-4 hours</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">5. Service Modifications</h2>
            <p className="text-gray-600 leading-relaxed">
              Changes to existing services will be processed within 24-48 hours of request submission. This includes:
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-600 space-y-2">
              <li>Business information updates</li>
              <li>Category changes</li>
              <li>Contact detail modifications</li>
              <li>Service description updates</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">6. Service Quality Guarantee</h2>
            <p className="text-gray-600 leading-relaxed">
              We are committed to maintaining high service quality standards. If you experience any issues with our services, our support team will address them within 24 hours of notification.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">7. Technical Support</h2>
            <div className="text-gray-600 space-y-3">
              <p>For technical assistance:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Email: support@dialkaraikudi.com</li>
                <li>Phone: +91 XXXXXXXXXX</li>
                <li>Live Chat: Available during business hours</li>
              </ul>
            </div>
          </section>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 text-center">
              This shipping/service delivery policy is subject to change. Users will be notified of any significant changes via email or platform notifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;