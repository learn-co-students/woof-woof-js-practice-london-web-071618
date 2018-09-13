
document.addEventListener('DOMContentLoaded', () => {
  const dogBar = document.querySelector('#dog-bar')
  const dogCard = document.querySelector('#dog-info')
  // goodFilterToggleButton
  let allDogs;
  let filterStatus = false


  const goodFilterToggleButton = document.querySelector('#good-dog-filter')

  const filterDogs = () => {

    dogBar.innerHTML = ""

    if (filterStatus) {
      goodFilterToggleButton.innerText = "Filter good dogs: ON"

      let goodDogs = allDogs.filter((dog) => {
          return dog.isGoodDog
      })
      renderDogs(goodDogs)
    } else {
      goodFilterToggleButton.innerText = "Filter good dogs: OFF"
      renderDogs(allDogs)
    }
  }

  goodFilterToggleButton.addEventListener('click', () => {
    filterStatus = !filterStatus
    filterDogs()
  })

dogBar.addEventListener('click', (event) => {
  const dogName = event.target.innerText
  const dog = allDogs.find(dog => dog.name === dogName)
  console.log(dog)
  dogCard.innerHTML =
  `
    <div > ${dog.name}</div>
    <img src=${dog.image} >
    <button>${dog.isGoodDog ? 'Good dog' : 'Bad dog' }</button>
  `
  const button = dogCard.querySelector('button')
  button.addEventListener('click', () => {
   dog.isGoodDog = !dog.isGoodDog
   button.innerText = dog.isGoodDog ? 'Good dog' : 'Bad dog'
   filterDogs()
 }
)
})

  function setDogs(){
    return fetch('http://localhost:3000/pups')
    .then(resp =>resp.json())
    .then(data => {
      allDogs = data
      window.allDogs = data
      renderDogs(allDogs)
    })
  }

  setDogs()

  function renderDogs (dogs) {
    dogs.forEach(appendDogSpanToDogBar)
  }

  function appendDogSpanToDogBar (dog) {
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogBar.append(dogSpan)
    // on click of span, showDogInfo(dog)
  }
