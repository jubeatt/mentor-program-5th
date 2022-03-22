# Event Loop + Scope

```js
1 | for(var i=0; i<5; i++) {
2 |   console.log('i: ' + i)
3 |   setTimeout(() => {
4 |     console.log(i)
5 |   }, i * 1000)
6 | }
```

這邊的輸出結果會是：

```js
i: 0
i: 1
i: 2
i: 3
i: 4
5 // 0 秒後印出
5 // 1 秒後印出
5 // 2 秒後印出
5 // 3 秒後印出
5 // 4 秒後印出
```

這邊最常被搞錯的地方是 `setTimeout` 裡的 function 的 `i`，所以我先針對這部分來解說，東西才不會那麼雜。

首先，這邊的 `i` 是用 var 來宣告，而 var 的 scope 是以 function 作為單位。這邊沒有用任何 function 來包住，所以 `i` 會是**全域變數**。

接著是重點，`setTimeout` 裡的 callback 是**根據它執行當下的 i 是什麼來決定輸出值，而不是執行迴圈當下的 i**，所以一定一定一定要搞清楚 callback 是什麼時候被執行的？

根據 Event loop 的機制，`setTimeout` 裡的 callback **一定是等到迴圈跑完後才會被執行**，所以它的 `i` 也一定是迴圈跑完後的那個值，跟迴圈執行當下的值一點關係也沒有。

所以囉，最後 callback 會印出的 `i` 是 5。（i=4 跑完後，i++ 變成 5，接著 5 < 5 不符合迴圈條件後跳出）

接下來是執行順序的部分，這邊只要理解 Event loop 應該就沒什麼問題。

1. 進入迴圈第一圈，`i=0`
2. `console.log(0)` 印出 0
3. `setTimeout(..., 0*1000)` 丟給 runtime 處理，0 秒後傳給 callback queue，再丟回 call stack 執行
4. 進入迴圈第二圈，`i=1`
5. `console.log(1)` 印出 1
6. `setTimeout(..., 1*1000)` 丟給 runtime 處理，1 秒後傳給 callback queue，再丟回 call stack 執行
7. 進入迴圈第三圈，`i=2`
8. `console.log(2)` 印出 2
9. `setTimeout(..., 2*1000)` 丟給 runtime 處理，2 秒後傳給 callback queue，再丟回 call stack 執行
10. 進入迴圈第四圈，`i=3`
11. `console.log(3)` 印出 3
12. `setTimeout(..., 3*1000)` 丟給 runtime 處理，3 秒後傳給 callback queue，再丟回 call stack 執行
13. 進入迴圈第五圈，`i=4`
14. `setTimeout(..., 4*1000)` 丟給 runtime 處理，4 秒後傳給 callback queue，再丟回 call stack 執行
15. 進入迴圈第五圈，`i=5`，不符合迴圈條件，迴圈結束。

最後是依序把 callback queue 中的 functnio 丟回 call stack 執行。剛剛有說過這時候的迴圈已經結束了，所以每個 callback 在執行 `console.log(i)` 時都會印出 5。


另外有些人可能會把 `setTimeout` 的 `i` 和 callback 裡的 `i` 搞混，所以這邊再做個補充。

一個是當作參數傳入，所以迴圈當下的 `i` 是什麼就會傳進去什麼：

```js
setTimeout(..., 0 * 1000) // 第一圈 i=0
setTimeout(..., 1 * 1000) // 第二圈 i=1
setTimeout(..., 2 * 1000) // 第三圈 i=2
setTimeout(..., 3 * 1000) // 第四圈 i=3
setTimeout(..., 4 * 1000) // 第五圈 i=4
```

一個只是跟 function 說要印出 i，所以跟迴圈當下的 i 是什麼沒有關係：

```js
i=0 // 第一圈
i=1 // 第二圈
i=2 // 第三圈
i=3 // 第四圈
i=4 // 第五圈
i=5 // 跳出迴圈

// 迴圈結束以後才會執行 callback
function callback () {
  console.log(i)
}
function callback () {
  console.log(i)
}
function callback () {
  console.log(i)
}
function callback () {
  console.log(i)
}
function callback () {
  console.log(i)
}
```

一定要分清楚這兩個的差異，不然會像我以前一樣卡半天。