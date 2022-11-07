import Image from 'next/image';
import { Nav } from '../compornents/nav_format';
import style from '../styles/login.module.css';
import styles from '../styles/common.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react'; //カルーセル用のタグをインポート
import SwiperCore, { Pagination, Autoplay, EffectFade } from 'swiper'; //使いたい機能をインポート
import s from './TestCarousel.module.css'; //同じディレクトリにCSSを用意
SwiperCore.use([Pagination, Autoplay, EffectFade]);
// カルーセルにする画像のソースをリストにします
const images = ['/TopImage.jpg', '/TopImage2.jpg'];
const TopPage = () => {
  return (
    <>
      <div className={`${styles.bodyColor}`}>
        <div className="container">
          <Head>
            <title>ラクラクヌードル</title>
          </Head>
          <Nav name="" />
          <h1>ラクラクヌードル</h1>

          {/* <div className={`${style.imagecontainer}`}>
            <Image src="/TopImage.jpg" width={645} height={450} />
            <Image src="/TopImage2.jpg" width={645} height={450} />
          </div> */}
        </div>
      </div>
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
                width={640}
                height={400}
                alt="test_image"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default TopPage;
