import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Terms and Conditions</h1>
          <p className="text-green-100 mt-2">Last Updated: March 15, 2024</p>
        </div>

        <div className="px-8 py-6 space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Dialkaraikudi. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms. Please read them carefully before proceeding.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">2. Definitions</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>"Platform" refers to the Dialkaraikudi website and mobile applications</li>
              <li>"User" refers to any person who accesses or uses our platform</li>
              <li>"Services" refers to all services provided through our platform</li>
              <li>"Content" refers to all information and materials available on our platform</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">3. User Accounts</h2>
            <div className="text-gray-600 space-y-3">
              <p>3.1. Account Creation</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Users must provide accurate and complete information when creating an account</li>
                <li>Users are responsible for maintaining the confidentiality of their account credentials</li>
                <li>Users must be at least 18 years old to create an account</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">4. User Responsibilities</h2>
            <div className="text-gray-600 space-y-3">
              <p>Users agree to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Use the platform in compliance with all applicable laws and regulations</li>
                <li>Not engage in any fraudulent or misleading activities</li>
                <li>Respect the intellectual property rights of others</li>
                <li>Not interfere with the proper functioning of the platform</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">5. Service Usage</h2>
            <div className="text-gray-600 space-y-3">
              <p>5.1. Service Availability</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>We strive to maintain platform availability but do not guarantee uninterrupted access</li>
                <li>We reserve the right to modify or discontinue services without prior notice</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">6. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All content on the platform, including but not limited to text, graphics, logos, and software, is the property of Dialkaraikudi and is protected by intellectual property laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">7. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              Dialkaraikudi shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform or services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">8. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of modified terms.
            </p>
          </section>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 text-center">
              By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;