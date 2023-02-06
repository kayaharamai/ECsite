import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { Nav } from '../../compornents/nav_format';
import style from '../../styles/register_user.module.css';
import Head from 'next/head';

export const Show = () => {
  return (
    <div className="container">
      <Head>
        <title>ラクラクヌードル／注文確定画面</title>
        <link rel="icon" href="/3506.png" />
      </Head>
      <Nav name="" />

      {/* table */}
      <div className={`row  ${style.row}`}>
        <div className="table-responsive col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-10 col-sm-10 col-xs-12">
          <h3 className="text-center">決済が完了しました！</h3>
          <div className="text-center">
            <p>この度はご注文ありがとうございます。</p>
            <p>
              お支払い先は、お送りしたメールに記載してありますのでご確認ください。
            </p>
            <p>
              メールが届かない場合は「注文履歴」からご確認ください。
            </p>
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className="row">
        <div className="col-xs-offset-5 col-xs-2">
          <div className="form-group">
            <Link href={'/'}>
              <form action="#">
                <button className="form-control btn btn-warning btn-block">
                  トップ画面を表示する
                </button>
              </form>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
