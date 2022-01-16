## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

### dl dt dd

很久以前我在書上學到的一個標籤，它也是用來代表「列表清單」。我自己是理解為 `<ul>` 跟 `<ol>` 的延伸標籤，因為它表示的內容又更詳細一些：

- `<dl>` (description list) 代表一個「敘述清單」
- `<dt>` (description title) 代表這個敘述清單的「標題」
- `<dd>` (description detail) 代表這個敘述清單的「內容」

它的主要特色是有「自動縮排」的效果，所以早期會被拿來排版，但隨著 CSS 一天比一天還要強大，如今這個標籤好像也逐漸沒落了。


### picture

在製作 RWD 的時可能會針對不同寬度的裝置來提供不同尺寸的圖片。除了用 `media query` 或 JavaScript 之外，還可以利用 `<picture>` 來實現：

```html
<picture>
  <!-- 768px 以上要顯示的圖片 -->
  <source
    srcset="images/desktop/image-transform.jpg"
    media="(min-width: 760px)"
  />
  <!-- 不支援 picture 標籤，或不符合上面的條件時套用 -->
  <img src="images/mobile/image-transform.jpg" />
</picture>
```

瀏覽器會先從 `<source>` 找出匹配圖片，如果沒有（或瀏覽器不支援 `<picture>`）就會使用 `<img>` 裡的圖片。

備註：

- `<source>` 可以有多個
- `<img>` 一定要寫在最後面，因為出現在 `<img>` 後的 `<source>` 都會被省略


### noscript

可以用來顯示「不支援 JavaScript」的替代內容：

```html
<script>
document.write("Hello World!")
</script>
<noscript>Your browser does not support JavaScript!</noscript>
```

根據 [W3C](https://www.w3schools.com/tags/tag_noscript.asp) 上的說明，`<noscript>` 可以放在 `<head>` 或 `<body>` 裡，不過要注意的是當 `<noscript>` 放在 `<head>` 裡時，內容只能包含 &lt;link&gt;、&lt;style&gt; 和 &lt;meta&gt; 這幾個標籤。

## 請問什麼是盒模型（box modal）

每個 HTML 元素都可以當成是一個盒子，盒子是由以下四點來構成：

- content
- padding
- border
- margin 

在預設情況下設定的 `width` 是對 content-box 來做設定，所以如果新增了 `padding` 或 `border`，這個元素的寬度就不會是你原本設定的那個 `width`：

```css
/* 實際寬度 = 200 + 20 + 10 = 230 */
.box {
  width: 200px;
  padding: 10px;
  border: 5px;
}
```

但是這樣很不直覺，所以後來延伸出了 `box-sizing` 這個屬性，用來改變 box-model 的計算方式：

```css
.box {
  /* 預設的計算方式，寬度 = content-box */
  box-sizing: content-box;
  /* 寬度會包含 border 與 padding */
  box-sizing: border-box;
}
```

所以在大部分專案裡都會直接在一開始就用：

```css
*, *::before ,*::after {
  box-sizing: border-box
}
```

來調整盒子的計算方式。

這樣確實很方便，不過也因為盲目的使用，導致有些人不是很懂這個屬性是幹嘛用的。




## 請問 display: inline, block 跟 inline-block 的差別是什麼？


### inline 特點

- 不能設定寬高
- 只有上下 margin 有效
- padding 四邊都有效，但上下不影響旁邊元素，不過能撐開元素的高度。

### inline-block 特點

- 可以設定寬高
- margin padding 都有效
- 跟 block 最大的差別是「可以跟別人排在一起」


### block 特點

- 可以設定寬高
- margin padding 都有效
- 最大的特點是就算旁邊還有剩餘空間，還是會自己「佔滿一整排」


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？


### static

預設的排版方式。是 inline 或 inline-block 就排再一起；是 block 就自己站一排。

比較常用的場景是 RWD，可能原本在手機的時候是 absolute，但桌機不要，這時候就會把它設回 static。

### relative

跟 static 很像，只是設成 relative 後可以用「top、left、bottom、right」來從「原本的位置」來做偏移。順道一提在 static 時用這些屬性是完全沒效果的，我想也許是為了跟 relative 劃出區分吧。

然而最常用的場景是搭配 absolute 來使用，因為很多時候只是需要一個「參考點」，而 relative 是唯一不會脫離排版流的一種定位方式（不算 static）。換句話說就是「最不容易跑版」的一種定位方式，所以就逐漸變成一種寫 absolute 的起手式了。

不過要特別注意這不代表 absolute **一定要搭配 relative** 才可以使用。

### absolute

在 relative 時只能根據「原本的位置」來做偏移，absolute 則是讓你可以自己選擇「參考位置」。設定 absolute 的元素會往上找到「第一個非 static 的元素」來當作參考位置，如果都沒有就會以「視窗（viewport）」來當作參考。 

另外要注意的是設定 absolute 的元素會**脫離原本的排版流**，所以旁邊的元素會自動填補空間。

備註：這邊補充一下，當找不到參考點時會定位到的是「視窗」，不是 `<body>` 也不是 `<html>`，真的就是視窗。不信的話你試著去改 `<body>` 或 `<html>` 的寬高就會知道我在說什麼了。

舉個例子：

```html
<div class="reference">
  <div class="absolute"></div>
</div>
```

我要讓 `absolute` 以 `reference` 來當作參考點：

```css
.reference {
  /*
    以下這些全部都有效，
    最常犯的錯誤是以為「只有 relative」才有效 
  */
  position: relative;
  position: fixed;
  position: sticky;
}
.absolute {
  position: absolute;
}
```

常應用的場景是廣告視窗右上角的那個「叉叉」。

### fixed

跟 absolute 類似，只是這邊的參考點會直接設為「視窗」，你沒辦法改。也因為是參考到視窗，所以特性是不管怎麼拖滾軸它都會在原本的位置（螢幕的寬高是固定的而且位置不變）。

另外 fixed 跟 absolute 一樣會脫離排版流，所以使用上要多注意。

比較常應用的場景是「側邊導覽列」或「至頂導覽列」。


