import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from '../../compornents/nav_format';
import style from '../../styles/detail.module.css';
import styles from '../../styles/common.module.css';
import { Breadcrumb } from 'compornents/breadcrumb';
import { Footer } from '../../compornents/footer';
let datas = '';
export async function getStaticProps({ params }: any) {
  const res = await fetch(
    `http://localhost:8000/items/${params.id} `
  );
  const item = await res.json();

  const optionres = await fetch(`http://localhost:8000/options`);

  const options = await optionres.json();

  return {
    props: {
      items: item,
      options: options,
    },
  };
}

export async function getItemsIds() {
  const items = await fetch('http://localhost:8000/items').then(
    (res) => res.json()
  );
  return items.map((item: { id: string }) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });
}
export async function getStaticPaths() {
  const paths = await getItemsIds();

  return {
    paths,
    fallback: false,
  };
}

export default function ItemDetail({ items, options }: any) {
  const [nameText, setNameText] = useState(items.name);
  const [descText, setDescText] = useState(items.description);
  const [priceText, setPriceText] = useState(items.price);
  const [idText, setIdText] = useState(items.id);
  const [imgText, setImgText] = useState(items.img);
  const [count, setCount] = useState(1);

  // const [selectOptions, setSelectOptions] = useState({});
  const [optionPrice, setOptionPrice] = useState(0);
  // const total = num;
  // const total = count * priceText;
  // オプション1と2が選択されている場合、 `const selectOptions = { 1: true, 2: true };` と同等になる
  const [selectOptions, setSelectOptions] = useState<
    Record<number, boolean>
  >({});
  // onChangeで変更処理があったオプションの情報を、selectOptionsステートにも反映する
  function optionChanged(optionId: number, value: boolean) {
    selectOptions[optionId] = value;
    setSelectOptions({ ...selectOptions });
  }
  // selectOptionsの値段を集計する
  let optionTotalPrice = 0;
  for (const id in selectOptions) {
    // selectOptions[??]の値がtrueの場合にのみ値段を加算する
    const foundOption = options.find(
      (option: { id: number }) => option.id === Number(id)
    );
    if (selectOptions[id] && foundOption) {
      optionTotalPrice += foundOption.price;
    }
  }

  const total = priceText + optionTotalPrice;
  const totalall = count * total;
  /*
チェックボックスがチェックされたらオプションの合計金額をだす
初期表示がチェックがついているかいないかの確認
*/
  // function optionChanged(optionId: number, value: boolean) {
  //   // selectOptions[optionId] = value;
  //   setSelectOptions(selectOptions);
  // }
  // let optionTotalPrice = 0;
  // for (const id in selectOptions) {
  //   if (selectOptions[id]) {
  //     optionTotalPrice += selectOptions[id];
  //   }
  // }
  let datas = '';
  const onClickCreate = () => {
    // let optionTotalPrice = 0;
    // for (const id in selectOptions) {
    //   // selectOptions[??]の値がtrueの場合にのみ値段を加算する
    //   const foundOption = options.find(
    //     (option: { id: number }) => option.id === Number(id)
    //   );
    //   if (selectOptions[id] && foundOption) {
    //     optionTotalPrice += foundOption.price;
    //   }
    //   const optionsArray = Object.entries(selectOptions)
    //     .filter(([id, selected]) => selected)
    //     .map(([id, selected]) => {
    //       const option = options.find(
    //         (op: any) => op.id === Number(id)
    //       );
    //       return {
    //         ...option,
    //         quantity: count,
    //       };
    //     });

    const optionsArray = Object.entries(selectOptions)
      .filter(([id, selected]) => selected)
      .map(([id, selected]) => {
        const option = options.find(
          (op: any) => op.id === Number(id)
        );
        return {
          ...option,
          quantity: count,
        };
      });
    const optionTotalPrice = optionsArray
      .map((option) => option.price * option.quantity)
      .reduce((a, b) => a + b, 0);
    return fetch('http://localhost:8000/cartItems', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        img: imgText,
        name: nameText,
        price: priceText,
        quantity: count,
        options: optionsArray,
        subtotal: totalall,
        // id: idText,
      }),
    })
      .then((res) => res.json)
      .then((data) => {
        datas = data.name;
        console.log(data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(datas);

  return (
    <div className={`${styles.bodyColor}`}>
      <div className="container">
        <Head>
          <title>ラクラクヌードル／商品詳細</title>
          <link rel="icon" href="/3506.png" />
        </Head>
        <Nav name="" />
        <Breadcrumb
          lists={[
            {
              name: 'TOP',
              path: '/',
            },
            {
              name: '商品一覧',
              path: '/items',
            },
            {
              name: items.name,
              path: '/',
            },
          ]}
        />
        <form action="cart_list.html">
          <div className={`${style.wrapper}`}>
            <div className="row">
              <div className="col-xs-offset-2 col-xs-8">
                {/* <h3 className={`text-center ${style.title}`}>
                  商品詳細情報
                </h3> */}
                {/* <div className="row">
                <div className="col-xs-5">
                  <Image
                    src={imgText}
                    width={200}
                    height={143}
                    className="img-responsive img-rounded item-img-center"
                  />
                </div>

                <div className="col-xs-5">
                  <div className="bs-component">
                    <h4>{nameText}</h4>
                    <br />
                    <br />
                    <p>{descText}</p>
                  </div>
                </div>
              </div> */}
                <div className={`${style.box}`}>
                  <div className={`${style.pict}`}>
                    <Image
                      src={imgText}
                      width={200}
                      height={143}
                      className="img-responsive img-rounded item-img-center"
                    />
                  </div>
                  <div className={`${style.text}`}>
                    <h4>{nameText}</h4>
                    <p>{descText}</p>
                    <p className={`${style.priceSize}`}>
                      {priceText}円
                    </p>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-xs-offset-2 col-xs-8">
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-12"></div>
                        <div className="col-sm-12">
                          {/* <label className="radio-inline">
                          {priceText}円
                        </label> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-xs-offset-2 col-xs-8">
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="col-sm-12">
                            <p>トッピング</p>
                            <label className="inputResponsibleCompany">
                              {options.map(
                                (option: any, index: any) => {
                                  return (
                                    <>
                                      <input
                                        type="checkbox"
                                        value="{option.id}"
                                        className="checks"
                                        id={`checks_${option.id}`}
                                        key={index}
                                        // onChange={(e) => {
                                        onClick={(e) => {
                                          const optionId = option.id; // オプションのID　mapループの変数から取得
                                          const checked =
                                            e.currentTarget.checked; // チェックボックスが選択されているかどうか true/fales
                                          optionChanged(
                                            optionId,
                                            checked
                                          ); // hooksのステートに保存するための処理を呼び出し
                                        }}
                                      />
                                      <label
                                        htmlFor={`checks_${option.id}`}
                                      >
                                        <p
                                          className={
                                            style.checkboxInline
                                          }
                                          key={index}
                                        >
                                          {option.name}
                                        </p>
                                        <p
                                          className={
                                            style.checkboxInline
                                          }
                                          key={index}
                                        >
                                          {option.price}円
                                        </p>
                                      </label>
                                    </>
                                  );
                                }
                              )}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-offset-2 col-xs-8">
                    <div className="form-group">
                      <div className="row">
                        <div className="col-xs-5 col-sm-5">
                          <label>数量:</label>
                          <label className="control-label">
                            数量を選択してください
                          </label>
                          <select
                            name=""
                            className={`form-control ${style.countPull}`}
                            onChange={(e: any) =>
                              setCount(e.target.value)
                            }
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-xs-offset-2 col-xs-10">
                    {/* <div className="form-group"> */}
                    <p className={`${style.totalPrice}`}>
                      合計金額
                      {totalall.toLocaleString()}円
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-offset-2 col-xs-3">
                  <div className="form-group">
                    <p className={`${style.btnCenter}`}>
                      <Link href="http://localhost:3000/carts/cartPage">
                        <button
                          className={`${style.btnDatail}`}
                          onClick={() => onClickCreate()}
                        >
                          カートに入れる
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </form>
      </div>
      <Footer name="商品詳細" />
    </div>
  );
}
