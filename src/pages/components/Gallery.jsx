import React, { useState } from "react";
import { X, PlayCircle, Eye, Search } from "lucide-react";

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const mediaItems = [
    {
      id: 1,
      type: "image",
      url: "https://images.unsplash.com/photo-1626224580194-86083b26ecbd?q=80&w=2070&auto=format&fit=crop",
      title: "Premium Indoor Court",
    },
    {
      id: 2,
      type: "image",
      url: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=2070&auto=format&fit=crop",
      title: "Night Session Lighting",
    },
    {
      id: 3,
      type: "video",
      url: "https://assets.mixkit.co/videos/preview/mixkit-playing-badminton-with-a-friend-41019-large.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1613918431703-04e4a7796d11?q=80&w=2070&auto=format&fit=crop",
      title: "Match Highlights",
    },
    {
      id: 4,
      type: "image",
      url: "https://images.unsplash.com/photo-1600677396313-4a5dfee3d12d?q=80&w=2070&auto=format&fit=crop",
      title: "Professional Flooring",
    },
    {
      id: 5,
      type: "image",
      url: "https://images.unsplash.com/photo-1611251147551-71fb2c061803?q=80&w=2070&auto=format&fit=crop",
      title: "Locker Room Amenities",
    },
    {
      id: 6,
      type: "video",
      url: "https://videos.pexels.com/video-files/36934432/15647203_2560_1440_30fps.mp4",
      thumbnail:
        "https://images.pexels.com/videos/36934432/pexels-photo-36934432.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=750",
      title: "Power Smash Slow Motion",
    },
    {
      id: 7,
      type: "image",
      url: "https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?q=80&w=2070&auto=format&fit=crop",
      title: "Reception Area",
    },
    {
      id: 8,
      type: "image",
      url: "https://images.unsplash.com/photo-1595435063044-f25717462e08?q=80&w=2070&auto=format&fit=crop",
      title: "Training Session",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-20">
      {/* Intuitve Header */}
      <div className="mb-10 md:mb-16 text-center md:text-left animate-fadeUp">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          Visual Tour
        </h2>
        <div className="h-1.5 w-16 bg-green-500 rounded-full mt-4 mx-auto md:mx-0"></div>
        <p className="text-gray-500 mt-6 text-base md:text-xl max-w-2xl font-medium leading-relaxed">
          Tap on any image or video to enlarge.
        </p>
      </div>

      {/* Grid: 2 columns mobile, 3 tablet, 4 desktop for "expertly intuitive" flow */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {mediaItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedMedia(item)}
            className="group relative aspect-square overflow-hidden rounded-2xl md:rounded-3xl bg-gray-100 cursor-pointer 
                       active:scale-95 transition-all duration-300 opacity-0 animate-fadeUp"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Media Content */}
            <img
              src={item.type === "video" ? item.thumbnail : item.url}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Intuitive Video Indicator (Visible on mobile, always visible) */}
            {item.type === "video" && (
              <div className="absolute top-3 right-3 md:top-5 md:right-5 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/20">
                <PlayCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
            )}

            {/* Desktop-only Detailed Overlay (Subtle) */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
              <p className="text-white text-sm md:text-base font-bold truncate w-full">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Ultra-Intuitive Lightbox */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/98 backdrop-blur-md p-4 animate-modalFadeIn"
          onClick={() => setSelectedMedia(null)}
        >
          {/* Close - Large and Tap-friendly for Mobile */}
          <button
            className="absolute top-8 right-8 z-60 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-2xl border border-white/10"
            onClick={() => setSelectedMedia(null)}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative w-full max-w-6xl h-auto max-h-[85vh] flex flex-col items-center animate-modalScaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.15)] border border-white/5">
              {selectedMedia.type === "video" ? (
                <video
                  src={selectedMedia.url}
                  className="w-full h-full object-contain max-h-[80vh]"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="w-full h-full object-contain max-h-[80vh]"
                />
              )}
            </div>

            <div className="mt-8 text-center px-4">
              <h3 className="text-xl md:text-3xl font-black text-white leading-tight">
                {selectedMedia.title}
              </h3>
              <p className="text-green-500 font-bold uppercase tracking-widest text-xs md:text-sm mt-3">
                {selectedMedia.type === "video"
                  ? "Full Video Tour"
                  : "Facility Showcase"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
