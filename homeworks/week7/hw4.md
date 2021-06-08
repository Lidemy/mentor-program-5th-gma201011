## 什麼是 DOM？

Document Object Model，文件物件模型。把一份 **HTML** 文件內的各個標籤，包括文字、圖片等等都定義成物件——這是由 W3C 所制定的規則，讓各大瀏覽器按照一定的規範去設計。

DOM 裡面的節點（node）有下列四種：

1.**Document**：指整份文件，HTML 檔的開端會從其開始向下進行。

2.**Element**：文件內的各個標籤，如 <html> 、  <head> 、<body> 等，而 <head> 底下的 <title>，<body> 底下的 <h1>、<div>、<p> 也都屬於 Element。

3.**Text**：指被各個標籤包起來的文字，例如 <p> 標籤裡的文字，就屬於 Text。

4.**Attribute**：用來敘述 **Element** 的相關性質，在 element 裡面的 **class、id** 等都是 。

> 上下層節點的為「父子關係」，上層為 **Parent Node** ，下層為 **Child Node** 。
>
> 同一層節點為「兄弟關係」(Siblings)，彼此間只有 **Previous** 以及 **Next**。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

順序：捕獲（Capture）> 目標（Target）> 冒泡（Bubbling）。

捕獲階段：DOM 的事件會從祖先層 (window) 開始往下尋找目標 (target)，也就是觸發事件的 Element。

目標階段：找到目標時，就會是目標階段。注意當事件傳到 target 本身，沒有分捕獲跟冒泡。

冒泡：最後從觸發事件的 element，沿著子節點一路回傳回去。

## 什麼是 event delegation，為什麼我們需要它？

由於事件的冒泡機制，我們可以使用 event delegation ，把事件監聽掛載在父元素，將子元素的事件統一處理，如此可以省去過多的 **EventListener**，不需要替每個增減的子元素再針對 EventListener 作處理。


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

event.preventDefault：僅取消瀏覽器的預設行為，如新開分頁或是跳轉連結。

event.stopPropagation：讓事件不繼續往下一層節點傳遞，但注意在應用上，同一層級的節點如果有 listener 還是會被執行（不想被執行需要改用 e.stopImmediatePropagation）。

> preventDefault 與 JavaScript 的事件傳遞無關，使用了 preventDefault，之後傳遞下去的事件裡面也會有效果。