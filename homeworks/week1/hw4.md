## 跟你朋友介紹 Git

Git 是一個分散式版本的版本控制系統，可以把你寫過每一版本檔案的歷史紀錄保存起來，因此可以把編輯過的檔案復原到任一版本，也可以顯示每一個版本編輯過的差異。

***

### 建立 Git 基本流程

接下來我們一步一步了解建立一個 Git 的流程：

1.建一個你要存放所有工作檔案的資料夾，用 `git init` 指令這個工作資料夾可以被 git 控制。

當執行完第一步流程後，以後都可以用 `git status` 來確認 git 的狀態。

2.把你的工作檔案丟到資料夾裡面後，可以用 `touch .gitignore`  建立一個忽略清單，接著用 `vim .gitignore` 來輸入要被忽略的檔案名稱，而不需要加入版本控制的檔案，可能會是一些系統產生或是使用者個人的檔案。

這步驟可以隨著以後發現有不需要加入版本控制的檔案隨時執行，只是記得這個`.gitignore`檔案第一次新增也要用接下來說的 `git add` 指令加入 stage 區。

3.其他需要加入版本控制的檔案，用 `git add [工作檔名]` 個別加入 stage 區，

或是  `git add .` 一鍵把所有檔案加入也可以。

4.在工作檔案完成到一個階段時，可以用 `git commit -m [版本名]` 來提交一個新的版本。

5.而已經加入過版本控制的舊有檔案，可以直接用 `git commit -am [版本名] `，`-a` 會把已經修改過的檔案加入 stage 區（注意新的檔案不會），接著 commit 提交一個新版本。

> 補充一下 git 四種不同的檔案狀態：
>
> 1.未追蹤（untracked files）：版本提交後才加進來的檔案，沒有被 git 追蹤。
>
> 2.已更改（changes not staged for commit）：已提交版本後，又再次修改，檔案會被丟回工作目錄（not staged）。
>
> 3.等待提交（changes to be commited）：執行 `git add` 後，會被放在暫存區（stage），這些檔案就是「等待提交」狀態。
>
> 4.已提交（committed）：在暫存區（stage）的檔案執行完 `git commit` 後，檔案會放在儲存區（Repo），便是「已提交」狀態。

複習一下，凡是新增的檔案，一進來會被 git 列為 Untracked files，都必須先用  `git add` 指令加入 stage 區，才能用 `git commit` 提交版本。

***

### git 的重要觀念 **branch 分支**：

假設我們把上述的流程大致上執行過一次，假設跑出來兩個 commit 叫做 A、B，可能都是在一個叫做 master 或是 main 的主分支裡進行。

這時候，除了主分支以外，可以新開一個分支，而在新分支裡面的進行作業，不會影響到主分支裡的檔案。

例如：開一個新的分支「new-feat」，而這個新的 new-feat 分支可以讓使用者單獨作業外，也可以併進去原本的主分支 master 裡。

***

### 常用的 branch 指令

`git branch -v`：可以藉此觀看現在有哪些分支（初始，master 代表最主要的分支）。

`git branch [分支名稱]`：新增分支。

`git branch -d [分支名稱]`：刪除該分支。

`git checkout [分支名稱]`：切換到該分支。

> `git checkout -b [分支名稱]`：可以直接新增分支，又會直接跳過去。

`git merge [分支名稱]`：把這分支併到當前所處分支。

> EX：假設當前在 master 分支，用 `git merge 123` 指令，那 branch 123 將會併進去 master 裡面。

***

### branch 的合併（merge）

以下用一個簡單的流程來介紹一下分支的合併（merge）：

1.master 分支有兩個 commit A 與 B，所以是這樣：

Commit A < Commit B

​                             |

​                       *master 

2.我們要開一個新的分支「new-feat」，用 `git branch new-feat` ，git 就會變成這樣：

​                      new-feat

​                             |

Commit A < Commit B

​                             |

​                      *master

