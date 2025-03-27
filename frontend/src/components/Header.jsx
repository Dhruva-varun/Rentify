import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-6">
        <Link
          to="/"
          className="text-white text-2xl font-bold tracking-wide hover:text-cyan-600"
        >
          Rentify
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-white flex items-center px-4 py-2 rounded-full shadow-md transition-all focus-within:ring-2 focus-within:ring-blue-300"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-32 sm:w-64 text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-blue-600 hover:text-indigo-600 transition-colors" />
          </button>
        </form>

        <ul className="flex items-center gap-6 text-white">
          <Link
            to="/"
            className="hidden sm:inline font-medium hover:text-gray-300 transition"
          >
            Home
          </Link>
          <Link
            to="/search"
            className="hidden sm:inline font-medium hover:text-gray-300 transition"
          >
            Listings
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-9 w-9 object-cover border-2 border-white hover:scale-105 transition-transform"
                src={currentUser.profile_pic}
                alt="Profile"
              />
            ) : (
              <span className="font-medium hover:text-yellow-300 transition">
                Login
              </span>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
