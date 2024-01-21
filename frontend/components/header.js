"use client";

import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

export default function Header() {
  const { address } = useAccount();

  return (
    <nav class="bg-gray-100 border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 h-20">
        <div class="flex items-center space-x-3 rtl:space-x-reverse gap-4">
          <a href="/">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Hive
            </span>
          </a>
          {address ? (
            <a
              href="/explore"
              className="block py-2 px-3 text-white bg-blue-500 rounded-xl text-sm"
              aria-current="page"
            >
              Explore
            </a>
          ) : (
            <a
              href="/login"
              className="block py-2 px-3 text-white bg-blue-500 rounded-xl text-sm"
              aria-current="page"
            >
              Launch
            </a>
          )}
        </div>

        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 h-10">
            {address && (
              <>
                <li>
                  <ConnectKitButton />
                </li>
                <li className="flex items-center border border-gray-100 rounded-lg pr-4 pl-4">
                  <a
                    href="/profile"
                    class="block py-2 px-3 text-white font-bold bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Profile
                  </a>
                </li>
              </>
            )}
            {!address && (
              <li className="flex items-center border border-gray-100 rounded-lg pr-4 pl-4">
                <a
                  href="/login"
                  class="block py-2 px-3 text-white font-bold bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
