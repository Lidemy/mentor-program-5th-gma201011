const request = require('request')

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'wibxivyae3464k5966e43sn4vei6ic'
  }
}

function callback(error, response, body) {
  if (error) {
    return console.log('抓取失敗', error)
  }
  if (response.statusCode >= 200 && response.statusCode < 300) {
    let data
    try {
      data = JSON.parse(body)
    } catch (e) {
      console.log(e)
    }
    for (let i = 0; i < data.top.length; i++) {
      console.log(`${data.top[i].viewers} ${data.top[i].game.name}`)
    }
  }
}

request(options, callback)
