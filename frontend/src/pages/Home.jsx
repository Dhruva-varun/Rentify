import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Footer from "../components/Footer";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchAllListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAllListings = async () => {
      try {
        const res = await fetch("/api/listing/get?limit=8");
        const data = await res.json();
        setAllListings(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferListings();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allListings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [allListings]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? allListings.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allListings.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
            Discover Your Dream <span className="text-teal-500">Home</span>
            <br />
            With Rentify's Exclusive Offers
          </h1>
          <div className="text-gray-500 text-sm sm:text-base">
            Explore a variety of rental properties that match your lifestyle and
            budget. With Rentify, finding your ideal home has never been easier.
          </div>
          <Link
            to={"/search"}
            className="text-sm sm:text-base text-teal-600 font-bold hover:underline"
          >
            Start Exploring Now
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">
            Loading listings, please wait...
          </p>
        ) : (
          <>
            {allListings.length > 0 && (
              <div className="relative max-w-[1400px] mx-auto mt-4">
                <div className="relative overflow-hidden h-[600px] rounded-lg">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {allListings.map((listing, index) => (
                      <div key={listing._id} className="min-w-full h-full">
                        <img
                          src={listing.imageUrls[0]}
                          className="w-full h-full object-fit aspect-[16/9]"
                          alt={`Slide ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800/50 p-3 rounded-full text-white"
                >
                  ❮
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800/50 p-3 rounded-full text-white"
                >
                  ❯
                </button>
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3">
                  {allListings.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentSlide ? "bg-teal-500" : "bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="max-w-[1400px] mx-auto p-3 flex flex-col gap-8 my-10">
              {offerListings.length > 0 && (
                <div>
                  <div className="my-3 flex justify-between">
                    <h2 className="text-2xl font-semibold text-slate-600">
                      Special Offers Just For You
                    </h2>
                    <Link
                      className="text-sm text-cyan-600 hover:underline mr-5"
                      to={"/search?offer=true"}
                    >
                      View More Offers
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {offerListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id} />
                    ))}
                  </div>
                </div>
              )}

              {allListings.length > 0 && (
                <div>
                  <div className="my-3 flex justify-between">
                    <h2 className="text-2xl font-semibold text-slate-600">
                      Latest Rental Properties
                    </h2>
                    <Link
                      className="text-sm text-cyan-600 hover:underline mr-5"
                      to={"/search"}
                    >
                      See All Rentals
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {allListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
