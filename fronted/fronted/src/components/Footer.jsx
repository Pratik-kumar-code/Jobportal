
import React from "react";
import { BriefcaseBusiness, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo */}
          <div>
            <h2 className="text-xl font-bold text-[#6A38C2] flex items-center gap-2">
              <BriefcaseBusiness className="w-6 h-6" />
              JobPortal
            </h2>

            <p className="text-sm text-gray-500 mt-3">
              Find the right job and take the next step in your career.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="/" className="hover:text-[#6A38C2]">
                  Home
                </a>
              </li>
              <li>
                <a href="/jobs" className="hover:text-[#6A38C2]">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-[#6A38C2]">
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" className="hover:text-[#6A38C2]">
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Contact Us
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Mail className="w-4 h-4 text-[#6A38C2]" />
              <span>support@jobportal.com</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Phone className="w-4 h-4 text-[#6A38C2]" />
              <span>Contact Support</span>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Built for your career growth.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

