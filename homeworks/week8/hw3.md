## 什麼是 Ajax？

我一直覺得這名字念起來很饒口：Asynchronous JavaScript and XML，AJAX（非同步的 JavaScritp 與 XML）。

簡單來說就是利用 JavaScript 中的「非同步」行為來跟伺服器拿「資料」。另外以前的資料格式大多是 XML 所以最後一個字才會是 X（XML）。不過現在都是以 JSON 的資料為主了，因此改叫 AJAJ（Asynchronous JavaScript and JSON）說不定更符合現代背景。

我覺得 AJAX 的重點其實是指「非同步」的觀念，因為就算不用 AJAX 這個「技術」，你一樣能跟伺服器拿資料，只是使用者體驗會不好罷了。

那到底非同步是什麼？很簡單，直接舉例：

```js
console.log('yo')
for(let i=0; i<= 1000000000; i++) {

}
console.log('so long~')
```

出來的順序是：`yo` -> （等迴圈大概一秒） -> `so long~`

這個「等」一行跑完才往下執行的行為就叫做為「同步」。

再來看一段：

```js
console.log('yo')
setTimeout(() => console.log('I\'m async'), 1000)
console.log('so fast')
```

出來的順序是：`yo` -> `so fast` -> `I'm async`

這邊在執行到第二行的時候就「不等了」，繼續往下執行的行為就叫做「非同步」。

AJAX 要的就是這個「非同步」的行為，因為我們不希望在跟伺服器拿資料時你的程式**卡在那邊等 response。**你想想看如果要等的話使用者體驗有多糟？

```js
function getData(callback) {
const xhr = new XMLHttpRequest()
/* 
  注意這邊的最後一個參數 async 是 false，
  代表我要讓這段 request 是「同步」執行
*/ 
xhr.open('GET', 'https://gorest.co.in/public/v1/users', false)
xhr.onload = () => {
  if (xhr.status >= 200 && xhr.status < 400) {
    callback(null, xhr.responseText)
  } else {
    callback('error!')
  }
}
xhr.send()
}

// 點按鈕就顯示 click
const button = document.querySelector('button')
button.onclick = () => console.log('click')

// 跟伺服器拿資料，這邊因為設定成同步，所以會「卡在這裡等」
getData((err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})

// 手動太慢了，所以用程式來點 10 下按鈕
for(let i=0; i<10; i++) {
  button.click()
}
```

你拿去跑跑看就知道（記得要先寫好 HTML 的 `<button>`），不管重新整理幾次 click 都會在「拿到 response 之後」才執行。為什麼？因為我讓它變成同步，所以這代表在拿到 response 之前**完全不能做任何事。**




## 用 Ajax 與我們用表單送出資料的差別在哪？

最大的差別就是：

- Form 會換頁，AJAX 不會
- Form 會換頁，AJAX 不會
- Form 會換頁，AJAX 不會

這一點就是最重要的差異了。

至於為什麼會這樣？因為 Form 在拿到 reponse 的時候瀏覽器會直接**把結果 render 出來**，AJAX 則是會**把結果丟給 JavaScript**。這個差異看似很小，但卻很重要。有些時候我們只是想要更新一部分的內容，而不是把整個頁面重新 render 一遍。

另外一點就是用 Form 來拿資料是不用寫任何 JavaScript 的，你完全是靠 HTML 來跟 Server 拿資料，所以瀏覽器拿到 response 當然只能直接 render 出來（畢竟 HTML 只是個 Markup Language 不是 Programming Language）。但 AJAX 就不同了，你是用 JavaScript 來跟 Server 拿資料，所以瀏覽器拿到 response 後才可以丟給 JavaScript 來處理，仔細想想就會覺得挺合理的。


## JSONP 是什麼？

一個為了解決「跨網域拿資料」的問題而誕生的小技巧。簡單來說就是你透過 `<script src="xxx">` 來發 request。

然而這個 `<script>` 的內容比較特別，可能會長得像這樣：

```js
/* 呼叫 callback，然後在裡面塞一個 Object */
callback({
  name: 'PeaNu',
  age: 20,
  gender: 'man'
})
```

有沒有覺得很眼熟？不就是 callback function 嗎？只是你在前端寫的 callback 通常是長這樣：

```js
/* 我預期這個 callback 執行時會被傳入一個 response */
function callback(response) {
  console.log(response)
}
```

把這兩個順序對調並寫在一起，好像就是你很熟悉的 JavaScript 了：

```js
function callback(response) {
  console.log(response)
}
callback({
  name: 'PeaNu',
  age: 20,
  gender: 'man'
})
```

也就是說你只要先定義好 `callback`，接著等人來幫你呼叫下面那一段就能在 callback 裡面拿到資料了。

那要怎麼呼叫？透過 `<script>`：

```html
<!-- client 端 -->
<script>
  /* 我預期這個 callback 執行時會被傳入一個 response */
  function callback(response) {
    console.log(response)
  }
</script>

<!-- server 端 -->
<script src="https://example.com">
  /* 有人發 request 來我就 response 下面這段 */
  callback({
    name: 'PeaNu',
    age: 20,
    gender: 'man'
  })
</script>
```

這個就叫做 JSONP，因為是把資料「填充（Padding）」在 function 裡面故得其名。

之所以要這樣做是因為 `<script>` 中的 `src` 不會有跨網域的限制，就跟你用 `<img src="xxx">` 一樣，它不用管什麼網域的問題，因此有人就利用這個特性發明了 JSONP。

老實說還真佩服這個人的腦袋裝了什麼，可以這麼機智。

有興趣了解更多的話可以參考我之前寫的的文章：[實作 JSONP](https://jubeatt.github.io/2022/01/06/practice-jsonp/)，這裡面解釋了前後端到底實際上做了什麼。


## 要如何存取跨網域的 API？

剛剛講的 JSONP 就是方法之一，但這方法比較舊了而且只能用在 `GET` 所以逐漸沒落了。

現在的正統作法是用 `CROS（Cross-Origin Resource Sharing）` 來處理。簡單來說這個規範告訴你，只要 Server 端在 response header 加上一段 `access-control-allow-origin: *`，那任何人都可以拿到 response，不會被瀏覽器擋下來。


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？


因為「執行環境」不同，一個是 Node.js，一個是瀏覽器。

- 跨網域相關的限制只會發生在瀏覽器
- 跨網域相關的限制只會發生在瀏覽器
- 跨網域相關的限制只會發生在瀏覽器

什麼同源策略啦、CROS 這些都是建立在「瀏覽器」這個環境上，只要不是瀏覽器完全不會有這些限制。

至於為什麼瀏覽器要有這些限制？我知道是安全性問題，但我還是很疑惑，難道 Node.js 就沒有安全性問題嗎？所以我上網查了資料寫了篇文章，有興趣可以參考一下：[在 Node.js 跟瀏覽器上發 request 的差異](https://jubeatt.github.io/2022/01/25/diffrence-between-nodejs-and-browser/)