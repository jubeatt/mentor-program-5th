## 教你朋友 CLI

Hi，親愛的 h0w 哥，為了讓智商只有 87 分的你能夠快速上手，我只教你你會需要用到的指令，跟一些我家老鼠都聽得懂的基本概念。

### 拜託，至少理解 GUI 跟 CMD 的差別

圖形化介面 GUI（Graphic User Interface），我們日常在桌面上看的到的那些畫面，像是 h0w 哥你常常在神秘資料夾裡點開神秘影片的那個視窗就是「GUI」。

（很重要所以說三次）

- GUI 就是可以透過那個介面來操作的東西。
- GUI 就是可以透過那個介面來操作的東西。
- GUI 就是可以透過那個介面來操作的東西。

但在以前還沒有圖形化介面，大家都是用「Command Line Interface」來跟電腦做溝通，所以 h0w 哥你如果要看神秘影片的話就要用鍵盤來跟電腦說：

1. 「我要進到 xxx 資料夾」
2. 「我要打開 xxx 影片」

大概是像這樣的流程，懂？

### 安裝 CMD 軟體

相信安裝軟體對最常在網路上下載東西的 h0w 哥來說應該沒什麼困難吧？

總之呢，你先到 [這裡](https://gitforwindows.org/) 下載等一下要安裝的軟體（精通日文的 h0w 哥應該認得 Download 這個字吧，點下去就對了）。

下載完後，你應該會有一個 `Git-2.34.1-64-bit` 檔案，用它來安裝就可以了（一直 next，next，直到最後會有 Install，一樣按下去就對了）。

### 實戰指令

安裝完我們要的軟體後，你的桌面或是開始列就會多出一個叫做「Git Bash」的軟體，請輕輕的打開他。

基於 h0w 哥的需求，我怕你太混亂，所以先把等一下會教你的指令列出來給你看：

- `pwd`
- `cd`
- `ls`
- `mkdir`
- `touch`
- `vim`
- `echo`
- `>`

首先，你打開 Git Bash 後，應該會看到一個視窗，然後有一行綠綠紅紅的字：

```bash
user@LAPTOP-3A1RJ558 MINGW64 ~
```

你不用在意那一長串東西，只要注意那個「~」就好， ~ 是代表「你現在人在哪裡」的意思。預設的位置是在「根目錄」。（根目錄會用 ~ 這個符號來顯示）

所以我要先教你第一個指令 `pwd`，麻煩你用鍵盤輸入「pwd」這個指令，這是用來問電腦「我現在人在哪裡？」的意思：

```bash
pwd
/c/Users/user
```

`/c/Users/user` 就是電腦的回答，他回你說「你人在 C 槽的 User 資料夾下的 user 資料夾中」，應該能理解吧？

接著是下一個指令，請你輸入 `ls`，這是用來問電腦「我現在位置底下有哪些東西？」的意思：

```bash
ls

 「開始」功能表@
'3D Objects'/
 ansel/
 AppData/
'Application Data'@

...
```

電腦就會直接顯示你位置下面的所有資料夾，h0w 哥如果你不信的話可以用你熟悉的 GUI 打開 C:\Users\user 來看就知道了。

接下來，為了怕你搞壞電腦，所以我們先用剛剛學的指令來移動到 D 槽吧：

```
cd D:/
ls

'$RECYCLE.BIN'/        Game/        practice/                     test/
Config.Msi/           newFolder/   Program/                      testPerform/
Download/             Personal/    Recovery/                     英文/
Front-end-engineer/   pic/        'System Volume Information'/
```

確認一下是你熟悉的那個 D 槽就沒問題了。

接著我們要來建立資料夾，請你用 `mkdir` 來建立：

```bash
mkdir wifi
ls

'$RECYCLE.BIN'/        Game/        practice/                     test/
Config.Msi/           newFolder/   Program/                      testPerform/
Download/             Personal/    Recovery/                     wifi/
Front-end-engineer/   pic/        'System Volume Information'/   英文/
```

這個時候你應該就會看到有 `wifi/` 這個資料夾了。

接著我們一樣用剛剛學的指令來進去 wifi/ 裡面：

```bash
cd wifi
```

輸入完後，你應該會就能在那個紅紅綠綠的最後面看到 `/d/wifi`，這樣就代表你成功進去了，或者你也可以用 `pwd` 這個指令來確認。

接下來是最後一個步驟了，我們要來建立檔案，請你用 `touch` 這個指令 + 空一格 + 檔案名稱：

```bash
touch afu.js
```

這樣子就建好囉！你可以用 `ls` 來確認：

```bash
ls
afu.js
```

### 額外挑戰

這個部分是留給你做延伸，如果 h0w 哥想挑戰的話可以試試看：

用 `echo` 跟 `>` 來寫一些東西到檔案裡：

```bash
echo "h0w 哥好聰明！" > afu.js
```

`echo` 的意思是「輸出我後面打的內容」，`>` 是「把輸出給重新導向」。所以合在一起的意思就是「把 echo 輸出的內容重新導向到 afu.js 這個檔案中。

你可以用 `cat` 這個指令來查看是不是真的寫進去了：

```bash
cat afu.js
h0w 哥好聰明！
```

`cat` 是用來把兩個檔案給拼接用的，不過當我們只輸入一個參數（檔案）的時候，他會把內容給印出來。

（不然你也可以直接打開檔案來確認就好）

這樣子就結束囉！

疑？你想問我不是還有一個 `vim` 指令嗎？

關於這個呀，如果你想學，等你先把上面的東西都搞懂了再來找我吧，ㄅㄅ！
