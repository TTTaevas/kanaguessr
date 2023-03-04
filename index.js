$(function() {
	$("#answer_field").on("keyup", event => {
		if (event.key !== "Enter") {return} // The only key we care about is Enter
		$("#correct_answer").css("visibility") === "visible" ? $("#next_btn").trigger("click") : $("#answer_btn").trigger("click")
	})

	changeQuestion()
	$("#answer_field").on("input", ":text", checkCharacters)
	$("#answer_field").on("focus", () => {$("#answer_field").select()})
	$("#answer_btn").click(checkAnswer)
	$("#next_btn").click(changeQuestion)
})

function changeQuestion() {
	$("#answer_field").val("") // Empty field so user doesn't have to do it
	$("#answer_field").focus() // Focus on field so user doesn't have to do it

	let questionShape = shapeQuestion([$("#h:checked").length, $("#k:checked").length, $("#r:checked").length])
	if (!questionShape) { // No question can be found if two boxes are left unchecked
		$("#allowed").css("fontSize", "30px")
		$("#allowed").animate({"fontSize": "20px"}, 800)
		return
	}

	changeBackground(questionShape[1], $("#character"))
	changeBackground(questionShape[0], $("#equivalent"))

	$("#correct_answer").css("visibility", "hidden")
	$("#correct_answer").slideUp(100)

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

		$("#equivalent").html(equivalent_of_char)
		$("#character").html(char_in_box)
		$("#answer_paragraph").html(`the answer was ${answer}`)
	})
}

function changeBackground(char, para) {
	let colour = "black"
	if (char === "h") {colour = "red"}
	else if (char === "k") {colour = "green"}
	else if (char === "r") {colour = "blue"}

	para.css("backgroundColor", colour)
}

function shapeQuestion(allow) {
	if (allow.filter(Boolean).length < 2) {return false} // No question can be found if two boxes are left unchecked

	let possibilities = ["h", "k", "r"]
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
	const REGEX_JAPANESE = /[\u3040-\u30ff]/
	const REGEX_OTHER = /[^\u3040-\u30ff]/
	let regex = $("#equivalent").html() === "romaji" ? REGEX_JAPANESE : REGEX_OTHER

	if (!$("#answer_field").val() || !$("#answer_field").val().match(regex)) {
		$("#answer_field").css("backgroundColor", "black")
	} else {
		$("#answer_field").css("backgroundColor", "red")
	}
}

function checkAnswer() {
	if ($("#answer_field.style").css("backgroundColor") === "red") {
		$("equivalent").css("fontSize", "23px")
		$("#equivalent").animate({"fontSize": "20px"}, 500)
		return
	}

	let html = $("#answer_paragraph").html()
	let element = $("#answer_field").val().toLowerCase() === html.slice(html.lastIndexOf(" ") + 1) ? $("#positive") : $("#negative")
	element.css("opacity", "0")
	element.animate({"opacity": "1"}, 200)
	element.html(Number(element.html()) + 1)

	$("#correct_answer").css("visibility", "visible")
	$("#correct_answer").slideDown(100)
	if ($("#auto:checked").length){changeQuestion()}
}
