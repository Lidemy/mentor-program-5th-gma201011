## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

DNS（Domain Name System），網域名稱系統，用來管理及辨識網域，DNS 作為一個將域名和 IP 位址相互對映的一個分散式資料庫，能夠把 IP 轉為網域名稱或把網域名轉回 IP，能夠使人更方便地存取網際網路。

2009年12月，Google 宣布啟動 Google Public DNS，聲稱為了效能及安全， 只有使用者的IP（24小時後刪除）、ISP和地理位置資訊（永久儲存）會被伺服器留存。

Google 藉此搜集了大量使用者資料，能更精準的對使用者投放廣告；而對於一般大眾來說，Google DNS 累積了大量的緩存數據，解析速度快，能夠能加快網路瀏覽速度。

## 什麼是資料庫的 lock？為什麼我們需要 lock？

> 當多個使用者併發地存取資料時，在資料庫中就會產生多個事務同時存取同一資料的情況。若對併發操作不加控制就可能會讀取和儲存不正確的資料，破壞資料庫的一致性。
>
> lock 是在執行多執行緒時，用於強行限制資源訪問的同步機制，在對某個資料物件進行操作前，先向系統發出請求，對其加鎖在該事務釋放鎖之前，其他的事務不能對此資料物件進行更新操作。

舉一個 Transaction 的例子來說：

```PHP
$conn -> autocommit(FALSE);
$conn -> begin_transaction();
$conn -> query("SELECT amount FROM products WHERE id = 1 FOR UPDATE");
$conn -> commit();
```

在上述的 transaction 中，使用 SELECT... FOR UPDATE 就是一種 lock 的應用，第三行程式碼意味著：選擇 products 這個 table 裡面，id = 1 那個 row 的 amount 欄位，符合這一搜索條件的 row 會被鎖起來，跑到這行程式碼，會讓先行的執行端先跑完，之後才會輪到下一個提出執行的請求（排隊一個一個來的概念 XD）。

## NoSQL 跟 SQL 的差別在哪裡？

> SQL 用 table 儲存資料，有較嚴格的資料模板；NoSQL 則以類似 JSON 的格式儲存資料，較彈性且寬容。

| Name | Type | Length |
| ---- | ---- | ------ |
| A    | B    | 1      |
| C    | D    | 2      |

SQL 資料高度架構化，容易進行複雜的搜尋，為現行較常使用的資料庫形式。

在 SQL database 中，若未在 schema 中事先定義好 tables 和 field types 等資訊就無法插入資料，最終其 table 無法使用同一張資料表紀錄欄位不同的資料，或是在欄位值應該是數字的地方填入字串。

```
{
 Name："E",
 Type：123
}
```

```
{
 Name："F",
 Type："G",
 Length:3,
 Year:2021
}
```

而 NoSQL 中我們可以儲存任何資料，自由添加欄位，並在欄位隨意輸入數字或字串，較利於擴充。

***

SQL 語法適用於所有關聯式資料庫（MySQL、Oracle、MS SQL等），雖然一些特定的函式有些差異，但大致上差不多；NoSQL 則為非關聯式資料庫，沒有標準語言。且 SQL 的查詢中提供了 JOIN 語法，可以藉由此語法取得多個 table 的相關資料；NoSQL 則沒有類似 JOIN 的語法。

## 資料庫的 ACID 是什麼？

在關聯式資料庫 裡，一個 Transaction 是指用戶端傳送給資料庫引擎所要執行的動作．這些動作通常是以 SQL 語法組成，然後再由資料庫引擎來解析語法來執行。

為保證 Transaction 的正確，資料庫會符合以下四個特性：

- **Atomicity (原子性)** : 資料操作不能只有部分完成。一次的 transaction 只能有兩種結果：成功或失敗。
- **Consistency (一致性)**：transaction 完成前後，資料都必須永遠符合 schema 的規範，保持資料與資料庫的一致性。
- **Isolation (隔離性)**：資料庫允許多個 transactions 同時對其資料進行操作，但也同時確保這些 transaction 的交叉執行，不會導致數據的不一致。
- **Durability (耐久性)**：transaction 完成後，對資料的操作就是永久的，即便系統故障也不會丟失。