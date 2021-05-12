const request = require('request')
const process = require('process')

const act = process.argv[2]
const parameter1 = process.argv[3]
const parameter2 = process.argv[4]

switch (act) {
  case 'list':
    listBook()
    break
  case 'read':
    readBook(parameter1)
    break
  case 'delete':
    deleteBook(parameter1)
    break
  case 'create':
    createBook(parameter1)
    break
  case 'update':
    updateBook(parameter1, parameter2)
    break
  default:
    console.log('可執行的指令: list, read, delete, create, update')
}

function listBook() {
  request.get(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
      if (error) {
        return console.log('抓取失敗', error)
      }
      let data
      try {
        data = JSON.parse(body)
      } catch (error) {
        console.log(error)
        return
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        for (let i = 0; i < data.length; i++) {
          console.log(`${data[i].id} ${data[i].name}`)
        }
      }
    })
}

function readBook(id) {
  request.get(
    `https://lidemy-book-store.herokuapp.com/books/${id}`,
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
        console.log(`${data.id} ${data.name}`)
      } else {
        console.log('抓取失敗，請輸入有效的書本id')
      }
    })
}

function deleteBook(id) {
  request.delete(
    `https://lidemy-book-store.herokuapp.com/books/${id}`,
    (error, response, body) => {
      if (error) {
        return console.log('刪除失敗', error)
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log('Delete book id:', parameter1)
      } else {
        console.log('刪除失敗，請重新輸入有效的書本id')
      }
    })
}

function createBook(bookName) {
  request.post({
    url: 'https://lidemy-book-store.herokuapp.com/books/',
    form: { name: bookName }
  },
  (error, response) => {
    if (error) {
      return console.log('新增失敗', error)
    }
    let data
    try {
      data = JSON.parse(response.body)
    } catch (error) {
      console.log(error)
    }
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (parameter1 === '' || parameter1 === undefined) {
        console.log('新增失敗，請嘗試輸入有效的書名')
      } else {
        console.log('Create book:', data)
      }
    }
  })
}

function updateBook(id, newName) {
  request.patch({
    url: `https://lidemy-book-store.herokuapp.com/books/${id}`,
    form: { name: newName }
  },
  (error, response) => {
    if (error) {
      return console.log('更新失敗', error)
    } else if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log('Update ID:', parameter1, 'Changed name:', parameter2)
    } else {
      console.log('更新失敗，請輸入有效的書本id及名稱')
    }
  })
}
