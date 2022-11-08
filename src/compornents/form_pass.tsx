import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/register_user.module.css'
import React, { ChangeEvent, useEffect } from "react";

export const passJudge = (passStatus: any) => {
  if (passStatus === "empty" || passStatus === "init") {
    let tag = document.getElementsByClassName("control-label")[5] as HTMLElement;
    tag.style.display = "inline-block"
    tag.innerHTML = "パスワードを入力してください"
  }

  if (passStatus === "pass-incorrect") {
    let tag = document.getElementsByClassName("control-label")[5] as HTMLElement;
    tag.style.display = "inline-block"
    tag.innerHTML = "パスワードは８文字以上１６文字以内で設定してください"
  }
}

export const PassForm = (props: any) => {

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {

    let passValue = ev.target.value;
    props.SetPassValue(passValue);
    props.SetPassStatus("ok")
    if (!passValue) {
      props.SetPassStatus("empty")
    } else {
      if (!(passValue.length <= 16 && passValue.length >= 8)) {
        props.SetPassStatus("pass-incorrect")

        
      }
    }
    console.log(`pass/conpass: ${props.conPassValue.length} ${props.conPassValue} pass: ${passValue}`)
    if(props.conPassValue.length !== 0 && props.conPassValue !== passValue){
      props.SetConPassStatus("pass-mismatch")
    }
  }


  return (
    <>
      <div className={`form-group ${styles.formGroup}`} key="passForm"  >
        <label htmlFor="inputPassword" className={styles.title}>パスワード</label>
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
          id="inputPassword"
          className="form-control form-control-lg "
          placeholder="８文字以上１６文字以内で設定してください"
          onChange={onChangeHandler}
        />
      </div>
    </>
  );
}

export default PassForm;
