``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1. 執行第 11 行，將陣列 [3, 5, 8, 13, 22, 35] 代入函式 isValid。
2. 執行第 2 行，設定變數 i 是 0，檢查 i 是否 < arr.length，陣列存在 6 個元素，因此為是，繼續執行，開始進入第一圈迴圈。
3. 執行第 3 行，判斷 arr[0] 的值是否 <= 0，而 arr[0] 的值為 6，故不符合 return 條件，繼續執行迴圈。
4. 執行第 2 行，i++，故 i = 1，檢查 i 是否 < arr.length，是，故開始進入第二圈迴圈。
5. 執行第 3 行，判斷 arr[1] 的值是否 <= 0，而 arr[1] 的值為 5，故不符合 return 條件，繼續執行迴圈。
6. 執行第 2 行，i++，故 i = 2，檢查 i 是否 < arr.length，是，故開始進入第三圈迴圈。
7. 執行第 3 行，判斷 arr[2] 的值是否 <= 0，而 arr[2] 的值為 8，故不符合 return 條件，繼續執行迴圈。
8. 執行第 2 行，i++，故 i = 3，檢查 i 是否 < arr.length，是，故開始進入第四圈迴圈。
9. 執行第 3 行，判斷 arr[3] 的值是否 <= 0，而 arr[3] 的值為 13，故不符合 return 條件，繼續執行迴圈。
10. 執行第 2 行，i++，故 i = 4，檢查 i 是否 < arr.length，是，故開始進入第五圈迴圈。
11. 執行第 3 行，判斷 arr[4] 的值是否 <= 0，而 arr[4] 的值為 22，故不符合 return 條件，繼續執行迴圈。
12. 執行第 2 行，i++，故 i = 5，檢查 i 是否 < arr.length，是，故開始進入第六圈迴圈。
13. 執行第 3 行，判斷 arr[5] 的值是否 <= 0，而 arr[5] 的值為 35，故不符合 return 條件，繼續執行迴圈。
14. 執行第 2 行，i++，故 i = 5，檢查 i 是否 < arr.length，不是，跳開迴圈，繼續執行下面。
15. 執行第 5 行，設定變數 i 是 2，檢查 i 是否 < arr.length，陣列存在 6 個元素，因此為是，繼續執行，開始進入第一圈迴圈。
16. 執行第 6 行，判斷 arr[2] 的值是否 !== arr[2 - 1] + arr[2 - 2]，而 arr[2 - 1] + arr[2 - 2] 的值為 8，arr[2]的值為 8，兩者相等，故不符合 return 條件，繼續執行迴圈。
17. 執行第 5 行，i++，故 i = 3，檢查 i 是否 < arr.length，是，故開始進入第二圈迴圈。
18. 執行第 6 行，判斷 arr[3] 的值是否 !== arr[3 - 1] + arr[3 - 2]，而 arr[3 - 1] + arr[3 - 2] 的值為 13，arr[3]的值為 13，兩者相等，故不符合 return 條件，繼續執行迴圈。
19. 執行第 5 行，i++，故 i = 4，檢查 i 是否 < arr.length，是，故開始進入第三圈迴圈。
20. 執行第 6 行，判斷 arr[4] 的值是否 !== arr[4 - 1] + arr[4 - 2]，而 arr[4 - 1] + arr[4 - 2] 的值為 21，arr[4]的值為 22，兩者不相等，故符合 return 條件，回傳字串 'invalid'，完成函式。



函式 isValid(arr) 可以傳入一個陣列，如果傳入陣列的元素中有小於等於 0 的，則傳出字串'invalid'。

接著，判斷陣列中「第二個到最後一個元素」是否等於「該元素的前兩個元素」的加總，「第二個到最後一個元素」皆是的話回傳字串'valid'，只要有一個不是的話回傳字串'invalid'。

費式數列與否。

