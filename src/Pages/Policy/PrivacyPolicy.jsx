import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="text-blue-100 mt-2">Last Updated: March 15, 2024</p>
        </div>

        <div className="px-8 py-6 space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
            <div className="text-gray-600 space-y-3">
              <p className="font-medium">1.1 Personal Information</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Billing and payment information</li>
                <li>Location data (with your consent)</li>
                <li>Device information and IP address</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
            <div className="text-gray-600 space-y-3">
              <p>We use your information to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Provide and improve our services</li>
                <li>Process your transactions</li>
                <li>Send you important updates and notifications</li>
                <li>Personalize your experience</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">3. Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-600 space-y-2">
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
              <li>Business partners with your consent</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">4. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security assessments.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">5. Your Rights</h2>
            <div className="text-gray-600 space-y-3">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with supervisory authorities</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">6. Cookies and Tracking</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">7. Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13 years of age.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">8. Changes to Privacy Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this privacy policy periodically. We will notify you of any material changes through our platform or via email.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">9. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this privacy policy or our practices, please contact us at:
              <br />
              Email: privacy@dialkaraikudi.com
              <br />
              Phone: +91 XXXXXXXXXX
            </p>
          </section>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 text-center">
              This privacy policy was last updated on March 15, 2024. By using our services, you agree to the terms of this privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;