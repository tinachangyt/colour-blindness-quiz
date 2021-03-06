
var colourQuiz = {};

colourQuiz.init = function() {
	colourQuiz.displayQuiz();
	colourQuiz.getResults();
	colourQuiz.displayInitialSlide();
	colourQuiz.nextSlideFunc();
	colourQuiz.prevSlideFunc();
	colourQuiz.retakeQuiz();
	colourQuiz.revealQuiz();
	colourQuiz.removeSummary();
}

const ishihara = [ 
	{
		question: "1",
		choices: {
			a: "10",
			b: "11",
			c: "12"
		},
		correctAnswer: {
			answer: "12",
			description: "Everyone should see number 12."
		}
	},
	{
		question: "2",
		choices: {
			a: "3",
			b: "8",
			c: "6"
		},
		correctAnswer: {
			answer: "8",
			description: "People with red-green deficiency see 3."
		}
	},
	{
		question: "3",
		choices: {
			a: "4",
			b: "5",
			c: "6"
		},
		correctAnswer: {
			answer: "6",
			description: "People with red-green deficiency see 5."
		}
	},
	{
		question: "4",
		choices: {
			a: "29",
			b: "37",
			c: "70"
		},
		correctAnswer: {
			answer: "29",
			description: "People with red-green deficiency see 70."
		}
	},
	{
		question: "5",
		choices: {
			a: "57",
			b: "35",
			c: "86"
		},
		correctAnswer: {
			answer: "57",
			description: "People with red-green deficiency see 35."
		}
	},
	{
		question: "6",
		choices: {
			a: "2",
			b: "5",
			c: "6"
		},
		correctAnswer: {
			answer: "5",
			description: "People with red-green deficiency see 2."
		}
	},
	{
		question: "7",
		choices: {
			a: "3",
			b: "4",
			c: "5"
		},
		correctAnswer: {
			answer: "3",
			description: "People with red-green deficiency see 5."
		}
	},
	{
		question: "8",
		choices: {
			a: "nothing",
			b: "2",
			c: "97"
		},
		correctAnswer: {
			answer: "97",
			description: "People with red-green deficiency don’t see anything or see something wrong."
		}
	},
	{
		question: "9",
		choices: {
			a: "42",
			b: "2",
			c: "4"
		},
		correctAnswer: {
			answer: "42",
			description: "People with protanopia or protanomaly see 2; people with deuteranopia or deuteranomaly see 4."
		}
	},
	{
		question: "10",
		choices: {
			a: "a line",
			b: "nothing",
			c: "7"
		},
		correctAnswer: {
			answer: "nothing",
			description: "People with red-green deficiency see a line."
		}
	}
];



colourQuiz.displayQuiz = function() {
	var output = [];
	for (var i = 0; i < ishihara.length; i++) {
		var obj = ishihara[i];
		var choicesDisplay = [];

		for (var letter in obj.choices) {
			choicesDisplay.push(
				`<label>
					<input type="radio" name="question${i}" value="${obj.choices[letter]}">
					${obj.choices[letter]}
				</label>`
			);
		}

		output.push(
			`<div class="slide">
				<div class="question question${i}">
					<img src="assets/${obj.question}.jpg" alt="ishihara colour blindness test images">
					<div class="questionTitle">${i+1}. What do you see?</div>
					<div class="ansDescription hide ansDescription${i}">
						<div>The correct answer is <span>${obj.correctAnswer["answer"]}</span>.</div>
						<div>${obj.correctAnswer["description"]}</div>
					</div>
				</div>

				<div class="choices">${choicesDisplay.join("")}</div>
			</div>`
		);
	};
	$("#quiz").append(output);
}



