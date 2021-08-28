```
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

程式碼會輸出：

i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5

***

程式碼會依照下列順序執行：

1. for(var i=0; i<5; i++)，宣告 var i = 0，符合 i < 5，故開始執行 for loop 裡面的程式碼
2. console.log('i: ' + i)，此時根據上述所宣告的 i = 0，故輸出 i: 0
3. `setTimeout(() => {console.log(i)}, i * 1000)` 進到 call stack， setTimeout 這個 Web API 會讓瀏覽器去設置一個 timer
4. setTimeout 倒數時間設定為 i * 1000，等到這個瀏覽器提供的 timer 倒數完後，把裡面的 callback function `() => {console.log(i)}` 排進 Callback Queue，之後 setTimeout 就會從 call stack 中 pop
5. for loop 內的內容執行完畢，執行 i ++，此時 i = 1
6. i = 1，符合 i < 5，故進入下一圈 for loop

**省略接下來的程式碼，直至 i = 5，跳脫 for loop 為止；此時，依序會輸出：**

i: 1
i: 2
i: 3
i: 4

**而在 Callback Queue 裡面，會有五個尚未執行的 callback function，設定的倒數計時也分別會是：**

0 * 1000 ms

1 * 1000 ms

2 * 1000 ms

3 * 1000 ms

4 * 1000 ms

5 * 1000 ms

此時  main thread 已經結束，stack 清空，event loop 開始作用，將  Callback Queue 裡面的 cb 放至 call stack 中執行。

注意到 setTimeout 本身是有最小延遲時間的，就算是設置 `setTimeout(() => {console.log(i)}, 0)`，也不會真正與最前面的五筆輸出「同步」印出，第一組 `setTimeout(() => {console.log(i)}, 0 * 1000)`只會「看似」會緊隨在 `i: 4` 這組印出後輸出。

且實際上 `setTimeout` cb 執行的 0 毫秒不一定真的是 0 毫秒，會依照程式複雜度影響實際執行時間，也有可能是 task queue 的佇列程式影響執行時間

最後，for loop 最後一次執行的結果 i = 5，`() => {console.log(i)` 因為 scope chain 往上找到 i 的值是 5 ，五次執行輸出的結果就都是 5 。

