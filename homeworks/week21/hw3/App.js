import { useState } from "react";

export default function App() {

  const [isValid, setIsValid] = useState(true);
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    tel: "",
    type: "",
    learnFromWhere: "",
    suggestion: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nickname, email, tel, type, learnFromWhere, suggestion } = formData;
    if (!nickname || !email || !tel || !type || !learnFromWhere) {
      alert("欄位有缺，請確認該填的地方有填！");
      setIsValid(false);
      return;
    }
    alert(`
      送出成功！以下是你送出的資料：
      暱稱：${nickname}
      信箱：${email}
      報名類型：${type}
      從哪裡知這個活動：${learnFromWhere}
      其他：${suggestion}
    `);
    setIsValid(true);
  };

  return (
    <>
      <div className="wrapper">
        <main className="main">
          <div className="content">
            <header className="header">
              <h1 className="header__title">新拖延運動報名表單</h1>
              <ul className="header__list">
                <li className="header__list-item">
                  活動日期：2020/12/10 ~ 2020/12/11
                </li>
                <li className="header__list-item">
                  活動地點：台北市大安區新生南路二段1號
                </li>
              </ul>
              <em className="header__notice">* 代表必填</em>
            </header>
            <form className="form" method="GET" onSubmit={handleSubmit}>
              <div className="input-block">
                <h2 className="input-block__title" data-symbol="*">
                  暱稱
                </h2>
                <input
                  className="input-block__input-box"
                  type="text"
                  name="nickname"
                  placeholder="小明"
                  value={formData.nickname}
                  onChange={handleChange}
                />
                {!isValid && !formData.nickname && (
                  <p className="hint-text">請輸入內容</p>
                )}
              </div>
              <div className="input-block">
                <h2 className="input-block__title" data-symbol="*">
                  信箱
                </h2>
                <input
                  className="input-block__input-box"
                  type="email"
                  name="email"
                  placeholder="aaa@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {!isValid && !formData.email && (
                  <p className="hint-text">請輸入內容</p>
                )}
              </div>
              <div className="input-block">
                <h2 className="input-block__title" data-symbol="*">
                  手機號碼
                </h2>
                <input
                  className="input-block__input-box"
                  type="tel"
                  name="tel"
                  placeholder="0912345678"
                  value={formData.tel}
                  onChange={handleChange}
                />
                {!isValid && !formData.tel && (
                  <p className="hint-text">請輸入內容</p>
                )}
              </div>
              <div className="input-block">
                <h2 className="input-block__title" data-symbol="*">
                  報名類型
                </h2>
                <div className="radio-block">
                  <input
                    className="radio-block__button"
                    type="radio"
                    name="type"
                    id="type1"
                    value="躺在床上用想像力實作"
                    checked={formData.type === "躺在床上用想像力實作"}
                    onChange={handleChange}
                  />
                  <label className="radio-block__text" htmlFor="type1">
                    躺在床上用想像力實作
                  </label>
                </div>
                <div className="radio-block">
                  <input
                    className="radio-block__button"
                    type="radio"
                    name="type"
                    id="type2"
                    value="趴在地上滑手機找現成的"
                    checked={formData.type === "趴在地上滑手機找現成的"}
                    onChange={handleChange}
                  />
                  <label className="radio-block__text" htmlFor="type2">
                    趴在地上滑手機找現成的
                  </label>
                </div>
                {!isValid && !formData.type && (
                  <p className="hint-text">請選擇其中一個</p>
                )}
              </div>

              <div className="input-block">
                <h2 className="input-block__title" data-symbol="*">
                  怎麼知道這個活動的？
                </h2>
                <input
                  className="input-block__input-box"
                  type="text"
                  name="learnFromWhere"
                  placeholder="Lidemy"
                  value={formData.learnFromWhere}
                  onChange={handleChange}
                />
                {!isValid && !formData.learnFromWhere && (
                  <p className="hint-text">請輸入內容</p>
                )}
              </div>
              <div className="input-block">
                <h2 className="input-block__title">其他</h2>
                <p>對活動的一些建議</p>
                <input
                  className="input-block__input-box"
                  type="text"
                  name="suggestion"
                  placeholder="高雄也可以舉辦一下"
                  value={formData.suggestion}
                  onChange={handleChange}
                />
              </div>
              <input className="btn-send" type="submit" value="提交" />
              <p>請勿透過表單送出您的密碼。</p>
            </form>
          </div>
        </main>
      </div>
      <footer className="copyright">
        © 2020 © Copyright. All rights Reserved.
      </footer>
    </>
  );
}
