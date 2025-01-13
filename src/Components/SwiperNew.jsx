import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import { PUBLIC_NAS_FOLDER } from '../Constant/Static';

import "../Styles/NewSwiper.css";
// import noimage from '../assets/parking/noimage.jpg'

// import required modules
import { Pagination } from 'swiper/modules';
const noimage = require("../assets/parking/defaultnoimag.jpeg")

export default function NewSwiperComponent({  detail, img, vedio }) {
  
  const media = [
    ...(Array.isArray(img) && img.length > 0 ? img : []),
    ...(Array.isArray(vedio) && vedio.length > 0 ? vedio : []),
  ];

  const mediaToDisplay = media.length > 0 ? media : [noimage];

  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {
          detail && (
            mediaToDisplay?.map((item, index) => {
              const isVideo = vedio?.includes(item);
              const mediaSrc = item === noimage
                ? noimage
                : `${PUBLIC_NAS_FOLDER}/MedVallet/ImageofVehicle/${detail?.file_path}/${item}`;

              return (

                <SwiperSlide
                  key={item}>
                  {isVideo ? (
                    <video
                      src={mediaSrc}
                      controls
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <img
                      src={mediaSrc}
                      alt="Media"
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </SwiperSlide>
              )

            })
          )
        }
      </Swiper>
    </>
  );
}



