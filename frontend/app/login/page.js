"use client";
import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { removePrefix } from "../../modules/Utils/ipfsUtil";
import { NFTStorage } from "nft.storage";
import Image from "next/image";
import Header from "../../components/header";
import { ConnectKitButton } from "connectkit";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: API_KEY });
const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [profileset, setprofileset] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [msg, setMsg] = useState("success");

  const bg = {
    backgroundColor: "#FFFFFF2A",
  };

  const border = {
    backgroundColor: "white",
    border: "1px solid #788AA3",
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

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setMsg('');
  //   }, 3000); // 5 seconds in milliseconds

  //   return () => clearTimeout(timeoutId);
  // }, [msg]);

  return (
    <div>
      <Header />
      <section className="">
        <div className="px-10 mx-auto">
          <div className="w-full mx-auto text-left w-full md:text-center">
            <div className="flex">
              {msg == "success" && (
                <div
                  style={{ backgroundColor: "#2229447A" }}
                  className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
                  id="popupmodal"
                >
                  <div className="relative p-4 lg:w-1/3 w-full max-w-2xl max-h-full">
                    <div className="relative rounded-lg shadow bg-white">
                      <button
                        onClick={() => {
                          setMsg("");
                        }}
                        className="absolute top-4 right-4 text-gray-500 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600"></div>

                      <img
                        src="/emojiMessage.png"
                        alt="info"
                        className="mx-auto"
                      />

                      <div className="p-4 md:p-5 space-y-4">
                        <p className="text-3xl text-center font-bold">
                          Profile Successfully Set
                        </p>
                        <p className="text-md text-center">
                          Connect your wallet to complete login process.
                        </p>
                      </div>
                      <div className="flex items-center p-4 md:p-5 rounded-b mx-auto justify-center">
                        <ConnectKitButton />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <section className="rounded-xl" style={bg}>
              <div className="px-20 mx-auto rounded-xl">
                <div className="w-full mx-auto text-left">
                  <form id="myForm" className="rounded" onSubmit={handleSubmit}>
                    <div className="lg:flex md:flex justify-between">
                      <div className="flex items-center lg:justify-start md:justify-start justify-center ">
                        <div className="rounded-2xl">
                          <img
                            alt="alt"
                            src="/attachment.png"
                            className="rounded-2xl"
                            // width="170"
                            // height="170"
                          />
                        </div>
                      </div>

                      <div className="mb-10 lg:w-1/2 md:w-1/2 mt-10">
                        <div className="lg:flex md:flex justify-between gap-4">
                          <div className="w-2/3">
                            <div className="mb-4 w-full">
                              <input
                                type="text"
                                id="name"
                                style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                // required
                              />
                            </div>

                            <div className="mb-4 w-full">
                              <input
                                type="text"
                                id="discord"
                                style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Instagram"
                                value={formData.discord}
                                onChange={handleInputChange}
                                // required
                              />
                            </div>

                            <div className="mb-4 w-full">
                              <input
                                type="text"
                                id="twitter"
                                style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Twitter"
                                value={formData.twitter}
                                onChange={handleInputChange}
                                // required
                              />
                            </div>
                          </div>

                          <div className="h-48 w-48 bg-gray-200">
                            {formData.profilePictureUrl ? (
                              <img
                                alt="alt"
                                src={`${"https://cloudflare-ipfs.com/ipfs"}/${removePrefix(
                                  formData.profilePictureUrl
                                )}`}
                                className="mt-10"
                                width="300"
                                height="300"
                              />
                            ) : (
                              <label
                                htmlFor="upload"
                                className="flex flex-col items-center gap-2 cursor-pointer mt-0"
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
                                  className="h-8 w-8 fill-white stroke-indigo-500 mt-20"
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

                        <div className="mb-4 w-full">
                          <textarea
                            type="text"
                            id="country"
                            style={border}
                            rows={4}
                            className="shadow border appearance-none rounded w-full py-4 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Bio"
                            value={formData.country}
                            onChange={handleInputChange}
                            // required
                          ></textarea>
                        </div>

                        <div className="text-center pt-10 w-1/2">
                          <div className="pb-10 space-x-0 md:space-x-2 md:mb-8">
                            <button
                              type="submit"
                              value="submit"
                              className="bg-blue-500 px-4 py-4 mb-2 text-lg text-white rounded-full w-full"
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
