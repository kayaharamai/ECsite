import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/register_user.module.css'
import React, { ChangeEvent, useEffect } from "react";
import PassForm from "./form_pass";

export const conPassJudge = (conPassStatus: any, passValue: any, conPassValue: any) => {


  if (conPassStatus === "empty" || conPassStatus === "init") {
    let tag = document.getElementsByClassName("control-label")[6] as HTMLElement;
    tag.style.display = " inline-block"
    tag.innerHTML = "確認用パスワードを入力してください"
  } 

  if (conPassStatus === "pass-mismatch") {
    let tag = document.getElementsByClassName("control-label")[6] as HTMLElement;
    tag.style.display = "inline-block"
    tag.innerHTML = "パスワードと確認用パスワードが不一致です"
  }


}

export const ConPassForm = (props: any) => {

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {

    let conPassValue = ev.target.value
    props.SetConPassValue(conPassValue);
      props.SetConPassStatus("ok")
      if (!conPassValue) {
        props.SetConPassStatus("empty")
      }

      if(conPassValue !== props.passValue){
        props.SetConPassStatus("pass-mismatch")
      }
      
      console.log(`conPass/conpass: ${conPassValue} pass: ${props.passValue}`)
  }


  return (
    <>
      <div className={`form-group ${styles.formGroup}`} key="conPassForm" >
        <label htmlFor="inputConfirmationPassword" className={styles.title}>確認用パスワード</label>
        <label
          id="ErrorInputConfirmationPassword"
          className="control-label"
          style={{
            color: "red",
            display: "none"
          }}
          htmlFor="inputError"
        >確認用パスワードを入力してください</label>
        <input
          type="password"
          autoComplete="new-password"
          id="inputConfirmationPassword"
          className="form-control form-control-lg "
          placeholder="確認用パスワード"
          onChange={onChangeHandler}
        />
      </div>
    </>
  );
}

export default PassForm;
