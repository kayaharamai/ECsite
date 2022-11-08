import Link from 'next/link';
import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Nav } from '../../compornents/nav_format';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../../styles/login.module.css';
import styles from '../../styles/common.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import  {Breadcrumb} from '../../compornents/breadcrumb';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorDisplay, setErrorDisplay] = useState('none');
  const [isRevealPassword, setIsRevealPassword] = useState(false);

  const HandleSubmit = (e: any) => {
    e.preventDefault();

    const dataItem = {
      email: email,
      pass: pass,
    };
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json charset=utf-8',
      },
      body: JSON.stringify(dataItem),
    };
    fetch('/api/login', request)
      .then((response) => response.json())
      .then((data) => {
        if (data === 'OK') {
          setErrorDisplay('none');

          let cookie = document.cookie;
          if (cookie.includes('status=shopping')) {
            router.push('/carts/order_confirm');
          } else {
            router.push('/items/');
          }
        } else if (data === 'NG') {
          setErrorDisplay('block');
        }
      })
      .catch((error) => {
        alert('エラーが発生しました！');
      });
  };

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };
  return (
    <>
      <div className={`${styles.bodyColor}`}>
        <Head>
          <title>ラクラクヌードル／ログインページ</title>
          <link rel="icon" href="/3506.png" />
        </Head>

        <div className={`container`}>
          <Nav name="ログイン" />
          {/* <Breadcrumb lists={[
            {
              name: "ログイン",
              path: "/items/loginpage"
            },
          ]
          }/> */}
          <div className={`${style.box}`}>
            <h1 className={`${style.title}`}>ログイン</h1>

            <form
              method="POST"
              onSubmit={HandleSubmit}
              className={`${style.form}`}
            >
              <label htmlFor="email" className={`${style.border}`}>
                メールアドレス
              </label>

              <br />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                className={`${style.input}`}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <br />
              <label htmlFor="pass" className={`${style.border}`}>
                パスワード
              </label>
              <br />
              <div>
                
              </div>
              <input
                id="pass"
                type={isRevealPassword ? 'text' : 'password'}
                name="pass"
                placeholder="Password"
                className={`${style.input}`}
                value={pass}
                onChange={(event) => {
                  setPass(event.target.value);
                }}
              />
              <span
                onClick={togglePassword}
                role="presentation"
                className={`${style.PasswordReveal}`}
              >
                {isRevealPassword ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    className={`${style.passicon}`}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className={`${style.passicon}`}
                  />
                )}
              </span>
              <br />
              <p
                style={{ display: errorDisplay }}
                className={`${style.errormessage}`}
              >
                メールアドレス、またはパスワードが間違っています
              </p>
              <button type="submit" className={`${style.button}`}>
                ログイン
              </button>
            </form>
            <Link href={'/users/register_user'}>
              <a className={`${style.link}`}>ユーザー登録はこちら</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
