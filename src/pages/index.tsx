import Image from 'next/image';
import { Nav } from '../compornents/nav_format';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../styles/login.module.css';
import styles from '../styles/common.module.css';

import Head from 'next/head';

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
          <div className={`${style.imagecontainer}`}>
            <Image src="/TopImage.jpg" width={645} height={450} />
            <Image src="/TopImage2.jpg" width={645} height={450} />
          </div>
        </div>
      </div>
    </>
  );
};
export default TopPage;
