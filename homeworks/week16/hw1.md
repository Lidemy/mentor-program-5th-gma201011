```
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

依序會輸出 1、3、5、2、4。

這段程式碼會有以下流程：

1. console.log(1) 進到 call stack
2. 執行，印出 1 之後從 stack 移除
3. `setTimeout(() => {console.log(2)}, 0)` 進到 call stack， setTimeout 這個 Web API 會讓瀏覽器去設置一個 timer
4. setTimeout 倒數時間設定為 0 後，等到這個瀏覽器提供的 timer 倒數完後，將 `() => {console.log(2)}` 放入 Callback Queue，之後 setTimeout 就會從 call stack 中 pop
5. console.log(3) 進到 call stack
6. 執行，印出 3 之後從 stack 移除
7. `setTimeout(() => {console.log(4)}, 0)` 進到 call stack， setTimeout 這個 Web API 會讓瀏覽器去設置一個 timer
8. setTimeout 倒數時間設定為 0 後，等到這個瀏覽器提供的 timer 倒數完後，將 `() => {console.log(4)}` 放入 Callback Queue，之後 setTimeout 就會從 call stack 中 pop
9. console.log(5) 進到 call stack
10. 執行，印出 5 之後從 stack 移除
11. 由於 stack 清空，event loop 作用，將步驟 4 放入 Callback Queue 的`() => {console.log(2)}` 放入 call stack
12. 執行，印出 2 之後 pop
13. 由於 stack 清空，event loop 作用，將步驟 8 放入  Callback Queue 的`() => {console.log(4)}` 放入 call stack
14. 執行，印出 4 之後 pop



