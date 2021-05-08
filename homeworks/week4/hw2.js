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
      } catch (e) {
        console.log(e)
      }
      for (let i = 0; i < data.length; i++) {
        console.log(`${data[i].id} ${data[i].name}`)
      }
    })
}

function readBook(parameter1) {
  request.get(
    `https://lidemy-book-store.herokuapp.com/books/${parameter1}`,
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
      console.log(`${data.id} ${data.name}`)
    })
}

function deleteBook(parameter1) {
  request.delete(
    `https://lidemy-book-store.herokuapp.com/books/${parameter1}`,
    (error, response, body) => {
      if (error) {
        return console.log('刪除失敗', error)
      }
      console.log('Delete book id:', parameter1)
    })
}

function createBook(parameter1) {
  request.post({
    url: 'https://lidemy-book-store.herokuapp.com/books/',
    form: { name: parameter1 }
  },
  (error, httpResponse) => {
    if (error) {
      return console.log('新增失敗', error)
    }
    console.log('Create book:', parameter1)
  })
}

function updateBook(parameter1, parameter2) {
  request.patch({
    url: `https://lidemy-book-store.herokuapp.com/books/${parameter1}`,
    form: { name: parameter2 }
  },
  (error, httpResponse) => {
    if (error) {
      return console.log('更新失敗', error)
    }
  })
  console.log('Update ID:', parameter1, 'Changed name:', parameter2)
}
