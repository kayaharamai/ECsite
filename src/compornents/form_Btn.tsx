import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "../styles/register_user.module.css";


export const Btn = (props: { zipStatus: string, zipValue: string , SetAddrValue: any , SetAddrStatus: any}) => {
    return (
    <input 
    type="button" 
    value="住所検索" 
    className={style.btnSearch} 
    onClick={() => {
      let getAddrId = document.getElementById('inputAddress') as HTMLInputElement;
      let tag = document.getElementsByClassName("control-label")[2] as HTMLElement;
      tag.style.display = "none"

      console.log(props.zipStatus)
      
      if(props.zipStatus === "ok"){
        fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${props.zipValue}`)
        .then(response => response.json())
        .then((json) => {
          getAddrId.value = `${json.results[0].address1}${json.results[0].address2}${json.results[0].address3}`;
          let tag = document.getElementsByClassName("control-label")[3] as HTMLElement;
          tag.style.display = "none"
          props.SetAddrValue(getAddrId.value)
          props.SetAddrStatus("ok")
        })
        .catch((error) => {
          let tag = document.getElementsByClassName("control-label")[2] as HTMLElement;;
          tag.style.display = "inline-block"
          tag.innerHTML = "この郵便番号は存在しません"
          console.log("存在しません")
        });
      }

      if(props.zipStatus === "unexist"){
        let tag = document.getElementsByClassName("control-label")[2] as HTMLElement;;
        tag.style.display = "inline-block"
        tag.innerHTML = "この郵便番号は存在しません"        
      }

      if(props.zipStatus === "empty" || props.zipStatus === "init"){
        let tag = document.getElementsByClassName("control-label")[2] as HTMLElement;
        tag.style.display = "inline-block"
        tag.innerHTML = "郵便番号を入力してください"
        console.log("入力してください")
      }

      if(props.zipStatus === "format-incorrect"){
        let tag = document.getElementsByClassName("control-label")[2] as HTMLElement;
        tag.style.display = "inline-block"
        tag.innerHTML = "郵便番号はXXX-XXXXの形式で入力してください"
        console.log("正しい形式で入力してください")
      }

    }}
    />
    );
}

export default Btn;
