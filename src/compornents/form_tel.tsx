import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/register_user.module.css'
import React, { ChangeEvent, useEffect } from "react";

export const telJudge = (telStatus: any) => {
  
  if (telStatus === "empty" || telStatus === "init") {
    let tag = document.getElementsByClassName("control-label")[4] as HTMLElement;
    tag.style.display = "inline-block"
    tag.innerHTML = "電話番号を入力してください"
  }
  
  if (telStatus === "format-incorrect") {
    let tag = document.getElementsByClassName("control-label")[4] as HTMLElement;
    tag.style.display = "inline-block"
    tag.innerHTML = "電話番号はXXXX-XXXX-XXXXの形式で入力してください"
  }
  
}

export const TelForm = (props: any) => {
  const [errorMessage, SetErrorMessage] = React.useState("") 

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {

      let telValue = ev.target.value
      props.SetTelValue(telValue);
      props.SetTelStatus("ok")
      if (!telValue) {
        props.SetTelStatus("empty")
        SetErrorMessage( "電話番号を入力してください")
      } else if (!telValue.match(/^[0-9]*-[0-9]*-[0-9]*$/)) {
        props.SetTelStatus("format-incorrect")
        SetErrorMessage("電話番号はXXXX-XXXX-XXXXの形式で入力してください")
      }
  }


  return (
    <>
      <div className={`form-group ${styles.formGroup}`} key="telForm" >
        <label htmlFor="inputTel" className={styles.title}>電話番号</label>
        {/* {(() => {
          // if(props.telStatus === "empty" || props.telStatus === "format-incorrect"){
            // return (
              // )
              // }
              // })()} */}
              
              <label
              id="ErrorInputTel"
              className="control-label"
              style={{
                color: "red",
                display: "none"
              }}
              htmlFor="inputError"
              >電話番号を入力してください</label>
        <input
          type="text"
          id="inputTel"
          autoComplete="tel"
          className="form-control form-control-lg "
          placeholder="例）xxx-xxxx-xxxx"
          defaultValue={props.telValue}
          onChange={onChangeHandler}
        />
      </div>
    </>
  );
}

export default TelForm;
