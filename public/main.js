let launches = []
let currentLaunch = 0

// Displays mission name, location and calculates the countdown
const displayLaunch = () => {
  const launch = launches[currentLaunch]
  document.querySelector('#shuttle').textContent = launch.mission_name
  document.querySelector('#mission').textContent = launch.details
  document.querySelector('#location-text').textContent =
    launch.launch_site.site_name_long

  const countdown = document.querySelector('#countdown-text')
  const now = new Date()
  const launchDate = new Date(launch.launch_date_utc)
  const dif = launchDate.getTime() - now.getTime()
  const secondsFromT1ToT2 = dif / 1e3
  let totalSeconds = Math.abs(secondsFromT1ToT2)
  if (secondsFromT1ToT2 < 0) {
    countdown.appendChild(document.createTextNode('Launched!'))
  } else {
    const time = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
    time.days = Math.floor(totalSeconds / (60 * 60 * 24))
    totalSeconds = totalSeconds - time.days * 24 * 60 * 60
    time.hours = Math.floor(totalSeconds / (60 * 60))
    totalSeconds = totalSeconds - time.hours * 60 * 60
    time.minutes = Math.floor(totalSeconds / 60)
    totalSeconds = totalSeconds - time.minutes * 60
    time.seconds = Math.floor(totalSeconds)
    countdown.textContent = ''
    countdown.appendChild(
      document.createTextNode(
        ''
          .concat(time.days, ' days, ')
          .concat(time.hours, ' hours, ')
          .concat(time.minutes, ' mins, ')
          .concat(time.seconds, ' seconds')
      )
    )
  }
}

// Show the previous launch information from current launch
const prevLaunch = () => {
  currentLaunch = Math.max(currentLaunch - 1, 0)
  displayLaunch()
}

// Show the next launch information from current launch

const nextLaunch = () => {
  currentLaunch = Math.min(currentLaunch + 1, launches.length - 1)
  displayLaunch(launches[currentLaunch])
}
// Fetches data for the top image api and displays text on top of image
const main = () => {
  document.querySelector('.button-left').addEventListener('click', prevLaunch)
  document.querySelector('.button-right').addEventListener('click', nextLaunch)
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(response => {
      return response.json()
    })

    .then(data => {
      console.log(data)
      document.querySelector('#copyright').textContent =
        'copyright: ' + data.copyright + ' | title: ' + data.title
      let imageStyle = `background-image: url('${data.url}');`
      imageStyle +=
        ' height: 300px;' +
        ' width: 100%;' +
        ' color: white;' +
        ' background-position: center;' +
        ' background-repeat: no-repeat;' +
        ' background-size: cover;' +
        ' display: flex;' +
        ' justify-content: center;' +
        ' align-items: center;' +
        ' font-size: 140%;'
      document.querySelector('#first-api').setAttribute('style', imageStyle)
    })
  showLaunchData()
}

// Fetches data for the launches api and update the counter
const showLaunchData = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(resp => {
      return resp.json()
    })

    .then(data => {
      console.log(data)
      launches = data
      displayLaunch()
    })
  setInterval(() => {
    displayLaunch()
  }, 990)
}

document.addEventListener('DOMContentLoaded', main)
