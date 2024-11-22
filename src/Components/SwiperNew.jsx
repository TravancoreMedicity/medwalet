import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';


import "../Styles/NewSwiper.css";

// import required modules
import { Pagination } from 'swiper/modules';

export default function NewSwiperComponent({url}) {

  const images = Array.isArray(url) ? url : [];
  const hasImages = images.length > 0;
  
  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
      {
            url?.map((items)=>{
                 return  <SwiperSlide key={items}><img src={items} alt="" /></SwiperSlide>
            })
        } 
      </Swiper>
    </>
  );
}
