## 為什麼我們需要 Redux？

我覺得主要還是為了「管理狀態」，儘管 React 有提供 `useContext` 來把狀態抽到最上層管理，但在更大型的專案中可能還是不夠用。

Redux 除了可以讓狀態更好管理以外，它背後還有個 Flux 的理念。

回到當初的時代背景，Flux 原本的用途是為了解決在 MVC 架構下很難追蹤 state 的問題，像是 state 是被哪個 view 更新的？或是什麼時間點？等等之類的，這些都是 Flux 當時想解決的問題，而 Redux 就是基於這個「架構」來打造的一套 library。

用一句話來總結的話就是：

> 讓你的 state 更好維護跟擴展。

我想這就是 Redux 的核心用途吧。不過它還是比較適用於「大型專案」，也就是說如果你的專案太小，那用 Redux 可能只會有反效果。


## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

Redux 裡面有幾個重要的角色要先認識一下：

- dispatch
- reducer
- action
- store

簡單來說，你會把 state 都放在 store 這個地方，當你想要更新 state 時，就 dispatch（派遣、發出）一個 action 到 reducer，讓 reducer 重新產生一個新的 state 回來。

這樣聽一定很抽象，所以再來看一次這張精美的圖：

![dedux](dedux.gif)

以 React 來舉個例子，在沒有 Redux 的時候，我們通常會直接把 state 寫在 Component 中：

```js
function App () {
  const [state, setState] = useState("Hello");
}
```

當我們要改變這個 state 時，會直接透過 `setState` 來更新。

但在 Redux 的流程不是這樣子，而是剛剛說的，你必須：

1. dispatch 一個 action 出去
2. reducer 接收到 action 以後，根據 action 來更新 store 裡的 state
3. reducer 把新產生的 state 丟回去給 UI

以剛剛的例子來改寫的話大概就會像這樣：

```js
function App () {
  // dispatch 一個 action 出去（傳進去的物件）
  const changeState = () => dispatch({
    type: "add",
    payload: 1,
  })
}
```

而 `reducer` 的部分就要寫好什麼 action 做什麼事：

```js
function reducer (state, action) {
  switch (action.type) {
    case "add":
      return ...;
    case "delete":
      return ...;
  }
}
```

至於 reducer 實際上是個什麼玩意兒？我覺得你可以想就跟 Array 裡面的 `reducer()` 一樣，它每一次都會拿到上一個 `accumulator` 的值，我們可以利用這個值來做點事情。而在 Redux 裡的 reducer 也同理，每一次 call 它時它都會拿到「上一次的 state」，接著根據你給的 action 來更新 state，大概就是這樣吧。

總之這邊看看就好，主要只是想解釋一下 Redux 大致上的流程，不懂的地方不用太糾結，之後再慢慢研究就好。

不過我覺得有一點還蠻值得一提的，就是雖然我剛剛是拿 React 來舉例，但其實 **Redux 跟 React 並沒有直接關係**。

在我沒有正式學 Redux 以前我一直以為它就是 only for React 的 library，可是其實 Redux 能用運用在各種地方，例如 Vanilla JavaScript（不信的話能參考我寫的[範例](https://codesandbox.io/s/redux-by-vanilla-js-skulzw?file=/src/index.js)），或甚至是別的程式語言。

總之呢，Redux 的本質**只是一個管理 state 的架構**而已。


## 該怎麼把 React 跟 Redux 串起來？

如果不嫌麻煩的話你可以全部自己來，流程大概就是：

1. 建立好 store
2. 讓 component 存取 store 裡的 state
3. 設定 `subscribe`，每當 store 更新時就做某件事。

不想這麼麻煩的話，基本上會透過 [react-redux](https://react-redux.js.org/) 這個套件來串，然而串接的方式有蠻多種的，所以這邊先上幾個我寫的筆記：

- [用 react-redux 把 redux 跟 React 串接起來（Connect 版本）](https://jubeatt.github.io/2022/04/24/react-redux-by-connect/)
- [用 react-redux 把 redux 跟 React 串接起來（Hooks 版本）](https://jubeatt.github.io/2022/04/24/react-redux-by-hooks/)
- [用 Redux-toolkit 串接 React 和 Redux](https://jubeatt.github.io/2022/04/25/redux-toolkit/)


簡單來說，你會做下面這幾件事：

1. 建立 reducer
2. 透過 `createStore`（react-redux 的 API）建立 store
3. 到 React 的根元件中定義 `Provider`
4. 把建立好的 store 傳入 `Provider`，讓底下所有元件能夠接收（跟 Context 的概念一樣）
5. 在元件上使用 `useSelector`（react-redux 的 API） 從 store 裡面拿出想要的 state

這樣基本上就可以拿到 store 裡面的 state 了。接著要修改 state 時也很簡單。

1. 引入 `useDispatch`，接著就能 dispatch 一個 action 出去了。

大概就是這樣囉～

