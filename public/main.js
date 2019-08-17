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
  showLaunchData()
}

const showLaunchData = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(resp => {
      return resp.json()
    })

    .then(launches => {
      console.log(launches)
      document.querySelector('#shuttle').textContent = launches[0].mission_name

      document.querySelector('#mission').textContent = launches[0].details
    })
}

document.addEventListener('DOMContentLoaded', main)
