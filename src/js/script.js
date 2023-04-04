//slider
// eslint-disable-next-line no-undef
$(document).ready(function () {
    // eslint-disable-next-line no-undef
    $('.slider__wrapper').slick({
        speed: 1200,
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/slider/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/slider/right.png"></button>',
        responsive: [
          {
            breakpoint: 350,
            infinite:true,
            settings: {
              arrows: false,
              dots: true
            }
          },
        ]   
      });


// modal
// eslint-disable-next-line no-undef
$('[data-modal=consultation]').on('click', function () {
    // eslint-disable-next-line no-undef
    $('.overlay,#consultation').fadeIn('slow');
  });
  // eslint-disable-next-line no-undef
  $('.modal__clouse').on('click', function () {
    // eslint-disable-next-line no-undef
    $('.overlay,#consultation,#thanks').fadeOut('slow');
  });


//pageup
  $(window).scroll(function () {
    if ($(this).scrollTop() > 800) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut()
    }
  });
$("a[href^='#up']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
});

//validation
function validateForms (form) {
  $(form).validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: "Пожалуйста, введите ваше имя",
      phone: "Пожалуйста, введите ваш номер телефона",
      email: {
        required: "Пожалуйста, введите адрес почтового ящика",
        email: "Адрес почтового ящика введен неверно"
      }
    }
  });
};

validateForms('#consultation form');

 // ввод телефона
 $('input[name=phone]').mask("+7(999)-999-99-99");

 //отправка писем
$('form').submit(function(e) {
  e.preventDefault();

  // if (!$(this).valid()) {
  //   return;
  // }
  $.ajax({
    type: "POST",
    url: "../mailer/smart.php",
    data: $(this).serialize()
  }).done(function () {
    $(this).find("input").val("");
    $('#consultation').fadeOut();
    $('.overlay, #thanks').fadeIn('slow')

    $('form').trigger('reset');
  });
  return false;
});
});