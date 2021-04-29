const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line)
})

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines)
})

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(lines) {
  const temp = lines[0].split(' ')
  for (let i = Number(temp[0]); i <= Number(temp[1]); i++) {
    if (isNarcissistic(i)) {
      console.log(i)
    }
  }
}

function isNarcissistic(n) {
  const strNumber = String(n)
  let r = n
  let result = 0
  while (r !== 0) {
    result += Math.pow(r % 10, strNumber.length)
    r = Math.floor(r / 10)
  }
  return n === result
}
