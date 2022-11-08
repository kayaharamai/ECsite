import React, { useState, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { Title } from "../../compornents/register_user"
import { clearModifyPass } from "../../utils/register_user_clear"
import { CurrentPasswordForm, currentPassJudge } from "../../compornents/form_ currentPassword";
import { NewPasswordForm, newPassJudge } from "../../compornents/form_ newPassword";
import { Nav } from "../../compornents/nav_format";
import { useRouter } from "next/router";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/register_user.module.css";
import style from '../../styles/common.module.css';

// import { Breadcrumb } from 'compornents/breadcrumb';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Show = () => {
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

  // 判定 フラグ
  const [currentPassStatus, SetCurrentPassStatus] = React.useState("empty");
  const [newPassStatus, SetNewPassStatus] = React.useState("empty");

  const [currentPassValue, SetCurrentPassValue] = React.useState("");
  const [newPassValue, SetNewPassValue] = React.useState("");



  return (
    <div className={`${style.bodyColor} ${styles.height}`}>

      <div className={`container`}>
        <Head>
          <title>ラクラクヌードル／基本情報の変更</title>
          <link rel="icon" href="/3106.png" />
        </Head>

        <Nav name="基本情報の変更" />

        <div className={`row ${styles.row}`}>
          <div
            className="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8 col-sm-10 col-xs-10"
          >
            <div className="well">
              <form method="post" action="#">
                <fieldset>
                  <Title title="パスワードの変更" />

                  <CurrentPasswordForm
                    SetCurrentPassStatus={SetCurrentPassStatus}
                    SetCurrentPassValue={SetCurrentPassValue}
                    SetNewPassStatus={SetNewPassStatus}
                  />
                  <NewPasswordForm
                    SetNewPassStatus={SetNewPassStatus}
                    SetNewPassValue={SetNewPassValue}
                  />


                  <div className="form-group ">
                    <button type="button" className={` ${styles.btn}`} onClick={() => {

                      // エラー非表示
                      for (let i = 0; i < 2; i++) {
                        let tag = document.getElementsByClassName("control-label")[i] as HTMLElement;
                        tag.style.display = "none"
                      }

                      if (
                        newPassStatus === "ok" &&
                        currentPassStatus === "ok" 
                      ) {

                        const dataModify = {
                          name: data[0].name,
                          mail: data[0].mail,
                          zip: data[0].zip,
                          address: data[0].address,
                          tel: data[0].tel,
                          pass: newPassValue
                        };


                        fetch(`http://localhost:8000/users/${userID}`, {
                          method: "PUT",
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(dataModify)

                        }).then((response) => {
                          return response.json();
                        }).then((data) => {
                          console.log(data)
                          alert("変更いたしました");
                          router.push("/users/accountPage");
                        })
                        // エラー非表示
                        for (let i = 0; i < 2; i++) {
                          let tag = document.getElementsByClassName("control-label")[i] as HTMLElement;
                          tag.style.display = "none"
                        }

                        // その他
                      } else {

                        currentPassJudge(currentPassStatus);
                        newPassJudge(newPassStatus);
                       
                      }
                    }

                    }>変更</button>

                    <button type="reset" className={`${styles.btnClear}`} onClick={() => {
;
                      SetCurrentPassStatus("empty");
                      SetNewPassStatus("empty");

                      clearModifyPass();

                      // エラー非表示
                      for (let i = 0; i < 2; i++) {
                        let tag = document.getElementsByClassName("control-label")[i] as HTMLElement;
                        tag.style.display = "none"
                      }

                    }}>クリア</button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Show;

{/* 
  問題なしの場合、ok
  空欄の場合、empty
  形式が不正の場合、format-incorrect
  登録済みの場合、registered
  郵便番号が存在しない場合、unexist
  8文字以上16文字以内でなかった場合、pass-incorrect
  パスワードと不一致の場合、pass-mismatch
*/}
