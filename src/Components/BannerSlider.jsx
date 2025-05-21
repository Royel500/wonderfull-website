// BannerSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Spring Garden Fest 2025",
      description: "Join our biggest gardening event of the year!",
      image: "/src/assets/Slider1.jpg"
    },
    {
      id: 2,
      title: "Urban Gardening Tips",
      description: "Discover how to grow fresh veggies in your balcony.",
      image: "/src/assets/Slider2.jpg"
    },
    {
      id: 3,
      title: "Kids Gardening Workshop",
      description: "Fun and learning combined for young gardeners.",
      image:"/src/assets/images.jpeg"
    }
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000 }}
      loop={true}
    >
      {slides.map(slide => (
        <SwiperSlide key={slide.id}>
          <div
            className="h-[400px] md:h-[500px] bg-cover bg-center opacity-70 flex items-center justify-center text-white"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="bg-black/50 p-6 rounded text-center">
              <h2 className="text-3xl md:text-5xl font-bold">{slide.title}</h2>
              <p className="mt-3">{slide.description}</p>
              <button className="mt-4 px-4 py-2 text-black hover:bg-green-600 rounded">
                Learn More
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
