import Head from 'next/head';
import { Nav } from '../../compornents/nav_format';
import { Title } from '../../compornents/register_user';
import styles from '../../styles/common.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from "next/router";
import { Router, useLocation } from "react-router-dom"
import { memo, FC } from "react"

const fetcher = (url: any) => fetch(url).then((res) => res.json());


export const Show: FC = memo(() => {
  const router = useRouter();
  const [userID, SetUserID] = React.useState('');
  // const location = useLocation();
  // const [selectId, setSelectId] 
  // = useState<{ id: number }>(location.state as { id: number });

  useEffect(() => {

    const splitCookie = document.cookie.split(';');
    const list = [];

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split('='));
    }

    list.map((number) => {
      number.map((show) => {
        if (show.match(/[0-9].*/)) {
          SetUserID(show);
        }
      });
    });

  })

  const { data, error, mutate } = useSWR(
    `http://localhost:8000/usersChange?id=${userID}`,
    fetcher
  );

  console.log(data);
  if (error) return <div>An error has occurred.</div>;
  if (!data)
    return (
      <>
        <div></div>
      </>
    );

  if (data.length < 1)
    return (
      <>
        <Head>
          <title>ラクラクヌードル／基本情報</title>
          <link rel="icon" href="/3506.png" />
        </Head>
        <div className='container'>
          <Title title="基本情報の変更" />

          <h1></h1>

        </div>

      </>
    )

  mutate();

  return (
    <>
      <Head>
        <title>ラクラクヌードル／基本情報</title>
        <link rel="icon" href="/3506.png" />
      </Head>

      <div className="container">
        <Title title="基本情報の変更" />
        <Nav name="" />

        <div className="row bg-light  col-lg-offset-3 col-lg-5 col-md-offset-2 col-md-8 col-sm-10 col-xs-12 m-auto">
          <p className="m-1 py-1">基本情報  <span style={{ fontSize: "12px", color: "red" }}>
            &nbsp;&nbsp;変更内容を確認の上、登録してください。
          </span>
          </p>

        </div>

        <div className="row bg-white col-lg-offset-3 col-lg-5 col-md-offset-2 col-md-8 col-sm-10 col-xs-12 m-auto">
          <div className='col-8 mx-4 pt-3'>
            <div>
              <p>{data[0].name}</p>
            </div>
            <div>
              <p>{data[0].mail}</p>
            </div>
            <div>
              <p>〒{data[0].zip}</p>
            </div>
            <div>
              <p>{data[0].address}</p>
            </div>
            <div>
              <p>{data[0].tel}</p>
            </div>
          </div>
          <hr className='col-11 mx-3 ' />
          <div className="col d-flex align-items-center justify-content-center">
            <button className='btn btn-outline-info col-4 mx-2 mb-3' onClick={() => {
              router.push(`/users/modify`)
            }}>戻る</button>
            <button className='btn btn-info col-4 mx-2 mb-3 text-light' onClick={async () => {

              const datas = {
                name: `${data[0].name}`,
                mail: `${data[0].mail}`,
                zip: `${data[0].zip}`,
                address: `${data[0].address}`,
                tel: `${data[0].tel}`,
                pass: `${data[0].pass}`
              };

              await fetch(`http://localhost:8000/users/${data[0].id}`, {
                method: "PUT",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(datas)
              }).then((response) => {
                return response.json();
              }).then((data) => {
                alert("変更いたしました。");
                router.push(`/users/accountPage`)
              })

              const dataModify = {
                name: `${data[0].name}`,
                mail: `${data[0].mail}`,
                zip: `${data[0].zip}`,
                address: `${data[0].address}`,
                tel: `${data[0].tel}`,
                pass: data[0].pass,
                id: data[0].id
              };

              await fetch(`http://localhost:8000/usersChange/${data[0].id}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json'
                },
                // body: JSON.stringify(dataModify)
              })
              
            }}>変更</button>
          </div>
        </div>

      </div>


    </>
  );
});

export default Show;
