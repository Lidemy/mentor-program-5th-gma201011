```js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 2
obj2.hello() // 2
hello() // undefined
```

***

### obj.inner.hello()

`obj.inner.hello()` 這個 function 會 `console.log(this.value)`，這時的 this 指的是 `obj.inner` ，所以 `console.log(this.value)` ->  `console.log(obj.inner.value)` ，最後輸出 2。

另一種理解：

`[xxx].[function].call()` 可以在 call 裡面加上 function 前的東西，便會是 this 指向的值。

console.log(hello) 會輸出 [Function: hello]，所以我們將 `obj.inner.hello()` 在 hello 前面的 `obj.inner` 放到 call 裡面調用：

`obj.inner.hello.call(obj.inner)`，this 會指向 `obj.inner`，而它最後會執行 `console.log(this.value)`，把前面所指向的 this 代進去看，即為 ``console.log(obj.inner.value)` `，最後結果就會輸出 2。

***

### obj2.hello()

`obj2.hello()` 的 this 會指向 `obj2`，而前面有宣告 `const obj2 = obj.inner`，故`obj2.hello()` -> `obj.inner.hello()` ，就會跟上面的 `obj.inner.hello()` 有一樣的結果，最後輸出 2。

***

### hello()

前面有提到，hello  是個 function，單只用 `call()` 的方式來調用的話：`hello.call()` function 前面並沒有東西可以放進 `call()` 裡面，就等同於 `undefined.hello.call(undefined)` ，輸出的結果也會是 undefined。

> call() 可以傳入不只一個參數，其中第一個參數會改變 this 的值。

如果，想要用 call 的方式得到一樣的值，可以使用 `hello.call(obj2)`，其結果與 `obj2.hello.call(obj2)` 會有一樣的輸出 2。