import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    id: 1,
    title: "Merch Konser Hindia Rilis",
    subtitle: "Limited Edition NFT Phygital",
    image:
      "https://images.unsplash.com/photo-1672841821756-fc04525771c2?w=800&q=80",
    badge: "EXCLUSIVE",
  },
  {
    id: 2,
    title: "Feast Live at PestaHora",
    subtitle: "Collectible Items Available",
    image:
      "https://images.unsplash.com/photo-1619973226698-b77a5b5dd14b?w=800&q=80",
    badge: "NEW DROP",
  },
  {
    id: 3,
    title: "Dewa 19 Special Edition",
    subtitle: "Vintage Concert Memorabilia",
    image:
      "https://images.unsplash.com/photo-1550219363-d0adfaa43d0f?w=800&q=80",
    badge: "LIMITED",
  },
  {
    id: 4,
    title: "Sal Priadi Indie Collection",
    subtitle: "Handcrafted with NFT Certificate",
    image:
      "https://images.unsplash.com/photo-1709090083073-d130ac28cc19?w=800&q=80",
    badge: "TRENDING",
  },
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const transformClasses = [
    "translate-x-0",
    "-translate-x-full",
    "-translate-x-[200%]",
    "-translate-x-[300%]",
  ];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative h-48 md:h-64 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl overflow-hidden group">
      {/* Slides */}
      <div
        className={`flex h-full transition-transform duration-500 ease-out ${transformClasses[currentIndex] ?? "translate-x-0"}`}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-[#2d4a2b] text-white px-3 py-1 rounded-full text-xs mb-2 inline-block font-medium">
                {banner.badge}
              </div>
              <h2 className="text-white text-lg md:text-xl font-bold mb-1">
                {banner.title}
              </h2>
              <p className="text-white/90 text-sm">{banner.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        aria-label="Previous slide"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 right-4 flex gap-1.5">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all ${
              index === currentIndex
                ? "w-6 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/70"
            } rounded-full`}
          />
        ))}
      </div>
    </div>
  );
}
