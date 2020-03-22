//working with mobile devices

function getIsTouchDevice() {
	if ('ontouchstart' in window) {
		isTouchDevice = true;
	} else {
		isTouchDevice = false
	}
}

getIsTouchDevice()


function createMatrixElement(obj) {
	let id = obj.imgPath;
	let element = `<div class="project-wrapper" data-rubric="${obj.rubric}">
						<a
							data-toggle="popover"
							title=""
							role="button"
							tabindex="0"
							data-html="true"
							data-placement="top"
							data-original-title="${obj.name}"
							data-template="<div class='popover' role='tooltip'><h3 class='popover-header'></h3><div class='popover-body'></div></div>"

							data-content="<a href='#${id}'>Переглянути »</a>" 
							container="body"
						>
						<div
							class="container project"
						>
						<img class=${$("<img>").attr("src", "img/projects/" + obj.imgPath + "/logoicon.jpg").height() > $("<img>").attr("src", "img/projects/" + obj.imgPath + "/logoicon.jpg").width() ? "greaterHeight" : "greaterWidth"} src="img/projects/${obj.imgPath}/logoicon.jpg">
						</div></a>
					</div>`;
	return element;
}

/* $(function () {
	$('[data-toggle="popover"]').popover()
}) */

$(function () {
	$("[data-toggle=popover]").popover({
		trigger: 'manual',
		html: true,
		animation: false
	})
		.on('mouseenter', function () {
			var _this = this;
			$(this).popover('show');
			$('.popover').on('mouseleave', function () {
				$(_this).popover('hide');
			});
		}).on('mouseleave', function () {
			var _this = this;
			setTimeout(function () {
				if (!$('.popover:hover').length) {
					$(_this).popover('hide');
				}
			}, 50);
		});
})

//dismiss popover when it loses focus
/* $('body').on('hover', function (e) {
	$('[data-toggle=popover]').each(function () {
			// hide any open popovers when the anywhere else in the body is clicked
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
					$(this).popover('hide');
			}
	});
}); */

function createProjectCard(obj) {
	var slides;
	for (let e in obj.photos) {
		slides += `<img src="img/projects/${obj.imgPath}/${obj.photos[e]}" loading="lazy">`
	}

	/* $.ajax({
		url: `img/projects/${obj.imgPath}/`,
		async: false,
		dataType: 'json',
		success: function (data) {
			for (let e in data) {
				if (data[e] != "logoicon.jpg") {
					slides += `<img src="img/projects/${obj.imgPath}/${data[e]}">`
				}
			}
		}
	}); */

	let id = obj.imgPath; //taking path to logo image for identifier of a single project; dropping off image extension
	let element = `<div class="projectCard" id=${id}>
									<h5>${obj.desc}</h5>
									<div class="slider project-slider">
											${slides}
									</div>
							</div>`;
	return element;
}

function renderPage(array) {
	for (let i in array) {
		//matrix
		element = createMatrixElement(array[i]);
		columnId = array[i].columnId;
		$(columnId).append(element);

		//all-projects
		element = createProjectCard(array[i])
		rubricId = array[i].rubric;
		$(rubricId).append(element);
	}
}
renderPage(projects)


//styling #matrix section
$(window).on("load", function () {
	$(".slider").slick("slickNext"); //slider sticking in the middle of two slides bug fix

	styleMatrix();
})


$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})


let prScrPos = $(window).scrollTop(); //previous scroll position

window.onscroll = function () {
	//determining scroll direction
	let { cScrPos, scrollingDown } = getScrollDirection();

	//animating sticky fab
	animateFab(cScrPos, scrollingDown);

	//animating #matrix
	if (document.readyState == "complete") {
		animateMatrix(scrollingDown);
	}
}


/* console.log(isTouchDevice)

if (isTouchDevice) {
	$(".slider").on("click", function () {
		$(this).slick("slickNext");
	})
} */


//slick sliders

$(".slider").slick({
	infinite: true,
	speed: 300,
	centerMode: true,
	variableWidth: true,
	waitForAnimate: false,
	arrows: isTouchDevice ? false : true,
	dots: $(window).width() < 500 ? false : true
});

$(".slick-current").on("click", function () {
	$(this).parents(".slider").slick("slickNext");
}) //doesn't work, fix it

/* let display = "all"; */




var alreadySlid = false;
/* $("#spec .toggle-portfolio").on("click", function () { //if inside spec
	let divToShowId = this.dataset.portfolio
	if (display == "all" || $(divToShowId).css("display") == "none") {
		openRubric(this, divToShowId)
	} else {
		openAllRubrics()
	}
})
$("#pro-nas .toggle-portfolio").on("click", function () { //if inside carousel
	let divToShowId = this.dataset.portfolio;
	let projectId = this.dataset.project;
	requestedDataPortfolio = this.dataset.portfolio;
	requestedButton = $('#spec .toggle-portfolio[data-portfolio = "' + requestedDataPortfolio + '"]');

	if (display == "all" || $(divToShowId).css("display") == "none") {
		openRubric(requestedButton, divToShowId);
		requestedButton.focus();
	}
	$('html, body').animate({
		scrollTop: $(projectId).offset().top - 100
	}, 0);
})
$("#matrix .project").on("click", function () { //if inside matrix
	let projectId = this.dataset.project;
	$('html, body').animate({
		scrollTop: $(projectId).offset().top - 100
	}, 0);
})*/




$(".fab-up").on("click", function () {
	$('html, body').animate({
		scrollTop: $(".matrix-wrapper").offset().top
	}, 0);
})
$(".fab-down").on("click", function () {
	$('html, body').animate({
		scrollTop: $("footer").offset().top
	}, 0);
})



