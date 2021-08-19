```js
var a = 1
function fn(){
  console.log(a) // undefined
  var a = 5
  console.log(a) // 5
  a++
  var a
  fn2()
  console.log(a) // 20
  function fn2(){
    console.log(a) // 6
    a = 20
    b = 100
  }
}
fn()
console.log(a) // 1
a = 10
console.log(a) // 10
console.log(b) // 100
```

依序會輸出：

undefined
5
6
20
1
10
100

***

程式碼會以下列方式執行：

1. 宣告變數 var a = 1
2. 宣告 function fn()

```
//Global Variable Object(VO)

fn VO: {
  a: undefined
  fn2: function
}

Global EC
Global VO: {
  a: 1
  fn: function
}
```

3. 執行 fn()

**以下進入 fn()：**

4. console.log(a)，先前沒有宣告變數 a，但下方的 var a = 5 會被 hoisting，因此等同於宣告了變數 a，**但並未賦值**，故會輸出 undefined

> 在 JavaScript 中，不管你在函數中的哪一行用 var 宣告變數，一律視為在函數的第一行宣告。

5. var a = 5，此時 a = 5

> var 有個神奇特性，可以重複宣告，當使用 var 宣告一個已經被宣告過的 var 變數時，先前的宣告會被覆蓋過去。

6. console.log(a)，根據上述變數宣告 a = 5，故輸出 5
7. a++，a = 6
8. var a，宣告變數 a，但並未賦值，此時 a 仍未改變值，a = 6
9. 執行 fn2()，即使上述程式碼沒有宣告 fn2()，但往下找會發現 fn2() 被宣告了，所以 fn2() 可以直接被調用

> function 放在最前方的函式陳述式，整個函式都會被提升到最前方，所以在函式前方直接調用方法也可以運行。

```js
fn EC
fn VO: {
  a: 6
  fn2: function
}

Global EC
Global VO: {
  a: 1
  fn: function
}
```

**以下進入 fn2()：**

10. console.log(a)，由於在 fn2() 中，沒有找到變數 a 的宣告，所以會向上一層 fn() 找尋變數 a，而在執行 fn2() 前，a = 6，故會輸出 6
11. 賦值，a = 20
12. b = 100

此時，在 fn2() 發現 b 從未被宣告，向上一層 fn() 找尋 b 是否有被宣告，而 fn() 也沒有變數 b 的宣告，再向上一層到全域環境去找，仍然沒有找到變數 b 的宣告

所以便會直接宣告一個全域變數 var b，而在這行程式碼給 b 賦值，故 b = 100

> 注意，若在此之前便使用變數 b，會產生 ERROR。

```
fn2 EC
fn2 VO: {

}

fn EC
fn VO: {
  a: 20
  fn2: function
}

Global EC
Global VO: {
  a: 1
  fn: function
  b: 200
}
```

**離開 fn2()，以下繼續執行 fn()：**

13. console.log(a)，由於上一行程式碼調用了 fn2()，在步驟 11 對 a 賦值 20，此時 a 的值為 20，故輸出 20

**離開 fn()，以下繼續執行外部程式碼：**

14. console.log(a)，由於已經離開 fn()，向上找到全域變數，也就是步驟 1 的 var a = 1，故輸出 1
15. 賦值，a = 10
16. console.log(a)，根據上述賦予 a 的值，a = 10，故輸出 10
17. console.log(b)，在步驟 12 時，生成了一個全域變數 b，並賦值 b = 20，故輸出 20



