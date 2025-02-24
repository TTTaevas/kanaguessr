const items = [
	{
		"h": "あ",
		"k": "ア",
		"r": "a"
	},
	{
		"h": "い",
		"k": "イ",
		"r": "i"
	},
	{
		"h": "う",
		"k": "ウ",
		"r": "u"
	},
	{
		"h": "え",
		"k": "エ",
		"r": "e"
	},
	{
		"h": "お",
		"k": "オ",
		"r": "o"
	},
	{
		"h": "か",
		"k": "カ",
		"r": "ka"
	},
	{
		"h": "き",
		"k": "キ",
		"r": "ki"
	},
	{
		"h": "く",
		"k": "ク",
		"r": "ku"
	},
	{
		"h": "け",
		"k": "ケ",
		"r": "ke"
	},
	{
		"h": "こ",
		"k": "コ",
		"r": "ko"
	},
	{
		"h": "さ",
		"k": "サ",
		"r": "sa"
	},
	{
		"h": "し",
		"k": "シ",
		"r": "shi"
	},
	{
		"h": "す",
		"k": "ス",
		"r": "su"
	},
	{
		"h": "せ",
		"k": "セ",
		"r": "se"
	},
	{
		"h": "そ",
		"k": "ソ",
		"r": "so"
	},
	{
		"h": "た",
		"k": "タ",
		"r": "ta"
	},
	{
		"h": "ち",
		"k": "チ",
		"r": "chi"
	},
	{
		"h": "つ",
		"k": "ツ",
		"r": "tsu"
	},
	{
		"h": "て",
		"k": "テ",
		"r": "te"
	},
	{
		"h": "と",
		"k": "ト",
		"r": "to"
	},
	{
		"h": "な",
		"k": "ナ",
		"r": "na"
	},
	{
		"h": "に",
		"k": "ニ",
		"r": "ni"
	},
	{
		"h": "ぬ",
		"k": "ヌ",
		"r": "nu"
	},
	{
		"h": "ね",
		"k": "ネ",
		"r": "ne"
	},
	{
		"h": "の",
		"k": "ノ",
		"r": "no"
	},
	{
		"h": "は",
		"k": "ハ",
		"r": "ha"
	},
	{
		"h": "ひ",
		"k": "ヒ",
		"r": "hi"
	},
	{
		"h": "ふ",
		"k": "フ",
		"r": "fu"
	},
	{
		"h": "へ",
		"k": "ヘ",
		"r": "he"
	},
	{
		"h": "ほ",
		"k": "ホ",
		"r": "ho"
	},
	{
		"h": "ま",
		"k": "マ",
		"r": "ma"
	},
	{
		"h": "み",
		"k": "ミ",
		"r": "mi"
	},
	{
		"h": "む",
		"k": "ム",
		"r": "mu"
	},
	{
		"h": "め",
		"k": "メ",
		"r": "me"
	},
	{
		"h": "も",
		"k": "モ",
		"r": "mo"
	},
	{
		"h": "や",
		"k": "ヤ",
		"r": "ya"
	},
	{
		"h": "ゆ",
		"k": "ユ",
		"r": "yu"
	},
	{
		"h": "よ",
		"k": "ヨ",
		"r": "yo"
	},
	{
		"h": "ら",
		"k": "ラ",
		"r": "ra"
	},
	{
		"h": "り",
		"k": "リ",
		"r": "ri"
	},
	{
		"h": "る",
		"k": "ル",
		"r": "ru"
	},
	{
		"h": "れ",
		"k": "レ",
		"r": "re"
	},
	{
		"h": "ろ",
		"k": "ロ",
		"r": "ro"
	},
	{
		"h": "わ",
		"k": "ワ",
		"r": "wa"
	},
	{
		"h": "を",
		"k": "ヲ",
		"r": "wo"
	},
	{
		"h": "ん",
		"k": "ン",
		"r": "n"
	}
]

const all = []
items.forEach((i) => {all.push(["h", i.h]); all.push(["k", i.k]); all.push(["r", i.r])})
let got_right = []

const settings = {
	character: {
		hiragana: true,
		katakana: true,
		romaji: false,
	},
	typeas: {
		hiragana: false,
		katakana: false,
		romaji: true,
	}
}

$(function() {
	$("#answer_field").on("keyup", event => {
		if (event.key === "Enter") {
			$("#correct_answer").css("visibility") === "visible" ? $("#next_btn").trigger("click") : $("#answer_btn").trigger("click")
		}
	})

	settings.character.hiragana = $("#hq").is(":checked")
	$("#hq").change(() => {settings.character.hiragana = $("#hq").is(":checked");changeQuestion()})
	settings.character.katakana = $("#kq").is(":checked")
	$("#kq").change(() => {settings.character.katakana = $("#kq").is(":checked"); changeQuestion()})
	settings.character.romaji = $("#rq").is(":checked")
	$("#rq").change(() => {settings.character.romaji = $("#rq").is(":checked"); changeQuestion()})

	settings.typeas.hiragana = $("#he").is(":checked")
	$("#he").change(() => {settings.typeas.hiragana = $("#he").is(":checked"); changeQuestion()})
	settings.typeas.katakana = $("#ke").is(":checked")
	$("#ke").change(() => {settings.typeas.katakana = $("#ke").is(":checked"); changeQuestion()})
	settings.typeas.romaji = $("#re").is(":checked")
	$("#re").change(() => {settings.typeas.romaji = $("#re").is(":checked"); changeQuestion()})

	$("#answer_field").on("input propertychange", () => {checkCharacters()})
	$("#answer_field").on("focus", () => {$("#answer_field").select()})
	$("#answer_btn").click(checkAnswer)
	$("#next_btn").click(() => changeQuestion())

	changeQuestion()
})

