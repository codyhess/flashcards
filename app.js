/*
 * DECLARE ELEMENT VARIABLES
 */
var header, eventName

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
	if (leftSwipe()) {
		eventName.innerText = 'left swipe'
		console.log('left swipe')
	} else if (rightSwipe()) {
		eventName.innerText = 'right swipe'
		console.log('right swipe')
	} else if (upSwipe()) {
		eventName.innerText = 'up swipe'
		console.log('up swipe')
	} else if (downSwipe()) {
		eventName.innerText = 'down swipe'
		console.log('down swipe')
	} else {
		eventName.innerText = 'one finger touch'
		console.log('one finger touch')
	}
}
function twoFingerTouch() {
	eventName.innerText = 'two finger touch'
	console.log('two finger touch')
}
function threeFingerTouch() {
	eventName.innerText = 'three finger touch'
	console.log('three finger touch')
}
function fourFingerTouch() {
	eventName.innerText = 'four finger touch ... refreshing page'
	console.log('four finger touch ... refreshing page')
	setTimeout(function(){location.reload()}, 500)
}

function leftSwipe() { return (changeX < -30) }
function rightSwipe() { return (changeX > 30) }
function upSwipe() { return (changeY < -30) }
function downSwipe() { return (changeY > 30) }
