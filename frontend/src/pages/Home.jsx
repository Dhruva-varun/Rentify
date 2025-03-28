import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import Footer from "../components/Footer";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Navigation]);

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
        const res = await fetch("/api/listing/get?limit=6");
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
            <Swiper navigation className="max-w-[85rem] mx-auto">
              {offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div
                    style={{
                      background: `url(${listing.imageUrls[0]}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                    className="h-[600px] rounded-lg shadow-lg mt-4"
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="max-w-8xl mx-36 p-3 flex flex-col gap-8 my-10">
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