/* function openRubric(button, divToShowId) {
	$("#spec .toggle-portfolio").removeClass("active");
	$(button).addClass("active");
	$(".portfolio").css("display", "none");
	$(divToShowId).css("display", "block");
	$(button).html("Знову всі »");
	$(".project").css("display", "none");
	$(".project[data-portfolio = '" + divToShowId + "']").css("display", "block");
	display = "single";
}
function openAllRubrics() {
	$(".portfolio").css("display", "block");
	$(".toggle-portfolio").removeClass("active");
	$("#spec .toggle-portfolio").html("Показати »");
	$("#pro-nas .toggle-portfolio").html("Переглянути »");
	$(".project").css("display", "block");
	display = "all"
}
 */





function animateMatrix(scrollingDown) {
	$(".project").each(function () {
		let offset = $(this).offset().top;
		let height = $(this).height();
		let windowTop = $(window).scrollTop();
		let windowBottom = windowTop + $(window).height();
		if (scrollingDown) {
			if (offset < windowTop && offset + height > windowTop) {
				$(this).addClass("scale-out-center");
				$(this).removeClass("scale-in-center");
			}
			else if (offset < windowBottom && offset + height > windowBottom) {
				$(this).addClass("scale-in-center");
				$(this).removeClass("scale-out-center");
			}
		}
		else {
			if (offset < windowTop + 100 && offset + height > windowTop) {
				$(this).addClass("scale-in-center");
				$(this).removeClass("scale-out-center");
			}
			else if (offset < windowBottom && offset + height > windowBottom) {
				$(this).addClass("scale-out-center");
				$(this).removeClass("scale-in-center");
			}
		}
		if (offset > windowTop + height && offset + height * 2 < windowBottom && $(this).is(".scale-out-center")) {
			$(this).addClass("scale-in-center");
			$(this).removeClass("scale-out-center");
		}
	});
}

function animateFab(cScrPos, scrollingDown) {
	allProjectsOffset = $("#all-projects").offset().top;
	allProjectsHeight = $("#all-projects").height();
	if (cScrPos > allProjectsOffset && cScrPos < allProjectsOffset + allProjectsHeight - 200) {
		if (scrollingDown) {
			$(".fab").css("bottom", "-3rem");
			$(".fab").removeClass("slide-bottom");
			$(".fab").addClass("slide-top");
		}
		else {
			$(".fab").removeClass("slide-top");
			$(".fab").addClass("slide-bottom");
		}
	} else {
		$(".fab").removeClass("slide-top");
		$(".fab").addClass("slide-bottom");
	}
}

function getScrollDirection() {
	let cScrPos = $(window).scrollTop(); //current scroll position
	let scrollingDown;
	if (cScrPos < prScrPos) {
		scrollingDown = false;
	}
	else {
		scrollingDown = true;
	}
	prScrPos = cScrPos;
	return { cScrPos, scrollingDown };
}

function styleMatrix() {
	/* $(".project").each(function () {
		if ($("img", this).height() > $("img", this).width()) {
			$("img", this).css("width", "var(--projectSize)");
		}
		else {
			$("img", this).css("height", "var(--projectSize)");
		}
		opacityQuot = 20; //the greater, the smoother is opacity change. 20 is ok
		opacity = opacityQuot / ($(this).parent().index() + opacityQuot);
		$(this).css("opacity", opacity);
	}); */
}



$(".matrix-checkbox").on("click", function () {
	let rubricToShow = this.dataset.rubrictoshow;
	console.log("checked", rubricToShow, $(this).prop("checked"));
	if ($(this).prop("checked")) {
		$(".project-wrapper[data-rubric ='" + rubricToShow + "'").css("display", "block");
	} else {
		$(".project-wrapper[data-rubric ='" + rubricToShow + "'").css("display", "none");
	}
})


function goToProject(e) {
	console.log(e)
}

$(".go-to-project").on("click", function () {
	let projectId = this.dataset.projectid;
	$('html, body').animate({
		scrollTop: $(projectId).offset().top - 20
	}, 0);
})

$(".go-to-rubric").on("click", function () {
	let rubricId = this.dataset.rubricid;
	$('html, body').animate({
		scrollTop: $(rubricId).offset().top + 50
	}, 0); //optimise through onclick attr instead of class
})







/* for (let e in projects) {
	path = projects[e].imgPath;
	
	var sources;
	$.ajax({
		url: `img/projects/${path}/`,
		async: false,
		dataType: 'json',
		success: function (data) {
			length = data.length;
		}
	});
	var names = {};
	for (let i = 1; i <= length; i++) {
		if (`${path}_photo${i}` != undefined) {
			names[path] += `${path}_photo${i}`
		}
	}
}
console.log(names) */

/* for (let i in projects) {
	let obj = projects[i];
	var sources = [];
	$.ajax({
		url: `img/projects/${obj.imgPath}`,
		async: false,
		dataType: 'json',
		success: function (data) {
			for (let e in data) {
				if (data[e] != "logoicon.jpg") {
					sources.push(data[e])
				}
			}
		}
	});
  obj.photos = sources;
}


console.log(projects); */


//this is background cheecker that changes color of gallery controls
//see http://www.kennethcachia.com/background-check/index.html
BackgroundCheck.init({
	targets: '.slick-arrow, #pro-nas .btn-outline-primary',
	images: '.slick-slide img, .carousel-item img'
})
$(".slider").on("afterChange", function (e, slick, currentSlide) {
	BackgroundCheck.refresh();
})
$(".carousel").on("slid.bs.carousel", function () {
	BackgroundCheck.refresh();
})