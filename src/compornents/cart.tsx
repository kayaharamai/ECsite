import Head from 'next/head';
import Link from 'next/link';
import useSWR, { useSWRConfig } from 'swr';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../styles/cart.module.css';
import styles from '..//styles/common.module.css';
const fetcher = (url: any) => fetch(url).then((res) => res.json());

function CartPage() {
  const router = useRouter();
  let total = 0;
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(
    'http://localhost:8000/cartItems',
    fetcher
  );

  const [moji, setMoji] = useState('none');
  const [botan, setBotan] = useState('none');

  useEffect(() => {
    if (data && data.length < 1) {
      console.log('文字表示');
      setMoji('block');
    } else {
      console.log('文字表示しない');
      setMoji('none');
    }

    if (data && data.length >= 1) {
      console.log('ボタン表示');
      setBotan('block');
    } else {
      console.log('ボタン表示しない');
      setBotan('none');
    }
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const Total = (props: any) => {
    let tax = props.total * 0.1;
    let totalPrice = tax + props.total;
    return (
      <div className={`${styles.bodyColor}`}>
        <div className={`${style.wrapper}`}>
          <div className="row">
            <div className="col-xs-offset-2 col-xs-8">
              <div className="form-group text-center">
                <span
                  className={`${style.totalPrice}`}
                  // id="total-price"
                  style={{ display: botan }}
                >
                  消費税：{tax.toLocaleString()}円
                </span>
                <br />
                <span
                  className={`${style.totalPrice}`}
                  style={{ display: botan }}
                  // id="total-price"
                >
                  ご注文金額合計：{totalPrice.toLocaleString()}円
                  (税込)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <Head>
        <title>ラクラクヌードル／ショッピングカート</title>
      </Head>

      <div className={`${styles.bodyColor}`}>
        <div className={`${style.wrapper}`}>
          {/* <h1 className="page-title">ショッピングカート</h1> */}
          <h1 className={`${style.title}`}>ショッピングカート</h1>
          <div className="row">
            <table className="striped">
              {/* <thead>

    
<tr key={''}>
             <div> <th  style={{ display: botan }}className="cart-table-th">商品名</th></div>
             <div> <th style={{ display: botan }}className="cart-table-th">価格(税抜)、数量</th></div>
             <div> <th style={{ display: botan }}className="cart-table-th">トッピング、価格(税抜)</th></div>
             <div> <th style={{ display: botan }}className="cart-table-th">小計</th></div>
            </tr>
          </thead> */}

              <tbody>
                {data.map((cartitem: any) => {
                  return (
                    <tr key={''}>
                      <td className="cart-item-name">
                        <div className="cart-item-icon">
                          <Image
                            src={cartitem.img}
                            width={200}
                            height={143}
                          />
                        </div>
                        <span>{cartitem.name}</span>
                      </td>

                      <td>
                        <span className="price">
                          {/* &nbsp;{cartitem.size} */}
                        </span>
                        {cartitem.price.toLocaleString()}円{' '}
                        {cartitem.quantity}個
                      </td>

                      <td>
                        {cartitem.options
                          .filter((option: any) => option)
                          .map((option: any, index: any) => {
                            return (
                              // <li key={index}>{option}&nbsp;200円</li>
                              <li key={index}>
                                {option?.name}:{' '}
                                {option?.price.toLocaleString()}円 ×
                                {option?.quantity}
                              </li>
                            );
                          })}
                      </td>
                      {/* <td>
                    {cartitem.options.map(
                      (option: any, index: any) => {
                        return (
                          <li key={index}>{option}&nbsp;200円</li>
                        );
                      }
                    )}
                  </td> */}

                      <td>
                        <span className="text-center">
                          {cartitem.subtotal.toLocaleString()}円
                        </span>
                      </td>

                      <td>
                        <button
                          className={`${style.btn}`}
                          onClick={async () => {
                            // let number = index + 1
                            await fetch(
                              `http://localhost:8000/cartItems/${cartitem.id}`,
                              { method: 'DELETE' }
                            ).then((res) => {
                              if (res.status === 200) {
                                mutate(
                                  'http://localhost:8000/cartItems'
                                );
                              }
                            });
                          }}
                        >
                          削除
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="row cart-total-price">
            <p style={{ display: 'none' }}>
              {data.map((data: any) => (total += data.subtotal))}
            </p>
          </div>
          <Total total={total} />

          <div className="row order-confirm-btn">
            {/* <Link href={`http://localhost:3000/items/order_confirm`}> */}
            <button
              // className="btn"
              className={` ${style.totalBtn}`}
              type="button"
              style={{ display: botan }}
              onClick={() => {
                let cookie = document.cookie;
                if (cookie.includes('userId')) {
                  router.push('/carts/order_confirm');
                } else {
                  router.push('/login');
                  document.cookie = 'status=shopping; path=/;';
                }
              }}
            >
              <span>注文に進む</span>
            </button>
            {/* </Link> */}
          </div>
          <p id="noneItem" style={{ display: moji }}>
            カートに商品がありません
          </p>
        </div>
      </div>
    </>
  );
}

export default CartPage;
