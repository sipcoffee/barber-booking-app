"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    alt: "Barber shop interior with vintage chairs",
    category: "Shop",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80",
    alt: "Classic haircut in progress",
    category: "Haircuts",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80",
    alt: "Beard trimming and styling",
    category: "Beards",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    alt: "Barber working on client",
    category: "Shop",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80",
    alt: "Modern fade haircut",
    category: "Haircuts",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=800&q=80",
    alt: "Professional styling session",
    category: "Haircuts",
  },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryImages)[0] | null
  >(null);

  return (
    <section id="gallery" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Gallery</h2>
          <p className="text-muted-foreground">
            Take a look at our shop and some of our finest work. Every cut tells
            a story.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {image.category}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="max-w-3xl p-0 overflow-hidden">
            <VisuallyHidden>
              <DialogTitle>{selectedImage?.alt}</DialogTitle>
              <DialogDescription>Gallery image preview</DialogDescription>
            </VisuallyHidden>
            {selectedImage && (
              <div className="relative aspect-video">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
