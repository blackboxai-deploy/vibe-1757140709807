'use client';

import React from 'react';

interface AppBarProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export default function AppBar({ cartItemCount, onCartClick }: AppBarProps) {
  return (
    <div className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* App Title */}
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-green-700">
              Bio Arbile Organisx
            </h1>
            <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Cart Icon */}
          <button
            onClick={onCartClick}
            className="relative p-2 text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-full transition-colors duration-200"
            aria-label="Shopping Cart"
          >
            {/* Custom Cart Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L15 18M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6M9 21a1 1 0 102 0 1 1 0 00-2 0zM20 21a1 1 0 102 0 1 1 0 00-2 0z"
              />
            </svg>
            
            {/* Cart Badge */}
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}