"use client";
import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { removePrefix } from "../../modules/Utils/ipfsUtil";
import { NFTStorage } from "nft.storage";
import Image from "next/image";
import Header from "../../components/header";
const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [profileset, setprofileset] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [msg, setMsg] = useState("");
  const [auth, setAuth] = useState(true);
  const [loggedin, setLoggedin] = useState(false);
  const [change, setChange] = useState(false);
  const [nftMinting, setNftMinting] = useState();

  const navigate = (path) => {
    window.location.href = path;
  };

  const bg = {
    backgroundColor: "#FFFFFF2A",
  };

  const border = {
    backgroundColor: "#AD1AAF33",
    border: "1px solid #788AA3",
  };

  const button = {
    backgroundColor: "#11D9C5",
  };

  const bgverify = {
    backgroundColor: "#141a31",
  };

  const text = {
    color: "#788AA3",
  };

  const initialFormData = {
    name: "",
    country: "",
    profilePictureUrl: "",
    discord: "",
    twitter: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  async function uploadImage(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const blobDataImage = new Blob([e.target.files[0]]);
      const metaHash = await client.storeBlob(blobDataImage);
      setFormData({
        ...formData,
        profilePictureUrl: `ipfs://${metaHash}`,
      });
      console.log("profilePictureUrl", metaHash);
    } catch (error) {
      console.log("Error uploading file: ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const auth = Cookies.get("platform_token");

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("country", formData.country);
      formDataObj.append("discord", formData.discord);
      formDataObj.append("twitter", formData.twitter);
      formDataObj.append("profilePictureUrl", formData.profilePictureUrl);

      // Convert FormData to JavaScript Object
      const formDataObject = {};
      formDataObj.forEach((value, key) => {
        formDataObject[key] = value;
      });

      // Convert JavaScript Object to JSON string
      const jsonData = JSON.stringify(formDataObject);

      const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/profile`, {
        method: "PATCH",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: jsonData,
      });

      if (response.status === 200) {
        setFormData(initialFormData);
        setMsg("success");
        setprofileset(true);
        // localStorage.setItem('submissionProfile', 'true');
      } else {
        setMsg("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setMsg("error");
    } finally {
      setLoading(false);
    }
  };

  const handleProfile = () => {
    setMsg("");
    setprofileset(true);
  };

  return (
    <div>
      <Header />
      <section className="">
        <div className="mx-auto">
          <div className="w-full mx-auto text-left w-full md:text-center">
            <div className="flex">
              {msg == "success" && (
                <div className="text-center mx-auto">
                  <div className="">
                    <div
                      style={button}
                      className="flex gap-1 px-4 py-3 text-xs text-black font-semibold rounded-lg w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                    >
                      {/* <Image src={tick} alt="" className="w-4 h-4"/> */}
                      Changes Saved
                    </div>
                  </div>
                </div>
              )}
            </div>
            {nftMinting == true && (
              <div
                style={{ backgroundColor: "#2229447A" }}
                className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
                id="popupmodal"
              >
                <div className="relative flex justify-center flex-col items-center p-4 lg:w-2/3 w-full bg-white  rounded-lg shadow h-2/3  ">
                  <div className="p-4 md:p-5 space-y-4">
                    <p className="text-3xl text-center font-bold">Mint a NFT</p>
                    <p className="text-md text-center">
                      Press button to mint nft
                    </p>
                  </div>
                  <div className="flex items-center p-4 md:p-5 rounded-b mx-auto justify-center mb-4">
                    <button className=" bg-blue-500 px-4 py-2 rounded-lg text-white font-bold">
                      Mint User NFT
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!profileset && (
              <section className="rounded-xl bg-gray-100 min-h-screen">
                <div className="py-3"></div>
                <div className="px-20 mx-auto rounded-xl w-1/2 bg-white pt-20">
                  <div className="mx-auto text-left">
                    <h1 className="text-4xl font-semibold leading-none tracking-normal text-gray-100 md:text-2xl md:tracking-tight">
                      <span className="text-black">Set Your Profile</span>
                    </h1>

                    <form
                      id="myForm"
                      className="rounded pt-10"
                      onSubmit={handleSubmit}
                    >
                      <div className="lg:flex md:flex justify-between">
                        <div className="flex items-center lg:justify-start md:justify-start justify-center mb-60">
                          <div className="h-32 w-32 ring-1 ring-black bg-gray-200">
                            {formData.profilePictureUrl ? (
                              <img
                                alt="alt"
                                src={`${"https://cloudflare-ipfs.com/ipfs"}/${removePrefix(
                                  formData.profilePictureUrl
                                )}`}
                                className="rounded-2xl"
                                // width="170"
                                // height="170"
                              />
                            ) : (
                              <label
                                htmlFor="upload"
                                className="flex flex-col items-center gap-2 cursor-pointer mt-12"
                              >
                                <input
                                  id="upload"
                                  type="file"
                                  className="hidden"
                                  onChange={uploadImage}
                                  accept="image/*"
                                />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-10 w-10 fill-white stroke-indigo-500"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </label>
                            )}
                          </div>
                        </div>

                        <div className="mb-10 lg:w-3/4 md:w-3/4 mt-10">
                          <div className="lg:flex md:flex justify-between gap-4">
                            <div className="mb-10 w-full">
                              <input
                                type="text"
                                id="name"
                                // style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                // required
                              />
                            </div>
                          </div>

                          <div className="lg:flex md:flex justify-between gap-4">
                            <div className="mb-0 w-1/2">
                              <input
                                type="text"
                                id="discord"
                                // style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Instagram"
                                value={formData.discord}
                                onChange={handleInputChange}
                                // required
                              />
                            </div>

                            <div className="mb-10 w-1/2">
                              <input
                                type="text"
                                id="twitter"
                                // style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Twitter"
                                value={formData.twitter}
                                onChange={handleInputChange}
                                // required
                              />
                            </div>
                          </div>

                          <div className="mb-10 w-full">
                            <input
                              type="text"
                              id="country"
                              // style={border}
                              className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Bio"
                              value={formData.country}
                              onChange={handleInputChange}
                              // required
                            />
                          </div>

                          <div className="text-center pt-10 w-2/3 mr-auto flex gap-4">
                            <div className="pb-10 space-x-0 md:space-x-2 md:mb-8">
                              <button
                                onClick={() => setprofileset(true)}
                                className="border border-blue-500 px-4 py-3 mb-2 text-sm text-blue-500 font-semibold rounded-lg w-full sm:mb-0"
                              >
                                Cancel
                              </button>
                            </div>
                            <div className="pb-10 space-x-0 md:space-x-2 md:mb-8">
                              <button
                                type="submit"
                                value="submit"
                                className="bg-blue-500 px-4 py-3 mb-2 text-sm text-white font-semibold rounded-lg w-full sm:mb-0"
                              >
                                Set Your Profile
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>

                    {loading && (
                      <div
                        style={{
                          position: "absolute",
                          top: 700,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 9999,
                          }}
                        >
                          <div
                            style={{
                              border: "8px solid #f3f3f3",
                              borderTop: "8px solid #3498db",
                              borderRadius: "50%",
                              width: "50px",
                              height: "50px",
                              animation: "spin 1s linear infinite",
                            }}
                          >
                            {/* <Loader/> */}
                          </div>
                        </div>
                      </div>
                    )}

                    {msg == "error" && (
                      <p className="text-red-500">
                        There is some issue in updating your profile. Try again
                        after sometime.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {profileset && (
              <>
                <section className="pb-0 rounded-xl">
                  <img src="/bg7.webp" className="w-full h-80" />
                  <div className="px-24 mx-auto rounded-xl">
                    <div className="w-full mx-auto text-left">
                      <form id="myForm" className="rounded pt-10">
                        <div className="lg:flex md:flex justify-between">
                          <div className="lg:w-1/4 md:w-1/4">
                            <div className="flex items-center mb-10 justify-center">
                              {profileData?.profilePictureUrl ? (
                                <div className="h-52 w-52">
                                  <img
                                    alt="alt"
                                    src={`${"https://cloudflare-ipfs.com/ipfs"}/${removePrefix(
                                      profileData?.profilePictureUrl
                                    )}`}
                                    className="rounded-2xl"
                                    //   width="170"
                                    //   height="170"
                                  />
                                </div>
                              ) : (
                                <div className="h-52 w-52 ring-offset-2 ring-1 ring-black bg-gray-200">
                                  {/* <FaUserCircle className="text-3xl text-gray-500 w-48 h-48" /> */}
                                  {/* <Image
                                    alt="alt"
                                    src={profileimg}
                                    className="rounded-2xl mx-auto"
                                    width="170"
                                    height="170"
                                  /> */}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="lg:w-full md:w-3/4">
                            <div className="lg:flex md:flex justify-between gap-4">
                              <div
                                // style={border}
                                className="text-black text-2xl font-bold mb-10"
                              >
                                {profileData?.name ? profileData?.name : "Name"}
                              </div>

                              <div className="text-center pt-0 ml-auto flex h-16">
                                <button
                                  onClick={() => setprofileset(false)}
                                  className="bg-blue-500 px-4  text-sm text-white font-semibold rounded-lg w-full sm:mb-0 m-2"
                                >
                                  Edit Profile
                                </button>
                                <button
                                  // onClick={() => setprofileset(false)}
                                  className="bg-blue-500 px-4 text-sm text-white font-semibold rounded-lg w-full sm:mb-0 m-2"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setNftMinting(true);
                                  }}
                                >
                                  Mint NFT
                                </button>
                              </div>

                              {/* <div
                                style={border}
                                className="mb-10 shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                              >
                                {profileData?.country
                                  ? profileData?.country
                                  : "Country"}
                              </div> */}
                            </div>

                            <div className="lg:flex md:flex justify-between gap-4">
                              <div
                                // style={border}
                                className="text-black text-lg mb-10"
                              >
                                {profileData?.name ? profileData?.name : "Bio"}
                              </div>
                            </div>

                            <div className="font-bold mb-2">Social Handles</div>

                            {/* <div className="lg:flex md:flex justify-between gap-4"> */}
                            <div
                              // style={border}
                              className="text-black text-md mb-2"
                            >
                              Instagram :{" "}
                              {profileData?.discord
                                ? profileData?.discord
                                : "Instagram Link"}
                            </div>

                            <div
                              // style={border}
                              className="text-black text-md mb-10"
                            >
                              Twitter :{" "}
                              {profileData?.twitter
                                ? profileData?.twitter
                                : "Twitter Link"}
                            </div>
                            {/* </div> */}
                          </div>
                        </div>
                      </form>

                      {loading && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(255, 255, 255, 0.7)",
                            zIndex: 9999,
                          }}
                        >
                          <div
                            style={{
                              width: "80px",
                              height: "80px",
                              border: "8px solid #f3f3f3",
                              borderTop: "8px solid #3498db",
                              borderRadius: "50%",
                              animation: "spin 1s linear infinite",
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
