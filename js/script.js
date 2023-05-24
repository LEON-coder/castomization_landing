jQuery(document).ready(function ($) {

	let url_path = window.location.origin + window.location.pathname;
	let url_utm = window.location.search.substring(1);

	$("form").on("submit",function (event) {
		event.preventDefault();
		let form = $(this);
		let counterGoal = $(this).find('[name="form_goal"]').val();
		$.ajax({
			url: 'send.php',
			method: 'post',
			dataType: 'html',
			data: form.serialize() + '&' + url_utm + '&path=' + url_path,
			success: function (data) {

				console.log(data);
				if (typeof counterId !== 'undefined') {
					ym(counterId,'reachGoal','form_submit');
					ym(counterId,'reachGoal',counterGoal);
				} else {
					console.log('Не указан counterId!')
				}

				$('.overlay').fadeOut();
				$('.off-canvas').removeClass('active');
				$('.popup').fadeOut();
				$('.pop-up').fadeOut();
				$('body').removeClass('lock');

				let fancybox = Fancybox.show([{ src: "#success",type: "inline" }]);

				form.trigger('reset');

				setTimeout(function () {
					fancybox.close();
				},3500);

			}
		});
	});

	$('.fc6-tabs-item').on('click',function () {
		$('.fc6-tabs-item').removeClass('active');
		$('.fc6-content img').removeClass('active');
		$(this).addClass('active');
		$('.fc6-content img').eq($(this).index()).addClass('active');
		return false
	});

	$('.faq-header').on('click',function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next('.faq-content').stop().slideUp();
		} else {
			$('.faq-header').removeClass('active');
			$(this).addClass('active');
			$('.faq-content').stop().slideUp();
			$(this).next('.faq-content').stop().slideDown();
		}
	});

	// Fancybox.bind('.works-item', {
	// 	groupAll: true,
	// });

	$('.team-row').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2250,
		pauseOnHover: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	$('.include-slider').slick({
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3250,
		pauseOnHover: false,
	});

	$('.include-mobile-slider').slick({
		dots: false,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 560,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
					centerPadding: '40px',
				}
			},
		]
	});

	$('.calculator-counter-button').on('click',function () {
		let cValue = $('#form_counter').val();
		if (cValue < 0) {
			$('#form_counter').val('0');
			return false
		}
		if ($(this).data('action') == 'up') {
			$('#form_counter').val(++cValue);
		} else if ($(this).data('action') == 'down' && cValue > 0) {
			$('#form_counter').val(--cValue);
		}
		return false
	});


	var faina_handle_top = $("#faina-handle-top span");
	$("#faina-slider-top").slider({
		min: 10,
		max: 220,
		step: 1,
		create: function () {
			faina_handle_top.text($(this).slider("value"));
			$(this).attr('data-calc-value',$(this).slider("value"));
		},
		slide: function (event,ui) {
			faina_handle_top.text(ui.value);
			$(this).attr('data-calc-value',ui.value);
			$('.faina-form-top [name="form_square"]').val(ui.value);
		}
	});


	var faina_handle_bottom = $("#faina-handle-bottom span");
	$("#faina-slider-bottom").slider({
		min: 10,
		max: 220,
		step: 1,
		create: function () {
			faina_handle_bottom.text($(this).slider("value"));
			$(this).attr('data-calc-value',$(this).slider("value"));
		},
		slide: function (event,ui) {
			faina_handle_bottom.text(ui.value);
			$(this).attr('data-calc-value',ui.value);
			$('.faina-form-bottom [name="form_square"]').val(ui.value);
		}
	});

	$('.mobile-menu').on('click',function () {
		$('.overlay').fadeIn();
		$('.off-canvas').addClass('active');
		$('.popup').fadeOut();
		$('body').addClass('lock');
	});

	$('.overlay, .off-canvas-close, .popup-close').on('click',function () {
		$('.overlay').fadeOut();
		$('.off-canvas').removeClass('active');
		$('.popup').fadeOut();
		$('body').removeClass('lock');
	});

	$('.popup').on('click',function (e) {
		if ($(this).has(e.target).length == 0) {

			$('.overlay').fadeOut();
			$('.off-canvas').removeClass('active');
			$('.popup').fadeOut();
			$('body').removeClass('lock');

		}
	});

	$('.popup-open').on('click',function () {
		$('.off-canvas').removeClass('active');
		$('.overlay').fadeIn();
		$('.popup').fadeIn();
		$('body').addClass('lock');

		return false
	});

	$('.pop-up').on('click',function (e) {
		if ($(this).has(e.target).length == 0) {

			$('.overlay').fadeOut();
			$('.off-canvas').removeClass('active');
			$('.pop-up').fadeOut();
			$('body').removeClass('lock');

		}
	});

	$('.pop-up-open').on('click',function () {
		$('.off-canvas').removeClass('active');
		$('.overlay').fadeIn();
		$('.pop-up').fadeIn();
		$('body').addClass('lock');

		return false
	});

	$('.pop-up .popup-close').on('click',function () {
		$('.overlay').fadeOut();
		$('.off-canvas').removeClass('active');
		$('.pop-up').fadeOut();
		$('body').removeClass('lock');
	});

	var $grid = $('.grid').imagesLoaded(function () {

		$grid.masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			percentPosition: true,
			gutter: 10,
		});

	});






	$('.calculator input').on('change',function () {
		calcTotal();
	});

	var handle = $("#custom-handle span");
	$("#slider").slider({
		min: 10,
		max: 220,
		step: 1,
		create: function () {
			handle.text($(this).slider("value"));
			$(this).attr('data-calc-value',$(this).slider("value"));
		},
		slide: function (event,ui) {
			handle.text(ui.value);
			$(this).attr('data-calc-value',ui.value);
			$('[name="form_square"]').val(ui.value);

			calcTotal();

		}
	});

	$('.calculator-checkbox input').on('change',function () {
		let arr = [];
		$('.calculator-checkbox input:checked').each(function (index,element) {
			arr[index] = $(element).val();
		});
		str = arr.join(', ')
		$('[name="form_extra"]').val(str);
	});

	$('.calculator-checkbox-number-button').on('click',function () {
		let number = $(this).siblings('.calculator-checkbox-number-value').text();

		if ($(this).attr('data-counter') == 'up') {
			number++;
		} else if (number > 0) {
			number--;
		}

		$(this).siblings('.calculator-checkbox-number-value').text(number);

		let input = $(this).closest('.calculator-checkbox').find('input');
		let singlePrice = input.attr('data-calc-single');
		let totalPrice = singlePrice * number;

		input.attr('data-calc-value',totalPrice);
		let inputValue = input.val();
		let a = inputValue.split('x')[0];
		input.val(a + 'x' + number);

		if (number > 0) {
			input.prop('checked',true);
		} else {
			input.prop('checked',false);
		}

		calcTotal();
	});

	$('#form_checkbox_11').on('click',function () {
		let thisInput = $(this);
		setTimeout(function () {
			let state = thisInput.prop('checked');
			if (state) {
				thisInput.closest('.calculator-checkbox').find('[data-counter="up"]').trigger('click');
			} else {
				thisInput.closest('.calculator-checkbox').find('.calculator-checkbox-number-value').text(0);
			}
		},0);
	});

});

function calcTotal() {

	let typeplace = +$('.calculator-radio-typeplace input:checked').attr('data-calc-value');
	let typeclean = +$('.calculator-typeclean input:checked').attr('data-calc-value');
	let calculator_extra = 0;
	$('.calculator-checkbox input:checked').each(function () {
		calculator_extra += +$(this).attr('data-calc-value');
	});
	let custom_handle = +$('#custom-handle span').text();
	let total = typeplace + calculator_extra + custom_handle * typeclean;
	$('.calculator-info-value span').text(total);
	$('#calculator-total').val(total);

}


$(function () {
	$('.btn-to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 },600);
		return false;
	});
});