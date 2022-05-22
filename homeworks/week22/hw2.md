## 請列出 React 內建的所有 hook，並大概講解功能是什麼

### 至頂補充

舉凡像是 `setState` 或 `dispatch` 等等這些從 hook 回傳的 function，都不會在 re-render 的時候被改變，所以才可以不用在 `useEffect` 或 `useCallback` 把它們傳到 dependencies 中。

### useState

> 用來產生「state」的 function

回傳值有兩個，第一個是 state 的值，第二個是改變 state 時會用到的 setter：

```js
const [counter, setCounter] = useState(0);
```

所以要在一個元件顯示 state 的話只要：

```jsx
<button>{counter}</button>
```

就會看到一個 0 的按鈕了。

而要改變 state 的話就要透過 setter 來改變，像這樣：

```js
// 用 setCounter 來更新 state
<button onClick={() => setCounter(prev => prev + 1)}>{counter}</button>
```

這樣子每點一下按鈕 counter 的值就會加一。

另外我想補充一個觀念，就是每次 re-render 時 state 會怎麼運作？

像我之前就有想過，如果 re-render 等於重新執行一次 function component 的內容的話，那裡面的 `useState` 不就又會重新執行一次了嗎？這樣的話 state 不就會又變成最開始的初始值了？（0）

列個流程，應該會比較好理解我的意思：

1. 第一次 render
2. 執行 `useState(0)`，counter 的初始值為 0
3. 點按鈕，更新 state 讓 counter 變成 1，觸發 re-render
4. 再執行一次 `useState(0)`，counter 的值為 0？還是 1？

我們當然知道答案會是 1，但這是為什麼？原來官方文件裡面有提到：

> During subsequent re-renders, the first value returned by useState will always be the most recent state after applying updates.

簡單來說 re-render 時 `useState` 確實會被重新執行，但它會確保第一個回傳值（也就是 state）是最新的那個值。

最後補充幾個其他特性：

- 更新 state 的方式有兩種，直接傳值的叫做「normal form」，透過 prev 的叫做「functional  form」，如果新的 state 必須用 prev 值來計算的話建議用後者比較安全

- 如果新的 state 跟 目前的 state 一樣，就不會觸發 re-render

- 在 hook 裡面就算只有要改 state 的某個部分，也必須把完整的 state 給放進去，而不是像 class component 一樣可以只寫要改的地方就好（這個很重要哦）

- 如果 state 的初始值得用複雜計算來求出，可以在 useState 裡改傳進一個 function，這個只會在第一次 render 的時候被執行，後續的不會，技術上稱為「Lazy initial state」

