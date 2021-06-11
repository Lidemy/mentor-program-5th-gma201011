## 什麼是 Ajax？

A：Asynchronous（非同步）

Ja：JavaScript（程式語言）

X：XML（資料格式）

> 任何跟伺服器非同步的交換資料技術都可以稱為是 Ajax。

比起同步請求，非同步的 request 好處在於客戶端對伺服器送出 request 之後，不需要等待結果，仍可以繼續處理其他事情，甚至送出其他 request，在傳回 response 之後就會把資料送進當下的頁面及應用中。

Ajax 技術的出現，讓瀏覽器可以向 Server 請求資料而不需費時等待。

## 用 Ajax 與我們用表單送出資料的差別在哪？

1.透過表單送出資料，只是帶上一個參數，發一個 request 到新的頁面去，並沒有涉及到 JavaScript。

2.每次需要新的資料時， Ajax 由於是用 JavaScript 取得資料，因此可以動態產生新的資料，但用表單送出資料的方式卻必須要換一個頁面才能取得新的資料。

如果使用者只需要在「部分」頁面做改變，Ajax 的技術就可以省去換整個頁面的動作。

## JSONP 是什麼？

> JSON with Padding，是資料格式 JSON 的一種「使用模式」，可以跨網域獲取資料，是解決跨網域限制的方法之一，不受同源政策影響。原理是利用 `<script>` 標籤可以跨網域請求的特性。

以下是 JSONP 的使用的範例流程：

1.JavaScript 建立 `<script>` 標籤元素，指定好 `src` 指向一個跨網域的網址。

2.伺服器接收到請求後會返回一個 JavaScript 檔案，該檔案中會直接執行一個 JavaScript function，而這個 function 的傳入參數就是使用者請求的資料結果，參數的格式通常是 JSON。

3.最後在 callback function 中，使用者就可以對 server 返回的資料進行其他操作。

## 要如何存取跨網域的 API？

除了上述的 JSONP 以外，要存取跨網域的 API，只要遵守 CORS 規範（Cross-Origin Resource Sharin），即可跨來源資源共享。

規範中規定，Server 端必須在 Response 的 Header 裡面加上`Access-Control-Allow-Origin`，而當瀏覽器收到 Response 之後，檢查到`Access-Control-Allow-Origin` 包含現在這個發起 Request 的 Origin ，就會讓程式收到 Response。

例如：`Access-Control-Allow-Origin: *`，意思是任何一個 Origin 都接受，瀏覽器收到 Response 比對 Origin 符合 * 的規則，即可允許接受跨來源請求的回應。


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

第四週使用的是 node.js 的執行環境，並不會受到瀏覽器有的同源政策及  CORS 規範影響，後者是為了安全性的考量，所以在瀏覽器加入了這些規範及限制。