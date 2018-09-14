document.addEventListener('DOMContentLoaded', () => {
  const dogInfo = document.querySelector('#dog-info')
  let goodDogToggle = document.querySelector('#goodToggle')
  let currentDogId
  let dogFilterButton = document.querySelector('#good-dog-filter')
  let goodFilter = false
  let allDogs

  function fetchDogs () {
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(data => {
      allDogs = data
      displayDogs(allDogs)
    })
  }
  fetchDogs()

  function displayDogs (dogs) {
    const dogBar = document.querySelector('#dog-bar')
    let children = [...dogBar.children]
    children.forEach(c => c.remove())

    dogs.forEach((dog) => {
      const pupSpan = document.createElement('span')
      pupSpan.innerText = dog.name
      pupSpan.id = dog.id
      dogBar.append(pupSpan)

      dogBar.addEventListener('click', event => {
        if (event.target.id === `${dog.id}`) {
          dogInfo.innerHTML =
        `<img src="${dog.image}">
        <h2>${dog.name}</h2>
        <button id="goodToggle"> ${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog'}</button>
        `
          goodDogToggle = document.querySelector('#goodToggle')
          goodDogToggle.addEventListener('click', event => {
            dog.isGoodDog = !dog.isGoodDog
            goodDogToggle.innerText = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog'

            fetch(`http://localhost:3000/pups/${dog.id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dog)
            })
          })
        }
      })
    })
  }

  dogFilterButton.addEventListener('click', event => {
    goodFilter = !goodFilter
    dogFilterButton.innerText = `Filter good dogs: ${goodFilter ? 'ON' : 'OFF'}`
    if (goodFilter) {
      displayDogs(
        allDogs.filter(d => d.isGoodDog)
      )
    } else {
      displayDogs(allDogs)
    }
  })
})
