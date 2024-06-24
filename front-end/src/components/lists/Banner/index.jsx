import styles from './Banner.module.css';
import {Swiper, SwiperSlide, } from 'swiper/react'
import Loader from '../../utils/Loader';
import useImagens from '../../../hooks/useImagens';

export default function Banner(){

  const {imagens, sliderPerVIew} = useImagens();

  return(
    <section className={styles.propaganda}>
      {
        imagens.length ? (
          <Swiper className={styles.banner}
            slidesPerView={sliderPerVIew}
            pagination={{clickable: true}}
            autoplay={{delay: 3500}}
          >
            {
              imagens.slice().reverse().map((imagem) => (
                <SwiperSlide key={imagem.codigo}>
                  <img src={imagem.srcImagem} alt={imagem.altImagem} className={styles.imagemBanner} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        ) : <Loader/>
      }
    </section>
  )
}