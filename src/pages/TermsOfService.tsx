import React from 'react';

const TermsOfService = () => (
  <div className="min-h-screen bg-[#FD9D00]/10 flex flex-col justify-center">
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Terms of Service</h1>
        <p className="text-[#FD9D00] mb-2 font-semibold">Effective Date: 03-May-2025</p>
        <p className="mb-4 text-gray-700">These Terms of Service govern your use of sawaRI's website and related services for ride-hailing, cabs, and parcel pick-up/delivery in India. By accessing or using our services, you agree to be bound by these Terms.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">1. Eligibility</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>You must be at least 18 years old and legally capable to enter into contracts under Indian law to use our services.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">2. User Obligations</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>You must provide accurate information during registration and while using the service.</li>
          <li>You agree to use the services only for lawful purposes.</li>
          <li>You shall not abuse, harass, or endanger the safety of drivers or other users.</li>
          <li>Misuse of the platform, including fake bookings, may result in suspension or legal action.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">3. Service Terms</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>Services include real-time cab booking, instant rides, and parcel pick-up/drop.</li>
          <li>We act as an aggregator platform and do not own the vehicles or employ drivers directly.</li>
          <li>Availability of services is subject to location, weather, network, and other operational conditions.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">4. Pricing and Payments</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>Fares are calculated dynamically based on distance, time, location, and other factors.</li>
          <li>Payments are accepted via UPI, cards, wallets, and other RBI-compliant gateways.</li>
          <li>All charges are inclusive of applicable taxes unless otherwise stated.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">5. Cancellation and Refunds</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>Cancellation fees may apply for late or unjustified cancellations.</li>
          <li>Refunds for failed rides or disputes will be processed as per our internal review and standard turnaround timelines.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">6. Limitation of Liability</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>We shall not be liable for delays, failures, or any indirect, incidental, or consequential damages resulting from use of the platform.</li>
          <li>Our maximum liability under any circumstance shall be limited to the total amount paid by you for the disputed transaction.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">7. Account Termination</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>We reserve the right to suspend or terminate accounts for breach of these Terms or any applicable laws.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">8. Governing Law</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>These Terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts located in India.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">9. Changes to Terms</h2>
        <p className="mb-4 text-gray-700">We may revise these Terms at any time. Continued use of our services after changes indicates your acceptance.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-900">10. Contact Us</h2>
        <p className="mb-2 text-gray-700">If you have any questions about these Terms, reach out to us:</p>
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

export default TermsOfService; 