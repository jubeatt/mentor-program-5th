```js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

> 要知道 this 值是什麼，就把要焦點放在「它是怎麼被呼叫」的。

1. `obj.inner.hello()` => 2

這邊是用 inner 去呼叫的，所以 this 指向 inner，而 inner 中的 value 為 2。

或也能用上課教的方式來解題：`obj.inner.hello.call(obj.inner)`

2. `obj2.hello()` => 2

`obj2` 的值為 `inner` 這個「物件」，因此 `obj2.hello()` 等同於 `inner.hello()`，所以是由 inner 來呼叫的，因此 this 指向 inner，並在 inner 中找到 value 為 2。

或者是看成： `obj2.hello.call(obj2)` 

3. `hello()` => undefind

`hello` 的值是一個 function，這裡沒有透過任何東西來呼叫，因此 this 指向 window / global，也就是 `window.value` / `global.value`，最後的值為 undefined。（試圖存取不存在的屬性就會得到 undefined）

如果是非嚴格模式的話 this 為 undefined，就會變成 `undefined.value`，這時的結果為 `TypeError: Cannot read property 'value' of undefined`。



