/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import { Nav } from '../compornents/nav_format';
import 'bootstrap/dist/css/bootstrap.min.css';
// import style from '../styles/login.module.css';
import { Footer } from '../compornents/footer';
// import style from '../styles/login.module.css';
import styles from '../styles/common.module.css';

import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react'; //カルーセル用のタグをインポート
import SwiperCore, { Pagination, Autoplay, EffectFade } from 'swiper'; //使いたい機能をインポート
import s from './TestCarousel.module.css'; //同じディレクトリにCSSを用意
import style from '../styles/topPage.module.css';
import Link from 'next/link';
SwiperCore.use([Pagination, Autoplay, EffectFade]);
// カルーセルにする画像のソースをリストにします
const images = ['/TopImage.jpg', '/TopImage2.jpg', '/TopImage3.jpg'];
const TopPage = () => {
  return (
    <>
      <div className={`${styles.bodyColor}`}>
      
        <div className="container">
          <Head>
            <title>ラクラクヌードル</title>
          </Head>
          <Nav name="" />

          {/* <h1>ラクラクヌードル</h1> */}

          {/* <div className={`${style.imagecontainer}`}>
            <Image src="/TopImage.jpg" width={645} height={450} />
            <Image src="/TopImage2.jpg" width={645} height={450} />
          </div> */}
          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: `swiper-pagination-bullet ${s.custom_bullet}`, //非アクティブなアイコンのクラスを指定
              bulletActiveClass: `swiper-pagination-bullet-active ${s.custom_bullet_active}`, //アクティブなアイコンのクラスを指定
            }}
            autoplay={{ delay: 1000, disableOnInteraction: true }}
            speed={2000}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={true}
          >
            {images.map((src: string, index: number) => {
              return (
                <SwiperSlide key={`${index}`}>
                  <Image
                    src={src}
                    layout="responsive"
                    width={1280}
                    height={550}
                    alt="test_image"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className={`${style.flexwrap}`}>
            <div>
              {/* <div> */}
              <Image src="/img/insta.jpg" width={500} height={300} />
            </div>
            <div>
              {/* <div> */}
              <Image
                src="/img/twitter.jpg"
                width={500}
                height={300}
              />
            </div>
          </div>
          <div className={`${style.ttl}`}>お知らせ</div>
          <div className={`${style.flex}`}>
            <div>
              {/* <div> */}
              <Image src="/img/news_1.jpg" width={300} height={300} />

              <p>2022/10/30</p>
              <p>出荷情報について</p>
            </div>
            <div>
              {/* <div> */}
              <Image src="/img/news_2.jpg" width={300} height={300} />

              <p>2022/10/30</p>
              <p>出荷情報について</p>
            </div>
            <div>
              {/* <div> */}
              <Image src="/img/news_3.jpg" width={300} height={300} />

              <p>2022/10/30</p>
              <p>出荷情報について</p>
            </div>
          </div>
          <div className={`${style.center}`}>
            <button className={`${style.btn}`}>
              新着情報をもっと見る
            </button>
          </div>
        </div>
      </div>
      <Footer name="" />
    </>
  );
};
export default TopPage;
