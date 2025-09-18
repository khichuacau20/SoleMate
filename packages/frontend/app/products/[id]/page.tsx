'use client';

import { useState } from 'react';

// Mock data
const product = {
  id: 1,
  name: 'Classic Running Shoes',
  price: 129.99,
  description: 'High-performance running shoes designed for comfort and durability.',
  images: [
    '/images/products/running-shoes-1.jpg',
    '/images/products/running-shoes-2.jpg',
    '/images/products/running-shoes-3.jpg',
  ],
  sizes: ['7', '8', '9', '10', '11'],
  colors: ['Black', 'White', 'Blue'],
  features: [
    'Breathable mesh upper',
    'Responsive cushioning',
    'Durable rubber outsole',
    'Lightweight design',
  ],
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color');
      return;
    }
    // Add to cart logic here
    console.log('Adding to cart:', {
      productId: params.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <div className="relative h-96 bg-gray-200">
              {/* Placeholder for main product image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                [Main Product Image]
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <div key={index} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-200">
                <div className="relative h-24">
                  {/* Placeholder for thumbnail */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    [Thumbnail {index + 1}]
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-6">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Size</h3>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-center rounded-md ${
                    selectedSize === size
                      ? 'bg-gray-900 text-white'
                      : 'border border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Color</h3>
            <div className="grid grid-cols-3 gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`py-2 text-center rounded-md ${
                    selectedColor === color
                      ? 'bg-gray-900 text-white'
                      : 'border border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 rounded-md border border-gray-300 hover:border-gray-400"
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 rounded-md border border-gray-300 hover:border-gray-400"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>

          {/* Features */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Features</h3>
            <ul className="list-disc list-inside space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-600">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
