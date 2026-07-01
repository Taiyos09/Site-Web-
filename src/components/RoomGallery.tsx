"use client";

import { useState } from "react";
import Image from "next/image";

interface RoomGalleryProps {
  images: string[];
  title: string;
  roomName?: string;
}

export default function RoomGallery({
  images,
  title,
}: RoomGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <Image
          src={selectedImage}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.map((image) => (
          <button
            key={image}
            onClick={() => setSelectedImage(image)}
            className={`relative aspect-square overflow-hidden rounded-md ${
              selectedImage === image ? "ring-4 ring-amber-600"
        : "opacity-80 hover:opacity-100"}
            }`}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}