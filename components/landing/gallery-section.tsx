"use client";

import { useState } from "react";
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
    src: "/images/gallery/shop-1.jpg",
    alt: "Barber shop interior",
    category: "Shop",
  },
  {
    id: 2,
    src: "/images/gallery/cut-1.jpg",
    alt: "Classic haircut",
    category: "Haircuts",
  },
  {
    id: 3,
    src: "/images/gallery/beard-1.jpg",
    alt: "Beard styling",
    category: "Beards",
  },
  {
    id: 4,
    src: "/images/gallery/shop-2.jpg",
    alt: "Barber chairs",
    category: "Shop",
  },
  {
    id: 5,
    src: "/images/gallery/cut-2.jpg",
    alt: "Modern fade",
    category: "Haircuts",
  },
  {
    id: 6,
    src: "/images/gallery/cut-3.jpg",
    alt: "Styling session",
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
              {/* Placeholder for actual images */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  {image.category}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  View Image
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
          <DialogContent className="max-w-3xl">
            <VisuallyHidden>
              <DialogTitle>{selectedImage?.alt}</DialogTitle>
              <DialogDescription>Gallery image preview</DialogDescription>
            </VisuallyHidden>
            {selectedImage && (
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">
                  {selectedImage.alt}
                </span>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
