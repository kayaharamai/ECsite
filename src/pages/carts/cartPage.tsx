import Head from 'next/head';
import CartPage from '../../compornents/cart';
import { Nav } from '../../compornents/nav_format';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/common.module.css';


export default function Page() {
  return (
    <>
      <Head>
        <title>ラクラクヌードル／ショッピングカート</title>
        <link rel="icon" href="/3506.png" />
      </Head>
      <div className={`${styles.bodyColor}`}>
        <div className="container">
          <Nav name="ショッピングカート" />
          <CartPage />
        </div>{' '}
      </div>
    </>
  );
}
