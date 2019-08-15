const main = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(response => {
      return response.json()
    })

    .then(data => {
      console.log(data)
    })
}

const showData = () => {
  document.querySelector('#display').textContent = data.copyrigth
}

document.addEventListener('DOMContentLoaded', main)
