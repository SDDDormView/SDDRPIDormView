"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const images = [
    "/fieldrpi.jpg",
    "/rpidorms1.jpg",
    "/empac_west-facade_paul-rivera.jpg.webp",
  ];

  // Clone first and last images for infinite loop
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start / reset auto-slide
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 15000);
  };

  // Start on mount
  useEffect(() => {
    startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Handle infinite loop reset
  useEffect(() => {
    if (current === images.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 700);
    }
  }, [current, images.length]);

  // Re-enable transition after reset
  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    }
  }, [isTransitioning]);

  // Navigation
  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
    startAutoSlide(); // reset timer
  };

  const prevSlide = () => {
    if (current === 0) return;
    setCurrent((prev) => prev - 1);
    startAutoSlide(); // reset timer
  };

  return (
    <main className="w-full">
      {/* UPPER SECTION */}
      <section
        className="relative h-[70vh] w-full overflow-hidden"
        onMouseEnter={() => intervalRef.current && clearInterval(intervalRef.current)}
        onMouseLeave={startAutoSlide}
      >
        {/* Image Slider */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`flex h-full ${
              isTransitioning
                ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                : ""
            }`}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {extendedImages.map((img, index) => (
              <img
                key={index}
                src={img}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <h1
            className="text-white text-6xl font-semibold"
            style={{ textShadow: "3px 3px 0px black" }}
          >
            Find Dorms <br /> For You
          </h1>
        </div>

        {/* Bottom Left Text */}
        <div className="absolute bottom-10 left-10 max-w-md px-4">
          <p
            className="text-white text-xl"
            style={{ textShadow: "2px 2px 0px black" }}
          >
            Explore the selection of dorms at RPI that meet your needs, price,
            and location
          </p>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-white text-3xl z-10"
        >
          ←
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-3xl z-10"
        >
          →
        </button>
      </section>

      {/* Progress Bars */}
      <div className="flex gap-2 px-4 py-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => { setCurrent(index); startAutoSlide(); }}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              index === current % images.length ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* LOWER SECTION */}
      <section className="flex text-left px-4 py-5">
        <h2 className = "text-3xl font-bold mb-4"><code>Discover Dorms</code></h2>
        <p className="text-1xl italic px-10 py-2">Discover RPI</p>
      </section>

      <section className="flex px-4 py-5">
        {/* IMAGE */}
        <img src="/fieldrpi.jpg" alt="Dorm Image" className="w-80 h-80 object-cover rounded-lg shadow-md" />
        {/* TEXT DORM NAME */}
        <div className="absolute bottom-15 left-5 max-w-md px-4">
          <p
            className="text-white text-xl"
            style={{ textShadow: "1px 1px 0px black" }}
          >
            John  Polytechnic
          </p>
        </div>
        {/* LEFT AND RIGHT ARROW SCROLLS */}
        {/* GREY BOX */}
        <section className="relative left-5 bg-gray-200 rounded-lg w-full">
          {/* HEADER - Dorm Name, Location, etc... */}
          <div className = "flex items-left gap-4">
            <p className="text-1xl italic px-5 py-2">Dorm: John Polytechnic</p>
            <p className="text-1xl italic px-5 py-2">Room Types: Single, Double, Triple</p>
            <p className="text-1xl italic px-5 py-2">Student Rating: 4.5/5</p>
          </div>

          {/* DESCRIPTION - General description of dorm*/}

          <div className = "text-1xl px-5 py-2">
            <h1 className = "text-2xl font-bold mb-4">
              Description
            </h1>
            <p className="whitespace-pre-line">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis tortor at nisi varius, vitae sodales nisl efficitur.
              Aenean scelerisque tincidunt odio, at imperdiet lacus malesuada a. Praesent suscipit lectus vel sagittis congue. Nam sit amet bibendum justo. 
              Proin lobortis dapibus nibh non sollicitudin. Vivamus scelerisque lectus eu dui fermentum, ac tempus ipsum euismod. 
              Aenean venenatis eget augue id lobortis. Aenean porta, ligula et tempus viverra, felis leo sagittis elit, ut sagittis lacus massa sit amet quam. 
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Quisque non luctus orci. Morbi sit amet semper lacus. Praesent a dui a nisl dapibus congue a et leo. Quisque et dapibus ex, id hendrerit purus. 
              Phasellus condimentum, leo non condimentum aliquet, mauris felis suscipit est, ac laoreet lectus orci eget metus. Vivamus mollis tempus quam eget viverra. 
              Nam vitae scelerisque lorem.
            </p>

          </div>
          
        </section>
          

          

      </section>

    </main>
  );
}