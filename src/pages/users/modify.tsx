import React, { useState, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { Title } from "../../compornents/register_user"
import { clearModify } from "../../utils/register_user_clear"
import { NameForm, nameJudge } from "../../compornents/form_name";
import { MailForm, mailJudgeModify } from "../../compornents/form_mail";
import { ZipForm, zipJudge } from "../../compornents/form_zip";
import { AddrForm, addrJudge } from "../../compornents/form_address";
import { TelForm, telJudge } from "../../compornents/form_tel";
import { Nav } from "../../compornents/nav_format";
import { useRouter } from "next/router";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/register_user.module.css";
import style from '../../styles/common.module.css';
import { useNavigate } from "react-router-dom";

// import { Breadcrumb } from 'compornents/breadcrumb';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Show = () => {
  const router = useRouter();
  // const navigate = useNavigate()

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
  const [nameStatus, SetNameStatus] = React.useState("init");
  const [mailStatus, SetMailStatus] = React.useState("init");
  const [zipStatus, SetZipStatus] = React.useState("init");
  const [addrStatus, SetAddrStatus] = React.useState("init");
  const [telStatus, SetTelStatus] = React.useState("init");

  const [lastNameValue, SetLastNameValue] = React.useState("");
  const [firstNameValue, SetFirstNameValue] = React.useState("");
  const [mailValue, SetMailValue] = React.useState("");
  const [zipValue, SetZipValue] = React.useState("");
  const [addrValue, SetAddrValue] = React.useState("");
  const [telValue, SetTelValue] = React.useState("");
  
  const [clear, SetClear] = React.useState("");

  useEffect(()=>{
    if(!!data && data.length >= 1 && clear !== "clear"){
        const splitName = data[0].name.split('　');   
        // console.log(splitName);    
        if(nameStatus === "init"){
          SetLastNameValue(splitName[0]);
          SetFirstNameValue(splitName[1]);
        }
        if(mailStatus === "init"){
          SetMailValue(data[0].mail);    
        }
        if(zipStatus === "init"){
          SetZipValue(data[0].zip);
        }
        if(addrStatus === "init"){
          SetAddrValue(data[0].address);
        }
        if(telStatus === "init"){
          SetTelValue(data[0].tel);
        }
      }
    })
    
    console.log(`A: ${lastNameValue}`);
  // console.log(`name:${nameStatus} mail:${mailStatus}
  // zip:${zipStatus}  addr:${addrStatus} tel:${telStatus}`)

  return (
    <div className={`${style.bodyColor} ${styles.height}`}>

      <div className={`container`}>
        <Head>
          <title>ラクラクヌードル／基本情報の変更</title>
          <link rel="icon" href="/3506.png" />
        </Head>

        <Nav name="基本情報の変更" />

        <div className={`row ${styles.row}`}>
          <div
            className="col-lg-offset-3 col-lg-5 col-md-offset-2 col-md-8 col-sm-10 col-xs-12"
          >
            <div className="well">
              <form method="post" action="#">
                <fieldset>
                  <Title title="基本情報の変更" />

                  <NameForm
                    SetFirstNameValue={SetFirstNameValue}
                    SetNameStatus={SetNameStatus}
                    SetLastNameValue={SetLastNameValue}
                    lastNameValue={lastNameValue}
                    firstNameValue={firstNameValue}
                  />
                  <MailForm
                    SetMailValue={SetMailValue}
                    mailValue={mailValue}
                    SetMailStatus={SetMailStatus}
                  />
                  <ZipForm
                    SetZipStatus={SetZipStatus}
                    SetZipValue={SetZipValue}
                    SetAddrValue={SetAddrValue}
                    zipValue={zipValue}
                    zipStatus={zipStatus}
                    SetAddrStatus={SetAddrStatus}
                  />
                  <AddrForm
                    SetAddrStatus={SetAddrStatus}
                    SetAddrValue={SetAddrValue}
                    addrValue={addrValue}
                  />
                  <TelForm
                    SetTelValue={SetTelValue}
                    SetTelStatus={SetTelStatus}
                    telStatus={telStatus}
                    telValue={telValue}
                  />

                  <div className="form-group ">
                    <button type="button" className={` ${styles.btn}`} onClick={async() => {

                      // エラー非表示
                      for (let i = 0; i < 5; i++) {
                        let tag = document.getElementsByClassName("control-label")[i] as HTMLElement;
                        tag.style.display = "none"
                      }

                      if (
                        nameStatus === "ok" ||
                        nameStatus === "init" &&
                        mailStatus === "ok" ||
                        mailStatus === "init" ||
                        mailStatus === "registered" &&
                        zipStatus === "ok" ||
                        zipStatus === "init" &&
                        telStatus === "ok" ||
                        telStatus === "init" 
                      ) {
                        
                        const dataModify = {
                          name: `${lastNameValue}　${firstNameValue}`,
                          mail: mailValue,
                          zip: zipValue,
                          address: addrValue,
                          tel: telValue,
                          pass: data[0].pass,
                          id: data[0].id
                        };

                        console.log(firstNameValue);
                        
                        await fetch(`http://localhost:8000/usersChange`, {
                          method: "POST",
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(dataModify)
                        }).then((response) => {
                          return response.json();
                        }).then((data) => {
                          router.push("/users/accountPage_confirm");
                          
                        })


                        
                        // エラー非表示
                        for (let i = 0; i < 5; i++) {
                          let tag = document.getElementsByClassName("control-label")[i] as HTMLElement;
                          tag.style.display = "none"
                        }

                        // その他
                      } else {
                        // console.log(`name:${nameStatus} mail:${mailStatus}
                        // zip:${zipStatus}  addr:${addrStatus} tel:${telStatus}`)

                        nameJudge(nameStatus);
                        mailJudgeModify(mailStatus);
                        zipJudge(zipStatus);
                        addrJudge(addrStatus);
                        telJudge(telStatus);

                      }
                    }

                    }>変更</button>

                    <button type="reset" className={`${styles.btnClear}`} onClick={() => {
                      SetClear("clear");
                      SetNameStatus("empty");
                      SetMailStatus("empty");
                      SetZipStatus("empty");
                      SetAddrStatus("empty");
                      SetTelStatus("empty");
                      SetFirstNameValue("");
                      SetLastNameValue("");
                      SetMailValue("");
                      SetZipValue("");
                      SetAddrValue("");
                      SetTelValue("");

                      clearModify();

                      // エラー非表示
                      for (let i = 0; i < 5; i++) {
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
