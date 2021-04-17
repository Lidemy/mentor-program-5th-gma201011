## 交作業流程

如果是第一次作業的話請先完成下列步驟：

1.到 GitHub Classroom 產生自己交作業的倉庫。

2.用  `git clone` 指令把作業包下到電腦本地。

***

接著在每次的作業進行，依序完成下列步驟：

1.先開個新的 branch（例如 week x）寫作業，記得用 `git checkout ` 指令切換分支。

2.在指定的地方寫作業。

3.確定作業都完成後，用 `git commit -am` 指令建立新的 commit，在這之前如果有新加入的檔案則需使用 `git add .` 指令加入 stage 區。

4.把這個新的 branch 用 `git push origin` 指令上傳到 GitHub 上自己的倉庫。

5.到自己的 repo 去，發起一個 Pull request，成功後把連結丟到學習系統的繳交作業中（記得先看自我檢討）。

6.等待助教對作業的批改。

***

等到作業批改完，沒有任何問題時請執行以下步驟：

1.本地的 master 還沒有最新版本，從 GitHub pull 下來最新 merge 過後的 master 分支，用 `git pull origin master `  指令。

在這之前，記得先用 `checkout master` 切到 master 分支。

2.接著可以把當週已經 merge 的 branch 刪掉，用 `git branch -d [分支名稱]`。

3.完成整個交作業流程，進行下一週課題。