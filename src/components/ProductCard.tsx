'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  isInCart: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
}

export default function ProductCard({
  product,
  isInWishlist,
  isInCart,
  onAddToCart,
  onToggleWishlist
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1000);
  };

  const handleToggleWishlist = () => {
    onToggleWishlist(product.id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-48 sm:h-52 object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          </div>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-lg"
          aria-label="Add to Wishlist"
        >
          <svg
            className={`w-5 h-5 transition-colors duration-200 ${
              isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'
            }`}
            fill={isInWishlist ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          {product.category}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ₹{Math.floor(product.price * 1.3)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={addedToCart}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
            addedToCart
              ? 'bg-green-500 scale-95'
              : isInCart
              ? 'bg-gray-500 hover:bg-gray-600'
              : 'bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-95'
          }`}
        >
          {addedToCart
            ? '✓ Added!'
            : isInCart
            ? 'In Cart'
            : 'Add to Cart'
          }
        </button>
      </div>
    </div>
  );
}