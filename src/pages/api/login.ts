import type { NextApiRequest, NextApiResponse } from 'next';

export default function LoginApi(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // ログイン画面の入力フォームデータ
  let dataItem = JSON.parse(req.body);

  //　ユーザー取得
  const url = `http://localhost:8000/users?mail=${dataItem.email}&pass=${dataItem.pass}`;

  // cookieのセット
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data[0].id);
      if (data.length === 1) {
        res.setHeader('Set-Cookie', [`userId=${data[0].id}; max-age=86400; path=/;`]);
        res.status(200).json('OK');
      } else if (data.length < 2) {
        console.log('複数取得されました');
      } else {
        console.log('1人も取得できませんでした');
      }
    })
    .catch((error) => {
      console.log('失敗');
      res.status(404).json('NG');
    });
}
