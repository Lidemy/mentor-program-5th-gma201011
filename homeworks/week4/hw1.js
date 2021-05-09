const request = require('request')

request.get(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    if (error) {
      console.log('讀取失敗', error)
      return
    }
    let data
    try {
      data = JSON.parse(body)
    } catch (error) {
      return console.log(error)
    }
    if (response.statusCode >= 200 && response.statusCode < 300) {
      for (let i = 0; i < data.length; i++) {
        console.log(`${data[i].id} ${data[i].name}`)
      }
    }
  })
