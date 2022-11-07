import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/register_user.module.css'
import React, { ChangeEvent, useEffect } from "react";

export const currentPassJudge = (currentPassStatus: any) => {
  if (currentPassStatus === "empty") {
    let tag = document.getElementsByClassName("control-label")[0] as HTMLElement;
    tag.style.display = "inline-block"
    tag.innerHTML = "パスワードを入力してください"
  }

  if (currentPassStatus === "unexist") {
    let tag = document.getElementsByClassName("control-label")[0] as HTMLElement;
    tag.style.display = "inline-block"
    tag.innerHTML = "現在のパスワードが一致しません"
  }
}

export const CurrentPasswordForm = (props: any) => {

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {

    let currentPassValue = ev.target.value;
    props.SetCurrentPassValue(currentPassValue);
    props.SetCurrentPassStatus("ok")
    if (!currentPassValue) {
      props.SetCurrentPassStatus("empty")
    } else {
      fetch(`http://localhost:8000/users?pass=${currentPassValue}`)
      .then(res => res.json())
      .then((json) => {
        if (json.length === 0) {
          props.SetCurrentPassStatus("unexist")
        } else {
          props.SetCurrentPassStatus("ok")
        }
      })
      .catch((error) => {
        props.SetCurrentPassStatus("unexist")
        console.log(error)
      });
    }

    console.log(`CurrentPass: ${currentPassValue}`)

  }


  return (
    <>
      <div className={`form-group ${styles.formGroup}`} key="passForm"  >
        <label htmlFor="inputPassword" className={styles.title}>現在のパスワード</label>
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
          autoComplete="current-password"
          id="inputPassword"
          className="form-control form-control-lg "
          placeholder="現在のパスワードを入力してください"
          onChange={onChangeHandler}
        />
      </div>
    </>
  );
}

export default CurrentPasswordForm;
