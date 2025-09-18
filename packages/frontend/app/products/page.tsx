'use client';

import { useState } from 'react';
import { ProductCard } from '../components/products/ProductCard';
import { FilterSidebar } from '../components/products/FilterSidebar';

// Mock data
const products = [
  {
    id: 1,
    name: 'Classic Running Shoes',
    price: 129.99,
    image: '/images/products/running-shoes.jpg',
    category: 'Running',
  },
  // Add more products...
];

const categories = ['Running', 'Casual', 'Sports', 'Boots', 'Sandals'];

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesPrice =
      product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex gap-8">
        <FilterSidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
