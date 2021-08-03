const API_URL = 'https://api.twitch.tv/kraken'
const CLIENT_ID = 'wibxivyae3464k5966e43sn4vei6ic'
const STREAM_TEMPLATE = `
                <div class="stream__wrapper">
                    <div class="stream__video">
                        <img src="$preview">
                        </div>
                    <div class="stream__info">
                        <div class="info__avatar"><img src="$logo"></div>
                        <div class="info__desc">
                            <div class="info__title">$title</div>
                            <div class="info__streamer">$name</div>
                        </div>
                    </div>
                </div>
                `

document.querySelector('.navbar__games').addEventListener('click', (e) => {
  if (e.target.className !== 'navbar__games') {
    const gameName = e.target.innerText
    changeName(gameName)
  }
  asyncGetStreams()
})

function changeName(gameName) {
  document.querySelector('.content__desc__title').innerText = gameName
  document.querySelector('.stream__container').innerHTML = ''
}

function addEmptyElement() {
  const emptyElement = document.createElement('div')
  emptyElement.innerHTML = '<div class="stream__wrapper"></div>'
  document.querySelector('.stream__container').appendChild(emptyElement)
}

async function getGames() {
  const response = await fetch(`${API_URL}/games/top?limit=5`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': CLIENT_ID
    }
  })
  const data = await response.json()
  return data.top
}

async function asyncGetGames() {
  try {
    let game = ''
    const data = await getGames()
    for (game of data) {
      const element = document.createElement('div')
      element.innerText = game.game.name
      document.querySelector('.navbar__games').appendChild(element)
    }
    changeName(data[0].game.name)
  } catch (err) {
    console.log(err)
  }
}
asyncGetGames()

async function getStreams(gameName) {
  const response = await fetch(`${API_URL}/streams?game=${encodeURIComponent(gameName)}&limit=20`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': CLIENT_ID
    }
  })
  const data = await response.json()
  return data
}

async function asyncGetStreams() {
  try {
    const topGames = await getGames()
    let name = ''
    for (let i = 0; i < topGames.length; i++) {
      if (document.querySelector('.content__desc__title').innerText === topGames[i].game.name) {
        name = topGames[i].game.name
      }
    }
    const data = await getStreams(name)
    for (const stream of data.streams) {
      const element = document.createElement('div')
      document.querySelector('.stream__container').appendChild(element)
      element.outerHTML = STREAM_TEMPLATE
        .replace('$preview', stream.preview.large)
        .replace('$logo', stream.channel.logo)
        .replace('$title', stream.channel.status)
        .replace('$name', stream.channel.name)
    }
    addEmptyElement()
  } catch (err) {
    console.log(err)
  }
}
asyncGetStreams()
