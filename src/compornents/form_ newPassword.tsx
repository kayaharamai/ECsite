import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/register_user.module.css'
import React, { ChangeEvent, useEffect } from "react";

export const newPassJudge = (newPassStatus: any) => {
  if (newPassStatus === "empty") {
    let tag = document.getElementsByClassName("control-label")[1] as HTMLElement;
    tag.style.display = "inline-block"
    tag.innerHTML = "パスワードを入力してください"
  }
  
  if (newPassStatus === "pass-incorrect") {
    let tag = document.getElementsByClassName("control-label")[1] as HTMLElement;
    tag.style.display = "inline-block"
    tag.innerHTML = "８文字以上１６文字以内で設定してください"
  }
}

export const NewPasswordForm = (props: any) => {

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {

    let newPassValue = ev.target.value;
    props.SetNewPassValue(newPassValue);
    props.SetNewPassStatus("ok")
    if (!newPassValue) {
      props.SetNewPassStatus("empty")
    } else {
      if(!(newPassValue.length <= 16 && newPassValue.length >= 8)){
        props.SetNewPassStatus("pass-incorrect")
      }
    }

  }


  return (
    <>
      <div className={`form-group ${styles.formGroup}`} key="passForm"  >
        <label htmlFor="inputNewPassword" className={styles.title}>新しいパスワード</label>
        <label
          id="ErrorInputPassword"
          className="control-label"
          style={{
            color: "red",
            display: "none"
          }}
          htmlFor="inputError"
        >パスワードを入力してください</label>
        <input
          type="password"
          autoComplete="new-password"
          id="inputNewPassword"
          className="form-control form-control-lg "
          placeholder="新しいパスワードを入力してください"
          onChange={onChangeHandler}
        />
      </div>
    </>
  );
}

export default NewPasswordForm;
