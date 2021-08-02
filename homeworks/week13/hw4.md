## Webpack 是做什麼用的？可以不用它嗎？

由於 Web 前端有許多的預處理工具及框架，Webpack 的作用在於幫助使用者把這些模組與資源打包成一包檔案，並編譯需要預先處理的內容，變成瀏覽器看得懂的東西，讓使用者可以上傳到伺服器。

如果不用它的話，就要自己手動整理被預處理的檔案，如果引入了某些 plugin，必須追蹤檔案的載入順序，而且持續增加 <script> tag，也可能會增加對 server 端的 request，進而導致耗損效能。

（當然可以不用，但老闆叫你用的話，還是必須用）

## gulp 跟 webpack 有什麼不一樣？

gulp 是 task runner，webpack 是 module bundler。

gulp 的 task 是可以被使用者自己定義的，gulp 本身是一個任務管理器；webpack 會經由 loader 的轉換，將處理過後的檔案 bundle 回 webpack，彼此都有一些功能是各自獨有的。

module 的建構也可以封裝成 gulp 的 task，用  gulp 實現相近 webpack 的功能，但是  webpack 的功能更為完善。


## CSS Selector 權重的計算方式為何？

權重值如以下：

**!important：(1, 0, 0, 0, 0)**

```
.box{
    background-color: red;!important
}
```

**inline style attribute：(0, 1, 0, 0, 0)**

```
<body>
	<div style="color:red"></div>
<body>
```

**id：(0, 0, 1, 0, 0)**

**class：(0, 0, 0, 1, 0)**

**pseudo class：class：(0, 0, 0, 1, 0)**

```
:nth-child() 、 :link 、 :hover 、 :focus 等
```

**attribute：(0, 0, 0, 1, 0)**

```
[type:checkbox]、[attr]
```

**element：div, p, ul, ol, li：(0, 0, 0, 0, 1)**

**全站預設值：(0, 0, 0, 0, 0)**

```
*{
    padding: 0
 }
```

