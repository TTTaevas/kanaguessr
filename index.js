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

	let p_one = document.getElementById("character")
	let p_two = document.getElementById("equivalent")
	let a = document.getElementById("correct_answer")

	let questionShape = shapeQuestion([document.getElementById('h').checked, document.getElementById('k').checked, document.getElementById('r').checked])
	if (!questionShape) {return false} // No question can be found if two boxes are left unchecked

	changeBackground(questionShape[1], p_one)
	changeBackground(questionShape[0], p_two)

	a.style.visibility = "hidden"
	$("#correct_answer").slideUp(10)

	$.getJSON("characters.json", function(data) {
		const characters = data.items[Math.floor(Math.random() * data.items.length)]
		var part_one
		var part_two
		var answer

		switch (questionShape[1]) {
			case "h":
				part_one = characters.h
				break
			case "k":
				part_one = characters.k
				break
			case "r":
				part_one = characters.r
				break
			default:
				part_one = "???"
		}

		switch (questionShape[0]) {
			case "h":
				part_two = "hiragana"
				answer = characters.h
				break
			case "k":
				part_two = "katakana"
				answer = characters.k
				break
			case "r":
				part_two = "romaji"
				answer = characters.r
				break
			default:
				part_two = "???"
		}

		p_one.innerHTML = part_one
		p_two.innerHTML = part_two
		a.getElementsByTagName('p')[0].innerHTML = `the answer was ${answer}`

	})
}

function changeBackground(char, para) {
	switch (char) {
		case "h":
			para.style.backgroundColor = "red"
			break;
		case "k":
			para.style.backgroundColor = "green"
			break;
		case "r":
			para.style.backgroundColor = "blue"
			break;
		default:
			para.style.backgroundColor = "black"
	}
}

function shapeQuestion(allow) {
	if (allow.filter(Boolean).length < 2) {return false} // No question can be found if two boxes are left unchecked

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

function checkCharacters() {
	let answer_field = document.getElementById("answer_field")
	let equivalent = document.getElementById("equivalent")
	const REGEX_JAPANESE = /[\u3040-\u30ff]/
	const REGEX_OTHER = /[^\u3040-\u30ff]/

	if (!answer_field.value) {
		answer_field.style.backgroundColor = "black"
		return
	}
	
	if (equivalent.innerHTML == "romaji") {
		answer_field.value.match(REGEX_JAPANESE) ? answer_field.style.backgroundColor = "red" : answer_field.style.backgroundColor = "black"
	} else {
		answer_field.value.match(REGEX_OTHER) ? answer_field.style.backgroundColor = "red" : answer_field.style.backgroundColor = "black"
	}
}

function checkAnswer() {
	let answer_field = document.getElementById("answer_field")
	let correct_answer_p = document.getElementById("correct_answer").getElementsByTagName('p')[0]
	let positive = document.getElementById("positive")
	let negative = document.getElementById("negative")

	if (answer_field.style.backgroundColor == "red") {
		document.getElementById("equivalent").style.fontSize = "23px"
		$("#equivalent").animate({"fontSize": "20px"}, 500)
		return
	}

	if (answer_field.value.toLowerCase() == correct_answer_p.innerHTML.slice(correct_answer_p.innerHTML.lastIndexOf(" ") + 1)) {
		positive.style.fontSize = "25px"
		$("#positive").animate({"fontSize": "20px"}, 250)
		positive.innerHTML = Number(positive.innerHTML) + 1
	} else {
		negative.style.fontSize = "25px"
		$("#negative").animate({"fontSize": "20px"}, 250)
		negative.innerHTML = Number(negative.innerHTML) + 1
	}

	correct_answer.style.visibility = "visible"
	$("#correct_answer").slideDown(100)

	if (document.getElementById('auto').checked) {changeQuestion()}
}
