## 六到十週心得與解題心得


### 第六週

這週幫自己重新複習了 HTML 與 CSS，有學到一些我以前不知道的東西：

1. CSS selector 的權重計算方式
2. CSS 的 position sticky 怎麼用
3. CSS 的 pseudo-element 原來可以用 `attr` 來存取 HTML 屬性內容
4. 把一些以前不知道用途的 CSS 的屬性，寫了一篇 [CSS 一些久了可能會忘記的屬性](https://jubeatt.github.io/2022/01/13/css-property/)。
5. 寫了一篇 CSS 的經典題目：[CSS 垂直置中](https://jubeatt.github.io/2022/01/13/css-vertical-align-center/)
6. 搞懂了 `nth-child` 跟 `nth-of-type` 的差別
7. 學到了一個冷知識：[在 CSS 中做字串拼接](https://jubeatt.github.io/2022/01/22/css-string-concatenation/)（這個搭配 counter 來做 list 真的好用）
8. 從 HTML 的 `<iframe>` 學到什麼是 `x-frame-options: SAMEORIGIN`（原來這也能涉及同源策略）
9. 學到了很多 SEO 的基礎，以前都覺得這是個玄學，太複雜了。

這週的作業主要是練習切版搭配前端基礎來做網頁，還蠻慶幸以前花了很多時間學切版，這次的作業沒有碰到太大的困難跟時間障礙。想當初我在學切版的時候光切一個頁面就花了 3 ~ 4 天的時間才完成，看到自己了進步很多很開心。

因為進展很順，所以也利用時間去填以前演算法的坑：

- [淺談時間複雜度與空間複雜度](https://jubeatt.github.io/2022/01/17/complexity-analysis/)
- [選擇排序法（Selection sort）](https://jubeatt.github.io/2022/01/17/selection-sort/)
- [泡沫排序法（Bubble-sort）](https://jubeatt.github.io/2022/01/17/bubble-sort/)
- [插入排序法（Insertion-sort）](https://jubeatt.github.io/2022/01/17/insertion-sort/)
- [快速排序法（Quick-sort）](https://jubeatt.github.io/2022/01/17/quick-sort/)
- [二分搜尋法（Binary-search）](https://jubeatt.github.io/2022/01/18/binary-search/)


總之，這週是個很有成就感的一週！

### 第七週

這週複習最基礎的 JavaScript，特別是 DOM 操作。以前沒有把這部分弄熟，所以一直想找時間來填坑，這一次算是圓滿達成了吧！

一樣來盤點這週學到的事：

1. 學到了許多 &lt;script&gt; 的知識
  - [關於 &lt;script&gt; 的放置位置](https://jubeatt.github.io/2022/01/18/how-to-place-script-tag/)
  - [認識 &lt;script&gt; 中的 async 與 defer 屬性](https://jubeatt.github.io/2022/02/12/learn-async-and-defer-attribute/)
  - [&lt;script&gt; 有沒有 module 屬性的差別](https://jubeatt.github.io/2022/02/12/normal-script-and-module-script-difference/)
2. 這次真的弄懂「事件機制」、「阻止預設行為」、「事件代理」這些重要觀念
  - [事件傳遞機制－捕獲與冒泡](https://jubeatt.github.io/2022/01/18/event-flow/)
  - [萬事拜託你囉！Event-delegation 機制](https://jubeatt.github.io/2022/01/19/event-delegation/)
  - [阻止預設行為 preventDefaut](https://jubeatt.github.io/2022/01/18/event-prevent-default/)
3. 也把 Runtime 的差別弄清楚了
  - [從遊戲來認識 CORS 與瀏覽器的限制](https://jubeatt.github.io/2022/01/10/learn-cors-and-browser-limitations-from-game/)
  - [在 Node.js 跟瀏覽器上發 request 的差異](https://jubeatt.github.io/2022/01/25/diffrence-between-nodejs-and-browser/)

接著是作業的部分。這週的作業也蠻有趣的，學到怎麼用 Vanilla JavaScript 操作 DOM，其實也沒有想像中那麼可怕，知道原理後就沒什麼複雜的，只是程式碼比較長而已。

在寫這週挑戰題的時候也讓發生了蠻有趣的事，本來只是想說做的完整一點，但不知不覺就寫成一個陽春版小套件了：[這裡](https://github.com/jubeatt/Carousel)。能做出第一個專屬自己的套件特別開心！

另外也對自己寫的 todo list 很滿意，應該說是 UI 很滿意啦，哈哈哈哈哈。


### 第八週

這週的重點應該是 [Twitch API](https://jubeatt.github.io/mentor-program-5th-jubeatt/homeworks/week8/hw2-kraken-infinite-scroll/index.html) 吧，花了很多的時間來完成，希望做到最完美。不過要重複用 callback 來發 request 真的有比較複雜一點（我是指遞迴的部分），之後如果能越來越熟悉就好了。

雖然以前就被 CROS 雷過，但 CROS 的觀念真的蠻重要的，尤其是像我們這種常常得串 API 的工程師，可以說是必備的重點知識！

這週的挑戰題本來只做了「按鈕版」，但覺得可以挑戰「無限滾動」看看（挖坑給自己跳），雖然又花了一段時間，但最後還是成功做出來了，可喜可賀，可喜可賀。

最後是 JSONP，雖然在現代環境它已經沒落了，但基於好奇還是嘗試把他實作出來（前端 + 後端），可以參考我寫的 [實作 JSONP](https://jubeatt.github.io/2022/01/06/practice-jsonp/)，把前後摸透的感覺真的很不錯！


### 第九週

這週是我看到課綱後就很期待的一週，覺得純前端在現代社會好難生存（還是南部太慘 QQ）。自從求職失敗後就下定決心要把後端基礎給學好，讓自己成為一個 Half-Stack Developer。

果然這週沒有失望，不僅學會了 PHP 基礎也學會了 MySQL 資料庫的操作。雖然跟專業沾不上邊，但這我覺得些知識是很有幫助的，就跟 UI 要懂一點前端的道理一樣，你必須知道對方在做什麼，才能在溝通上減少很多問題。

這週除了留言板以外也有把部落格和職缺報報的部分做出來，雖然很陽春，不過有對後端的操作更熟悉一點！

另外也很敬佩像 Huli 一樣願意學習自己不熟悉領域的人，雖然嘴巴上都會說前端應該要懂後端，但真的要去學習又會覺得好麻煩，光前端就學不完了哪有時間學後端。但在走完這週後覺得這一切都很值得，雖然是後端知識，但學這些不會讓你忘記前端在做什麼，反而還更清楚前後端的脈絡。總之，這一週是很棒的一週，另外也希望之後的網站部屬能順利完成。


### 第十週


這一週我把 \[MTR01\] 的影片當作複習來看，也是蠻多收穫的；也從第一期的影片裡看到 Huli 的成長。從 \[MTR01\] 可以看出 Huli 對於「教學」也是一步一步練習，從原本的進度太趕、作業太難、困難度過高等等，經過每一期的優化與改良才成為我現在參加的第五期，覺得這是一個很有意義的過程。這就跟自己學程式或寫專案很像，一開始大家都不完美，必須經過時間的歷練與一步步改善，才能變得越來越堅強，越來越厲害，

另外這週的小遊戲也蠻有趣的，特別是 r30 異世界。也寫了筆記紀錄，有興趣的人可以看看：

- [week10 綜合能力測驗](https://jubeatt.github.io/2022/02/12/week10-game/)
- [R30 異世界網站挑戰－簡短紀錄](https://jubeatt.github.io/2022/02/11/r30-challenge-record/)