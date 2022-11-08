/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import Image from 'next/image';
import { isGeneratorFunction } from 'util/types';
import Link from 'next/link';
import { Nav } from '../../compornents/nav_format';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../../styles/itemList.module.css';
import styles from '../../styles/common.module.css';
import { Breadcrumb } from 'compornents/breadcrumb';
import { Footer } from '../../compornents/footer';
const fetcher = (url: any) => fetch(url).then((res) => res.json());
function Page() {
  const { data, error } = useSWR(
    'http://localhost:8000/items',
    fetcher
  );

  const [search, setSearch] = useState(data);
  const [kensaku, setKensaku] = useState('');
  const [gaitouDisplay, setGaitouDisplay] = useState('none');

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const handleClick = (e: any) => {
    const result = data.filter((item: any) => {
      return item.name.match(kensaku);
    });
    // console.log('result', result);
    setSearch(result);

    console.log('search', search);
    console.log('kensaku', kensaku);
    if (result.length > 0 || kensaku == '') {
      console.log('none');
      setGaitouDisplay('none');
    }
    // if (!search || search.length === 0 )
    else {
      console.log('block');
      setGaitouDisplay('block');
    }
  };

  const narabikae = [data];
  data.sort((a: any, b: any) => {
    return a.price < b.price ? -1 : 1;
  });


  return (
    <>
      <Head>
        <title>ラクラクヌードル／商品一覧</title>
        <link rel="icon" href="/3506.png" />
      </Head>
      <div className={`${styles.bodyColor}`}>
        {/* <div className="container"> */}
        <div className="container">
          <Nav name="商品一覧" />
          <Breadcrumb
            lists={[
              {
                name: 'TOP',
                path: '/',
              },
              {
                name: '商品一覧',
                path: '/items/itemList',
              },
            ]}
          />          

          <div className={`${style.row}`}>
            <div
              className={`col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8 col-sm-10 col-xs-12 ${style.mannaka}`}
            >
              <div className={`panel panel-default${style.default} `}>
                <div className={`${style.panel} panel-heading`}>
                  <div className={`${style.title} panel-title `}>
                    商品を検索する
                  </div>
                </div>
                <div className={`${style.body} panel-body`}>
                  <form
                    method="post"
                    action="#"
                    className="form-horizontal"
                  >
                    <div className="form-group" />
                    {/* <label  className={`${style.syouhinmei} control-label col-sm-2 `}>商品名</label> */}

                    <div className="">
                      <div className="">
                        <input
                          type="text"
                          name="kensaku"
                          id="form1"
                          className={`${style.kensakunakami} form-control input-sm`}
                          value={kensaku}
                          onChange={(e) => setKensaku(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={`${kensaku} text-center `}>
                      <button
                        type="button"
                        value="検索"
                        className={`${style.btnDatail} `}
                        onClick={(e) => handleClick(e)}
                      >
                        検索
                      </button>

                      <button
                        type="button"
                        value="クリア"
                        className={`${style.clea}  `}
                        onClick={() => {
                          setKensaku('');
                          // setGaitouDisplay('none');
                        }}
                      >
                        クリア
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <p
            id="gaitou"
            className={`${style.gaitou}`}
            style={{ display: gaitouDisplay }}
          >
            該当の商品がありません
          </p>
          <div className={`${style.row}`}>
            {/* <div> */}
            {/* <div
              className={`table-responsive col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-10 col-sm-10 col-xs-12 ${style.mannaka}`}
            > */}
            {/* <table className="table table-striped item-list-table"> */}
            {/* <table className=""> */}
            {/* <thead>
          <tr>
            <th className="haba">画像</th>
            <th className="haba">商品名</th>
            <th className="haba">価格</th>
          </tr>
        </thead>
         */}

            <tbody>
              {/* <div className={`${style.wrapper}`}> */}
              <div className={`${style.wrapper}`}>
                {!search?.length &&
                  data.map((item: any) => {
                    return (
                      <tr className="flexbox flexbox-center" key={item.id}>
                        <td className="imag">
                          <Link
                            href={`http://localhost:3000/items/${item.id}`}
                          >
                            <a>
                              <Image
                                src={item.img}
                                width={200}
                                height={143}
                                className={`img-responsive img-rounded item-img-cente ${style.img} `}
                              />
                            </a>
                          </Link>
                        </td>
                        <Link
                          href={`http://localhost:3000/items/${item.id}`}
                        >
                          <div>
                            <td
                              className={`${style.haha} haba no-underline`}
                            >
                              {item.name}
                            </td>
                          </div>
                        </Link>
                        <td className="haba">
                          {item.price.toLocaleString()}円
                        </td>
                      </tr>
                    );
                  })}
              </div>

              {/* <div className={`${style.wrapper}`}> */}
              <div>
                {search?.length > 0 &&
                  search.map((item: any) => {
                    // let number = index + 1 ;
                    return (
                      // <tr className="flexbox flexbox-center">
                      <tr key={item.id}>
                        {/* <td className="imag"> */}
                        <td className="imag">
                          <Link
                            href={`http://localhost:3000/items/${item.id}`}
                          >
                            <a>
                              <Image
                                src={item.img}
                                width={200}
                                height={143}
                                // className={`img-responsive img-rounded item-img-cente ${style.img} `}
                              />
                            </a>
                          </Link>
                        </td>
                        <Link
                          href={`http://localhost:3000/items/${item.id}`}
                        >
                          <div>
                            <td
                              className={`${style.haha} haba no-underline`}
                            >
                              {item.name}
                            </td>
                          </div>
                        </Link>
                        <td className="haba">
                          {item.price.toLocaleString()}円
                        </td>
                      </tr>
                    );
                  })}
              </div>
            </tbody>
            {/* </table> */}
          </div>
        </div>
      </div>
      {/* </div> */}
      <Footer name="商品一覧" />
    </>
  );
}

export default Page;
