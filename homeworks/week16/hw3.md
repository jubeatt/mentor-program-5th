# Hoisting


``` js
1 | var a = 1
2 | function fn(){
3 |   console.log(a)
4 |   var a = 5
5 |   console.log(a)
6 |   a++
7 |   var a
8 |   fn2()
9 |   console.log(a)
10 |   function fn2(){
11 |     console.log(a)
12 |     a = 20
13 |     b = 100
14 |   }
15 | }
16 | fn()
17 | console.log(a)
18 | a = 10
19 | console.log(a)
20 | console.log(b)
```

輸出結果：

```js
undefined
5
6
20
1
10
100
```

這邊會用 EC + VO/AO + scope chain 的模型來模擬執行流程：

## globalEC 編譯階段

```js
globalEC: {
  VO: {
    a: undefined,
    fn: 0x01,
  }
  scope chain: [globalEC.VO]
}
fn[[Scope]] = [globalEC.VO]
```

## globalEC 執行階段

**Line1 var a = 1**

在 globalEC 裡的 VO 找到 `a`，對 `a` 賦值。

```js
globalEC: {
  VO: {
    a: 1, // 賦值
    fn: 0x01,
  }
  scope chain: [globalEC.VO]
}
fn[[Scope]] = [globalEC.VO]
```

**Line16 fn()**

執行 fn，進入 fn 的 EC。

## fnEC 編譯階段

```js
fnEC: {
  AO: {
    a: undefined,
    fn2: 0x02
  }
  scope chain: [fnEC.AO, globalEC.VO]
}
fn2[[Scope]] = [fnEC.AO, globalEC.VO]
```

## fnEC 執行階段

**Line3 console.log(a)**

在 `fnEC` 裡的 AO 找到 `a`，印出 `undefined`。

**Line4 var a = 5**

在 `fnEC` 裡的 AO 找到 `a`，對 `a` 賦值。

```js
fnEC: {
  AO: {
    a: 5, // 賦值
    fn2: 0x02
  }
  scope chain: [fnEC.AO, globalEC.VO]
}
fn2[[Scope]] = [fnEC.AO, globalEC.VO]
```

**Line5 console.log(a)**

在 `fnEC` 裡的 AO 找到 `a`，印出 `5`。

**Line6 a++**

在 `fnEC` 裡的 AO 找到 `a`，對 `a` 賦值。


```js
fnEC: {
  AO: {
    a: 6, // 賦值
    fn2: 0x02
  }
  scope chain: [fnEC.AO, globalEC.VO]
}
fn2[[Scope]] = [fnEC.AO, globalEC.VO]
```


**Line8 fn2()**


執行 fn2，進入 fn2 的 EC。

## fn2EC 編譯階段

```js
fn2EC: {
  AO: {}
  scope chain: [fn2EC.AO, fnEC.AO, globalEC.VO]
}
```

## fn2EC 執行階段

**Line11 console.log(a)**

1. 到 fn2EC 的 AO 裡找，找不到，去 scope chain 往上找。
2. 到 fnEC 的 AO 裡找，找到了！印出 `6`

**Line12 a=20**

1. 到 fn2EC 的 AO 裡找，找不到，去 scope chain 往上找。
2. 到 fnEC 的 AO 裡找，找到了！對 `a` 賦值

```js
fnEC: {
  AO: {
    a: 20, // 賦值
    fn2: 0x02
  }
  scope chain: [fnEC.AO, globalEC.VO]
}
fn2[[Scope]] = [fnEC.AO, globalEC.VO]
```


**Line13 b=30**

1. 到 fn2EC 的 AO 裡找，找不到，去 scope chain 往上找。
2. 到 fnEC 的 AO 裡找，找不到，去 scope chain 往上找。
3. 到 global 的 VO 裡找，找不到。

這時候會有兩種可能：

- 非嚴格模式下，宣告一個全域變數 `b` 並且賦值
- 嚴格模式下，拋出 `ReferenceError: b is not defined`

這邊是非嚴格模式，所以會在 globalEC 宣告一個新的全域變數並賦值：

```js
globalEC: {
  VO: {
    a: 1,
    b: 100, // 宣告並賦值
    fn: 0x01,
  }
  scope chain: [globalEC.VO]
}
fn[[Scope]] = [globalEC.VO]
```

到這邊 fn2EC 就結束了，返回 fnEC。



**Line9 console.log(a)**

到 fnEC 的 AO 裡找到 `a`，印出 `20`

fn 執行完畢，返回 globalEC


**Line17 console.log(a)**

到 globalEC 的 VO 裡找到 `a`，印出 `1`


**Line18 a=10**

到 globalEC 的 VO 裡找到 `a`，對 `a` 賦值

```js
globalEC: {
  VO: {
    a: 10, // 賦值
    b: 100, 
    fn: 0x01,
  }
  scope chain: [globalEC.VO]
}
fn[[Scope]] = [globalEC.VO]
```


**Line19 console.log(a)**


到 globalEC 的 VO 裡找到 `a`，印出 `10`


**Line20 console.log(b)**

到 globalEC 的 VO 裡找到 `b`，印出 `100`