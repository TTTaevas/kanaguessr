$(function() {
	$("#answer_field").on("keyup", event => {
		if (event.key !== "Enter") {return} // The only key we care about is Enter
		$("#correct_answer").css("visibility") === "visible" ? $("#next_btn").trigger("click") : $("#answer_btn").trigger("click")
	})

	changeQuestion()
	$("#answer_field").on("input propertychange", () => {checkCharacters()})
	$("#answer_field").on("focus", () => {$("#answer_field").select()})
	$("#answer_btn").click(checkAnswer)
	$("#next_btn").click(changeQuestion)
})

function changeQuestion() {
	$("#answer_field").val("") // Empty field so user doesn't have to do it
	$("#answer_field").focus() // Focus on field so user doesn't have to do it

	let questionShape = shapeQuestion(
		[$("#hq:checked").length, $("#kq:checked").length, $("#rq:checked").length],
		[$("#he:checked").length, $("#ke:checked").length, $("#re:checked").length]
	)
	
	if (!questionShape) { // No question can be found if settings are messed up
		$("#settings").css("opacity", "0")
		$("#settings").animate({"opacity": "1"}, 200)
		return
	}

	changeBackground(questionShape[0], $("#character"))
	changeBackground(questionShape[1], $("#equivalent"))

	$("#correct_answer").css("visibility", "hidden")
	$("#correct_answer").slideUp(100)

	$.getJSON("characters.json", function(data) {
		const characters = data.items[Math.floor(Math.random() * data.items.length)]
		var char_in_box
		var equivalent_of_char
		var answer

		switch (questionShape[0]) {
			case "h":
				char_in_box = characters.h
				break
			case "k":
				char_in_box = characters.k
				break
			case "r":
				char_in_box = characters.r
				break
			default:
				char_in_box = "???"
		}

		switch (questionShape[1]) {
			case "h":
				equivalent_of_char = "ひらがな"
				answer = characters.h
				break
			case "k":
				equivalent_of_char = "カタカナ"
				answer = characters.k
				break
			case "r":
				equivalent_of_char = "rōmaji"
				answer = characters.r
				break
			default:
				equivalent_of_char = "???"
		}

		$("#character").html(char_in_box)
		$("#equivalent").html(equivalent_of_char)
		$("#answer_paragraph").html(`the answer was ${answer}`)
	})
}

function changeBackground(char, para) {
	let colour = "black"
	if (char === "h") {colour = "#b57642"}
	else if (char === "k") {colour = "steelblue"}
	else if (char === "r") {colour = "blueviolet"}

	para.css("backgroundColor", colour)
}

function shapeQuestion(question, equivalent) {
	let possibilities = ["h", "k", "r"]
	var element_one
	var element_two

	question = question.map((a, i) => {if (a) return possibilities[i]}).filter((a) => a)
	equivalent = equivalent.map((a, i) => {if (a) return possibilities[i]}).filter((a) => a)
	if (question.length < 1 || equivalent.length < 1) {return false}
	if (question.length === 1 && equivalent.length === 1) {
		if (JSON.stringify(question) === JSON.stringify(equivalent)) {return false}
	}

	while (element_one === undefined || element_two === undefined) {
		let x = Math.floor(Math.random() * question.length)
		if (question[x]) {
			element_one = question[x]
		}

		let y = Math.floor(Math.random() * equivalent.length)
		if (equivalent[y] && equivalent[y] != element_one) {
			element_two = equivalent[y]
		}
	}

	return [element_one, element_two]
}

function checkCharacters() {
	const REGEX_JAPANESE = /[\u3040-\u30ff]/
	const REGEX_OTHER = /[^\u3040-\u30ff]/
	let regex = $("#equivalent").html() === "rōmaji" ? REGEX_JAPANESE : REGEX_OTHER

	if (!$("#answer_field").val() || !$("#answer_field").val().match(regex)) {
		$("#answer_field").css("backgroundColor", "black")
	} else {
		$("#answer_field").css("backgroundColor", "red")
	}
}

function checkAnswer() {
	if (!$("#answer_field").val()) {return}
	if ($("#answer_field").css("backgroundColor") === "rgb(255, 0, 0)") {
		$("#equivalent").css("fontSize", "25px")
		$("#equivalent").animate({"fontSize": "20px"}, 1000)
		return
	}

	let html = $("#answer_paragraph").html()
	let element = $("#answer_field").val().toLowerCase() === html.slice(html.lastIndexOf(" ") + 1) ? $("#positive") : $("#negative")
	element.css("opacity", "0")
	element.css("backgroundColor", element.css("color"))
	setTimeout(() => {element.css("backgroundColor", "black")}, 125)
	element.animate({"opacity": "1"}, 250)
	element.html(Number(element.html()) + 1)

	if ($("#auto:checked").length) {
		changeQuestion()
	} else {
		$("#correct_answer").css("visibility", "visible")
		$("#correct_answer").slideDown(100)
	}
}
