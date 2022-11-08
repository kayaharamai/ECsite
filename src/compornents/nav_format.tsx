import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/register_user.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';

export const Nav = (props: { name: string }) => {
  const router = useRouter();
  const pageList = [
    {
      name: '商品一覧',
      url: '/items/',
    },
    {
      name: 'ショッピングカート',
      url: '/carts/cartPage',
    },
    {
      name: '新規登録画面',
      url: '/users/register_user',
    },
    {
      name: 'アカウント',
      url: '/users/accountPage',
    },
    {
      name: 'ログイン',
      url: '/login',
    },
  ];

  const [cookie, setCookie] = useState('');
  const [userID, SetUserID] = useState('');
  const [buttonDisplay, setButtonDisplay] = useState('none');
  
  const [hamburgerMenueFlag ,setHamburgerMenueFlag] = useState(false);

  const fetcher = (url: any) => fetch(url).then((res) => res.json());

  useEffect(() => {
    let cookie2 = document.cookie;
    if (cookie2.includes('userId')) {
      setCookie(document.cookie);
      setButtonDisplay('block');
    } else {
      // console.log('cookieがありません')
    }

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
  }, []);
  
  const { data, error, mutate } = useSWR(
    `http://localhost:8000/users?id=${userID}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  let nameValue = '';

  if (userID.length !== 0) {
    nameValue = data[0].name;
  } else {
    nameValue = 'ゲスト';
  }

  const logoutClick = () => {
    document.cookie = 'userId=; max-age=0; path=/';

    let cookie = document.cookie;

    if (cookie.includes('status=shopping')) {
      document.cookie = 'status=shopping; max-age=0; path=/';
    }
    router.push('/');
  };


  return (
    <>
      <nav
        className={`navbar navbar-expand-lg fixed-top bg-light w-75 ${styles.nav}`}
      >
        <div className="container">
          <Link className="navbar-brand" href="/">
            {/* 企業ロゴ   */}
            <a>
              <Image
                alt="main log"
                src="/img/header_logo.png"
                height={35}
                width={138}
              />
            </a>
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#Navber"
            aria-controls="Navber"
            aria-expanded="false"
            aria-label="ナビゲーションの切替"
            onClick={()=>{
              if(hamburgerMenueFlag === false){
                setHamburgerMenueFlag(true)
              }else{
                setHamburgerMenueFlag(false)
              }
            }}
            
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="Navber">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className={styles.show}>
                こんにちは&nbsp;&nbsp;&nbsp;{nameValue}&nbsp;さん
              </li>

              {pageList.map((page, index) => {
                if (props.name !== page.name) {
                  if (
                    cookie.includes('userId') &&
                    page.name !== 'ログイン'
                  ) {
                    return (
                      <li className="nav-item" key={index}>
                        <Link href={`${page.url}`}>
                          <a className="nav-link">{page.name}</a>
                        </Link>
                      </li>
                    );
                  }
                  if (cookie === '') {
                    return (
                      <li className="nav-item" key={index}>
                        <Link href={`${page.url}`}>
                          <a className="nav-link">{page.name}</a>
                        </Link>
                      </li>
                    );
                  } else {
                    // setButtonDisplay('none');
                  }
                }
              })}
              <li>
                <button
                  onClick={logoutClick}
                  className={`${styles.clickbtn} `}
                  style={{ display: buttonDisplay }}
                >
                  ログアウト
                </button>
              </li>
            </ul>
          </div>
        </div>
      <HamburgerMenueOpen 
      hamburgerMenueFlag={hamburgerMenueFlag}
      nameValue={nameValue}
      pageList={pageList}
      name={props.name}
      cookie={cookie}
      logoutClick={logoutClick}
      buttonDisplay={buttonDisplay}
      />
      </nav>
    </>
    
  );
};

const HamburgerMenueOpen = (props :any) =>{

  if(props.hamburgerMenueFlag === true){

    return(
      <div className={` bg-light 
      bg-light  zindex-tooltip`}>
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li>
        こんにちは&nbsp;&nbsp;&nbsp;{props.nameValue}&nbsp;さん
      </li>

      {props.pageList.map((page:any, index:number) => {
        if (props.name !== page.name) {
          if (
            props.cookie.includes('userId') &&
            page.name !== 'ログイン'
          ) {
            return (
              <li className="nav-item" key={index}>
                <Link href={`${page.url}`}>
                  <a className="nav-link">{page.name}</a>
                </Link>
              </li>
            );
          }
          if (props.cookie === '') {
            return (
              <li className="nav-item" key={index}>
                <Link href={`${page.url}`}>
                  <a className="nav-link">{page.name}</a>
                </Link>
              </li>
            );
          } else {
            // setButtonDisplay('none');
          }
        }
      })}
      <li>
        <button
          onClick={props.logoutClick}
          className={`${styles.clickbtn} `}
          style={{ display: props.buttonDisplay }}
          >
          ログアウト
        </button>
      </li>
    </ul>
  </div>
  );
}else {
  return <></>
}
}

// className={` nav-link btn btn-link text-decoration-none ${styles.clickbtn} `}
