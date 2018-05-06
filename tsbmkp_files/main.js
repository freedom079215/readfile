//e.preventDefault();
//e.stopPropagation();
$(function () {
	$('#btnBurger').on('touchstart click', function (e) {
		e.preventDefault();
		$('body').addClass('menu--open');
	});

	$('#btnCloseMenu, .mask--mm').on('touchstart click', function (e) {
		e.preventDefault();
		$('body').removeClass('menu--open');
	});

	$('body').delegate('[data-fancybox-close="true"]', 'click', function (e) {
		e.preventDefault();
		$.fancybox.close();
	});

	$('[data-fancybox-leave="true"]').on('click', function (e) {
		$.fancybox.close();
	});

	$('.sideMenu a,.KV__sign').click(function () {
		var obj = $(this).attr("href"),
			navHeight = ($('.header__wrap').height());
		$('html,body').animate({ scrollTop: $(obj).offset().top - navHeight }, 800);
		return false;
	});

	$('.menu--mobile .mm1 > li').on('click', function () {
		$(this).addClass('active').siblings().removeClass('active');
	});
});