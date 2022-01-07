## 請以自己的話解釋 API 是什麼


我看過各種 API 的解釋，有人說是「雙方溝通的媒介」，有人說是「一個操作的介面」，有人說是「函式庫」等等，而我自己覺得認為最好理解的一句話是 **「程式與程式之間溝通的介面」**。

這個想法是我在 [Javascript & jQuery: Interactive Front-End Web Development](https://www.books.com.tw/products/F012864530) 裡學到的，這本書裡面解釋 API 的方式很簡單。

試著想想看你在瀏覽網頁的時候，是不是充滿了各種元素可以讓你去跟他互動？例如說「滑鼠移過去的時候有東西有反應」或是「點下 `≡` 的時候就會彈一個東西出來」。

這個叫做「使用者介面（User interface design，UI）」，你必須透過這個介面才能跟網頁做互動，如果沒有這個介面，就什麼都做不了（除非你直接寫程式碼來操作）。

而 API 也是同樣的道理，只是它是 **「工程師設計給工程師操作的『介面』」**。

兩者不同的地方在於，UI 是透過「硬體設備（鍵盤、滑鼠）」來跟介面做溝通，API 是則透過「程式碼」來跟介面做溝通，其實說穿了都是在使用「被設計好的一個介面」，只是使用的方法不同而已。

舉例來說，工程師設計了一個介面（例如 `≡`），讓使用者在滑鼠點下去的時候會彈出東西來，對應到 API 的話就會是後端工程師設計了一個介面（例如一個 function），讓前端工程師用程式碼來 call 這個 function 的時候可以拿到資料，或是執行某個功能。

然而要怎麼「設計」跟「使用」一個介面，其實都是雙方得互相達成共識的。如果工程師不設計一個 `≡` 來讓你可以點它，你就沒辦法做這件事，同理，如果工程師不設計一個 `function`，我就沒辦法 call 這個 function 來做某件事。

所以為什麼要有 UI 或 API？

> 為了讓雙方能夠有一個溝通的管道，也就是「介面」

其實只是這樣簡單的道理而已。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

- 410 => 東西曾經在，但現在已經不在了（永久）
- 202 => 我收到你的請求了，但我還沒有處裡完（也不知道什麼時候會處理完）
- 303 => 不會傳 Location 給你，而是直接幫你重新導向到某個地方（通常在 POST 成功後）



## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。


Base URL：https://fadachai.com

| 說明     | Method | path       | 參數                   | 範例             |
|--------|--------|------------|----------------------|----------------|
| 獲取所有餐廳 | GET    | /restaurants     | _limit:限制回傳資料數量（預設為十筆）           | /restaurants?_limit=5 |
| 獲取單一餐廳 | GET    | /restaurants/:id | 無                    | /restaurants/10      |
| 新增餐廳   | POST   | /restaurants     | name: value / address: value / tel: value | 無              |
| 刪除餐廳   | DELETE   | /restaurants/:id     | 無 | 無              |
| 更改餐廳資訊   | PATCH   | /restaurants/:id     | name: 餐廳名稱 | 無              |


### Example：獲取所有餐廳

Request: 

```
GET https://fadachai.com/restaurants
```

Response: 

```js
[
  {
    id: 1,
    name: '餐廳一',
    address: '餐廳地址',
    tel: '07-3345678'
  },
  {
    id: 2,
    name: '餐廳二,
    address: '餐廳地址',
    tel: '07-3345678'
  },
]
```

### Example：獲取單一餐廳

Request: 

```
GET https://fadachai.com/restaurants/1
```

Response: 

```js
[
  {
    id: 1,
    name: '餐廳一',
    address: '餐廳地址',
    tel: '07-3345678'
  }
]
```

### Example：新增餐廳

Request: 

```js
request.post('https://fadachai.com/restaurants/',
{
  form: {
    {
      id: 1,
      name: '餐廳一',
      address: '餐廳地址',
      tel: '07-3345678'
    }
  }
}, callback(error, res, body))
```

Response: 

```js
[
  message: '新增成功'
  {
    id: 1,
    name: '餐廳一',
    address: '餐廳地址',
    tel: '07-3345678'
  }
]
```


### Example：刪除餐廳

Request: 

```
DELETE https://fadachai.com/restaurants/1
```

Response: 

```js
[
  message: '刪除成功'
  {
    id: 1,
    name: '餐廳一',
    address: '餐廳地址',
    tel: '07-3345678'
  }
]
```


### Example：更改餐廳資訊

Request: 

```js
request.patch('https://fadachai.com/restaurants/1',
{
  form: {
    {
      id: 1,
      name: '餐廳一',
      address: '餐廳地址',
      tel: '07-3345678'
    }
  }
}, callback(error, res, body))
```

Response: 

```js
[
  message: '修改成功'
  {
    id: 1,
    name: '餐廳一',
    address: '餐廳地址',
    tel: '07-3345678'
  }
]
```
