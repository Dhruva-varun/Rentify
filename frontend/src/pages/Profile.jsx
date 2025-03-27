import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  logOutUserFailure,
  logOutUserStart,
  logOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [listingsError, setListingsError] = useState(null);
  const [loadingListing, setLoadingListing] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }

    handleShowListings();
  }, [file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setFileUploadError(true);
      return;
    }

    setFileUploadError(false);
    setFile(selectedFile);
  };

  const handleFileUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "images");
    data.append("cloud_name", "dxmyzj9te");
    setFileLoading(true);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dxmyzj9te/image/upload",
        data
      );
      setFormData({ ...formData, profile_pic: res.data.secure_url });
      setFileLoading(false);
    } catch (error) {
      setFileLoading(false);
      setFileUploadError(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setLoadingListing(true);
      setListingsError(null);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setListingsError(data.message);
        setLoadingListing(false);
        return;
      }

      setUserListings(data);
      setLoadingListing(false);
    } catch (error) {
      setLoadingListing(false);
      setListingsError("Error in showing listing");
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleLogOut = async () => {
    try {
      dispatch(logOutUserStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(logOutUserFailure(data.message));
        return;
      }
      dispatch(logOutUserSuccess(data));
    } catch (error) {
      dispatch(logOutUserFailure(error.message));
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      setListingsError(null);
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        setListingsError(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      setListingsError("Error in deleting listing");
    }
  };

  return (
    <div className="p-3  mx-auto flex ">
      <div className="flex-1/2  pl-48 pr-32">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col items-center mb-5">
            <input
              onChange={handleFileChange}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.profile_pic || currentUser.profile_pic}
              alt="profile"
              className="rounded-full h-28 w-28 object-cover cursor-pointer border-4 border-gray-300"
            />
            <p
              className="text-sm text-gray-500 mt-2 cursor-pointer"
              onClick={() => fileRef.current.click()}
            >
              Click to change photo
            </p>
            {fileUploadError && (
              <span className="text-red-600 text-sm">
                Error in image upload
              </span>
            )}
            {fileLoading && (
              <span className="text-green-600 text-sm">Image Uploading...</span>
            )}
          </div>
          <input
            type="text"
            placeholder="username"
            defaultValue={currentUser.userName}
            id="username"
            className="border p-3 rounded-lg border-gray-300"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg border-gray-300"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Change Password "
            onChange={handleChange}
            id="password"
            className="border p-3 rounded-lg border-gray-300"
          />
          <button
            disabled={loading}
            className="bg-white border text-cyan-700 rounded-lg p-3 uppercase hover:bg-gray-100 disabled:hover:bg-gray-200  border-cyan-700"
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <Link
            className="bg-teal-600 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
            to={"/create-listing"}
          >
            Create New Listing
          </Link>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUser}
            className="text-red-500 cursor-pointer hover:text-red-700"
          >
            Delete account
          </span>
          <span
            onClick={handleLogOut}
            className="text-red-500 cursor-pointer  hover:text-red-700"
          >
            Logout
          </span>
        </div>

        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "User is updated successfully!" : ""}
        </p>
      </div>

      <div className="flex-1/2 pl-32 pr-48">
        <p className="text-red-700 mt-5">
          {listingsError ? listingsError : ""}
        </p>
        {loadingListing ? (
          <p className="text-gray-500">Listings are loading...</p>
        ) : userListings && userListings.length > 0 ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-center mt-7 text-2xl font-semibold">
              Your Listings
            </h1>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-3 flex justify-between items-center gap-4 bg-white shadow-md hover:shadow-lg transition-shadow border-gray-300"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-20 w-16 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 font-semibold hover:underline truncate flex-1"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>
                <div className="flex flex-col item-center">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase cursor-pointer"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-700 uppercase cursor-pointer">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No Listings</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
