'use client';

import React, { useState, useEffect } from 'react';
import AppBar from '@/components/AppBar';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import { Product, CartItem, WishlistState } from '@/lib/types';

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistState>({ productIds: [] });
  const [showCartModal, setShowCartModal] = useState(false);

  // Load cart and wishlist from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bioArbileCart');
    const savedWishlist = localStorage.getItem('bioArbileWishlist');
    
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bioArbileCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bioArbileWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const isInWishlist = prev.productIds.includes(productId);
      if (isInWishlist) {
        return {
          productIds: prev.productIds.filter(id => id !== productId)
        };
      } else {
        return {
          productIds: [...prev.productIds, productId]
        };
      }
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const isInCart = (productId: string) => {
    return cartItems.some(item => item.product.id === productId);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.productIds.includes(productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* App Bar */}
      <AppBar 
        cartItemCount={getTotalItems()}
        onCartClick={() => setShowCartModal(true)}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Premium Organic Products
          </h2>
          <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto">
            Discover our carefully curated collection of pure, natural, and organic products for a healthier lifestyle
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isInWishlist={isInWishlist(product.id)}
              isInCart={isInCart(product.id)}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-96 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Shopping Cart</h3>
                <button
                  onClick={() => setShowCartModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-64">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-500">₹{item.product.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total: ₹{getTotalPrice()}</span>
                  <span className="text-sm text-gray-500">{getTotalItems()} items</span>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors duration-200">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}