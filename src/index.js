let pups
document.addEventListener('DOMContentLoaded', function (event) {
  const filterDogs = document.querySelector('#good-dog-filter')

  fetchDogs()

  filterDogs.addEventListener('click', function () {
    if (filterDogs.innerText === 'Filter good dogs: OFF') {
      filterDogs.innerText = 'Filter good dogs: ON'
      clearDogs()
      showDogs(pups.filter(pup => pup.isGoodDog === true))
      // show only good dogs
    } else {
      filterDogs.innerText = 'Filter good dogs: OFF'
      // show all dogs
      showDogs(pups)
    }
  })
})

function showDogs (pups) {
  const dogBar = document.querySelector('#dog-bar')

  pups.forEach(pup => {
    const span = document.createElement('span')
    span.addEventListener('click', function () {
      showDogInfo(pup)
    })
    span.innerText = pup.name
    dogBar.appendChild(span)
  })
}

function clearDogs () {
  const dogBar = document.querySelector('#dog-bar')
  const children = [...dogBar.children]
  children.map(child => child.remove())
  // iterate over children,
  // remove each child from the dom
}

//
// The button's text should change from "Filter good dogs: OFF" to "Filter good dogs: ON", or vice versa.
// If the button now says "ON" (meaning the filter is on), then the Dog Bar should only show pups whose isGoodDog attribute is true. If the filter is off, the Dog Bar should show all pups (like normal).

function showDogInfo (dog) {
  const dogInfo = document.querySelector('#dog-info')

  dogInfo.innerHTML = `
    <img src="${dog.image}">
    <h2>${dog.name}</h2>
    <button id="good-toggle">${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
  `
  const goodButton = document.querySelector('#good-toggle')

  goodButton.addEventListener('click', handleToggleClick(dog))
}

function handleToggleClick (dog) {
  return function (event) {
    dog.isGoodDog = !dog.isGoodDog
    event.target.innerText = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
    toggleGoodDog(dog.id, dog.isGoodDog)
  }
}

function fetchDogs () {
  const endPoint = 'http://localhost:3000/pups'
  fetch(endPoint)
    .then(resp => resp.json())
    .then(dogs => {
      pups = dogs
      showDogs(pups)
    })
}

function toggleGoodDog (id, newValue) {
  const options = {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: newValue
    })
  }
  return fetch(`http://localhost:3000/pups/${id}`, options)
}
