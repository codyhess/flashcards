/*
 * DECLARE ELEMENT VARIABLES
 */
var header, eventName, card, question, answer

/*
 * AJAX OBJECT
 */
var cardKeys
var cardIndex = 0

/*
 * INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', function(event) {
	// LISTEN FOR TOUCH EVENTS
	document.addEventListener('touchstart', touchStart)
	document.addEventListener('touchend', touchEnd)

	// ASSIGN ELEMENT VARIABLES
	header = document.getElementById('header')
	eventName = document.getElementById('eventName')
	card = document.getElementById('card')
  question = document.getElementById('question')
  answer = document.getElementById('answer')

	cardKeys = Object.keys(eventsDeck)
  cardKeys = shuffle(cardKeys)

  nextCard()
})

/*
 * TOUCH EVENTS: GLOBAL VARIABLES, LOGIC, FUNCTIONS
 */
var execute, startX, startY, endX, endY, changeX, changeY

var touchStart = function(event) {
	event.preventDefault()
	execute = true
	startX = event.touches[0].pageX
	startY = event.touches[0].pageY
}

var touchEnd = function(event) {
	endX = event.changedTouches[0].pageX
	endY = event.changedTouches[0].pageY
	changeX = endX - startX
	changeY = endY - startY

	// four finger event
	if (event.touches.length === 3 && execute) {
		fourFingerTouch(event)
	}
	// three finger event
	else if (event.touches.length === 2 && execute) {
		threeFingerTouch(event)
	}
	// two finger event
	else if (event.touches.length === 1 && execute) {
		twoFingerTouch(event)
	}
	// one finger event
	else if (execute) {
		oneFingerTouch(event)
	}
	execute = false
}

// These are filled with sample code. Change this part!
function oneFingerTouch() {
	if (leftSwipe() || upSwipe()) {
		console.log('pushing')
		deckPush()
		nextCard()
	} else if (rightSwipe() || downSwipe()) {
		console.log('popping')
		deckShift()
		nextCard()
	} else {
		showAnswer()
		console.log('showing')
	}
}
function twoFingerTouch() {
	card.innerText = 'two finger touch'
	console.log('two finger touch')
}
function threeFingerTouch() {
	card.innerText = 'three finger touch'
	console.log('three finger touch')
}
function fourFingerTouch() {
	card.innerText = 'four finger touch ... refreshing page'
	console.log('four finger touch ... refreshing page')
	setTimeout(function(){location.reload()}, 500)
}

function leftSwipe() { return (changeX < -30) }
function rightSwipe() { return (changeX > 30) }
function upSwipe() { return (changeY < -30) }
function downSwipe() { return (changeY > 30) }

/*
 * PERSONAL FUNCTIONS
 */
function loadCards() {
	var request = new XMLHttpRequest()
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			console.log('response: ' + request.responseText)
			var rt = request.responseText
			cardDict = JSON.parse(JSON.stringify(eval('('+rt+')')))
			cardKeys = Object.keys(cardDict)
		}
	}
	request.open('GET','events.js', true)
	request.send(null)
}
function showAnswer() {
	if (cardKeys.length < 1) {
		return
  } else {
    answer.className = 'fadein'
  }
}
function deckShift() {
	cardKeys.shift()
	console.log(cardKeys[0])
}
function deckPush() {
	cardKeys.push(cardKeys.shift())
	console.log(cardKeys[0])
}
function nextCard() {
  answer.className = 'opacityZero'
	if (cardKeys.length > 0) {
		question.innerText = cardKeys[0]
		answer.innerText = eventsDeck[cardKeys[0]]
	} else {
		card.innerText = 'FINISHED'
	}
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}
