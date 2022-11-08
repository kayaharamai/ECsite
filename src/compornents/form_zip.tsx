import { Btn } from "./form_Btn"
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/register_user.module.css'
import React, { ChangeEvent, useEffect } from "react";

export const zipJudge = (zipStatus: any) => {
  if (zipStatus === "empty" || zipStatus === "init") {
    let tag = document.getElementsByClassName("control-label")[2] as HTMLElement;
    tag.style.display = "inline-block"
    document.getElementsByClassName("control-label")[2].innerHTML = "郵便番号を入力してください"
  }

  if (zipStatus === "format-incorrect") {
    let tag = document.getElementsByClassName("control-label")[2] as HTMLElement;
    tag.style.display = "inline-block"
    tag.innerHTML = "郵便番号はXXX-XXXXの形式で入力してください"
  }

  if (zipStatus === "unexist") {
    let tag = document.getElementsByClassName("control-label")[2] as HTMLElement;;
    tag.style.display = "inline-block"
    tag.innerHTML = "この郵便番号は存在しません"
  }
}

export const ZipForm = (props: any) => {

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {

    let zipValue = ev.target.value
    props.SetZipValue(zipValue);
      if (!zipValue) {
        props.SetZipStatus("empty")
      } else if (!zipValue.match(/^\d{3}-\d{4}$/)) {
        props.SetZipStatus("format-incorrect")
      } else {
        fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipValue}`)
          .then(res => res.json())
          .then((json) => {
            if (json.results === null) {
              props.SetZipStatus("unexist")
            } else {
              props.SetZipStatus("ok")
            }
          })
          .catch((error) => {
            props.SetZipStatus("unexist")
            console.log(error)
          });
      }
  }
 

  return (
    <>
      <div className={`form-group ${styles.formGroup}`} key="zipForm" >
        <label htmlFor="inputZipcode" className={styles.title}>郵便番号</label>

        <Btn
          zipStatus={props.zipStatus}
          zipValue={props.zipValue}
          SetAddrValue={props.SetAddrValue}
          SetAddrStatus={props.SetAddrStatus}
        />

        <label
          id="ErrorInputZipcode"
          className="control-label"
          style={{
            color: "red",
            display: "none"
          }}
          htmlFor="inputError"
        >郵便番号を入力してください</label>
        <input
          type="text"
          id="inputZipcode"
          className="form-control form-control-lg "
          placeholder="例）xxx-xxxx"
          defaultValue={props.zipValue}
          onChange={onChangeHandler}
          autoComplete="postal-code"
        />
      </div>
    </>
  );
}

export default ZipForm;
