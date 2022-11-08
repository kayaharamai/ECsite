
export const clear = () => {
  let getNameId = document.getElementById('inputLastName') as HTMLInputElement;
  let getFirstNameId = document.getElementById('inputFirstName') as HTMLInputElement;
  let getZipId = document.getElementById('inputZipcode') as HTMLInputElement;
  let getMailId = document.getElementById('inputEmail') as HTMLInputElement;
  let getAddrId = document.getElementById('inputAddress') as HTMLInputElement;
  let getTelId = document.getElementById('inputTel') as HTMLInputElement;
  let getPassId = document.getElementById('inputPassword') as HTMLInputElement;
  let getPassConfId = document.getElementById('inputConfirmationPassword') as HTMLInputElement;

  getNameId.value = ""
  getFirstNameId.value = ""
  getZipId.value = ""
  getMailId.value = ""
  getAddrId.value = ""
  getTelId.value = ""
  getPassId.value = ""
  getPassConfId.value = ""
}

export const clearModify = () => {
  let getNameId = document.getElementById('inputLastName') as HTMLInputElement;
  let getFirstNameId = document.getElementById('inputFirstName') as HTMLInputElement;
  let getZipId = document.getElementById('inputZipcode') as HTMLInputElement;
  let getMailId = document.getElementById('inputEmail') as HTMLInputElement;
  let getAddrId = document.getElementById('inputAddress') as HTMLInputElement;
  let getTelId = document.getElementById('inputTel') as HTMLInputElement;
 

  getNameId.value = ""
  getFirstNameId.value = ""
  getZipId.value = ""
  getMailId.value = ""
  getAddrId.value = ""
  getTelId.value = ""

}


export const clearModifyPass = () => {
  let getPassId = document.getElementById('inputPassword') as HTMLInputElement;
  let getNewPassId = document.getElementById('inputNewPassword') as HTMLInputElement;

  getPassId.value = ""
  getNewPassId.value = ""

}