function crash(are_we_looping) {
	if (!are_we_looping) {
		got_right = []
		return changeQuestion(true)
	} else {
		$("#settings").css("opacity", "0")
		$("#settings").animate({"opacity": "1"}, 200)
		console.error("Impossible to ask anything with such settings!")
		return
	}
}

function changeQuestion(are_we_looping) {
	const all_possibilities = all.filter((p) => !got_right.map((t) => t[1]).includes(p[1]))

	const only_type_as_hiragana = settings.typeas.hiragana && !settings.typeas.katakana && !settings.typeas.romaji
	const only_type_as_katakana = !settings.typeas.hiragana && settings.typeas.katakana && !settings.typeas.romaji
	const only_type_as_romaji = !settings.typeas.hiragana && !settings.typeas.katakana && settings.typeas.romaji

	const possibilities = all_possibilities.filter((p) => {
		if (p[0] === "h" && settings.character.hiragana && !only_type_as_hiragana) {return p}
		if (p[0] === "k" && settings.character.katakana && !only_type_as_katakana) {return p}
		if (p[0] === "r" && settings.character.romaji && !only_type_as_romaji) {return p}
	})

	if (!possibilities.length) {
		return crash(are_we_looping)
	}

	const i1 = Math.floor(Math.random() * possibilities.length)
	const character = possibilities[i1][1]
	const character_type = possibilities[i1][0]
	const item = items.find((i) => i[character_type] === character)

	const equivalent_types = []
	if (settings.typeas.hiragana) {equivalent_types.push("h")}
	if (settings.typeas.katakana) {equivalent_types.push("k")}
	if (settings.typeas.romaji) {equivalent_types.push("r")}

	const equivalents = equivalent_types
		.filter((t) => t !== character_type)
		.map((t) => [t, item[t]])

	if (!equivalents.length) {
		return crash(are_we_looping)
	}

	const i2 = Math.floor(Math.random() * equivalents.length)
	const equivalent = equivalents[i2][1]
	const equivalent_type = equivalents[i2][0]

	$("#answer_field").val("") // Empty field so user doesn't have to do it
	$("#answer_field").focus() // Focus on field so user doesn't have to do it
	$("#answer_btn").attr("disabled", false)
	$("#answer_btn").css("display", "block")
	$("#next_btn").css("display", "none")
	$("#next_btn").html("skip")

	changeBackground(character_type, $("#character"))
	changeBackground(equivalent_type, $("#equivalent"))

	$("#correct_answer").css("visibility", "hidden")
	$("#correct_answer").slideUp(100)

	$("#character").html(character)
	$("#equivalent").html(equivalent_type === "h" ? "ひらがな" : equivalent_type === "k" ? "カタカナ" : "rōmaji")
	$("#answer_paragraph").html(`the answer was ${equivalent}`)
}

function changeBackground(char, para) {
	let colour = "black"
	if (char === "h") {colour = "#b57642"}
	else if (char === "k") {colour = "steelblue"}
	else if (char === "r") {colour = "blueviolet"}

	para.css("backgroundColor", colour)
	para.attr("char", char)
}

function checkCharacters() {
	const REGEX_JAPANESE = /[\u3040-\u30ff]/
	const REGEX_OTHER = /[^\u3040-\u30ff]/
	const regex = $("#equivalent").html() === "rōmaji" ? REGEX_JAPANESE : REGEX_OTHER

	if (!$("#answer_field").val() || !$("#answer_field").val().match(regex)) {
		$("#answer_field").css("backgroundColor", "black")
	} else {
		$("#answer_field").css("backgroundColor", "red")
	}
}

function checkAnswer() {
	$("#answer_field").focus() // Keey keyboard on for mobile users
	if (!$("#answer_field").val()) {return}
	if ($("#answer_field").css("backgroundColor") === "rgb(255, 0, 0)") {
		$("#equivalent").css("fontSize", "25px")
		$("#equivalent").animate({"fontSize": "20px"}, 1000)
		return
	}

	const html = $("#answer_paragraph").html()
	const correct = $("#answer_field").val().toLowerCase() === html.slice(html.lastIndexOf(" ") + 1)
	const element = correct ? $("#positive") : $("#negative")
	if (correct) {got_right.push([$("#character").attr("char"), $("#character").html()])}

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
		$("#answer_btn").attr("disabled", true)
		$("#answer_btn").css("display", "none")
		$("#next_btn").html("next")
		$("#next_btn").css("display", "block")
	}
}