colourQuiz.getResults = function() {
	$("#submit").one("click", function(e) {
		e.preventDefault();

		var userCorrect = 0;
		var summaryList = [];
		for (var i = 0; i < ishihara.length; i++ ) {
			var obj = ishihara[i];
			var userAns = $(`input[name=question${i}]:checked`).val();
			if (userAns === obj.correctAnswer["answer"]) {
				userCorrect++;
				$(`.question${i}`).addClass("correct");
				$(`.question${i} .questionTitle`).append(' <i class="fa fa-circle-o" aria-hidden="true"></i>');

				summaryList.push(`<div class="resultsSummary__item">${i + 1}. <i class="fa fa-circle-o" aria-hidden="true"></i></div>`);

			} else {
				$(`.question${i}`).addClass("wrong");
				$(`.ansDescription${i}`).addClass("show");
				$(`.question${i} .questionTitle`).append(' <i class="fa fa-times" aria-hidden="true"></i>');

				summaryList.push(`<div class="resultsSummary__item">${i + 1}. <i class="fa fa-times" aria-hidden="true"></i></div>`);
			}
		}
		$("#results").text(`${userCorrect} / ${ishihara.length}`);
		$(".resultsSummary").removeClass("hide").append(`<span class="container">${summaryList.join("")}</span>`);
	});
}



colourQuiz.displayInitialSlide = function() {
	$(".slide").first().addClass("active-slide");
}



colourQuiz.displayButtons = function() {
	//On the last slide, hide Next Button and show Submit Button, else, show Next Button and hide Submit Button on other slides.
	if ( $(".slide.active-slide").index() === $(".slide").last().index() ) {
		$("#nextBtn").fadeOut(500).addClass("hide");
		$(".submitResetBtn").fadeIn(500).removeClass("hide");
	} else {
		$("#nextBtn").fadeIn(500).removeClass("hide");
		$(".submitResetBtn").fadeOut(500).addClass("hide");
	}

	//On first slide, hide Prev Button, else, show Prev Button on other slides.
	if ( $(".slide.active-slide").index() === $(".slide").first().index() ) {
		$("#prevBtn").fadeOut(500).addClass("hide");
	} else {
		$("#prevBtn").fadeIn(500).removeClass("hide");
	}
}



colourQuiz.retakeQuiz = function() {
	$("#retake").on("click", function() {
		location.reload(true);
	});
}



colourQuiz.nextSlideFunc = function() {
	$("#nextBtn").on("click", function(e) {
		e.preventDefault();
		var currentSlide = $(".slide.active-slide");
		var currentSlideIndex = $(".slide.active-slide").index();
		var nextSlideIndex = currentSlideIndex + 1;
		var nextSlide = $(".slide").eq(nextSlideIndex);

		currentSlide.fadeOut(200).removeClass("active-slide");

		if(nextSlideIndex === $(".slide").last().index() + 1) {
			//After clicking on the next button, the slider will stay on the last slide when at the last slide.
			$(".slide").eq(nextSlideIndex - 1).fadeIn(200).addClass("active-slide");
		} else {
			nextSlide.fadeIn(200).addClass("active-slide");
		}

		colourQuiz.displayButtons();
	});
}



colourQuiz.prevSlideFunc = function() {
	$("#prevBtn").on("click", function(e) {
		e.preventDefault();
		var currentSlide = $(".slide.active-slide");
		var currentSlideIndex = $(".slide.active-slide").index();
		var prevSlideIndex = currentSlideIndex - 1;
		var prevSlide = $(".slide").eq(prevSlideIndex);

		currentSlide.fadeOut(200).removeClass("active-slide");

		if(prevSlideIndex === $(".slide").first().index() - 1) {
			// After clicking on the prev button, the slider will stay on the first slide when at the first slide.
			$(".slide").eq(0).fadeIn(200).addClass("active-slide");
		} else {
			prevSlide.fadeIn(200).addClass("active-slide");
		}

		colourQuiz.displayButtons();
	});
}



colourQuiz.revealQuiz = function() {
	$("#startBtn").on("click", function() {
		$("header").addClass("startReveal");
	});
}



colourQuiz.removeSummary = function() {
	$(".resultsSummary").on("click", $("#closeBtn"), function(e) {
		e.preventDefault();
		$(".resultsSummary").addClass("hide");
	});
}



$(function(){
	colourQuiz.init();
});