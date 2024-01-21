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

<div className="text-4xl text-black font-bold text-center mt-10">Features</div>
    </div>
  );
}
