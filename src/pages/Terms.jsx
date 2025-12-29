import React from "react";
import NavBar from "./components/Navbar";

const TermsPage = () => {
  return (
    <div className="termspage">
      <NavBar />
      <div className="min-h-screen bg-green-50 text-gray-800 p-8 md:p-16">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-6">
            Terms & Conditions
          </h1>

          {/* Introduction */}
          <section className="mb-6">
            <p className="text-gray-700">
              These Terms & Conditions govern your use of our platform. By
              accessing or using our services, you agree to be bound by these
              terms. If you do not agree, please do not use the platform.
            </p>
          </section>

          {/* Eligibility */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              1. Eligibility
            </h2>
            <p className="text-gray-700">
              You must be at least 13 years old to use this platform. By using
              our services, you confirm that you meet this requirement and are
              legally capable of entering into this agreement.
            </p>
          </section>

          {/* Account Responsibility */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              2. User Accounts
            </h2>
            <p className="text-gray-700">
              You are responsible for maintaining the confidentiality of your
              account credentials. Any activity performed using your account is
              your responsibility. We are not liable for unauthorized access
              resulting from your failure to secure your account.
            </p>
          </section>

          {/* Platform Usage */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              3. Acceptable Use
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Use the platform only for lawful purposes</li>
              <li>Do not attempt to exploit, reverse-engineer, or disrupt the service</li>
              <li>Do not misuse bookings, payments, or promotional features</li>
              <li>Do not upload false, misleading, or harmful content</li>
            </ul>
          </section>

          {/* Bookings */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              4. Court Bookings
            </h2>
            <p className="text-gray-700">
              Court availability, pricing, cancellations, and refunds are
              managed by the respective court owners. We act only as a booking
              facilitator and are not responsible for changes, disputes, or
              service quality at the venue.
            </p>
          </section>

          {/* Payments */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              5. Payments
            </h2>
            <p className="text-gray-700">
              Payments are processed through secure third-party payment
              gateways. We do not store your payment information. Any disputes
              regarding payments must be resolved in accordance with the
              payment provider’s policies.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              6. Account Termination
            </h2>
            <p className="text-gray-700">
              We reserve the right to suspend or terminate your account if you
              violate these Terms, misuse the platform, or engage in fraudulent
              activity.
            </p>
          </section>

          {/* Liability */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              We are not liable for any injuries, losses, or damages arising
              from the use of booked courts or third-party services. Users are
              responsible for following venue rules and safety guidelines.
            </p>
          </section>

          {/* Changes */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              8. Changes to Terms
            </h2>
            <p className="text-gray-700">
              We may update these Terms & Conditions at any time. Continued use
              of the platform after changes indicates acceptance of the updated
              terms.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              9. Governing Law
            </h2>
            <p className="text-gray-700">
              These terms shall be governed and interpreted in accordance with
              the laws applicable in your jurisdiction.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              10. Contact Us
            </h2>
            <p className="text-gray-700">
              For questions regarding these Terms & Conditions, contact us at{" "}
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

export default TermsPage;
