import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import Contact from "../components/Contact";

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.id]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === listing.imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? listing.imageUrls.length - 1 : prev - 1
    );
  };

  return (
    <main className="bg-gray-50 min-h-screen p-4">
      {loading && (
        <p className="text-center my-7 text-2xl text-gray-700">Loading...</p>
      )}
      {error && (
        <p className="text-center my-7 text-2xl text-red-500">
          Something went wrong!
        </p>
      )}

      {listing && !loading && !error && (
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative h-[600px] w-full">
            <div className="w-full h-full bg-center bg-cover rounded-t-lg"
              style={{ backgroundImage: `url(${listing.imageUrls[currentSlide]})` }}>
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              ❯
            </button>
          </div>

          <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {listing.name} -
              {listing.offer ? (
                <>
                  <span className="text-red-500 line-through mr-2">
                    &#8377;{listing.regularPrice.toLocaleString()}
                  </span>
                  <span className="text-green-600">
                    &#8377;{listing.discountPrice.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-green-600">
                  &#8377;{listing.regularPrice.toLocaleString()}
                </span>
              )}
              <span className="text-gray-600 text-lg"> / month</span>
            </h1>

            <p className="flex items-center gap-2 text-gray-600 text-lg">
              <FaMapMarkerAlt className="text-green-600" />
              {listing.address}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Description:</span>{" "}
              {listing.description}
            </p>

            <ul className="text-green-900 font-semibold text-lg flex flex-wrap gap-6">
              <li className="flex items-center gap-2">
                <FaBed className="text-2xl" />
                {listing.bedrooms}{" "}
                {listing.bedrooms > 1 ? "Bedrooms" : "Bedroom"}
              </li>
              <li className="flex items-center gap-2">
                <FaBath className="text-2xl" />
                {listing.bathrooms}{" "}
                {listing.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
              </li>
              <li className="flex items-center gap-2">
                <FaParking className="text-2xl" />
                {listing.parking ? "Parking Available" : "No Parking"}
              </li>
              <li className="flex items-center gap-2">
                <FaChair className="text-2xl" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="w-full bg-slate-700 text-white font-semibold py-3 rounded-lg transition-all hover:bg-slate-800"
              >
                Contact Landlord
              </button>
            )}

            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}

export default Listing;
