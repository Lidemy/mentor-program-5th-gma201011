## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

varchar 欄位的資料長度是可設置的，text 則不能，兩者雖然都有一定的字節限制，但 varchar 的查詢效率較高。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

Cookie 是一種純文字檔案，將使用者的一部分資訊儲存在 Cookie 中，今後這些內容會在瀏覽器發送 Request 時一併送上來，好讓伺服器在之後更加方便使用。

> Cookie 最常見的用途之一是認證身份，例如登入狀態、購物車等，也被應用於追蹤使用者及廣告上。
>
> Cookie 也被用於客戶端的儲存方式，但由於 cookie 會被附加在每一次的 request 之中，可能會影響效能，所以如果是不需要記錄在 server 的資訊，可以改用 storage API。

Server 可以在 HTTP response 中回傳 `Set-Cookie` header 來告訴瀏覽器要設定 cookie，瀏覽器看到便會將 cookie 儲存起來，之後對同一個 domain 發送 HTTP request 的時候，瀏覽器就會將 cookie 帶在 HTTP request 的 `Cookie` header 裡。

Server 設定語法：

`Set-Cookie:[cookie_name]=[cookie_value]`

Request 中的 cookie header：

``Cookie: [cookie1]=[value1]; [cookie2]=[value2]``


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

沒設帳號數量上限、留言上限及任何驗證，使用者可以無限留言，也可以無限制不斷辦新帳號，應該可以用很簡單的 DoS 攻擊手段把系統玩壞。

以下是看影片「想」到的 XD：

1.資料庫的密碼是明碼，沒有用加密或是雜湊保護，一旦資料庫被入侵，使用者的帳戶就任由他人使用了。

2.XSS 問題，Script 標籤可以在留言的送出欄生效，其他使用者可能會被導到釣魚網站去或是藉由拿到 session id 的方式被竊取帳戶資訊。

3.SQL Injection 風險，透過修改 SQL 語句就能竊取資料。