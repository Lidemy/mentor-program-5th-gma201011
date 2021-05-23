## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

一、<embed></embed>

用來在頁面上播放音樂，屬性如下：

src：音樂檔路徑

width：播放器寬度、height：播放器高度

hidden：隱藏播放器（參數：true、false）

二、<hr />

分隔線，屬性如下：

align：對齊方式

size：高度

width：寬度

color：顏色

noshade：無陰影

三、<marquee></marquee>

令人懷舊的跑馬燈效果 XDD。

***

## 請問什麼是盒模型（box modal）

Box Model 由內而外，分別是**Centent（內容）**、**Padding（內邊距）**、**Border（邊框）**、**Margin（外邊距）** 四個部分所組成。

在 CSS 中 ，box model 是在說網頁元素的設計及佈局，並且允許開發者在其他元素及周圍元素邊框之間的空間進行配置。

除了 Content，Padding、Border 和 Margin 的單位可以設定為像素 px、百分比 % 或 em、rem 等，而撰寫語法可以分為以下幾種：

- 四個值：上、右、下、左
- 三個值：上、左右、下
- 兩個值：上下、左右
- 一個值：上下左右

#### Margin 為 box model 的外邊距，有以下特性：

1.背景永遠透明

2.display 設定為 inline 的狀況下，上下垂直方向沒有效果。

3.可以設置 auto 讓網頁自動計算大小。

4.大小設定 %，是以**父元素的寬度**作為計算標準。

5.大小可以是負值。

6.瀏覽器通常會預留一個 margin 的值，可以自己再把 margin 的值設定為 0。

#### Padding 是 box model 的內邊距，有以下特性：

1.背景會根據元素的背景色而定。

2.可以設置 auto 讓網頁自動計算大小。

3.大小設定 %，是以**父元素的寬度**作為計算標準。

4.不可設定為負值。

5.會受到 box-sizing 設置的影響。（平時預設的 box-sizing 是 content-box，border-box 設置狀態下，不管怎麼調整 padding，整個 box 的寬高都不受影響）

#### border 是 box model 的邊框，有以下特性：

1.會受到 box-sizing 設置的影響(border-box 設置狀態下，box 寬高一樣不受影響)。

2.可以設置 auto 讓網頁自動計算大小。

3.border 的寬度是從 padding 的邊界延伸，以下是 box-sizing 為 border-box 和 content-box ( 預設值 ) 的影響：

content-box：內容 content 寬度不變，padding 和 border 往外延伸。

> Content-box 為寬高設定作用在內容範圍，此時 box 設定的寬跟高，根據 padding 跟border大小還會往上加。

border-box：border 和 padding 會往內延伸，border 的邊界會和原本的 content 邊界 ( 沒有設定 padding 和 border 時 ) 相同。

> Border-box 為寬高設定作用在邊框外緣的範圍內，而此時 box 設定的寬跟高就是整個box的大小。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

> 在 CSS 內可以加入 display 來賦予新的屬性，以改變其原本特性，利用它可以呈現我們想要的排版。

一、常見的 block 元素有 **div、ul、li、p、h1 等**，有以下特性：

1.元素寬度預設會撐到最大，使其占滿整個容器。

2.可以設定長寬、margin、padding，但仍會占滿一整行，下個元素會換行來呈現，並不會並排。

二、常見的 inline 元素有 **span、a、imput、img 等**，有以下特性：

1.元素可在同一行內呈現，圖片或文字均不換行，也不會影響其版面配置。

2.不可設定長寬，排版亦不會隨著 margin、padding 設定改變（字仍在行內，其他行並不會被推開），元素的寬高由它的內容撐開。

三、inline-block 具備以下特性：

1.以 inline 的方式呈現，但同時擁有 block 的屬性。

2.可設定元素的寬高、margin、padding。

3.可水平排列。

>  inline-block 設置會有，明明將 margin 設成 0，但同一排元素仍有空格的現象。解決方法如下：
>
> 1.把</div> 與下一個 <div> 之間的空行刪除，讓兩者貼合
>
> 2.用註解的方式：
>
> </div><!--
>
> --><div>


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

#### static：

沒有設置 position 預設會是 static，即元素出現在常規位置，不會重新定位。

#### relative：

1.會自己針對原本排版的位置改變，可以用top、bottom、left、right 來移動位置。

2.但即使移動仍佔據原本的位置。

3.其他元素的定位不受影響，且元素也可能會重疊。

#### absolute：

1.元素會完全跳脫頁面，跳脫的元素位於該頁面上一層圖層，浮在頁面之上。

2.元素會具有 block 的延展特性。

3.脫離父元素範圍，長寬以內容為基準。

**4.元素會往外層的元素找是否有非 static 的元素作為定位點，若是都沒有，就會以該網頁頁面 body 的左上角為定位點。**

**5.若沒有設定任何偏移屬性的話，元素的位置將遵照原本的位置(position:static)，但依舊會跳脫原本頁面。**

> 但若設置任一邊屬性，例如：top:0，元素將以頁面左上為定位點，將 top 定為 0，但左右仍是原 static 的位置。
>
> 所以，top:0 及 left:0 這樣的設置法，顧及上下及左右任一邊，元素就會緊貼頁面左上角。

6.可設定為負數，就會超出基準元素的範圍。

#### fixed：

fixed 和 absolute 一樣，都是以絕對位置配置元素區塊——不同的是，fixed 是以 viewport 為基準，就算拉動捲軸，區塊仍然會顯示在同一個位置。

> 這種特性多使用在 go top (回到頁面頂端)按鈕或是固定顯示於頁面上方的 header 等。