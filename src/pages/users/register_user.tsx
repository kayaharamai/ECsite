import React from 'react';
import { Title } from "../../compornents/register_user"
import { clear } from "../../utils/register_user_clear"
import { NameForm, nameJudge } from "../../compornents/form_name";
import { MailForm, mailJudge } from "../../compornents/form_mail";
import { ZipForm, zipJudge } from "../../compornents/form_zip";
import { AddrForm, addrJudge } from "../../compornents/form_address";
import { TelForm, telJudge } from "../../compornents/form_tel";
import { PassForm, passJudge } from "../../compornents/form_pass";
import { ConPassForm, conPassJudge } from "../../compornents/form_conPass";
import { Nav } from "../../compornents/nav_format";
import { useRouter } from "next/router";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/register_user.module.css";
import style from '../../styles/common.module.css';
// import { Breadcrumb } from 'compornents/breadcrumb';

const Show = () => {
  const router = useRouter();

  // 判定 フラグ
  const [nameStatus, SetNameStatus] = React.useState("empty");
  const [mailStatus, SetMailStatus] = React.useState("empty");
  const [zipStatus, SetZipStatus] = React.useState("empty");
  const [addrStatus, SetAddrStatus] = React.useState("empty");
  const [telStatus, SetTelStatus] = React.useState("empty");
  const [passStatus, SetPassStatus] = React.useState("empty");
  const [conPassStatus, SetConPassStatus] = React.useState("empty");

  const [firstNameValue, SetFirstNameValue] = React.useState("");
  const [lastNameValue, SetLastNameValue] = React.useState("");
  const [mailValue, SetMailValue] = React.useState("");
  const [zipValue, SetZipValue] = React.useState("");
  const [addrValue, SetAddrValue] = React.useState("");
  const [telValue, SetTelValue] = React.useState("");
  const [passValue, SetPassValue] = React.useState("");
  const [conPassValue, SetConPassValue] = React.useState("");


  console.log(`name:${nameStatus} mail:${mailStatus}
  zip:${zipStatus}  addr:${addrStatus} tel:${telStatus} pass:${passStatus} conPass:${conPassStatus}`)

  return (
    <div className={`${style.bodyColor} ${styles.height}`}>

      <div className={`container`}>
        <Head>
          <title>ラクラクヌードル／ユーザー登録画面</title>
          <link rel="icon" href="/3506.png" />
        </Head>

        <Nav name="新規登録画面" />

        <div className={`row ${styles.row}`}>
          <div
            className="col-lg-offset-3 col-lg-5 col-md-offset-2 col-md-8 col-sm-10 col-xs-12"
          >
            <div className="well">
              <form method="post" action="#">
                <fieldset>
                  <Title title="ユーザー登録" />

                  <NameForm
                    SetFirstNameValue={SetFirstNameValue}
                    SetNameStatus={SetNameStatus}
                    SetLastNameValue={SetLastNameValue}
                  />
                  <MailForm
                    SetMailValue={SetMailValue}
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
                  <PassForm
                    SetPassStatus={SetPassStatus}
                    SetPassValue={SetPassValue}
                    SetConPassStatus={SetConPassStatus}
                    conPassValue={conPassValue}
                  />
                  <ConPassForm
                    SetConPassStatus={SetConPassStatus}
                    SetConPassValue={SetConPassValue}
                    conPassValue={conPassValue}
                    passValue={passValue}
                  />

                  <div className="form-group   ">
                    <button type="button" className={` ${styles.btn}`} onClick={() => {

                      // エラー非表示
                      for (let i = 0; i < 7; i++) {
                        let tag = document.getElementsByClassName("control-label")[i] as HTMLElement;
                        tag.style.display = "none"
                      }

                      if (
                        nameStatus === "ok" &&
                        mailStatus === "ok" &&
                        zipStatus === "ok" &&
                        telStatus === "ok" &&
                        passStatus === "ok" &&
                        conPassStatus === "ok"
                      ) {

                        const data = {
                          name: `${lastNameValue}　${firstNameValue}`,
                          mail: mailValue,
                          zip: zipValue,
                          address: addrValue,
                          tel: telValue,
                          pass: passValue
                        };

                        fetch(`http://localhost:8000/users`, {
                          method: "POST",
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(data)
                        }).then((response) => {
                          return response.json();
                        }).then((data) => {
                          alert("登録が完了いたしました。");
                          router.push("/login");
                        })
                        // エラー非表示
                        for (let i = 0; i < 7; i++) {
                          let tag = document.getElementsByClassName("control-label")[i] as HTMLElement;
                          tag.style.display = "none"
                        }

                        // その他
                      } else {
                        console.log(`name:${nameStatus} mail:${mailStatus}
                        zip:${zipStatus}  addr:${addrStatus} tel:${telStatus} pass:${passStatus} conPass:${conPassStatus}`)

                        nameJudge(nameStatus);
                        mailJudge(mailStatus);
                        zipJudge(zipStatus);
                        addrJudge(addrStatus);
                        telJudge(telStatus);
                        passJudge(passStatus);
                        conPassJudge(conPassStatus, passValue, conPassValue)

                      }
                    }

                    }>登録</button>

                    <button type="reset" className={`${styles.btnClear}`} onClick={() => {
                      SetNameStatus("empty");
                      SetMailStatus("empty");
                      SetZipStatus("empty");
                      SetAddrStatus("empty");
                      SetTelStatus("empty");
                      SetPassStatus("empty");
                      SetConPassStatus("empty");
                      SetZipValue("");
                      SetTelValue("");
                      SetConPassValue("");

                      clear();

                      // エラー非表示
                      for (let i = 0; i < 7; i++) {
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
