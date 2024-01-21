"use client";

import { ConnectKitButton } from "connectkit";
import Header from '../components/header';

export default function Home() {
  return (
    // <nav class="bg-white border-gray-200 dark:bg-gray-900">
    //   <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    //     <div class="flex items-center space-x-3 rtl:space-x-reverse gap-4">
    //       <a href="/">
    //       <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
    //         Hive
    //       </span>
    //       </a>
    //       <a
    //             href="/login"
    //             className="block py-2 px-3 text-white bg-blue-500 rounded-xl text-sm"
    //             aria-current="page"
    //           >
    //             Launch App
    //           </a>
    //     </div>

    //     <div class="hidden w-full md:block md:w-auto" id="navbar-default">
    //       <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    //         <li className="flex items-center">
    //           <a
    //             href="/login"
    //             class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
    //             aria-current="page"
    //           >
    //             Login
    //           </a>
    //         </li>
    //         <li>
    //           <ConnectKitButton />
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    <div>
    <Header/>
    <div
  className="flex items-center justify-center h-screen"
  style={{
    backgroundImage: "url('/back.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }}
>
  <div className="text-4xl text-white font-bold w-1/2 text-center">
    <div>The Reputation-Driven Social and Professional Networking dApp</div>
    <div className="text-lg text-gray-300 text-center font-semibold mt-4">A unique dApp merging DeFi and social networking with Aave's GHO, 
    enabling influencers to monetize reputation through NFTs and interactive experiences, backed by a robust Proof of Reputation system.
      </div>
    </div>
</div>

<div className="text-4xl text-black font-bold text-center mt-20">Features</div>
<div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">

  {/* Feature 1 */}
  <div className="p-10 block border border-gray-800 p-8 text-black" style={{ backgroundColor: '#CCCCFF', position: 'relative', borderRadius: '30px' }}>
    <style>
      {`.inner-shadow {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            box-shadow: inset -10px -10px 60px 0 rgba(255, 255, 255, 0.4);
            border-radius: 0;
            pointer-events: none;
          }`}
    </style>
    <div className="inner-shadow"></div>
    <div className="flex gap-4 mt-2">
      {/* <div>
        <img src="images/feature1.png" className="w-16 h-10" alt="Feature 1" />
      </div> */}
      <div>
        <h2 className="text-xl font-bold uppercase">Proof of Reputation System</h2>
        <p className="mt-2 text-md font-semibold">
        Utilize a unique scoring algorithm to index social media activity and assign reputation scores.
Users start with a zero score and build their reputation on the platform.
        </p>
      </div>
    </div>
  </div>

  {/* Feature 2 */}
  <div className="p-10 block border border-gray-800 p-8 text-black" style={{ backgroundColor: '#AFDBF5', position: 'relative', borderRadius: '30px' }}>
    <style>
      {`.inner-shadow {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            box-shadow: inset -10px -10px 60px 0 rgba(255, 255, 255, 0.4);
            border-radius: 30px;
            pointer-events: none;
          }`}
    </style>
    <div className="inner-shadow"></div>
    <div className="flex gap-4 mt-2">
      {/* <div>
        <img src="images/feature2.png" className="w-16 h-9" alt="Feature 2" />
      </div> */}
      <div>
        <h2 className="text-xl font-bold uppercase">Service Marketplace</h2>
        <p className="mt-2 text-md font-semibold">
        Users can sell or offer services, such as one-on-one meetings, consultations, or crowdfunding campaigns.
Transactions are facilitated through the minting and auctioning of utility NFTs representing each service or experience.
        </p>
      </div>
    </div>
  </div>

  {/* Feature 3 */}
  <div className="p-10 block border border-gray-800 p-8 text-black" style={{ backgroundColor: '#AFDBF5', position: 'relative', borderRadius: '30px' }}>
    <style>
      {`.inner-shadow {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            box-shadow: inset -10px -10px 60px 0 rgba(255, 255, 255, 0.4);
            border-radius: 30px;
            pointer-events: none;
          }`}
    </style>
    <div className="inner-shadow"></div>
    <div className="flex gap-4 mt-2">
      {/* <div>
        <img src="images/feature3.png" className="w-16 h-8" alt="Feature 3" />
      </div> */}
      <div>
        <h2 className="text-xl font-bold uppercase">Commission Model</h2>
        <p className="mt-2 text-md font-semibold">
        Hive takes a commission on each sale or transaction, generating revenue for the platform's maintenance and development.
        </p>
      </div>
    </div>
  </div>

  {/* Feature 4 */}
  <div className="p-10 block border border-gray-800 p-8 text-black" style={{ backgroundColor: '#CCCCFF', position: 'relative', borderRadius: '30px' }}>
    <style>
      {`.inner-shadow {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            box-shadow: inset -10px -10px 60px 0 rgba(255, 255, 255, 0.4);
            border-radius: 30px;
            pointer-events: none;
          }`}
    </style>
    <div className="inner-shadow"></div>
    <div className="flex gap-4 mt-2">
      {/* <div>
        <img src="images/feature4.png" className="w-16 h-8" alt="Feature 4" />
      </div> */}
      <div>
        <h2 className="text-xl font-bold uppercase">NFT Integration</h2>
        <p className="mt-2 text-md font-semibold">
        NFTs serve as access tokens for services, can be traded, or used as collateral for loans.
The value of NFTs is determined by market reputation and demand, allowing for dynamic pricing.
        </p>
      </div>
    </div>
  </div>

  {/* Feature 5 */}
  <div className="p-10 block border border-gray-800 p-8 text-black" style={{ backgroundColor: '#CCCCFF', position: 'relative', borderRadius: '30px' }}>
    <style>
      {`.inner-shadow {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            box-shadow: inset -10px -10px 60px 0 rgba(255, 255, 255, 0.4);
            border-radius: 30px;
            pointer-events: none;
          }`}
    </style>
    <div className="inner-shadow"></div>
    <div className="flex gap-4 mt-2">
      {/* <div>
        <img src="images/feature5.png" className="w-12 h-9" alt="Feature 5" />
      </div> */}
      <div>
        <h2 className="text-xl font-bold uppercase">Lottery System</h2>
        <p className="mt-2 text-md font-semibold">
        Users can join lotteries via NFTs.

High-Risk: Lower entry, only the winner benefits.

Safer: Higher entry, participants get their investment back, and the winner gets extra from an Aave vault.
        </p>
      </div>
    </div>
  </div>

  {/* Feature 6 */}
  <div className="p-10 block border border-gray-800 p-8 text-black" style={{ backgroundColor: '#AFDBF5', position: 'relative', borderRadius: '30px' }}>
    <style>
      {`.inner-shadow {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            box-shadow: inset -10px -10px 60px 0 rgba(255, 255, 255, 0.4);
            border-radius: 30px;
            pointer-events: none;
          }`}
    </style>
    <div className="inner-shadow"></div>
    <div className="flex gap-4 mt-2">
      {/* <div>
        <img src="images/feature5.png" className="w-12 h-9" alt="Feature 5" />
      </div> */}
      <div>
        <h2 className="text-xl font-bold uppercase">Aave GHO and Facilitator Integration</h2>
        <p className="mt-2 text-md font-semibold">
        Incorporate Aave GHO for liquidity and facilitator mechanisms for minting GHO.
Explore strategic goals like peg stability and treasury management through the facilitator model.
        </p>
      </div>
    </div>
</div>
</div>
    </div>
  );
}
