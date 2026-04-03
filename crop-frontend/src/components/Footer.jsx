import React from "react";

const Footer = () => {
  return (
    <footer
      className="w-full"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img
              src="/leaf.png"
              alt="AgriVision AI"
              className="h-9 w-9 sm:h-10 sm:w-10"
              style={{ filter: "var(--shadowing)" }}
            />
            <h2
              className="text-lg sm:text-xl font-semibold"
              style={{ color: "var(--primary-color)" }}
            >
              AgriVision AI
            </h2>
          </div>

          <p className="text-sm leading-relaxed opacity-80 max-w-sm">
            AI-powered crop advisory and disease prediction platform enabling
            smarter and sustainable farming decisions.
          </p>
        </div>

        {/* Features */}
        <div>
          <h3
            className="font-semibold mb-3"
            style={{ color: "var(--secondary-color)" }}
          >
            Features
          </h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Crop Recommendation</li>
            <li>Disease Detection</li>
            <li>Yield Prediction</li>
            <li>Weather Forecast</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3
            className="font-semibold mb-3"
            style={{ color: "var(--secondary-color)" }}
          >
            Resources
          </h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Documentation</li>
            <li>API Access</li>
            <li>Research</li>
            <li>Support</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3
            className="font-semibold mb-3"
            style={{ color: "var(--secondary-color)" }}
          >
            Contact
          </h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Email: support@agrivision.ai</li>
            <li>Phone: +91 9XXXXXXXXX</li>
            <li>India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-center text-sm gap-3">

          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} AgriVision AI. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {["Privacy", "Terms", "GitHub"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-3 py-1 rounded transition hover:bg-[var(--hovering)]"
                style={{ color: "var(--secondary-color)" }}
              >
                {item}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;