- 假設一次更新兩個 state，React 會自動合在一起，變成只 re-render 一次。在 18.0 以前只有 Event handler 裡面的更新 state 會有這效果，但這之後就不侷限了，想看範例可以參考[這裡](https://codepen.io/jubeatt/pen/MWrLexa?editors=1010)


### useEffect

就跟課程講的一樣，意思是：

> render 完以後想做什麼？

為什麼會取名為「Effect」？其實是因為 React 希望你用這個 hook 來處理「side effect（副作用）」，意思是指跟 React 本身無關的事情，像是「發 API 拿資料」、「儲存到 storage」等等。

這些 effect 雖然很重要（因為有可能會改變內容），但對 React 在渲染 Component 的時後來說是不重要的，所以才會說這是 side effect。

總之呢，不要把一些跟 Component 沒有直接關係的東西寫在裡面，像這樣：

```js
function Component() {
  fetch('...');
}
```

而是要這樣：

```js
function Component() {
  return (...)
}

// render 完以後才去發 API
useEffect(() => {
  fetch('...')
})
```

不過 `useEffect` 預設是**每次** render 以後都會被執行，所以更準確的作法是加上第二個參數（dependencies）來告訴它「當某某值改變的時候再幫我執行這個 effect」：

```js
function Component() {
  return (...)
}
// 不管傳什麼第一次都一定會被執行
// 所以這邊傳空的代表我只希望他被執行一次
useEffect(() => {
  // render 完以後才去發 API
  fetch('...')
}, [])
```

基本上呢，只要是出現在 `useEffect` 裡的 props 或 state，都**應該要放在 dependencies 裡面**，否則當值改變時它們還是會停留在舊的那個值，這個要多注意一下。


接著做一個補充，`useEffect` 每次在執行 side effect 以前會**先把上一次的 effect 給清掉**，這個階段叫做「clean up effect」，這樣做是為了確保「memory weak（簡單來說就是記憶體浪費吧？）」的問題。

另外 `useEffect` 裡面其實還可以在回傳另一個 function，它會在 component 從畫面上移除前給執行，像這樣：

```js
function Message() {
  useEffect(() => {
    // render 以後執行
    console.log("Message has rendered.");
    // 回傳 function，被移除前會執行
    return () => console.log("before Message remove.");
  });
}
```

想看實際效果可以到 [這邊](https://codepen.io/jubeatt/pen/ExordmO?editors=1011) 看。


### useContext

> 把 props 聚集到一個地方管理

簡單來說就是這樣。

舉個例子，當你的 props 要通過「很多層來傳遞時」，可能就會寫出這樣的東西：

```js
// 要往下傳遞的 props
const theme = {
  light: {
    bg: "white",
    color: "black",
  },
  dark: {
    bg: "black",
    color: "white",
  },
};

// 第三層，終於拿到 props
function Content({ theme }) {
  return (
    <div
      style={{
        backgroundColor: theme.bg,
        color: theme.color,
      }}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eos neque
      explicabo soluta excepturi impedit aperiam necessitatibus fugiat officia
      recusandae quidem consequuntur, minus facere suscipit quam asperiores
      ipsum. Impedit, facilis?
    </div>
  );
}

function Wrapper({ theme }) {
  // 第二層
  return <Content theme={theme} />;
}

function App() {
  const [isDarkmode, setIsDarkMode] = useState(true);
  return (
    <div className="App">
      // 第一層 
      <Wrapper theme={theme.dark} />
    </div>
  );
}
```

但如果改用 `useContext` 和 `createContext` 就能大大節省掉這個困擾：

```js
const theme = {
  light: {
    bg: "white",
    color: "black"
  },
  dark: {
    bg: "black",
    color: "white"
  }
};

// 1. 建立 Context
const ThemeContext = createContext(null);

function Content() {
  // 3. 取得 Context 的值
  const theme = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        color: theme.color
      }}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eos neque
      explicabo soluta excepturi impedit aperiam necessitatibus fugiat officia
      recusandae quidem consequuntur, minus facere suscipit quam asperiores
      ipsum. Impedit, facilis?
    </div>
  );
}

function Wrapper() {
  return <Content />;
}

function App() {
  const [isDarkmode, setIsDarkMode] = useState(true);
  return (
    // 2. 建立 Provider 和要提供的值（value）
    <ThemeContext.Provider value={isDarkmode ? theme.dark : theme.light}>
      <div className="App">
        <Wrapper />
        // 按下按鈕時切換主題
        <button onClick={() => setIsDarkMode((prev) => !prev)}>
          switch theme
        </button>
      </div>
    </ThemeContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

想看效果的話可以到 [這裡](https://codepen.io/jubeatt/pen/vYpbQGg) 看。

總之呢，像這樣把 props 集中到 Context 來處理會好管理很多，也不用像剛剛那麼 hardcode 每一層都得傳一遍。


### useReducer

> 去學 redux 吧，畢竟這跟它有關。

簡單來說就是用來取代 `useState` 的另一種 hook，會需要它是因為當 state 很多或很複雜的時候，要傳遞各種 props 也會變得很麻煩，所以才會用這種類似「flux」方式來集中管理。

這邊先大概知道怎麼用就好，其他的等學 Redux 再說吧！

```js
// state 初始值
const initialState = { count: 0 };

// reducer，用來管理 state 的工具人
// 會根據 action 來更新 state 
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

function App() {
  // 使用它，要記得傳入前面寫的 reducer 跟 state
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      count: {state.count}
      // 接著透過 dispatch 跟 reducer 說我想做什麼
      <button onClick={() => dispatch({type: "increment"})}>+</button>
      <button onClick={() => dispatch({type: "decrement"})}>-</button>
    </div>
  );
}
```

效果可以到 [這邊](https://codepen.io/jubeatt/pen/LYeqXoL) 看。

總之，這樣的好處是不用在透過 props 把更新 state 的 callback 傳給子元件，子元件只要先 `useReducer`，再透過 `dispatch` 來指派任務就完事了。


### useCallback

> 把 function 記起來。


這個是拿來做優化時比較會用到。舉例來說，我們可能會在一個 Component 中定義 function：

```js
function App() {
  const [someState, setSomeState] = useState("hello");
  const doSomething = () => console.log(someState);
  ...
}
```

但這樣的問題在於，不管怎麼樣每次 re-render 的時候 `doSomething` 都會在重新宣告一次，即使 `someState` 沒有變也一樣，這樣不是很浪費嗎？明明沒有必要？

所以 `useCallback` 就是用來解決這個問題的，它可以把一個 function 給記住，你只要告訴它「xxx 改變的時候再幫我重新宣告就好了」。

這邊附上一個用來驗證的範例：

```js
function App() {
  const [value, setValue] = useState("");

  // 一個有用 useCallback，一個沒有
  const logHello = () => console.log("Hello");
  const logHelloMemorized = useCallback(logHello, []);

  // 把一開始的 reference 記起來
  // （利用 useRef 在 re-render 後不會變的特性）
  const refLogHello = useRef(logHello);
  const refLogHelloMemorized = useRef(logHelloMemorized);

  return (
    <div className="App">
      <div>Is same logHello: {refLogHello.current === logHello ? "Yes" : "No"}</div>
      <div>Is same logHelloMemorized: {refLogHelloMemorized.current === logHelloMemorized ? "Yes" : "No"}</div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
```

這邊刻意放了一個 `<input>`，目的是要讓我在輸入文字時觸發 re-render。

所以在 re-render 時，`logHello` 理應就會被重新宣告一次，變成一個新的 function，而 `logHelloMemorized` 不會，因為它有用 `useCallback` 包住。

建議你到我寫的 [範例](https://codepen.io/jubeatt/pen/yLpZGPJ) 去試試看，再來思考我這邊說的意思應該就能理解了。

至於 dependencies 該傳什麼？就跟 `useEffect` 的邏輯差不多，只要是 function 裡會用到的 state 或 props 幾乎都要放進去，不然就很容易出現 bug。

為什麼？**因為 function 裡的值是舊的**。

### useMemo

> 把回傳值給記住

跟 `useCallback` 一樣是用來優化的 hook。

簡單來說，可以把複雜的計算放在 `useMemo` 裡面來做，然後一樣給它 dependencies，告訴它什麼東西改變時在重新計算就好，這樣就能省下不必要的計算：

```js
function App() {
  const [value, setValue] = useState("");

  // 每次 re-render 都會被執行
  const veryComplexCalculate = () => {
    console.log('calculate')
    return 1 + 1
  }

  // 只有 dependencies 改變時才執行
  const veryComplexCalculateByMemo = useMemo(() => {
    console.log('memo')
    return 100 + 100
  }, [])


  return (
    <div className="App">
      <div>Result1: {veryComplexCalculate()}</div>
      <div>Result2: {veryComplexCalculateByMemo}</div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
```

一樣可以到我寫 [範例](https://codepen.io/jubeatt/pen/YzYBgVZ?editors=1111) 參考（記得打開 console）

### useRef

> 一個 Mutable 的值，只有你自己去改它時它才會變，而且不會觸發 re-render

附註：不會變的原理是因為 React 在背後幫你做了一些事情，讓每次 re-render 都會是同一個 Object 的 reference。

上面的說法沒有很完整，但我覺得這樣講會好記一點，一樣來看個範例吧：


```js
function App() {
  const [randomValue, serRandomValue] = useState(0);
  // {current: 0}
  const counter = useRef(0)
  // 用來觸發 re-render
  const changeValue = () => serRandomValue(Math.random())

  return (
    <div className="App">
      <div>Ref: {counter.current}</div>
      // 因為是 Mutable 所以能直接改
      <button onClick={() => counter.current++}>add 1 to ref</button>
      <button onClick={changeValue}>Re-render</button>
    </div>
  );
}
```

首先 `useRef` 會建立一個**物件**，它會有一個 `current` 屬性，用來儲存你給的初始值。所以你要存取東西都要用 `.current` 來取，不然會拿到整個物件。

它最大的特點就是「Mutable」，所以你可以直接改，不用像改 state 一樣還要先 copy 一份新的才行。

這邊一樣有寫 [範例](https://codepen.io/jubeatt/pen/OJzdGLa?editors=1010) 來練習，可以參考看看。


除了上面這個範例，它還有一個很常會拿來用的地方：「儲存 DOM 元素」

```js
function App() {
  const [flag, setFlag] = useState(true);
  // {current: null}
  const inputRef = useRef(null)
  
  useEffect(() => {
    // 每次 render 完如果有抓到 input 就 focus
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <div className="App">
      // 把 input 節點存到 useRef 裡
      { flag && <input ref={inputRef} />}
      // 點按鈕可以把 input 隱藏 or 顯示
      <button onClick={() => setFlag(prev => !prev)}>Toggle</button>
    </div>
  );
}
```

這邊的範例可以到 [這邊](https://codepen.io/jubeatt/pen/Exorzyp) 試。

總之這背後的原理是，只要把一個物件放在 `ref` 屬性上，React 就會自動幫你把 DOM 元素放到 `current` 裡，但一般還是建議用 `useRef` 來存比較好。



### useImperativeHandle

> useRef 的延伸

這個應該不太會用到，只要大概知道一下就好了。

這個是用在如果我把一個 Component 拆到最小單位，像是只有一個 `<input>`，那我有沒有辦法在在父元件去控制它？聽起來有點莫名奇妙吧？所以來直接看範例吧：


```js
// 我想操控的那個 input
import Myinput from "./Myinput";

function App() {

  // 一樣要透過 useRef 來儲存 DOM
  const inputRef = useRef(null);
  const focusInput = () => {
    // 這邊待會在解釋，你只要知道這邊的意思是用來 focus 就好了
    inputRef.current.yoyoyo();
  }

  return (
    <div className="App">
      // 把這個 Component 存到 useRef
      <Myinput ref={inputRef} />
      <button onClick={focusInput}>focus</button>
    </div>
  );
}

export default App;
```

簡單來說，`<Myinput />` 在建立的時候可以決定要 export 哪些「method」來給父元件用，這邊是 `yoyoyo`。名字是我故意亂取的所以看起來很詭異，但我只是想讓你知道它是可以自定義的，不用一定要 `focus`。

接著來看一下子元件的部分吧：

```js
import { useRef, useImperativeHandle, forwardRef } from "react"

function MyInput (props, ref)  {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => {
    // export 一個 yoyoyo，它可以 focus 到這個 input
    return {
      yoyoyo: () => inputRef.current.focus()
    }
  })

  return (
    <input
      type="text"
      placeholder="type some thing..."
      ref={inputRef}
    />
  )
}

export default forwardRef(MyInput)
```


簡單來說，這邊你要做三件事情：

1. 把 DOM 元素用 `useRef` 儲存
2. 設定 `useImperativeHandle`，把要 export 出去的東西寫好
3. 最後用 `forwardRef` 包起來

就這樣囉，想看範例可以到 [這邊](https://codesandbox.io/s/useimperativehandle-fan-li-0ggnbs?file=/src/App.js)



### useLayoutEffect

這個也跟課程講的一樣：

> render 完以後，瀏覽器 paint 完後想做什麼

它跟 useEffect 基本上是一樣的東西，只差在「觸發的時機」不同，一個是在畫面 paint 完以後執行，一個在 paint 之前。

這邊的示範有點難做，不確定是不是 18.0 有做一些優化，不能做出「閃一下」的效果，有興趣的話可以參考 [這篇](https://ithelp.ithome.com.tw/articles/10252118)，裡面有示範什麼是「閃一下」。


或你也可以參考我寫的另一種 [範例](https://codepen.io/jubeatt/pen/QWaYedW?editors=1011)：

```js
import { useState, useEffect, useLayoutEffect } from "react";

function App() {
  const [todos, setTodos] = useState(["todo1", "todo2", "todo3"]);

  // 如果是 useLayoutEffect 畫面就會等 3 秒後才 paint 出來
  // 如果是 useEffect 畫面會直接顯示，不會受到影響
  useLayoutEffect(() => {
    const target = new Date().getTime() + 3000;
    // 等三秒
    while (new Date().getTime() < target) {}
    console.log("finish");
  }, []);

  return (
    <div className="App">
      <ul>
        {todos.map((todo) => (
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
```


總之你只要知道這兩個觸發的「時機點」是不一樣的就好了。另外一般會建議能用 `useEffect` 就用它，少用 `useLayoutEffect`。




## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

首先會分成三個階段：

- Mounting
- Updating
- Ummounting

### Mounting 階段

執行順序：

1. `constructor()`
1. `getDerivedStateFromProps()`
1. `render()`
1. `componentDidmount`


#### constructor

附註：只會執行一次

第一個會被先執行到的 function，會接收 `props`（來自 `React.Component`）這個參數，除此之外也會在這裡建立 state 的初始值。

順便做個補充，為了確保新建立的 Component 能夠正確運作，一定要記得先 `super(props)` 繼承所有 `React.Component` 的東西，

#### getDerivedStateFromProps


第二個會被執行的 function，會接受 `props`（從外面接收到的）和 `state`（在 constructor 建立的）。

這個階段可以根據 props 來更新或添加 state，向是這樣：

```js
class App extends React.Component {
  constructor(props) {
    console.log("1. constructor");
    super(props);
    // 原本是 red
    this.state = { favoritecolor: "red" };
  }

  // 記得它是「static」方法，所以一定要加上前綴
  // 會拿到這個元件的 props 跟 state
  static getDerivedStateFromProps(props, state) {
    console.log("2. getDerivedStateFromProps");
    // 回傳的東西就會變成新的 state
    return { favoritecolor: props.favcol };
  }

  render() {
    console.log("3. render");
    // 原本是 red，但會被 getDerivedStateFromProps 改成 yello
    return <h1>My Favorite Color is {this.state.favoritecolor}</h1>;
  }
}
// 傳一個 props 進去
ReactDOM.render(<App favcol="yello" />, document.getElementById("root"));
```

範例可以到 [這裡](https://codepen.io/jubeatt/pen/popYwaG?editors=1011) 參考。


#### render

第三個會被執行的 function，這階段負責把 HTML 變成 DOM。

#### componentDidmount

附註：只會執行一次

附註：如果跟 `getDerivedStateFromProps` 改的是同一個 state，最後會套用到 `getDerivedStateFromProps` 的結果。

第四個會被執行的 function，在「把東西放到畫面上以後」才被執行。

```js
class App extends React.Component {
  constructor(props) {
    console.log("1. constructor");
    super(props);
    // 原本是 red
    this.state = { favoritecolor: "red" };
  }

  componentDidMount() {
    console.log("3. componentDidMount");
    // 一秒後改成綠色
    setTimeout(() => {
      this.setState({ favoritecolor: "green" });
    }, 1000);
  }

  render() {
    console.log("2. render");
    return <h1>My Favorite Color is {this.state.favoritecolor}</h1>;
  }
}
```

範例可以到 [這裡](https://codepen.io/jubeatt/pen/QWaoMvL) 參考。

最後在強調一下，只有 `render` 跟 `getDerivedStateFromProps` 會在每次 re-render 的時候會被執行，其他兩個都只有一次，可以到 [這裡](https://codepen.io/jubeatt/pen/Rwxdgvj) 參考看看。



### Update 階段

執行順序：

1. `getDerivedStateFromProps()`
1. `shouldComponentUpdate()` 
1. `render()`
1. `getSnapshotBeforeUpdate()`
1. `componentDidUpdate()`

#### getDerivedStateFromProps

剛剛有說過 re-render 的時候這個會在執行一次，所以這邊它就是第一個會先被執行的 function。


#### shouldComponentUpdate

大概是最常看到的一個 function，總之它是一個蠻重要的 function，可以決定要不要 re-render，端看你給的回傳值是 `true` / `false`，另外會接收兩個參數是 `nextProps` 和 `nextState`：

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    console.log("props", nextProps);
    console.log("state", nextState);
    return false;
  }

  render() {
    return (
      <div>
        <div>回傳 false，所以不 re-render</div>
        <div>Counter: {this.state.counter}</div>
        <button
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          add
        </button>
      </div>
    );
  }
}
ReactDOM.render(<App ppp="yo" />, document.getElementById("root"));
```

範例一樣到 [這邊](https://codepen.io/jubeatt/pen/RwxdZLY?editors=1010) 看。


#### render

render 每一次 re-render 都會被執行，所以在這個階段中當然也會。

這邊 `render` 要做的事情就是把更新 state 後的 HTML 反應 DOM 上面（注意是 DOM 不是畫面），這邊就不示範了。

#### getSnapshotBeforeUpdate

這個取名還真有意思，就是能在這邊拿到「更新前的 state」，所以乾脆來拍張照做紀念好了（？

這邊搭配 `componentDidMount` 來做個示範，原本的顏色是 `red`，但會改成 `yellow`，而 `getSnapshotBeforeUpdate` 會把**更新前的 state** 印到畫面上：


```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red" };
  }

  componentDidMount() {
    // 畫面 paint 完一秒後更新 state，觸發 re-render
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 1000);
  }

  // W3C 是寫說要搭配 componentDidUpdate 來用，否則會出錯
  // 但這邊在 codepen 上測試是 OK，所以先這樣寫
  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("div1").innerHTML = `
      before update state, the favorite color was ${prevState.favoriteColor}
    `;
  }

  render() {
    return (
      <div>
        <h1>My Favorite Color is {this.state.favoriteColor}</h1>
        <div id="div1"></div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

不太懂的話就直接到這裡看 [範例](https://codepen.io/jubeatt/pen/JjMzyBM?editors=1011) 吧。


#### componentDidUpdate

就是「更新完以後」會被執行的 function，這邊沿用剛剛 `getSnapshotBeforeUpdate` 的範例，看一下應該就知道在幹嘛了：


```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red" };
  }

  componentDidMount() {
    // 畫面 paint 完一秒後更新 state，觸發 re-render
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 1000);
  }

  // 拿到更新前的值
  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("div1").innerHTML = `
      before update state, the favorite color was ${prevState.favoriteColor}
    `;
  }

  // 拿到更新後的值
  // 因為是更新以後才被執行，所以 this.state 就會是新的 state
  componentDidUpdate() {
    document.getElementById("div2").innerHTML = `
      after update state, the favorite color is ${this.state.favoriteColor}
    `;
  }

  render() {
    return (
      <div>
        <h1>My Favorite Color is {this.state.favoriteColor}</h1>
        <div id="div1"></div>
        <div id="div2"></div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
```

一樣附上 [範例](https://codepen.io/jubeatt/pen/xxpBXbz)。


### Unmounting 階段

簡略來說應該只有這一個：`componentWillUnmount`

#### componentWillUnmount

就是在「元件從畫面上移除前」要做什麼？直接看 [範例](https://codepen.io/jubeatt/pen/YzYgrGb)：

```js
class Header extends React.Component {
  componentWillUnmount() {
    alert("Before Header ummount");
  }
  render() {
    return <h1>Hello I'm header</h1>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  render() {
    return (
      <div>
        {this.state.show && <Header />}
        <button onClick={() => this.setState({ show: !this.state.show })}>
          Toggle header
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```


## 請問 class component 與 function component 的差別是什麼？

這邊我會直接以 class 跟 hook 的差別來做說明，所以不要跟 class component 中的 function component（沒有 state 的那種）搞混。

首先最大的差別就是一個是用 `class` 寫，一個是用 `function` 來寫吧。

然後 class component 因為是 base on class，所以得特別注意 `this` 值的指向，跟一些 class 的用法，像是得先 `super` 繼承 `props`，然後不可以在裡面宣告變數，而是要透過 `constructor` 等等之類的。

再來一個很大的差別就是 class component 特別著重在「生命週期」這個觀念（跟 Vue 有點像），你想在什麼階段做什麼事情都會透過像是 `componentDidMount` 或是 `componentDidUpdate` 之類的來做。但 hook 就比較單純一點，一個 `useEffect` 基本上就能解決各種 side effect，本意就是希望你不要太糾結在生命週期的概念。

我自己還蠻喜歡 hook 的思維的，這樣子真的單純很多。


## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？


這個拿表單元素來舉例會比較好懂一點。簡單來說如果畫面上顯示的內容是「透過 React 的 state」來決定的，那它就是 controlled component，像是最常見的 `input`：

```js
function App () {
  const [value, setValue] = useState('');
  // 內容由 state 控制
  return <input value={value} onChange={e => setValue(e.target.value)} />
}
```


反之，如果不是被 state 控制的話就是 uncontrolled component：

```js
function App () {
  const [value, setValue] = useState('');
  // 內容沒有被控制
  return <input />
}
```

不過一般好像會建議能用 state 控制就用 state 控吧？也許是因為這樣子的做法能減少一些 bug。
