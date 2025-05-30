import React from 'react';

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-[#FD9D00]/10 flex flex-col justify-center">
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
        <p className="text-[#FD9D00] mb-2 font-semibold">Effective Date: 03-May-2025</p>
        <p className="mb-4 text-gray-700">sawaRI is committed to protecting the privacy of users of our website and services related to instant rides, cab booking, and parcel pick-up and delivery.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">1. Information We Collect</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>Personal Identification Information: Name, contact number, email address, address, and government-issued identification (if required by law).</li>
          <li>Location Data: Real-time GPS-based location tracking for ride and parcel routing.</li>
          <li>Device Information: Device type, OS, IP address, and browsing activity on our website.</li>
          <li>Payment Information: Transaction details, payment method (processed securely via third-party payment gateways).</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>Facilitate and improve ride, cab, and parcel delivery services.</li>
          <li>Send ride updates, transaction confirmations, and notifications.</li>
          <li>Ensure safety, detect fraud, and enforce our terms.</li>
          <li>Improve user experience, analytics, and service offerings.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">3. Data Sharing & Disclosure</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>We do not sell your personal data. However, we may share information:</li>
          <li>With verified service partners (drivers, delivery agents).</li>
          <li>With legal authorities if required under Indian law.</li>
          <li>With third-party tools for analytics, notifications, and payments — in compliance with applicable data protection regulations.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">4. Cookies and Tracking</h2>
        <p className="mb-4 text-gray-700">We use cookies to enhance your user experience and analyze website traffic. You can manage cookie preferences through your browser settings.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">5. Data Security</h2>
        <p className="mb-4 text-gray-700">We implement industry-standard encryption, access controls, and secure data storage practices to safeguard your information.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">6. Your Rights</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>Access or correct your personal data.</li>
          <li>Withdraw consent for certain data uses.</li>
          <li>Request deletion of your data (subject to legal obligations).</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">7. Children's Privacy</h2>
        <p className="mb-4 text-gray-700">Our services are not intended for individuals under 18 years of age. We do not knowingly collect data from minors.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">8. Changes to This Policy</h2>
        <p className="mb-4 text-gray-700">We reserve the right to update this Privacy Policy. Any changes will be posted with a revised "Effective Date".</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">9. Contact Us</h2>
        <p className="mb-2 text-gray-700">For questions or concerns regarding your privacy, contact us at:</p>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>Email: <a href="mailto:support@sawarisewa.in" className="text-blue-600 underline">support@sawarisewa.in</a></li>
          <li>Address: New Delhi, Bhopal</li>
        </ul>
        <div className="flex justify-center mt-8">
          <a href="/" className="inline-block px-6 py-2 bg-[#FD9D00] text-white font-semibold rounded-lg shadow hover:bg-[#fd9d00]/90 transition">Back to Home</a>
        </div>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy; 