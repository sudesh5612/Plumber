'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import UnreadServiceRequestCount from '../components/UnreadServiceRequestCount';

function Navbar() {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* Logo and Desktop Menu */}
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center" href="/">
              <img className="h-10 w-auto" src="images/logo-white.png" alt="PlumberPro" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">PlumberPro</span>
            </Link>

            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <Link href="/" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                  Home
                </Link>
                <Link href="/services" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                  Services
                </Link>
                {session && (
                  <Link href="/appointments/book" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                    Book Appointment
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Side Menu */}
          {!session && (
            <div className='hidden md:block md:ml-6'>
              <div className='flex items-center'>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-3'
                    >
                      <FaGoogle className='text-white mr-2' />
                      <span>Login or Register</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {session && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              {/* Messages */}
              <Link href="/messages" className="relative group">
                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
                  <UnreadServiceRequestCount />
                </span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative ml-3">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                >
                  <img className="h-8 w-8 rounded-full" src={profileImage || '/default.png'} alt="User Avatar" />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700">
                      Your Profile
                    </Link>
                    <Link href="/services/saved" className="block px-4 py-2 text-sm text-gray-700">
                      Saved Services
                    </Link>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link href="/" className="text-white block rounded-md px-3 py-2 text-base font-medium">
              Home
            </Link>
            <Link href="/services" className="text-white block rounded-md px-3 py-2 text-base font-medium">
              Services
            </Link>
            {session && (
              <Link href="/appointments/book" className="text-white block rounded-md px-3 py-2 text-base font-medium">
                Book Appointment
              </Link>
            )}
            {!session && (
              <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 rounded-md px-3 py-2 my-5">
                <FaGoogle className="mr-2" />
                <span>Login or Register</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
