import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/register_user.module.css'
import React, { ChangeEvent, useEffect } from "react";

export const nameJudge = (nameStatus: any) => {
  if (nameStatus === "empty" || nameStatus === "init") {
    let tag = document.getElementsByClassName("control-label")[0] as HTMLElement;
    tag.style.display = "inline-block"
    tag.innerHTML = "名前を入力してください"
  }
}

export const NameForm = (props: any) => {

  const onChangeHandlerFirstName = (ev: ChangeEvent<HTMLInputElement>) => {
    let firstNameValue = ev.target.value;
    props.SetFirstNameValue(firstNameValue);
    props.SetNameStatus("ok")
    if (!firstNameValue) {
      props.SetNameStatus("empty")
    }
    
  }
  
  const onChangeHandlerLastName = (ev: ChangeEvent<HTMLInputElement>) => {
    let lastNameValue = ev.target.value;
    props.SetLastNameValue(lastNameValue);
    

      props.SetNameStatus("ok")
      if (!lastNameValue) {
        props.SetNameStatus("empty")
      }
    
  }

  return (
    <>
      <div className={`form-group ${styles.formGroup}`} key="nameForm" >
        <label htmlFor="inputLastName" className={styles.title}>名前</label>
        <label
          id="Name"
          className="control-label"
          style={{
            color: "red",
            display: "none"
          }}
          htmlFor="inputError"
        >名前を入力してください</label>
        <div className="row">
          <div className="col-sm-6">
            <input
              type="text"
              id="inputLastName"
              className="form-control form-control-lg "
              placeholder="姓"
              defaultValue={props.lastNameValue}
              onChange={onChangeHandlerLastName}
              autoComplete="family-name"
            />
          </div>
          <div className="col-sm-6">
            <input
              type="text"
              id="inputFirstName"
              className="form-control form-control-lg "
              placeholder="名"
              defaultValue={props.firstNameValue}
              onChange={onChangeHandlerFirstName}
              autoComplete="given-name"
            />
          </div>
        </div>
      </ div>
    </>
  );
}

export default NameForm;
