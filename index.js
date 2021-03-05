$(function() {
	document.querySelector("#answer_field").addEventListener("keyup", event => {
		if (event.key !== "Enter") {return} // The only key we care about is Enter
		document.getElementById("correct_answer").style.visibility == "visible" ? document.querySelector("#next_btn").click() : document.querySelector("#answer_btn").click()
	})
})

function changeQuestion() {
	document.getElementById("answer_field").value = "" // Empty field so user doesn't have to do it
	document.getElementById("answer_field").focus() // Focus on field so user doesn't have to do it

	let questionShape = shapeQuestion([document.getElementById('h').checked, document.getElementById('k').checked, document.getElementById('r').checked])
	if (!questionShape) {return false} // No question can be found if two boxes are left unchecked
	// NOTE: MAKE SOMETHING HAPPEN WHEN TWO BOXES ARE LEFT UNCHECKED

	changeBackground(questionShape[1], document.getElementById("character"))
	changeBackground(questionShape[0], document.getElementById("equivalent"))

	document.getElementById("correct_answer").style.visibility = "hidden"
	$("#correct_answer").slideUp(10)

	$.getJSON("characters.json", function(data) {
		const characters = data.items[Math.floor(Math.random() * data.items.length)]
		var char_in_box
		var equivalent_of_char
		var answer

		switch (questionShape[0]) {
			case "h":
				equivalent_of_char = "hiragana"
				answer = characters.h
				break
			case "k":
				equivalent_of_char = "katakana"
				answer = characters.k
				break
			case "r":
				equivalent_of_char = "romaji"
				answer = characters.r
				break
			default: // This part of the code can't get executed in theory
				equivalent_of_char = "???"
		}

		switch (questionShape[1]) {
			case "h":
				char_in_box = characters.h
				break
			case "k":
				char_in_box = characters.k
				break
			case "r":
				char_in_box = characters.r
				break
			default: // This part of the code can't get executed in theory
				char_in_box = "???"
		}

		document.getElementById("equivalent").innerHTML = equivalent_of_char
		document.getElementById("character").innerHTML = char_in_box
		document.getElementById("correct_answer").getElementsByTagName('p')[0].innerHTML = `the answer was ${answer}`
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
