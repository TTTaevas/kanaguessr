$(function() {
	document.querySelector("#answer_field").addEventListener("keyup", event => {
		if (event.key !== "Enter") {return}
		document.getElementById("correct_answer").style.visibility == "visible" ? document.querySelector("#next_btn").click() : document.querySelector("#answer_btn").click()
		event.preventDefault()
	})
})

function changeQuestion() {
	document.getElementById("answer_field").value = ""
	document.getElementById("answer_field").focus()

	let p = document.getElementById("question").getElementsByTagName('p')[0]
	let a = document.getElementById("correct_answer")

	let questionShape = shapeQuestion([document.getElementById('h').checked, document.getElementById('k').checked, document.getElementById('r').checked])

	a.style.visibility = "hidden"

	$.getJSON("characters.json", function(data) {
		const characters = data.items[Math.floor(Math.random() * data.items.length)]
		var part_one
		var part_two
		var answer

		switch (questionShape[0]) {
			case "h":
				part_one = "hiragana"
				answer = characters.h
				break
			case "k":
				part_one = "katakana"
				answer = characters.k
				break
			case "r":
				part_one = "romaji"
				answer = characters.r
				break
			default:
				part_one = "???"
		}

		switch (questionShape[1]) {
			case "h":
				part_two = characters.h
				break
			case "k":
				part_two = characters.k
				break
			case "r":
				part_two = characters.r
				break
			default:
				part_two = "???"
		}

		p.innerHTML = `What is the ${part_one} equivalent of ${part_two}?`
		a.getElementsByTagName('p')[0].innerHTML = `The answer was ${answer}`

	})
}

function shapeQuestion(allow) {
	let possibilities = ['h', 'k', 'r']
	var element_one
	var element_two

	while (element_one == undefined) {
		let x = Math.floor(Math.random() * possibilities.length)
		if (allow[x]) {
			let temp = possibilities[x]
			allow.splice(possibilities.indexOf(temp), 1)
			possibilities.splice(possibilities.indexOf(temp), 1)
			element_one = temp
		}
	}

	while (element_two == undefined) {
		let x = Math.floor(Math.random() * possibilities.length)
		if (allow[x] && possibilities[x] != element_one) {element_two = possibilities[x]}
	}

	return [element_one, element_two]
}

function checkAnswer() {
	let answer_field = document.getElementById("answer_field")
	let correct_answer_p = document.getElementById("correct_answer").getElementsByTagName('p')[0]
	let positive = document.getElementById("score").getElementsByTagName('p')[1]
	let negative = document.getElementById("score").getElementsByTagName('p')[0]

	if (answer_field.value == correct_answer_p.innerHTML.slice(correct_answer_p.innerHTML.lastIndexOf(" ") + 1)) {
		positive.innerHTML = Number(positive.innerHTML) + 1
	} else {
		negative.innerHTML = Number(negative.innerHTML) + 1
	}

	correct_answer.style.visibility = "visible"
}
