## 請簡單解釋什麼是 Single Page Application

單頁面應用程式 Single Page Applications，所有使用者的行為都可以在一個頁面上進行。以 web 頁面來說，SPA 會在瀏覽器而不是在伺服器上執行邏輯，且使用 JavaScript 處理資料。

## SPA 的優缺點為何

與多頁面應用相比，有以下優點：

1.大多數資源（如 HTML、CSS 和 JavaScript）不需要每次互動都載入，效能較佳，且 SPA只在使用者請求時重新載入所需的內容，伺服器負擔較輕。

2.寫得好，使用者體驗較佳，因為不需要頻繁點擊其他連結來獲得內容，通過滾動頁面就可以有流暢的瀏覽。

3.SPA允許保持前端和後端獨立，不會相互影響。

缺點：

1.前端會變得較為複雜，有非同步等問題需要考慮。

2.SPA 使用JavaScript執行，它只在使用者互動後才載入內容。因此，當網路爬蟲試圖在搜尋引擎中索引頁面時，SPA看起來就像一個沒有內容的空頁面，所以 SEO 很糟糕。

3.SPA 非常依賴 JavaScript，如果使用者在瀏覽器禁用 JavaScript，就會看不到任何內容。


## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

先前是發出 request 到後端拿資料，由後端去判斷如何渲染畫面，屬於 server-side rendering；這週是經由 Ajax 串接，後端把資料拿出來回傳給前端，前端再用 JavaScript 動態 render（client-side rendring）。