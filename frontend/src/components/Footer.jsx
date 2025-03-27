import React from "react";

function Footer() {
  return (
    <footer className="bg-cyan-800 text-white py-5 static">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-xl font-semibold">Rentify</h3>
          <p className="text-gray-200 text-sm">
            Find Your Perfect Place to Call Home
          </p>
        </div>
        <p className="text-gray-200 text-sm mt-4 md:mt-0">
          &copy; 2025 Rentify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
