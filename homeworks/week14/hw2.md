進度上的關係，這週我是直接看教材文章及老師的影片直接部署完成的。

整個流程分成：遠端主機、LAMP 環境、 phpmyadmin、域名連結四個部分。其實每個流程都會碰到若干問題，我解決的辦法就是把每個文章攻略都開起來，遇到某個環節不行，就換用不同作法試試看，最後試到一套可以完全通關的辦法。

撇除那種比較蠢的錯誤（指令打錯、遺漏某些流程），卡我最久的是用 FileZilla 上傳檔案的部分，用金鑰檔案的方式登入會一直出現這個錯誤訊息：

> FATAL ERROR： No supported authentication methods available (server sent publickey) 

後來是參考[這篇文章](http://www.jysblog.com/coding/web/aws-%E9%80%8F%E9%81%8E-filezilla-%E4%BD%BF%E7%94%A8-key-pairs-%E7%99%BB%E5%85%A5-aws-ec2-%E5%AD%98%E5%8F%96%E6%AA%94%E6%A1%88/)的辦法，先設定金鑰檔案的路徑，再用一般的登入形式，讓密碼空白就有辦法連上去做資料存取了。

而域名連結及設定子網域的部分，我是參考[這篇文章](https://nicolakacha.coderbridge.io/2020/09/16/launch-website/)，不過是跟老師一樣用 Cloudflare 設置 DNS，不過因為一開始忘記在 gandi 那裡去把 Cloudflare 的名稱伺服器加入允許存取，所以弄了半天怎麼連都連不上 XD。

總之，儘管很多地方不是很懂為什麼這麼做，可能只大致知道說某一個步驟是為了什麼，但最後總歸是成功部署了。

