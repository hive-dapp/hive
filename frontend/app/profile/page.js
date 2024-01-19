"use client"
import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { removePrefix } from "../../modules/Utils/ipfsUtil";
import { NFTStorage } from "nft.storage";
import Image from 'next/image';
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw"
const client = new NFTStorage({ token: API_KEY });
const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

const Profile = () => {
  const [loading, setLoading] = useState(false);
const [profileset, setprofileset] = useState(true);
const [profileData, setProfileData] = useState(null);
const [msg, setMsg] = useState("");
const [auth, setAuth] = useState(true);
const [loggedin, setLoggedin] = useState(false);
const [change, setChange] = useState(false);

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

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const auth = Cookies.get("platform_token");

        const response = await axios.get(
          `${REACT_APP_GATEWAY_URL}api/v1.0/profile`,
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth}`,
            },
          }
        );

        if (response.status === 200) {
          setProfileData(response.data.payload);
          if(!response.data.payload.email)
          {
            setauth(false);
          }
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [profileset]);

  const gotodashboard = async () => {
    navigate("/view-my-reviews");
  };

  const handleProfile = () => {
    setMsg("");
    setprofileset(true);
  };


  const handleLoginClick = () => {
    const state = Math.random().toString(36).substring(7);
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20profile%20email&state=${state}`;
    window.location.href = authUrl;
  };

  const parseAuthorizationCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
  
    if (code) {
      localStorage.setItem("code",code)
      exchangeCodeForToken(code);
      console.log("code", code)
    }
  };
  
  const exchangeCodeForToken = async (code) => {
    const tokenEndpoint = 'https://www.googleapis.com/oauth2/v4/token';
  
    const tokenRequestBody = {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    };
  
    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(tokenRequestBody).toString(),
      });
  
      const tokenData = await response.json();
  
      // Assuming id_token is present in tokenData
      const idToken = tokenData.id_token;
  
      // setpage("googlewalletboth");

      // Use idToken in another API call
      await getgoogledata(idToken);
  
      handleTokenData(tokenData);
      console.log("token", tokenData);
    } catch (error) {
      console.error('Token exchange error:', error);
    }
  };
  
  const getgoogledata = async (idToken) => {
  
    const auth = Cookies.get("platform_token");
  
    const obj = {"idToken":idToken}
    const jsonData = JSON.stringify(obj);
  
    try {
      const response = await axios.post(`${REACT_APP_GATEWAY_URL}api/v1.0/account/auth-google`, {
       ...obj
      },{headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      }});
  
      const responseData = await response.data;
      // Cookies.set("google_token", responseData.payload.token, { expires: 7 });
      // Cookies.set("platform_userid", responseData.payload.userId, { expires: 7 });
      console.log('Another API call response:', responseData);
    } catch (error) {
      console.error('Another API call error:', error);
    }
  };
  
  const handleTokenData = (tokenData) => {
    window.history.replaceState({}, document.title, window.location.pathname);
  };
  
  
  useEffect(() => {
    parseAuthorizationCode();
  }, []);

  useEffect(() => {
      const handleConnectWallet = async () => {
        const loggedin = Cookies.get("platform_token");
        // const auth = Cookies.get("google_token");
        if (loggedin) {
          setloggedin(true);
        }
      };
      handleConnectWallet();
    }, [change]);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setMsg('');
      }, 3000); // 5 seconds in milliseconds
  
      return () => clearTimeout(timeoutId);
    }, [msg]);
  

  return (
    <div
      
    >
      <section className="">
        <div className="px-10 mx-auto">
          <div className="w-full mx-auto text-left w-full md:text-center">
        
        <div className="flex">
        <h1 className="mb-8 text-start text-4xl font-semibold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
              <span className="text-white">Profile</span>
            </h1>
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
            

            {!profileset && (
              <section className="pb-10 rounded-xl" style={bg}>
                <div className="px-20 mx-auto rounded-xl">
                  <div className="w-full mx-auto text-left py-10">
                    <h1 className="text-4xl font-semibold leading-none tracking-normal text-gray-100 md:text-2xl md:tracking-tight">
                      <span className="text-white">Set Your Profile</span>
                    </h1>

                    <form
                      id="myForm"
                      className="rounded pt-10"
                      onSubmit={handleSubmit}
                    >
                      <div className="lg:flex md:flex justify-between">
                        <div className="flex items-center lg:justify-start md:justify-start justify-center mb-40 ml-10">
                          <div className="rounded-2xl h-36 w-36 ring-1 ring-black bg-gray-200">
                            {formData.profilePictureUrl ? (
                              <img
                                alt="alt"
                                src={`${"https://cloudflare-ipfs.com/ipfs"}/${removePrefix(
                                  formData.profilePictureUrl
                                )}`}
                                className="rounded-2xl"
                                width="170"
                                height="170"
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
                            <div className="mb-10 w-1/2">
                              <input
                                type="text"
                                id="name"
                                style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                // required
                              />
                            </div>

                            <div className="mb-10 w-1/2">
                              <input
                                type="text"
                                id="country"
                                style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Country"
                                value={formData.country}
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
                                style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Discord"
                                value={formData.discord}
                                onChange={handleInputChange}
                                // required
                              />
                            </div>

                            <div className="mb-0 w-1/2">
                              <input
                                type="text"
                                id="twitter"
                                style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Twitter"
                                value={formData.twitter}
                                onChange={handleInputChange}
                                // required
                              />
                            </div>
                          </div>

                          <div className="text-center pt-10 w-1/2">
                        <div className="pb-10 space-x-0 md:space-x-2 md:mb-8">
                          <button
                            style={button}
                            type="submit"
                            value="submit"
                            className="px-14 py-3 mb-2 text-lg text-black font-semibold rounded-lg w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
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
              {
                !auth && loggedin && (
                  <>
                  <div className="flex -mt-6">
                      <div className="rounded-full px-2 text-center font-bold mb-2" style={{backgroundColor:'#11D9C5'}}>1</div>
                    <div style={{color: '#11D9C5'}}>--------------------</div>
                    <div className="rounded-full px-2 text-center font-bold mb-2" style={{backgroundColor:'#788AA3'}}>2</div>
              </div>
              <div className="flex text-left w-1/3 mb-2">
                    <div className="w-1/2">
                      <div className="text-white">Connect Wallet</div>
                    </div>
                  <div className="pl-10">
                    <div style={{color: '#788AA3'}}>Sign up with google</div>
                    <div style={{color: '#11D9C5'}} className="text-xs"><button onClick={async () => {
  await handleLoginClick();
  setchange(true);
}}>(Complete Step 2 to get access to write reviews
“Click Here”)</button></div>
                  </div>
              </div>
              </>
                )
              }

                <section className="pb-0 rounded-xl" style={bg}>
                  <h1 className="pt-8 pl-8 text-start text-4xl font-semibold leading-none tracking-normal text-gray-100 md:text-2xl md:tracking-tight">
                    <span className="text-white">Basic information</span>
                  </h1>
                  <div className="px-24 mx-auto rounded-xl">
                    <div className="w-full mx-auto text-left">
                      <form id="myForm" className="rounded pt-10">
                        <div className="lg:flex md:flex justify-between">
                          <div className="lg:w-1/4 md:w-1/4">
                            <div className="flex items-center mb-10 justify-center">
                              {profileData?.profilePictureUrl ? (
                                <div className="rounded-2xl h-36 w-36">
                                <img
                                  alt="alt"
                                  src={`${"https://cloudflare-ipfs.com/ipfs"}/${removePrefix(
                                    profileData?.profilePictureUrl
                                  )}`}
                                  className="rounded-2xl"
                                  width="170"
                                  height="170"
                                />
                                </div>
                              ) : (
                                <div className="rounded-2xl h-36 w-36 ring-offset-2 ring-1 ring-black bg-gray-200">
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

                          <div className="lg:w-3/4 md:w-3/4">
                            <div className="lg:flex md:flex justify-between gap-4">
                              <div
                                style={border}
                                className="mb-10 shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                              >
                                {profileData?.name
                                  ? profileData?.name
                                  : "Name"}
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
                                style={border}
                                className="mb-10 shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                              >
                                {profileData?.name
                                  ? profileData?.name
                                  : "Bio"}
                              </div>
                            </div>

                            <div className="lg:flex md:flex justify-between gap-4">
                              <div
                                style={border}
                                className="mb-10 lg:w-1/2 md:w-1/2 rounded w-full py-4 px-3 text-gray-200 leading-tight"
                              >
                                {profileData?.discord
                                  ? profileData?.discord
                                  : "Discord"}
                              </div>

                              <div
                                style={border}
                                className="mb-10 lg:w-1/2 md:w-1/2 rounded w-full py-4 px-3 text-gray-200 leading-tight"
                              >
                                {profileData?.twitter
                                  ? profileData?.twitter
                                  : "Twitter"}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-center pt-0 w-3/4 ml-auto pb-48">
                          <div className="">
                            <button
                              style={button}
                              onClick={() => setprofileset(false)}
                              className="px-14 py-3 mb-2 text-lg text-black font-semibold rounded-lg w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                            >
                              Edit Profile
                            </button>
                          </div>
                        </div>
                      </form>

      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.7)',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              border: '8px solid #f3f3f3',
              borderTop: '8px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
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