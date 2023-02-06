import Head from 'next/head';
import { Nav } from '../../compornents/nav_format';
import { Title } from '../../compornents/register_user';
import styles from '../../styles/common.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from "next/router";

const fetcher = (url: any) => fetch(url).then((res) => res.json());


export const Show = () => {
  const router = useRouter();
  const [userID, SetUserID] = React.useState('');

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
    `http://localhost:8000/users?id=${userID}`,
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
          <Nav name='' />
          <Title title="基本情報の変更" />

          <div className="row bg-light  col-lg-offset-3 col-lg-5 col-md-offset-2 col-md-8 col-sm-10 col-xs-12 m-auto">
            <p className="m-1 py-1">基本情報</p>
          </div>
          <div className="row bg-white col-lg-offset-3 col-lg-5 col-md-offset-2 col-md-8 col-sm-10 col-xs-12 m-auto">
            <div className='col-8 mx-4 pt-3'>

            </div>
            <div className="col d-flex align-items-center justify-content-center">
            
                <button className='btn btn-outline-info'>変更</button>
           
            </div>
          </div>

          <div className="row bg-light col-lg-offset-3 col-lg-5 col-md-offset-2 col-md-8 col-sm-10 col-xs-12 m-auto">
            <p className='m-1 py-1'>パスワード</p>
          </div>
          <div className="row bg-white col-lg-offset-3 col-lg-5 col-md-offset-2 col-md-8 col-sm-10 col-xs-12 m-auto">
            <div className='col-8 mx-4 pt-3'>
              <p>セキュリティのためパスワードは非表示となっています</p>
            </div>
            <div className="col d-flex align-items-center justify-content-center">
        
                <button className='btn btn-outline-info '>変更</button>
         
            </div>
          </div>

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
        <Nav name="" />
        <Title title="基本情報の変更" />

        <div className="row bg-light  col-lg-offset-3 col-lg-5 col-md-offset-2 col-md-8 col-sm-10 col-xs-12 m-auto">
          <p className="m-1 py-1">基本情報</p>
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
          <div className="col d-flex align-items-center justify-content-center">
  
              <button className='btn btn-outline-info' onClick={()=>{
              router.push(`/users/modify`)
              }}>変更</button>
       
          </div>
        </div>

        <div className="row bg-light col-lg-offset-3 col-lg-5 col-md-offset-2 col-md-8 col-sm-10 col-xs-12 m-auto">
          <p className='m-1 py-1'>パスワード</p>
        </div>
        <div className="row bg-white col-lg-offset-3 col-lg-5 col-md-offset-2 col-md-8 col-sm-10 col-xs-12 m-auto">
          <div className='col-8 mx-4 pt-3'>
            <p>セキュリティのためパスワードは非表示となっています</p>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
          
              <button className='btn btn-outline-info' onClick={()=>{
              router.push(`/users/modifyPass`)
              }}>変更</button>
          
          </div>
        </div>
      </div>


    </>
  );
};

export default Show;
