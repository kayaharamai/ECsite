import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/register_user.module.css'
import React, { ChangeEvent, useEffect } from "react";

export const addrJudge = (addrStatus: any) => {
  if (addrStatus === "empty" || addrStatus === "init") {
    let tag = document.getElementsByClassName("control-label")[3] as HTMLElement;
    tag.style.display = "inline-block"
    tag.innerHTML = "住所を入力してください"
  }
}

export const AddrForm = (props: any) => {

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {

    let addrValue = ev.target.value
    props.SetAddrValue(addrValue);
    
         props.SetAddrStatus("ok")

      if (!addrValue) {
        props.SetAddrStatus("empty")
      }
    }

  return (
    <>
      <div className={`form-group ${styles.formGroup}`} key="addrForm"  >
        <label htmlFor="inputAddrcode" className={styles.title}>住所</label>
        <label
          id="ErrorInputAddrcode"
          className="control-label"
          style={{
            color: "red",
            display: "none"
          }}
          htmlFor="inputError"
        >住所を入力してください</label>
        <input
          type="text"
          id="inputAddress"
          className="form-control form-control-lg "
          placeholder="住所"
          onChange={onChangeHandler}
          defaultValue={props.addrValue}
          autoComplete="street-address"
        />
      </div>
    </>
  );
}

export default AddrForm;
