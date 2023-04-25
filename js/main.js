const htmlMode = document.querySelector('html')

const buttonSun = document.querySelector('.sun')
const buttonMoon = document.querySelector('.moon')

const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')

const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonPlus = document.querySelector('.plus')
const buttonMinus = document.querySelector('.minus')

const cardFlorest = document.querySelector('.florest')
const cardRain = document.querySelector('.rain')
const cardCoffeshop = document.querySelector('.coffeshop')
const cardFireplace = document.querySelector('.fireplace')

const florestAudio = new Audio('./songs/Floresta.wav')
const rainAudio = new Audio('./songs/Chuva.wav')
const coffeshopAudio = new Audio('./songs/Cafeteria.wav')
const fireplaceAudio = new Audio('./songs/Lareira.wav')

const volumeControls = document.querySelectorAll('.volume-control')

let currentCard = null
let currentAudio = null
let isPlaying = false

let minutesTime = Number(minutesDisplay.textContent)

buttonSun.addEventListener('click', function() {
    buttonSun.classList.add('hide')
    buttonMoon.classList.remove('hide')

    htmlMode.classList.toggle('dark-mode')
})

buttonMoon.addEventListener('click', function() {
    buttonMoon.classList.add('hide')
    buttonSun.classList.remove('hide')

    htmlMode.classList.toggle('dark-mode')
})

function countdown() {
    timer = setTimeout(function() {
        let seconds = Number(secondsDisplay.textContent)
        let minutes = Number(minutesDisplay.textContent)

        if (minutes == 0 && seconds == 0 ) {
            return
        }


        if (seconds <= 0) {
            seconds = 60
            --minutes
        }

        --seconds

        updateDisplay(minutes, seconds)

        countdown()
    } , 1000)
}

function updateDisplay(minutes, seconds) {
    if ( minutes >= 0 ) {
        minutesDisplay.textContent = String(minutes).padStart(2, "0")
    }
    if (seconds !== null) {
        secondsDisplay.textContent = String(seconds).padStart(2, "0")
    }
}

buttonPlay.addEventListener('click', function() {
    buttonPause.classList.remove('hide')
    buttonPlay.classList.add('hide') 
    countdown()
})

buttonPause.addEventListener('click', function() {
    buttonPause.classList.add('hide')
    buttonPlay.classList.remove('hide')
    clearTimeout(timer)
})

buttonStop.addEventListener('click', function() {
    clearTimeout(timer)
    buttonPause.classList.add('hide')
    buttonPlay.classList.remove('hide')
    minutesDisplay.textContent = minutesTime
    secondsDisplay.textContent = String('00')
})

buttonPlus.addEventListener('click', function() {
    let sum = Number(minutesDisplay.textContent)
    sum = sum + 5

    minutesTime = sum 

    updateDisplay(String(sum), null)
})

buttonMinus.addEventListener('click', function() {
    let subtraction = Number(minutesDisplay.textContent) 
    subtraction = subtraction - 5

    minutesTime = subtraction

    updateDisplay(String(subtraction), null)
})

function cardToggle(card, audio) {
    card.classList.toggle('activated')

    audio.loop = true

    if (card !== currentCard) {
        
        if (currentCard !== null) {
          currentCard.classList.remove("activated")
        }

        card.classList.add("activated")
        currentCard = card
    }

    if (currentAudio !== null && currentAudio !== audio) {
        currentAudio.pause()
        isPlaying = false
    }

    if (isPlaying && currentAudio === audio) {
        audio.pause()
        isPlaying = false
    } else {
        audio.play()
        isPlaying = true
    }

    currentAudio = audio
    
    const volume = document.getElementById(`${card.id}-volume`)
   
    volume.addEventListener("input", function() {
        audio.volume = volume.value / 100
      })
}

volumeControls.forEach(test => {
    test.addEventListener("click", function(event) {
        event.stopPropagation()
    })
})

cardFlorest.addEventListener('click', function() {
    cardToggle(cardFlorest, florestAudio)   
})

cardRain.addEventListener('click', function() {
    cardToggle(cardRain, rainAudio)

})

cardCoffeshop.addEventListener('click', function() {
    cardToggle(cardCoffeshop, coffeshopAudio)
})

cardFireplace.addEventListener('click', function() {
    cardToggle(cardFireplace, fireplaceAudio)
})
