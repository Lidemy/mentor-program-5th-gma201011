const request = require('request')

const process = require('process')

const country = process.argv[2]

function main() {
  if (!country) {
    return console.log('請輸入國家名稱')
  }

  request.get(
    `https://restcountries.eu/rest/v2/name/${country}`,
    (error, response, body) => {
      if (error) {
        return console.log('抓取失敗', error)
      }
      let data
      try {
        data = JSON.parse(body)
      } catch (e) {
        console.log(e)
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        for (let i = 0; i < data.length; i++) {
          console.log('============')
          console.log('國家:', data[i].name)
          console.log('首都:', data[i].capital)
          console.log('貨幣:', data[i].currencies[0].code)
          console.log('國碼:', data[i].callingCodes[0])
        }
      } else {
        return console.log('找不到國家資訊')
      }
    })
}
main()
