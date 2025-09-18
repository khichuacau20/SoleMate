'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className="group">
      <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
        <div className="relative h-64 bg-gray-200">
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={id <= 2}
            onError={() => setImgSrc('/images/products/placeholder.jpg')}
          />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="mt-1 text-lg font-semibold text-gray-900">${price}</p>
      </div>
    </div>
  );
}
