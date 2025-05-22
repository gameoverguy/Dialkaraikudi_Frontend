import React from 'react';

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Cancellation Policy</h1>
          <p className="text-red-100 mt-2">Last Updated: March 15, 2024</p>
        </div>

        <div className="px-8 py-6 space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">1. Subscription Cancellation</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-700 font-medium">Important Notice:</p>
              <p className="text-yellow-600">
                No refunds will be provided for cancellations after the first month of subscription.
              </p>
            </div>
            <div className="text-gray-600 space-y-3">
              <p>1.1 Cancellation Terms:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Subscriptions can be cancelled at any time through your account settings</li>
                <li>Access to services will continue until the end of the current billing period</li>
                <li>No partial refunds are provided for unused periods</li>
                <li>Cancellation will take effect from the next billing cycle</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">2. Refund Policy</h2>
            <div className="text-gray-600 space-y-3">
              <p>2.1 No Refund Policy:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Subscription fees are non-refundable after the first month</li>
                <li>Initial 30-day period is final and binding</li>
                <li>No exceptions will be made for partial or unused services</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">3. Cancellation Process</h2>
            <div className="text-gray-600 space-y-3">
              <p>To cancel your subscription:</p>
              <ol className="list-decimal list-inside ml-4 space-y-2">
                <li>Log in to your account</li>
                <li>Navigate to Account Settings</li>
                <li>Select 'Subscription Management'</li>
                <li>Click on 'Cancel Subscription'</li>
                <li>Confirm your cancellation</li>
              </ol>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">4. Service Access After Cancellation</h2>
            <p className="text-gray-600 leading-relaxed">
              After cancellation, you will continue to have access to the service until the end of your current billing period. No new charges will be applied after the cancellation is processed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">5. Special Circumstances</h2>
            <p className="text-gray-600 leading-relaxed">
              In cases of technical issues or service unavailability from our end, please contact our support team. Each case will be reviewed individually, but this does not guarantee a refund.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">6. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed">
              For any questions about our cancellation policy, please contact us at:
              <br />
              Email: support@dialkaraikudi.com
              <br />
              Phone: +91 XXXXXXXXXX
            </p>
          </section>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 text-center">
              By subscribing to our services, you acknowledge and agree to these cancellation terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;