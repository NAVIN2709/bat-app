import React from "react";
import NavBar from "./components/Navbar";

const PoliciesPage = () => {
  return (
    <div className="policiespage">
      <NavBar />
      <div className="min-h-screen bg-green-50 text-gray-800 p-8 md:p-16">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-6">
            Privacy Policy
          </h1>

          {/* Introduction */}
          <section className="mb-6">
            <p className="text-gray-700">
              This Privacy Policy explains how we collect, use, and protect your
              information when you use our platform. By using our services, you
              agree to the practices described below.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Name, email address, and profile picture (via Google Sign-In)</li>
              <li>Basic account details required for booking courts</li>
              <li>Usage data such as login timestamps and booking activity</li>
            </ul>
          </section>

          {/* Google OAuth */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              2. Google Authentication
            </h2>
            <p className="text-gray-700">
              We use Google OAuth for secure authentication. When you sign in
              with Google, we only access basic profile information as permitted
              by Google (such as your name and email address). We do not access
              your Google password or private Google data.
            </p>
          </section>

          {/* How Data Is Used */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>To create and manage your user account</li>
              <li>To enable court bookings and related services</li>
              <li>To improve platform security and user experience</li>
              <li>To communicate important service updates</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              4. Data Protection & Security
            </h2>
            <p className="text-gray-700">
              We implement industry-standard security measures to protect your
              data. Your personal information is stored securely and is never
              sold or shared with third parties for advertising purposes.
            </p>
          </section>

          {/* Third-Party Sharing */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              5. Third-Party Data Sharing
            </h2>
            <p className="text-gray-700">
              We do not share your personal data with third parties except when
              required by law or to comply with legal obligations.
            </p>
          </section>

          {/* Data Deletion */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              6. Data Retention & Deletion
            </h2>
            <p className="text-gray-700">
              You may request deletion of your account and associated data at
              any time by contacting us. Upon request, we will permanently
              delete your personal information unless legally required to
              retain it.
            </p>
          </section>

          {/* Updates */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              7. Policy Updates
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page with an updated revision date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              8. Contact Us
            </h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy or your data,
              contact us at{" "}
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
