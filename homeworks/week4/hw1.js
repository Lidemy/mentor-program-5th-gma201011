const request = require('request')

request.get(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    if (error) {
      return console.log('讀取失敗', error)
    }
    let data
    try {
      data = JSON.parse(body)
    } catch (e) {
      console.log(e)
    }
    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].id} ${data[i].name}`)
    }
  })