3.我們雖然建了新的 branch，但當前還在 master 分支（上面有個 *），所以我們要跳到新的 new-feat 分支進行作業。

所以輸入 `git checkout new-feat` 切換到新的分支：

​                    * new-feat

​                             |

Commit A < Commit B

​                             |

​                        master

4.我們在 new-feat 分支裡面，寫了新內容 ，提交了一個新的 commit 叫做 C，new-feat 這個分支會變成這樣：

​                                          * new-feat

​                                                   |

Commit A < Commit B < Commit C

​                             |

​                        master

5.現在我們 new-feat 的分支完成了，想要把它併回去 master 分支，所以先用 `git checkout master` 回到 master 分支：

​                                            new-feat

​                                                   |

Commit A < Commit B < Commit C

​                             |

​                      *master

6.接著用 `git merge new-feat` 把 new-feat 併進去：

​                                            new-feat

​                                                   |

Commit A < Commit B < Commit C < Commit C（merge）

​                                                                         |

​                                                                  *master

沒有衝突的話，git 會直接合併，並且給予一個新的 Commit。

7..最後，我們就可以把 new-feat 這個分支用 `git branch -d new-feat` 刪除，git 的狀態就會變成這樣：



Commit A < Commit B < Commit C < Commit C（merge）

​                                                                         |

​                                                                  *master

> 注意 Commit C（merge）已經是另一個與上一個 Commit C 不同的 Commit 了，每個 Commit 都是獨一部二的。

以上就是 merge 的過程及指令。

***

### 發生 conflict 衝突

什麼樣子的情況會是 Conflict 呢？讓我們回到兩個 branch 的狀態：

​                      new-feat

​                             |

Commit A < Commit B

​                             |

​                      *master

然後我們各自在兩個 branch 新增了不同的內容，並提交了不同版本的 commit C和 D：

​                                           new-feat

​                                                  |

​                                          Commit C

​                                       /

Commit A < Commit B

​                                       \

​                                          Commit D

​                                                 |

​                                           *master

很不幸的，Commit C 跟 D 裡面，存在著同一個檔案 123.txt，但內容被修改的不一樣，這樣 git 就會不知道哪個才應該是最新的，應該保留哪一個，這就是 conflict。

這時要**手動**去將衝突的地方修改，我們必須去查看 Commit D 裡面的 123.txt，git 會提示使用者哪些地方衝突。

而當使用者解開衝突後，自行再去建立一個新的 Commit，整個過程就算結束了。

***

### GitHub 使用

GitHub 是一個公開的線上平台，是一個「透過 Git 進行版本控制」的「原始碼代管服務平台」，也可以說是一個各種開源軟體(專案)的聚集地。

我們可以把電腦的 Git 推到 Github 上，跟其他人共享，也可以把別人的專案拉到自己的 GitHub 或本地。

GitHub 的使用有兩個最重要的概念：

1.push：把本地的 git 推上去GitHub。

2.pull：把 GitHub 上的 git 拉到本地。

***

GitHub 相關指令及用法

`git push origin [branch-name]` ：用此來將新的分支放上 Github。

> 要將不同 branch push 上去的話，要先在本地用 checkout 切換到那個 branch。

`git pull origin [branch-name]` ：用來將人上傳到 Github 上的東西下到自己電腦的中。

可以使用 Github 上面的 `folk` 來複製別人的專案，用此來變成自己可編輯的專案。

`git clone [網址]` ：可以用來將 Github 上面的專案，複製到本地供自己編輯。

可以運用 Github 上的 `Pull requests` 來做線上 merge 的動作，如果兩個 branch 之間沒有 conflict 的話就可以直接合併。

***

### GitHub 共同協作及注意事項

1.上傳專案前，本地的專案版本比 GitHub 上面還舊，跳出錯誤訊息。

> 解決辦法：先將新的版本 pull 到本地，再行編輯更新的版本。

2. GitHub 的 workflow：

新開 branch > 發 Pull Requests > 工程師共同 review 無問題 > 合併 merge > 把原本的 branch 刪除