import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import campTam from "../../assets/camp-tam.png";
import campEng from "../../assets/camp-eng.png";

const EventComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [campEng, campTam];

  useEffect(() => {
    // Show the banner initially after 10 seconds, then every 60 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    const interval = setInterval(() => {
      setIsVisible(true);
    }, 60000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-modalFadeIn">
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden animate-modalScaleIn flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-red-500 backdrop-blur-md text-white rounded-full transition-all duration-300 border border-white/20 shadow-lg"
          aria-label="Close Banner"
        >
          <X size={20} className="drop-shadow-md" />
        </button>

        {/* Image Container */}
        <div className="relative w-full flex items-center justify-center group">
          <img
            src={images[currentImageIndex]}
            alt={`Event Banner ${currentImageIndex + 1}`}
            className="w-full h-auto max-h-[85vh] object-contain transition-transform duration-500"
          />

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20 shadow-md"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20 shadow-md"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/40 px-3 py-2 rounded-full backdrop-blur-md border border-white/10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "w-8 bg-green-400" : "w-2 bg-white/50 hover:bg-white"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
