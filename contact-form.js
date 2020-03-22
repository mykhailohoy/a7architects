$email = $("input[type=email]");
$emailError = $("input[type=email]").next()

$email.on("blur", function () {
  if (this.validity.valid) {
    $emailError.text('')
    $emailError.removeClass('active')
  } else {
    showEmailError()
  }
})

$("input[type=text], textarea").on("blur", function () {
  if (this.validity.valid) {
    $basicError = $(this).next()
    $basicError.text('')
    $basicError.removeClass('active')
  } else {
    showBasicError(this)
  }
})

$("form").on("submit", function (e) {
  if (!$email[0].validity.valid) {
    showEmailError();
    e.preventDefault();
  }
  $("input[type=text], textarea").each(function () {
    if (!this.validity.valid) {
      showBasicError(this)
      e.preventDefault()
    }
  })
})

function showEmailError() {
  if ($email[0].validity.valueMissing) {
    $emailError.text("Це поле є обов'язковим до заповнення")
  } else if ($email[0].validity.patternMismatch) {
    $emailError.text('Введіть правильну електронну адресу')
  }
  $emailError.addClass("active")
}

function showBasicError(element) {
  $error = $(element).next();
  if (element.validity.valueMissing) {
    $error.text("Це поле є обов'язковим до заповнення")
  }
  $error.addClass("active")
}

autosize($("textarea"));