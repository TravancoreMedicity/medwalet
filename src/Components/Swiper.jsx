import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "../Styles/Swiper.css";

export default function SwiperComponent({url}) {
    
  return (
    <>
      <Swiper className="mySwiper">
        {
            url?.map((items)=>{
                 return  <SwiperSlide><img src={items} alt="" /></SwiperSlide>
            })
        }
      </Swiper>
    </>
  );
}