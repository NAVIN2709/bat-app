import React from "react";
import NavBar from "./components/Navbar";

const PoliciesPage = () => {
  return (
    <div className="policiespage">
      <NavBar />
      <div className="min-h-screen bg-green-50 text-gray-800 p-8 md:p-16">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-6">
            Policies & Terms
          </h1>

          {/* General Terms */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              1. General Terms
            </h2>
            <p className="text-gray-700">
              By using our platform, you agree to comply with our policies and
              terms. You must provide accurate information and use the service
              responsibly. The platform reserves the right to modify these terms
              at any time without prior notice.
            </p>
          </section>

          {/* Payment Gateway Policy */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              2. Payment Gateway Policy
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                All payments are processed securely through authorized payment
                gateways.
              </li>
              <li>We do not store your payment credentials on our servers.</li>
              <li>
                Refunds and cancellations are subject to the individual court's
                policies.
              </li>
              <li>
                Payment confirmations are sent via email after successful
                transactions.
              </li>
            </ul>
          </section>

          {/* Authentication & Privacy Policy */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              3. Authentication & Privacy
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Users must register with accurate personal information to book
                courts.
              </li>
              <li>
                Passwords must be kept confidential. We are not responsible for
                unauthorized access due to weak passwords.
              </li>
              <li>
                We protect your data and never share it with third parties
                without consent, except as required by law.
              </li>
            </ul>
          </section>

          {/* Liability */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              4. Liability
            </h2>
            <p className="text-gray-700">
              The platform is not responsible for any injuries, loss, or damages
              occurring on the booked courts. Users must adhere to safety
              guidelines and court rules at all times.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              5. Contact
            </h2>
            <p className="text-gray-700">
              For questions regarding our policies, payments, or privacy,
              contact us at:{" "}
              <span className="font-medium text-green-700">
                support@example.com
              </span>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
