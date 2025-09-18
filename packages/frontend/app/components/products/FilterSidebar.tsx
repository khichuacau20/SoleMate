'use client';

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
}

export function FilterSidebar({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}: FilterSidebarProps) {
  return (
    <div className="w-64 flex-shrink-0">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Min Price</label>
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) =>
                onPriceRangeChange({ ...priceRange, min: Number(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Max Price</label>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) =>
                onPriceRangeChange({ ...priceRange, max: Number(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
