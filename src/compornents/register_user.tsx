import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import useSWR, { useSWRConfig } from 'swr'
import { useState } from "react"
import style from "../styles/register_user.module.css";


export const Title = (props: { title: string }) => {
  return (
    <h1 className={style.titleA}>{props.title}</h1>
  );
}



export const BtnSearch = (props: { item: string }) => {
  if (props.item === "郵便番号") {
    return (<input type="button" value="住所検索" className={style.btnSearch} onClick={() => {
      let getZipId = document.getElementById('zip') as HTMLInputElement;
      let getAddrId = document.getElementById('address') as HTMLInputElement;
      let tag = document.getElementById('zipErr') as HTMLInputElement;
      tag.style.display = "none"

      if (getZipId.value) {
        if (!(getZipId.value.match(/^\d{3}-\d{4}$/))) {
          let tag = document.getElementById('zipErr') as HTMLInputElement;
          tag.style.display = "inline-block"
          tag.innerHTML = "郵便番号はXXX-XXXXの形式で入力してください"
        } else {
          fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${getZipId?.value}`)
            .then(response => response.json())
            .then((json) => {
              getAddrId.value = `${json.results[0].address1}${json.results[0].address2}${json.results[0].address3}`;
              let tag = document.getElementById('addrErr') as HTMLInputElement;
              tag.style.display = "none"
            })
            .catch((error) => {
              let tag = document.getElementById('zipErr') as HTMLInputElement;
              tag.style.display = "inline-block"
              tag.innerHTML = "この郵便番号は存在しません"
            });
        }
      } else {
        let tag = document.getElementById('zipErr') as HTMLInputElement;
        tag.style.display = "inline-block"
        tag.innerHTML = "郵便番号を入力してください"
      }
    }} />);
  } else {
    return null;
  }
}


export const loginCheck = () => {
  const router = useRouter();
  let cookie = document.cookie;
  if (cookie.includes("userId")) {
    router.push("/items/order_confirm");
  } else {
    router.push("/items/loginpage");
    document.cookie = "status=shopping"
  }
}

export const cartLogin = () => {
  const router = useRouter();
  let cookie = document.cookie;
  if (cookie.includes("status=shopping")) {
    router.push("/items/order_confirm");
  } else {
    document.cookie = "status=shopping; max-age=0"
  }
}

export const UserInfo = () => {
  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  const [userID, SetUserID] = useState("");
  // const [nameValue, SetNameValue] =  useState("");    
  // const [mail, SetMail] = useState("");    
  // const [zip, SetZip] =  useState("");   
  // const [tel, SetTel] =  useState("");   
  // const [address, SetAddress] = useState(""); 

  if (typeof document !== "undefined") {

    const cookie = document.cookie;
    const splitCookie = document.cookie.split(";");
    const list = []

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split("="))
    }

    list.map((number) => {
      number.map((show) => {
        if (show.match(/[0-9].*/)) {
          useEffect(() => { SetUserID(show) })
        }
      })
    })
  }


  const { data, error, mutate } = useSWR(`http://localhost:8000/users?id=${userID}`, fetcher);



  if (error) return <div>Failed to load</div>;
  if (!data) return <div></div>;

  let nameValue = ""
  let mail = ""
  let zip = ""
  let tel = ""
  let address = ""

  if (userID.length !== 0) {
    nameValue = data[0].name;
    mail = data[0].mail;
    zip = data[0].zip;
    tel = data[0].tel;
    address = data[0].address;
  }

  // useEffect(() =>{
  //   if(userID.length !== 0){
  //     SetNameValue(data[0].name)  
  //     SetMail(data[0].mail)   
  //     SetZip(data[0].zip)  
  //     SetTel(data[0].tel)   
  //     SetAddress(data[0].address)
  //   } 
  // })

  return (
    <form action="#">
      <div className={`row g-3 ${style.row}`}>
        <div className="table-responsive col-lg-offset-3 col-lg-7 col-md-offset-1 col-md-10 col-sm-10 col-xs-12">
          <h3 className="text-center">お届け先情報</h3>
          <table className="table table-striped item-list-table">
            <tbody>
              <tr>
                <td>
                  <div className={`text-center ${style.confirm}`}>
                    お名前
                  </div>
                </td>
                <td>
                  <div className="row">
                    <div className="col-sm-11">
                      <span className={`${style.requiredLabel}`}>必須</span>
                      <label
                        id="nameErr"
                        className="control-label"
                        style={{ color: 'red', display: 'none' }}
                        htmlFor="inputPeriod"
                      >
                        名前を入力してください
                      </label>
                      <input type="text" id="name"
                        defaultValue={nameValue}
                        className={`form-control input-sm form-control-lg ${style.form}`}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="text-center">
                    メールアドレス
                  </div>
                </td>
                <td>
                  <div className="row">
                    <div className="col-sm-11">
                      <span className={`${style.requiredLabel}`}>必須</span>
                      <label
                        id="mailErr"
                        className="control-label"
                        style={{ color: 'red', display: 'none' }}
                        htmlFor="inputPeriod"
                      >
                        メールアドレスを入力してください
                      </label>
                      <input type="text" id="mail" defaultValue={mail}  className={`form-control input-sm form-control-lg ${style.form}`} />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="text-center">
                    郵便番号
                  </div>
                </td>
                <td>
                  <div className="row">
                    <div className="col-sm-11">
                      <span className={`${style.requiredLabel}`}>必須</span>
                      <BtnSearch item="郵便番号" />
                      <label
                        id="zipErr"
                        className="control-label"
                        style={{ color: 'red', display: 'none' }}
                        htmlFor="inputPeriod"
                      >
                        郵便番号を入力してください
                      </label>
                      <input type="text" id="zip" defaultValue={zip}  className={`form-control input-sm form-control-lg ${style.form}`} />
                      {/* &nbsp;&nbsp; */}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="text-center">住所</div>
                </td>
                <td>
                  <div className="row">
                    <div className="col-sm-11">
                      <span className={`${style.requiredLabel}`}>必須</span>
                      <label
                        id="addrErr"
                        className="control-label"
                        style={{ color: 'red', display: 'none' }}
                        htmlFor="inputPeriod"
                      >
                        住所を入力してください
                      </label>
                      <input type="text" id="address"  className={`form-control input-sm form-control-lg ${style.form}`} defaultValue={address} />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="text-center">電話番号</div>
                </td>
                <td>
                  <div className="row">
                    <div className="col-sm-11">
                      <span className={`${style.requiredLabel}`}>必須</span>
                      <label
                        id="telErr"
                        className="control-label"
                        style={{ color: 'red', display: 'none' }}
                        htmlFor="inputPeriod"
                      >
                        電話番号を入力してください
                      </label>
                      <input type="text" id="tel" defaultValue={tel}  className={`form-control input-sm form-control-lg ${style.form}`} />

                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="text-center">配達日時</div>
                </td>
                <td>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-11">
                        <span className={`${style.requiredLabel}`}>必須</span>
                        <label
                          id="dateErr"
                          className="control-label"
                          style={{
                            color: 'red',
                            display: 'none',
                          }}
                          htmlFor="inputPeriod"
                        >
                          配達日時を入力してください
                        </label>
                        <input
                          type="date"
                          name="name"
                          id="date"
                          className={`form-control input-sm form-control-lg ${style.form}`}
                          pattern="\d{4},\d{1},\d{1}"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <label className={`radio-inline ${style.radioLine}`}>
                          <input
                            type="radio"
                            name="responsibleCompany"
                            defaultChecked={true}
                            className="time "
                            value={10}
                          />
                          10時
                        </label>

                        {
                          (() => {
                            const radioList = [];
                            for (let i = 11; i <= 18; i++) {
                              radioList.push(
                                <label className={`radio-inline ${style.radioLine}`} key={i}>
                                  <input
                                    type="radio" name="responsibleCompany"
                                    value={i}
                                    className={`time`}
                                  />
                                  {i}時
                                </label>
                              )
                            }
                            return radioList;

                          })()
                        }

                        <br />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );
}


// res.setHeader('Set-Cookie', [`userId=${data[0].id};path=/items`]);

// let cookie = document.cookie;
// if(cookie.includes("status=shopping")){
//   document.cookie="status=shopping; max-age=0"
// }
