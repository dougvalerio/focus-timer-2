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

let isPlaying = false

let minutesTime = Number(minutesDisplay.textContent)

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
    card.classList.toggle('activated');

    audio.loop = true

    if (isPlaying) {
        audio.pause()
    } else {
        audio.play()
    }

    isPlaying = !isPlaying;
}

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
