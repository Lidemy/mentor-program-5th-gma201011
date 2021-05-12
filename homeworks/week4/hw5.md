## 請以自己的話解釋 API 是什麼

API，應用程式介面，就像一個橋樑一樣，連接「想獲取資訊」及「提供資訊」兩端，作為兩者溝通的端點。

拿我們這週的「串 Web Api」舉例：client 端寫明需要獲取的資訊，發送一個 request 給 server 端，藉由 api 的串連，server 再回傳一個 response 給 client 端。

串 api 就是一個交換資訊的過程。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

#### 400 Bad Request

客戶端明顯的錯誤而導致的狀態，例如格式錯誤的 request 或無效的訊息請求，導致伺服器不處理請求。

這是我在這次的作業發現的......串 twitch 的 api 那題時，因為一直沒有輸入正確的 client id 一直給我 400 的狀態碼。

#### 410 Gone

表示所請求的資源不再可用，而與 404 不同的地方在於，410 狀態是在 server **知道** client 會碰到的狀態時出現的。

這一樣是我在串 twitch 的api 時發現的......在打上正確的 client id 後，但我想獲取的是某些 Twitch API v5 的舊資料，就一直出現這個狀態碼。

#### 502 Bad Gateway

發生場景是有時看 ptt 頁面出現的錯誤碼，通常是 server 端壞了，跟使用者比較沒有關係。

通常會顯示在 Web Server 處理 HTTPS 請求服務的時間太長，背後原因可能是 Server 處理過多的請求服務，是低階共享主機服務器常見問題。

> 簡單來說，當你的流量太多，而你所使用的主機太爛時，就會發生「502 Bad Gateway」錯誤。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

Base URL: https://lidemy-restaurant.herokuapp.com/

| 說明             | Method | path            | 參數                    | 範例                 |
| :--------------- | ------ | --------------- | ----------------------- | -------------------- |
| 回傳所有餐廳資料 | GET    | /restaurant     | _limit:限制回傳資料數量 | /restaurant?_limit=5 |
| 回傳單一餐廳資料 | GET    | /restaurant/:id | 無                      | /restaurant/10       |
| 新增餐廳         | POST   | /restaurant     | name: 餐廳名            | 無                   |
| 刪除餐廳         | DELETE | /restaurant/:id | 無                      | 無                   |
| 更改餐廳         | PATCH  | /restaurant/:id | name: 餐廳名            | 無                   |

