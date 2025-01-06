import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import { PUBLIC_NAS_FOLDER } from '../Constant/Static';

import "../Styles/NewSwiper.css";
// import noimage from '../assets/parking/noimage.jpg'

// import required modules
import { Pagination } from 'swiper/modules';
const noimage = require("../assets/parking/defaultnoimag.jpeg")

export default function NewSwiperComponent({ url, id, detail }) {
  const images = Array.isArray(url) && url.length > 0 ? url : [noimage];

  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {
          detail && (
            images?.map((item) => {
              const imageSrc = item === noimage 
              ? noimage 
              : `${PUBLIC_NAS_FOLDER}/MedVallet/ImageofVehicle/${detail?.file_path}/${item}`;

              return <SwiperSlide key={item}><img
                src={imageSrc}
                alt=""
              /></SwiperSlide>
            })
          )
        }
      </Swiper>
    </>
  );
}



