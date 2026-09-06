"use client";

import {
  RxCode,
  RxComponent1,
  RxDesktop,
  RxGear,
  RxRocket,
  RxArrowTopRight,
} from "react-icons/rx";
import type { IconType } from "react-icons";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const serviceData: {
  Icon: IconType;
  title: string;
  description: string;
}[] = [
  {
    Icon: RxCode,
    title: "Programming",
    description: "Python, Java and JavaScript (ES6+), with OOP and DSA fundamentals.",
  },
  {
    Icon: RxRocket,
    title: "Generative AI & LLMs",
    description:
      "Daily use of Claude, ChatGPT and Copilot-style tools; self-driven prompt engineering.",
  },
  {
    Icon: RxDesktop,
    title: "Web Development",
    description: "HTML5, CSS3, JavaScript DOM, responsive design and REST APIs.",
  },
  {
    Icon: RxGear,
    title: "Tooling & Debugging",
    description: "Git & GitHub workflows, plus Chrome DevTools for root-cause analysis.",
  },
  {
    Icon: RxComponent1,
    title: "Currently learning",
    description: "Building practical experience with React.js and SQL / MySQL.",
  },
];

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      freeMode
      className="h-60 sm:h-85"
    >
      {serviceData.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300">
            <div className="text-4xl text-accent mb-4">
              <item.Icon aria-hidden />
            </div>

            <div className="mb-8">
              <div className="mb-2 text-lg">{item.title}</div>
              <p className="max-w-87.5 leading-normal">{item.description}</p>
            </div>

            <div className="text-3xl">
              <RxArrowTopRight
                className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300"
                aria-hidden
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServiceSlider;
