import React from 'react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6 sm:py-8 text-white">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-2">Terms and Conditions</h1>
          <p className="text-blue-100 text-center text-md sm:text-lg font-light">Last Updated: March 15, 2024</p>
        </div>

        {/* Content Section */}
        <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-8">

          {/* Service Overview */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">1.</span> Service Overview
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              Welcome to our platform! We're a service listing and information portal designed to help you find local businesses and service providers easily. Think of us as a bridge connecting you with plumbers, electricians, tutors, caterers, and a host of other professionals. While we strive to present accurate and updated information, please understand that we don't directly provide these services, nor do we control how they're delivered.
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              We do our best to ensure details like phone numbers, prices, and business hours are correct, but we can't guarantee their constant accuracy. We highly recommend you verify these details independently before engaging any service. Our website serves purely as an informational and connection tool. We are not responsible for any dealings, contracts, or issues that may arise between you and a service provider listed on our platform. Your use of our site is at your own discretion.
            </p>
          </section>

          {/* User Responsibilities */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">2.</span> User Responsibilities
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              As a user, you agree to interact with our platform respectfully, lawfully, and honestly. You're responsible for all activity under your account. If you sign up or submit a listing, ensure all information is correct, up-to-date, and not misleading.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5 text-base">
              <li>Do not use false identities, impersonate others, or provide fake reviews or comments.</li>
              <li>Do not upload content that is abusive, illegal, offensive, pornographic, or misleading.</li>
              <li>Any activity that compromises the safety, integrity, or smooth operation of our website is strictly prohibited. This includes attempting to hack the site, bypass security measures, or interfere with other users.</li>
              <li>Keep your login credentials safe. If you notice any suspicious activity in your account or on the website, please report it to us immediately.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed text-base">
              We reserve the right to revoke your access if these rules are violated. By using this site, you accept full responsibility for your actions here.
            </p>
          </section>

          {/* Third-Party Links and External Services */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">3.</span> Third-Party Links and External Services
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              Our website may contain links to external websites, mobile apps, or services not owned or controlled by us. These are "third-party" services. For example, clicking a business's website or social media link will redirect you to a different site.
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              We have no control over the content, privacy policies, or business practices of these external sites. Once you leave our site, we are not responsible for what happens on the third-party website. Any information you provide or payments you make on those sites are entirely at your own risk. We strongly advise you to read the terms and privacy policy of any third-party site before sharing personal details or proceeding with any transaction. We are not liable for any loss or damage resulting from your interaction with these external services.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">4.</span> Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              Everything on our website &mdash; including text, logos, graphics, images, layouts, and the site's design &mdash; is either our property or used with proper legal permission. These materials are protected under copyright and intellectual property laws.
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              This means you cannot copy, download, share, publish, or modify any part of this website for personal or commercial use without our written permission. This includes our name, branding, content structure, and listing style. If we find unauthorized use of our material, we reserve the right to take legal action. If you believe any content on this site violates your copyright or rights, please contact us with proof, and we will investigate and take appropriate action. Always respect intellectual property, just as you expect others to respect yours.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">5.</span> Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              We provide this platform "as is," meaning we offer its features and services to the best of our ability, but we make no promises or guarantees about perfection. We are not responsible for any damages or losses incurred from using our website or the services listed here.
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              For example, if a service provider delays work, performs poorly, or takes your payment and disappears, we are not liable. Similarly, we are not responsible for any loss you face due to errors in listing information (e.g., wrong address, outdated phone number) or if the website is temporarily unavailable due to maintenance or technical issues.
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              You use our website at your own risk, and any agreements between you and a service provider are your personal responsibility. We also do not guarantee that the website will always be free of bugs, viruses, or technical issues. If you are dissatisfied with any part of the site, your sole remedy is to discontinue its use.
            </p>
          </section>

          {/* Changes to These Terms */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">6.</span> Changes to These Terms
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              We may update or change these Terms and Conditions whenever necessary, especially when we add new features or services. We are not obligated to provide advance notice, but when changes are made, we will update this page. It is your responsibility to review this page regularly.
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              Your continued use of the site after changes are made signifies your acceptance of the new terms. We recommend checking this section every few months, especially if you are a frequent user or business partner. These updates may include changes to user rules, legal rights, or platform features. If you disagree with the changes, you should stop using the website immediately. The most recent version of the Terms and Conditions will always be available on this page for your reference.
            </p>
          </section>

          {/* Governing Law and Jurisdiction */}
          <section className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">7.</span> Governing Law and Jurisdiction
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              All legal matters related to this website, including its use, policies, services, and users, are governed by the laws of India. Any legal dispute must be handled under Indian law and in an Indian court. The specific jurisdiction will be in Karaikudi, Tamil Nadu, where our business is registered or operated.
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              You agree that in case of a dispute, you will cooperate with us in legal processes and not file complaints in foreign courts or under other legal systems. This section ensures fairness, legal clarity, and proper conflict resolution. You also agree that any claims must be made within a reasonable time. If you have legal concerns, we suggest discussing them with a qualified legal advisor.
            </p>
          </section>

          {/* Contact Us */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-3 text-2xl">8.</span> Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              If you have any questions about these Terms and Conditions, or if you encounter any problems while using the website, please don't hesitate to contact us. We're happy to clarify anything or assist you with any site-related issues.
            </p>
            <div className="bg-blue-50 p-5 rounded-lg shadow-inner text-base space-y-3">
              <p className="text-gray-800 flex items-center">
                <span className="mr-3 text-blue-600"><MdEmail/></span> Email: admin@dialkaraikudi.com
              </p>
              <p className="text-gray-800 flex items-center">
                <span className="mr-3 text-blue-600"><MdPhone/></span> Phone: 9442338670
              </p>
              <p className="text-gray-800 flex items-center">
                <span className="mr-3 text-blue-600"><MdLocationOn /></span> Address: No.8 Dial Karaikudi Muthoorani East, Muthupattinam Karaikudi – 630 001
              </p>
            </div>
          </section>

          {/* Footer Acknowledgment */}
          <div className="mt-10 p-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg">
            <p className="text-center text-base sm:text-lg font-medium">
              By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;