'use client';
import { Search, BookMarked } from 'lucide-react';
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from '@clerk/nextjs';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function Header() {

    const { user, isLoaded } = useUser();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm fixed top-0 right-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
         
       
             <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">NewsHub</h1>
          </div>
      

          
          {/* <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles, topics, sources..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div> */}

        
          <div className="flex items-center gap-4">
         
            <Link href={`/reading-list/${isLoaded && user?.id}`}>
            <button className="relative p-2 cursor-pointer text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors group">
              <BookMarked className="h-6 w-6" />
            </button>
            </Link>

       
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Login
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
