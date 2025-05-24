import React from 'react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6 sm:py-8 text-white">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-2">Privacy Policy</h1>
          <p className="text-blue-100 text-center text-md sm:text-lg font-light">Last Updated: May 24, 2025</p>
        </div>

        {/* Content Section */}
        <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-8">

          <p className="text-gray-700 leading-relaxed text-base">
            At Dial Karaikudi, your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website, mobile site, or contact us in any other way. By using our services, you agree to the terms outlined in this policy.
          </p>

          {/* Information We Collect */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">1.</span> Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              We may collect the following types of personal and business-related information from you:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5 text-base">
              <li>Name, mobile number, email ID</li>
              <li>Business name, address, service category</li>
              <li>User-generated content (e.g., reviews, comments, listings)</li>
              <li>Communication history with other users or with us</li>
              <li>IP address, browser info, device type (for analytics)</li>
              <li>Location (if you allow GPS or enter it manually)</li>
              <li>Uploaded documents or images (for listings)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed text-base">
              We do not collect passwords, Aadhaar, PAN, or financial information unless explicitly needed for service (e.g., business verification).
            </p>
          </section>

          {/* How We Use Your Information */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">2.</span> How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              We use your data to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5 text-base">
              <li>Create and manage your user/business account</li>
              <li>Display your business or service to potential customers</li>
              <li>Match users with relevant service providers or businesses</li>
              <li>Send service-related alerts, emails, or SMS</li>
              <li>Improve user experience and protect against fraud</li>
              <li>Respond to queries, reviews, or support requests</li>
              <li>Analyse traffic and usage patterns (via analytics tools)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed text-base">
              We do not sell your personal information to third parties.
            </p>
          </section>

          {/* Sharing of Information */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">3.</span> Sharing of Information
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              We may share your information only under the following conditions:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5 text-base">
              <li>With other users, to fulfil service inquiries (e.g., lead sharing)</li>
              <li>With third-party service providers (e.g., SMS gateway, analytics)</li>
              <li>When legally required by government or law enforcement</li>
              <li>If you give us direct permission to share your data</li>
            </ul>
            <p className="text-gray-700 leading-relaxed text-base">
              We make sure that any third party we work with follows strict privacy standards.
            </p>
          </section>

          {/* Cookies and Tracking Tools */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">4.</span> Cookies and Tracking Tools
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              We use cookies and tools like Google Analytics to collect technical data:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5 text-base">
              <li>Cookies help us remember your login or preferences</li>
              <li>Analytics tools help us improve site performance</li>
            </ul>
            <p className="text-gray-700 leading-relaxed text-base">
              You can disable cookies in your browser, but some features may not work. We do not track you outside our website or use cookies for spying.
            </p>
          </section>

          {/* Data Storage and Security */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">5.</span> Data Storage and Security
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              Your data is stored securely on servers with limited access. We take reasonable steps to protect your information from loss, misuse, or unauthorized access. However, no system is 100% secure, so we cannot guarantee absolute security.
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              Please keep your account login details confidential. If you suspect unauthorized activity, inform us immediately.
            </p>
          </section>

          {/* User Rights and Choices */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">6.</span> User Rights and Choices
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              As a user, you can:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5 text-base">
              <li>View or update your personal details from your dashboard</li>
              <li>Request account deletion by emailing us</li>
              <li>Choose to opt out of SMS/email marketing (via unsubscribe link)</li>
              <li>Disable cookies via your browser settings</li>
            </ul>
            <p className="text-gray-700 leading-relaxed text-base">
              If you'd like a copy of your data or want it erased, contact us at the details below.
            </p>
          </section>

          {/* Data of Minors */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">7.</span> Data of Minors
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              Our platform is meant for adults and businesses. We do not knowingly collect data from users under 18 years of age. If you believe a child has shared personal information with us, please contact us so we can remove it.
            </p>
          </section>

          {/* Links to Other Sites */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">8.</span> Links to Other Sites
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              Our website may contain links to other websites or services. This Privacy Policy applies only to Dial Karaikudi. We are not responsible for the privacy practices of third-party websites.
            </p>
          </section>

          {/* Policy Updates */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">9.</span> Policy Updates
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              We may change this Privacy Policy at any time. Updates will be posted on this page, and the "Effective Date" will be revised. Please check back periodically. Continued use of the website after updates means you accept the new policy.
            </p>
          </section>

          {/* Contact Us */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">10.</span> Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              If you have questions or concerns about this Privacy Policy, or if you want to update/delete your data, please reach out:
            </p>
            <div className="bg-blue-50 p-5 rounded-lg shadow-inner text-base space-y-3">
              <p className="text-gray-800 flex items-center">
                <MdEmail className="mr-3 text-blue-600 text-xl" /> Email: admin@dialkaraikudi.com
              </p>
              <p className="text-gray-800 flex items-center">
                <MdPhone className="mr-3 text-blue-600 text-xl" /> Phone: +919442338670
              </p>
              <p className="text-gray-800 flex items-center">
                <MdLocationOn className="mr-3 text-blue-600 text-xl" /> Address: No.8 Dial Karaikudi Muthoorani East, Muthupattinam Karaikudi – 630 001
              </p>
            </div>
          </section>

          {/* Footer Acknowledgment */}
          <div className="mt-10 p-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg">
            <p className="text-center text-base sm:text-lg font-medium">
              This privacy policy was last updated on May 24, 2025. By using our services, you agree to the terms of this privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;