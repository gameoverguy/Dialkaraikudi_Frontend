import React from 'react';
import { FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa'; // Import the necessary icons

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Refund and Cancellation Policy</h1>
          <p className="text-purple-100 mt-2">Company Name: Dial Karaikudi</p>
          <p className="text-purple-100">Website: www.dialkaraikudi.com</p>
          <p className="text-purple-100 mt-2 text-sm">Last Updated: May 24, 2025</p>
        </div>

        <div className="px-8 py-6 space-y-8 text-gray-700">
          <p>
            This Refund and Cancellation Policy outlines the rules and procedures related to payment cancellations, plan upgrades, and refunds for vendors, advertisers, or users who purchase paid services on our platform.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">1. Free vs. Paid Services</h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Basic listing and Browse services are free.</li>
              <li>Premium features such as featured listings, top search placement, lead access, and ad space are paid and come under different plans/packages.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">2. No Refund for Activated Services</h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <p className="font-medium text-red-700">Important Notice:</p>
              <p className="text-red-600">
                Once a paid plan is activated and services are delivered (like your listing going live, leads shared, or ads displayed), no refund will be issued.
              </p>
            </div>
            <p>Refunds will not be considered in cases where:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>You change your mind after purchase</li>
              <li>You fail to use the services after activation</li>
              <li>You are not satisfied with lead quality (we do not guarantee conversion)</li>
              <li>Delays caused by incomplete or incorrect information from your side</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">3. Cancellation Before Activation</h2>
            <p>
              If you cancel your premium plan before the listing or service is activated, you may be eligible for a partial or full refund, depending on the situation. You must email us at admin@dialkaraikudi.com within 24 hours of payment to request a cancellation.
            </p>
            <p>Refund requests will be evaluated case-by-case.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">4. Incorrect/Duplicate Payment</h2>
            <p>
              If you accidentally make a duplicate payment, we will initiate a full refund for the extra amount, after verifying payment logs. Please contact us with payment proof within 3 working days.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">5. Service Non-Activation</h2>
            <p>
              If for any reason we are unable to activate your premium services within 7 working days of payment (due to internal error), we will issue a 100% refund or offer to reschedule the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">6. Lead Packages & No Guarantee Clause</h2>
            <p>
              Dial Karaikudi does not guarantee business conversions from shared leads. Leads are based on user queries, and results may vary. Refunds cannot be requested for leads that do not convert or are inactive.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">7. Processing Timeline</h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Approved refunds will be processed within 7–10 business days.</li>
              <li>Refunds will be made to the original payment method (bank account, UPI, or card).</li>
              <li>In case of delay, please contact our support.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">8. How to Request a Refund or Cancellation</h2>
            <p>To request a refund or cancel a service, email us at:</p>
            <p className="font-semibold flex items-center space-x-2">
              <FaEnvelope className="text-purple-600" /> <span>admin@dialkaraikudi.com</span>
            </p>
            <p>Include the following:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Registered name & phone number</li>
              <li>Invoice number / Payment ID</li>
              <li>Reason for refund or cancellation</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">9. Policy Updates</h2>
            <p>
              We may update this Refund and Cancellation Policy at any time. Updated versions will be posted on our website. Continued use of paid services after changes implies acceptance of the revised policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">10. Contact Information</h2>
            <p>If you have questions regarding this policy, please contact us:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-purple-600" /> <span>Email: admin@dialkaraikudi.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-purple-600" /> <span>Phone: 9442338670</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaBuilding className="text-purple-600" /> <span>Address: No.8 Dial Karaikudi Muthoorani East, Muthupattinam Karaikudi – 630 001</span>
              </li>
            </ul>
          </section>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 text-center">
              By purchasing and using our services, you acknowledge and agree to the terms outlined in this Refund and Cancellation Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;