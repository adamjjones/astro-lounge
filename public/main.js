const main = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(response => {
      return response.json()
    })

    .then(data => {
      console.log(data)
      document.querySelector('#copyright').textContent =
        'copyright: ' + data.copyright + ' | title: ' + data.title
      document.querySelector('#first-api').src = data.url
    })
  showNasaData()
}

const showNasaData = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(resp => {
      return resp.json()
    })

    .then(launches => {
      console.log(launches)
      document.querySelector('#shuttle').textContent
      document.querySelector('.mission-name').textContent =
        launches[0].mission_name
    })
}

document.addEventListener('DOMContentLoaded', main)
