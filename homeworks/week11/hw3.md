## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

加密（Encrypt），加密跟解密都必須要有金鑰（Key）才能進行，常見加密法有下列幾種：

**對稱型加密**：如 AES（Advanced Encryption Standard）、DES（Data Encryption Standard），意指加密解密都是同一個 key。優點是，計算量小、加密速度快；缺點是傳送方和接收方必須商定好 key，如果 key 洩露，加密資訊一樣會被竊取。

**非對稱型加密**：如 RSA ，一對金鑰由公鑰（Public Key）和私鑰（Private Key）組成（可以使用很多對金鑰）。私鑰解密公鑰加密資料，公鑰解密私鑰加密資料（私鑰公鑰只能由彼此互相加密解密）。缺點是，加密速度較慢；優點為安全性大幅提高。

雜湊（Hashing），把字元丟進去某個公式計算，計算公式稱為雜湊函數（Hash function），最後得出一個值或字串。常見的雜湊演算法有MD-5（不夠安全）、SHA-256、RIPEMD-160 等，雜湊會有以下特性：

1.雜湊函式**不可逆**，沒有辦法從結果去逆推回原本的內容。

2.輸出的長度不受原本長度的影響，經過雜湊後，會得到一樣長度的雜湊值。

3.有可能「不同的輸入」卻有「相同的雜湊值」，如果有這種情形，稱為碰撞（collision）。

之所以密碼要雜湊後才存入資料庫，是因為**即使資料庫被竊取，竊取者知道經雜湊函數得出的值，也難以輕易解出原碼；而本人登入時，密碼的驗證是對輸入的密碼做雜湊，去比對是不是符合儲存的雜湊值**。

## `include`、`require`、`include_once`、`require_once` 的差別

include 及 require 都會將指定的檔案讀入執行，執行的時候會擁有和原始檔中呼叫的位置相同的變數範圍。

> 主要差別在於：
>
> require 在找不到檔案時會觸發 Fatal Error 進而使程式執行停止。
>
> include 在找不到檔案時只會觸發 Warning 所以不對程式有任何影響，除非程式有重大錯誤。譬如：重覆載入檔案。

兩者加入 once 的差別在於，加了之後會先判斷要匯入的檔案是不是已經在該程式中的其它地方被匯入過了，如果有的話就不會再次重複匯入該檔案，確保只被包含一次以避免函數重定義，變量重新賦值等問題。

> 這項功能有時候是很重要的，因為 PHP 不允許相同名稱的函式被重複宣告第二次。

## 請說明 SQL Injection 的攻擊原理以及防範方法

SQL Injection 是一種駭客常用的攻擊概念，透過注入惡意的程式碼的方式，破壞原本程式碼的語意，來達到攻擊的效果。

例如，正常使用者輸入密碼的欄位，在送出密碼時，程式碼會是這樣：

``SELECT user_data FROM user_table WHERE password = [密碼欄位]``

上述結果如果是 true，也就是輸入了正確密碼，那麼回傳該使用者資訊的頁面。

但如果沒有防範，在欄位輸入` XXXX OR '1' = '1' ` 來拼接字串，整串程式碼就會變成這樣：

``SELECT user_data FROM user_table WHERE password = XXXX OR '1' = '1'``

上述結果也是會 true，也就是說，沒有輸入正確的密碼，也會回傳該使用者資訊的頁面。

> 防範方法：prepared statement，讓被輸入的指令，被解釋成為字串。使用時，資料庫伺服器不會把設參數的地方當作SQL指令的一部分來處理，而是先在資料庫編譯完後，再將參數套用並執行。

```php
$username = 'name'; //自訂變數

$sql = "SELECT user_data WHERE username = ?";

$stmt = $conn -> prepare($sql);

$stmt -> bind_param('s', $username);

$result = $stmt -> execute();
```

##  請說明 XSS 的攻擊原理以及防範方法

XSS（Cross-Site Scripting），主要是利用在輸入欄位輸入 JS 的 script tag 來造成攻擊。例如：把 JS 儲存在後端資料庫——留言板中輸入 `<script>alert('Hello!')</script>`，所有使用者只要查看留言，瀏覽器便有可能直接執行這段 script，跳出 alert。

可以利用 `htmlspecialchars` 來防範，將所有使用者可輸入欄位的輸出，都用 htmlspecialchars($str, ENT_QUOTES) 處理，如此一來，在輸出時經過編碼後瀏覽器就會把它當作純文字，而不是可以執行的程式。

## 請說明 CSRF 的攻擊原理以及防範方法

CSRF（Cross Site Request Forgery），利用瀏覽器的 cookie 機制，只要發送 request 給某個網域，就會把關聯的 cookie 一起帶上去，CSRF 就是在不同的 domain 底下偽造出「使用者本人發出的 request」，因而讓瀏覽器以為是使用者本人的操作來製造攻擊。

常見的防禦方式有以下幾種：

**一、檢查 request header referer**

檢查 request 的 header 裡面的 referer 欄位，不過必須注意三點：

1.有些瀏覽器可能不會帶 referer。

2.使用者關閉自動帶 referer 的功能，server 就會擋掉真的使用者發出的 request。

3.判定是不是合法 domain 的程式碼是有可能被用各種方式破解的。

**二、加上圖形驗證機制或簡訊驗證碼**

最完善的解法，攻擊者並不知道圖形驗證碼的答案是什麼就無法進行 CSRF 攻擊。但如果使用者只是進行較為普通簡單的操作（如編輯刪除某些資料），會造成使用者體驗不佳。

**三、加上 CSRF Token**

加上一個 hidden 的欄位，叫做`csrftoken`，這裡面填的值由 server 隨機產生，並且存在 server 的 session 中，確保有些資訊只有使用者知道，submit 之後，server 比對表單中的`csrftoken`與自己 session 裡面存的是不是一樣的即可。

但如果 server 支持 cross origin 的 request，攻擊者就可以在他的頁面發起一個 request，順利拿到這個 csrf token 並且進行攻擊。

（許多 framework 如 django 內建都有提供 CSRF Token 的機制）

**四、Double Submit Cookie**

由 server 隨機產生 csrf token，但不把值寫在 session 中，也就是說 server 不需要儲存東西；同時，也讓 client side 設定一個名叫 csrf token 的 cookie，值也是同一組 token。

防禦的關鍵在於，CSRF 攻擊的 request 與使用者本人發出的 request ，前者來自不同的 domain，後者來自相同的 domain，所以 server 只要比對 cookie 內的 csrf token 與 server 產生的另一組 csrf token，檢查是否有值並且相等，就知道是不是使用者發的了。

由於瀏覽器，攻擊者並不能在他的 domain 下，針對別的網址設定 cookie，發上來 request 的 cookie 自然就沒有 csrftoken。

但攻擊者如果掌握了使用者底下任何一個 subdomain，就可以幫使用者寫 cookie，並且順利攻擊。

**五、SameSite Cookie**（目前只有 Chrome 支援）

CSRF，是因為瀏覽器的機制所導致的，SameSite Cookie 即為從瀏覽器機制下手的防禦手段——在原本設置 Cookie 的 header 多加一個 `SameSite` 就可以設置，有 Lax 跟 Strict 兩種模式：

默認的 `Strict` 模式，當你加上 `SameSite` 這個關鍵字之後，就代表說這個 cookie 只允許 same site 使用，不應該在任何的 cross site request 被加上去。

缺點是，當使用者從 Google 搜尋結果或者是朋友轉貼的連結點進某個網站時，因為不會帶 cookie 的關係變成是登出狀態，造成使用者體驗不佳。

而 Lax 模式放寬了一些限制，例如說`<a>`, `<link rel="prerender">`, `<form method="GET">` 這些都還是會帶上 cookie。但是 POST 方法 的 form，或是只要是 POST, PUT, DELETE 這些方法，就不會帶上 cookie。

缺點是，如此就沒辦法擋掉 GET 形式的 CSRF。