$(document).ready(function() {
	$('#fixed-container-1').onScrollBoxFixedV2(
		block = {
			fixedBlockParent : $('#fixed-parent-1'),
			fixedBlock : $('#fixed-block-1'),
			relativeBlock : $('#relative-block-1'),
			bottomAge: $('#bottom-bound-1')
		},
		padding = {
			top: $('#main-menu').outerHeight(true) + 10
		},
		css = {
			marginBottom: ''
		}
	);

	(function init() {
		//Показать товары в корзине, если есть
		showCart();

		//
		if( $('span').is('.indicator') ) {
			$('.mfilters .def-menu').scroll(function(){
				indicateScroll( $(this) );
			});
			$('.dropdown').scroll(function(){
				indicateScroll( $(this) );
			});

			jumpingElem( $('.indicator-up'), 'top', 5 );
			jumpingElem( $('.indicator-down'), 'bottom', 5 );
		}
	})();

	//Анимация индикаторов
		function indicateScroll(scrollableElement){

			if( scrollableElement.scrollTop() + scrollableElement.innerHeight() >= scrollableElement[0].scrollHeight ){

				scrollableElement.find('.indicator-up').css('display', 'block');
				scrollableElement.find('.indicator-down').css('display', 'none');

			}else if( scrollableElement.scrollTop() == 0 ) {

				scrollableElement.find('.indicator-up').css('display', 'none');
				scrollableElement.find('.indicator-down').css('display', 'block');

			}else{

				scrollableElement.find('.indicator-up').css('display', 'block');
				scrollableElement.find('.indicator-down').css('display', 'block');
			}
		}
	//

	//Высота меню фильтров в каталоге
		$(window).resize( function() {
			if ( $('.mfilters').height() >= $(window).height() / 2 ) {
				$('.mfilters').height( $(window).height() / 2 );
				$('.mfilters').css('minHeight', '250px');
			} else {
				$('.mfilters').height('450px');
				$('.mfilters').css('minHeight', '450px');
			}
		});
	//


	$('.sub-li>.a').on('click', function(e) {
		e.preventDefault();
	});

	//Скрывать меню при покидании его курсора
		$('.dropdown').mouseleave(function() {
			$(this).css('display', 'none');
			$(this).parent().find('.dropdown-btn').filter(':first').removeClass('opened-js');
			$(this).parent().find('.dropdown-btn').filter(':first').addClass('close-js');
		});
		$('.menu-right .dropdown').mouseleave(function() {
			$(this).css('display', 'none');
			$(this).parent().parent().find('.dropdown-btn').filter(':first').removeClass('opened-js');
			$(this).parent().parent().find('.dropdown-btn').filter(':first').addClass('close-js');
		});
	//

	//Открыть меню в мобильной версии
		var isShowMenu = false;

		$('#burger').on('click', function(e) {
			e.preventDefault();

			var height = $(window).height()/* - 50 + 'px'*/;

			$(this).parent().find('.dropmenu1').css('height', height);
			$(this).parent().find('.dropmenu1').css('position', 'fixed');
			$(this).parent().find('.dropmenu1').css('top', '50px');
			//$(this).parent().find('.dropmenu1').css('marginTop', '50px');

			$(this).parent().find('.dropmenu1').slideToggle(500);

			if(isShowMenu){
				isShowMenu = false;
				$("html,body").css("overflow","initial");
				$(this).empty();
				$(this).append('<i class="fa fa-bars" aria-hidden="true"></i>');

			}else {
				isShowMenu = true;
				$("html,body").css("overflow","hidden");
				$(this).empty();
				$(this).append('<i class="fa fa-minus" aria-hidden="true"></i>');
			}

			//Анимация меню
			if(isShowMenu) {
				var i = 0;
				var j = -1;
				var li = $('.dropmenu1>li').length;

				var t = setTimeout(function(){
					var timer = setInterval(function(){

						if (i < li) {
							if( j >= 0 ) { $('.dropmenu1>li').eq(j).find('a:first').toggleClass("anim"); }

							$('.dropmenu1>li').eq(i).find('a:first').toggleClass("anim");

						}else {
							var end = j;
							setTimeout(function() {
								$('.dropmenu1>li').eq(end).find('a:first').toggleClass("anim");
								clearInterval( timer );
							}, 10);

						}
						i++;
						j++;

					}, 10);

					timer = "";
				}, 500);
			}
		});


		$('.dropmenu1').scroll( function() {

			if ( $('.dropmenu1').scrollTop() > 50 ) {
				$('.dropmenu1').css('bottom', 0);
				$('.dropmenu1').css('top', '50');
			}else {
				$('.dropmenu1').css('top', 50);
				$('.dropmenu1').css('bottom', 'initial');
			}
		});
	//

	//Скрыть меню в мобильной версии
		$('.dropmenu1').on('click', function(e) {
			e.preventDefault();

			if(isShowMenu){
				isShowMenu = false;
				$("html,body").css("overflow","initial");
				$(this).parent().find('#burger').empty();
				$(this).parent().find('#burger').append('<i class="fa fa-bars" aria-hidden="true"></i>');
				$(this).slideToggle(500);
			}
		});
		$('.dropmenu1 .a-decoration-none').on('click', function(e) {
			e.stopPropagation();
		});
	//

	//Открыть подменю
		$('.dropmenu1 .dropdown-btn').on('click', function(e) {
			e.preventDefault();

			var menu = $('.dropmenu1');
			var height = $(window).height()/* + 50 + 'px'*/;

			menu.css('height', height - 50);
			menu.css('overflowY', 'scroll');
		});
	//

	//Подменю в мобильной версии
		$('.dropmenu1 .submenu-btn').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();

			if( $(this).hasClass('close-js') ){
				$(this).removeClass('close-js');
				$(this).addClass('opened-js');
			} else {
				$(this).removeClass('opened-js');
				$(this).addClass('close-js');
			}
			$(this).parent().find('.submenu:first').slideToggle(500);
		});

		$('.list-select a').on('click', function(e) {
			e.preventDefault();

			if( $(this).hasClass('active') ){
				$(this).removeClass('active');
			}
			else {
				$(this).parent().parent().find('li>a').removeClass('active');
				$(this).addClass('active');
			}
		});

		if( $('div').is('.title-menu') ) {
			$('.title-menu .a').on('click', function(e) {
				e.preventDefault();
				$(this).parent().parent().find('li').removeClass('active');
				$(this).parent().addClass('active');
			});
		}
	//

	function switchElement(elem) {
		if( elem.parent().hasClass('active') ){
			elem.parent().removeClass('active');
		}
		else {
			elem.parent().parent().find('li').removeClass('active');
			elem.parent().addClass('active');
		}
	}








	//Фиксированное меню
		$(window).scroll(function() {

			if( $('div').is('.fix-sidemenu-js') ){

				var menu = $('.fix-sidemenu-js');

				var catalog = menu.parent().offset().top;
				var more = $('.more').height();
				var footer = $('footer').find('.wrapper').height() + 42;

				var height = $(document).height() - $(window).height() - footer + more + 82;


				//Для ПК версии
				if ( $(window).scrollTop() >= height) {
					menu.css('position', 'absolute');
					menu.css('bottom', 0);
					menu.css('top', 'auto');
				}

				if ( $(window).scrollTop() < menu.parent().offset().top ) {
					menu.css('position', 'absolute');
					menu.css('bottom', 'auto');
					menu.css('top', '0');
				}

				if ( ($(window).scrollTop() >= menu.parent().offset().top - 50 )
					&& $(window).scrollTop() < height) {
					menu.css('position', 'fixed');
				menu.css('bottom', 'auto');
					menu.css('top', '75px');
				}

				menu.parent().parent().css('position', 'relative');

			}
		});
	//

	//========================================//
	//============ Страница товара ===========//
	//========================================//

	// (мобильная версия страницы товара)
		if( $('*').is('.small_slider') ) {
			$(document).ready(function(){
			  $('.small_slider').slick({
			  	dots: true,
			  	arrows: false
			  });
			});

			$(document).ready(function(){

				$('.big_slider').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					fade: true,
					asNavFor: '.slider-nav'

				});

				$('.slider-nav').slick({
					slidesToShow: 4,
					slidesToScroll: 1,
					arrows: false,
					asNavFor: '.big_slider',
					centerMode: false,
					focusOnSelect: true
				});
			});
		}
	//

	//Слайдер похожих товаров (мобильная версия страницы товара)
		if( $('*').is('.like_items-mobile') ) {
			$(document).ready(function(){
			  $('.like_items-mobile').slick({
			  	slidesToShow: 1,
					centerMode: true,
				  focusOnSelect: true,
			  	dots: false,
			  	arrows: false
			  });
		  });
		}
	//

	//Показать/скрыть больше информации о товаре (мобильная версия страницы товара)
		if( $('.btn').is('.show-more') ) {

			var scrollTop = $(window).scrollTop();

			$('.show-more').on('click', function(e) {
				e.preventDefault();

				var this_elem = $(this);
				var text = this_elem.parent().find('.mobile-box');

				if ( this_elem.attr('state') == 'close' ) {

					this_elem.attr('state', 'open');
					$(this).text("Свернуть");

					text.animate({
						height: text.get(0).scrollHeight
					}, 500, function() {
						 $(this).height('auto');
					});
					//scrollTop = $(window).scrollTop();
				} else {

					this_elem.attr('state', 'close');
					$(this).text("Читать дальше");

					text.animate({
						height: '250px'
					}, 500, function() {
						 $(this).height('250px');
					});

					$(window).scrollTop(scrollTop);
				}
			});
		}
	//

	//========================================//


	//========================================//
	//================ Корзина ===============//
	//========================================//

	//Расчет цены в корзине
		if ( $('span').is('#total') ) {

			countPrice();

			$('.counter-js').on('click', function(e) {
				e.preventDefault();
				countPrice();
			});

			$('.count').focusout(function() {
				if ( $(this).val() == '' ) {
					$(this).val(1);
				}
				countPrice();
			});

			//Считаем сумму всех товаров
			function countPrice() {
				var total = 0;

				$.each($('input.count'), function(){
					var text = $(this).parent().parent().parent().parent().find('.i-price .ispan').text().replace(/\s/g, "");
					total += +text * +$(this).val();
				});

				console.log(total);
				$('#total').text( format( total ) );
			}

			//Возвращаем сумму в нужном виде
			function format(num) {
				var arr = num + "";
				arr = arr.split('');

				var result = '';
				var group = 0;

				for( var i = arr.length-1; i >= 0; i-- ) {

					if( group == 3 ) {
						result = " " + result;
						group = 0;
					}
					result = arr[i] + result;

					group++;
				}

				return result + ".00 ₽";
			}
		}

	//========================================//


	//========================================//
	//================ Каталог ===============//
	//========================================//

	//Меню категорий в каталоге
		if( $('*').is('.catmenu') ) {
			$(document).ready(function(){
				if ( $(window).width() < 940 ) {
				  $('.catmenu').slick({
				  	infinite: true,
				  	slidesToShow: 3,
				  	slidesToScroll: 3,
				  	focusOnSelect: true,
				  	centerMode: true,
				  	dots: false,
				  	arrows: false
				  });
				}else {
				  $('.catmenu').slick({
				  	slidesToShow: 8,
				  	focusOnSelect: true,
				  	draggable: false,
				  	dots: false,
				  	slideWidth: 100,
				  	arrows: false
				  });
				}
			});
		}
	//

	//Меню фильтра и сортировки в мобильном
		$('.dropdown-btn').on('click', function(e) {
			e.preventDefault();

			if( $(this).hasClass('opened-js') ) {
				$(this).parent().find('.dropdown').filter(':first').css('display', 'none');
				$(this).removeClass('opened-js');
				$(this).addClass('close-js');

			} else {
				$('.dropdown').css('display', 'none');
				$(this).parent().find('.dropdown').filter(':first').css('display', 'block');
				$(this).removeClass('close-js');
				$(this).addClass('opened-js');
			}

		});
	//

	//Скролинг меню фильтров
		if( $('*').is('.mfilters') ) {
			if ( $('.mfilters').height() >= $(window).height() / 2 ) {
				$('.mfilters').height( $(window).height() / 2 );
				$('.mfilters').css('minHeight', '250px');
			} else {
				$('.mfilters').height('450px');
				$('.mfilters').css('minHeight', '450px');
			}
		}
	//

	$('.shot-menu .dropdown-btn').on('click', function(e) {
		e.preventDefault();

		var menu = $(this).parent().find('.dropdown');
		var height = $(this).parent().find('.dropdown').height();
		if (height + 110 > $(window).height()) {
			menu.css('overflowY', 'scroll');
			menu.css('height', '50%');
			menu.css('width', '100%');
			menu.css('width', '50%');
			menu.css('position', 'fixed');
		}
		menu.find('.indicator-box').css('height', menu.height() + 20);
	});

	//Меню сортировки
		$('.sort_box .a-option').on('click', function(e) {
			e.preventDefault();

			var dropBtn = $(this).parent().parent().parent().find('.dropdown-btn');

			dropBtn.removeClass('opened-js');
			dropBtn.addClass('close-js');

			$('.dropdown').css('display', 'none');
			dropBtn.parent().find('.dropdown').css('display', 'none');
			//
		});
	//

	//Меню каталога
		$(window).scroll(function() {

			if( $('div').is('.catalog_box-compres') ) {

				var footer = $('footer').find('.wrapper').height() + 42;

				var catalog = $('.catalog_box-compres').offset().top;
				var more = $('.more').height();
				var height = $(document).height() - $(window).height() - footer + more + 82;


				//Для ПК версии
				if ( $(window).scrollTop() >= height) {
					$('.mfilters').css('position', 'absolute');
					$('.mfilters').css('bottom', 0);
					$('.mfilters').css('top', 'auto');
					$('.mfilters').parent().css('position', 'relative');
				}

				if ( $(window).scrollTop() < $('.catalog_box-compres').offset().top ) {
					$('.mfilters').css('position', 'absolute');
					$('.mfilters').css('top', '0');
					$('.mfilters').parent().css('position', 'relative');
				}

				if ( ($(window).scrollTop() >= $('.catalog_box-compres').offset().top - 50 )
					&& $(window).scrollTop() < height) {
					$('.mfilters').css('position', 'fixed');
					$('.mfilters').css('top', '75px');
					$('.mfilters').parent().css('position', 'relative');
				}


				//для мобильных экранов
				var smallMenu = $('.page_title').parent().parent().height();

				if ($(window).scrollTop() >= 53){
					$('.smFilters').css('top', 65);
					$('.smallContainer').css('position', 'fixed');
					$('.smallContainer').css('height', '70px');
				} else {
					var top = smallMenu - $(window).scrollTop() + 'px';
					$('.smFilters').css('top', top);
					$('.smallContainer').css('position', 'initial');
					$('.smallContainer').css('height', '0');
				}
			}
		});
	//

	//Переключение вида каталога
		if( $('*').is('.viewmode-js') ) {
			$('.viewmode-js').on('click', function(e) {

				$('.viewmode-js').removeClass('active');

				if ( $(this).attr('viewmode') == 'card' ) {
					$('.catalog_box.list-view').css('display', 'none');
					$('.catalog_box.card-view').css('display', 'flex');
					$.each($('.viewmode-js'), function(){
						if( $(this).attr('viewmode') == 'card' ){
							$(this).addClass('active');
						}
					});
				} else {
					$('.catalog_box.card-view').css('display', 'none');
					$('.catalog_box.list-view').css('display', 'flex');
					$.each($('.viewmode-js'), function(){
						if( $(this).attr('viewmode') == 'list' ){
							$(this).addClass('active');
						}
					});
				}

				//$(this).addClass('active');

			});
		}
	//
		if( $('*').is('#categoriesMenu') ) {
			$('#categoriesMenu').slick({
		  	dots: false,
		  	arrows: true,
		  	infinite: false,
		  	slidesToShow: 5,
		  	slidesToScroll: 5,

		  });
		  $('#categoriesNav .btn-prev').on('click', function(e) {
		  	e.preventDefault();

		  	$('#categoriesMenu .slick-prev').click();
		  });
		  $('#categoriesNav .btn-next').on('click', function(e) {
		  	e.preventDefault();

		  	$('#categoriesMenu .slick-next').click();
		  });
		}
	//========================================//

	//Обратный отсчет



	//========================================//
	//========== Используется везде ==========//
	//========================================//

	$('.link-more-js').showMoreRadio();

	$('.btn-modal').on('click', function(e) {
		e.preventDefault();

		var id = '#' + $(this).attr('modal');

		$('.modal-container').css('display', 'block');
		$(id).css('display', 'block');
	});

	$('.modal .btn-close').on('click', function(e) {
			$(this).parent().parent().css('display', 'none');
			$('.modal-container').css('display', 'none');
	});

	//Передать в фокус поле ввода в мобильной версии
		$('.openSearch-js').on('click', function(e){
			//e.preventDefault();

			var menu = $(this).parent().parent().find('.mobile-search');
			menu.slideToggle(500);

			var id = $(this).attr('data');

			if( id != '' ) {
				id = '#' + id;
				$(id).focus();
			}
		});
	//

	$('.categories a').on('click', function() {
		$(this).parent().parent().find('a img').removeClass('active');
		$(this).find('img').addClass('active');
	});

	//Показать строку поиска в мобильной версии


		$('.mobile-search .btn-close-js').on('click', function(e){
			e.preventDefault();
			$(this).parent().parent().slideToggle(500);
		});

		$('.mobile-search .btn, .mobile-search .mobile-search_field').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
		});

		$('.mobile-search').on('click', function(e) {
			e.preventDefault();
			$(this).slideToggle(500);
		});
	//

	//Отображение количества товаров в корзине
		function showCart(){
			var cartValue = $('.menu-right .cart-btn span.cartcount');

			if( cartValue.text() != '' ) {
				$('.cart-btn span.cartcount').css('display', 'block');
			}
		}
	//

	//
	//Кнопка наверх
	  $(window).scroll(function () {
	      if ( $(this).scrollTop() > $(window).height() ) {
	          $('.upBtn').fadeIn();
	          $('.upBtn').css('opacity', 0.6);
	      } else {
	          $('.upBtn').fadeOut(0);
	          $('.upBtn').css('opacity', 0.6);
	      }
	  });

		$('.upBtn').mouseleave(function(){
			$(this).css('opacity', 0.6);
		});
		$('.upBtn').mouseenter(function(){
			$(this).css('opacity', 1);
		});

		if( $('a').is('.upBtn') ) {

			$('.upBtn').on('click', function(e) {

				$('body').animate({
					scrollTop: 0
				}, 800);

			});
			//
		}
	//
	//========================================//


	//========================================//
	//================ ФУНКЦИИ ===============//
	//========================================//
		function textToNumber ( text ) {
			return +text.replace(/\s/g, "");
		}

		//Движение стрелок меню
		function jumpingElem(elem, arrow, amplitude) {

			var obj1, obj2;

			switch(arrow){
				case 'top': {
					obj1 = {
						top: amplitude
					}
					obj2 = {
						top: 0
					}
					break;
				}
				case 'bottom': {
					obj1 = {
						bottom: amplitude
					}
					obj2 = {
						bottom: 0
					}
					break;
				}
				case 'left': {
					obj1 = {
						left: amplitude
					}
					obj2 = {
						left: 0
					}
					break;
				}
				case 'right': {
					obj1 = {
						right: amplitude
					}
					obj2 = {
						right: 0
					}
					break;
				}
			}

			setInterval( function() {
				elem.animate(obj1, 500);
				elem.animate(obj2, 500);
			},1000);
		}
	//========================================//


	$('.ac-container').accordion();


	//Добавление в корзину
	if( $('a').is('.toCart') || $('button').is('.addToCart') ) {

		var cartcount = 0;
		var cartValue = $('.menu-right .cart-btn span.cartcount');

		if( cartValue.text() != '' ) {
			cartcount = textToNumber( cartValue.text() );
		}


		$('a.toCart').on('click', function(e) {
			e.preventDefault(e);

			cartcount++;

			$.each( $('span.cartcount'), function(){
				$(this).text( cartcount );
			});

			$('.modal-container').show();
			$('#tocart-example').show();

		});

		$('button.addToCart').on('click', function(e) {
			e.preventDefault(e);

			cartcount++;

			$.each( $('span.cartcount'), function(){
				$(this).text( cartcount );
			});

			$('.modal-container').show();

			var win = $('#tocart-example');
			win.find('.act').css('opacity', 0);


			setTimeout(function(){

				var body = win.find('.body');
				var act = win.find('.act');

				body.animate({
					height: act.height() + 20
				});

				act.css('position', 'absolute');
				act.css('margin', '0 -25px');
				act.css('opacity', 1);
				act.css('top', -act.height()-25 );


				act.animate({
					top: 25
				}, 300);

			}, 500);



			//act.css('position', 'absolute');


			win.show();

		});

	}


	function toCart(prod_id, prod_quantity) {

		var request = $.ajax({
			method: 'GET',
			url: '/',
			data: {
				prod_id: prod_id,
				prod_quantity: prod_quantity
			}
		});

		request.done(function(msg){
			alert('ok');
		});

		request.fail(function(jqXHR, textStatus) {
			alert('Request failed:'+textStatus);
		});

	}
	if( $('div').is('#another-items') ) {
		$('#another-items').slider( $('.another-items .arrows.prev'), $('.another-items .arrows.next'), '.item', 3 );
	}

	///END///
});

(function ($) {
	$.fn.showMoreRadio = function () {
		$(this).on('click', function(e) {
			e.preventDefault();

			var block = $(this).parent().find('.text');
			var i = $(this).parent().find('.fa');
			$(this).empty();

			if( $(this).attr('state') == 'hidden' ) {
				$(this).attr('state', 'open');
				/*i.removeClass('fa-angle-down');
				i.addClass('fa-angle-up');*/
				$(this).append('свернуть <i class="fa fa-angle-up" aria-hidden="true"></i>')

				block.slideToggle(500);
			} else {
				$(this).attr('state', 'hidden');
				/*i.removeClass('fa-angle-up');
				i.addClass('fa-angle-down');*/
				$(this).append('подробнее <i class="fa fa-angle-down" aria-hidden="true"></i>')
				block.slideToggle(500);
			}
		});
	}
})(jQuery);


(function ($) {
	$.fn.accordion = function ( plus, minus ) {

		var accordion = $(this);
		var acButton = accordion.find('.ac-title');
		var acList = accordion.find('.ac-list');

		acList.css('display', 'none');
		acButton.attr('state', 'close');

		acButton.on('click', function(e) {
			e.preventDefault();

			var stateIcon = $(this).find('span.state');

			if ( $(this).attr('state') == 'close' ) {
				$(this).attr('state', 'open');
				$(this).parent().addClass('active');
				$(this).addClass('active');
				stateIcon.addClass('open');
				stateIcon.removeClass('close');

			} else {
				$(this).attr('state', 'close');
				$(this).parent().removeClass('active');
				$(this).removeClass('active');
				stateIcon.addClass('close');
				stateIcon.removeClass('open');

			}

			$(this).parent().parent().find('.ac-list').slideToggle();
		});
		$.fn.accordOpen = function(){
			$(this).attr('state', 'open');
			$(this).parent().addClass('active');
			$(this).addClass('active');
			$(this).find('.icon').css('backgroundImage', 'url(images/icons/minusgray.png)');
			$(this).parent().parent().find('.ac-list').slideToggle();
		}

	}
})(jQuery);



(function ($) {
	$.fn.slider = function(prev, next, items, toShow, delay) {

		var self = $(this);

		var width = $(this).find('.elem-container').width() / 3;
		var elements   = $(this).find(items);
		console.log(elements.width());

		var h = 0;

		$.each(elements, function() {
			$(this).width(width);
			$(this).find('img').width('100%');
			h = $(this).height();
		})
		$(this).height(h);


		var itemWidth  = width;
		var itemsCount = elements.length;
		var itemsWidth = itemWidth * itemsCount;

		var count = 0;
		var pos = 0;

		var cont = $(this).find('.wrapper:first');
		cont.width( itemsWidth );

		cont.draggable({
			axis: "x",
			drag: function(event, ui) {

				var pos = ui.position.left;

				if( pos < -415 ) {
					self.draggable("disable");
				}
				if( pos > 0 ) {
					self.draggable("disable");
				}
			}
		});


		//Arrows
		prev.on('click', function(e) {
			e.preventDefault();

			if ( count > 0 ) {
				pos += itemWidth;
				count--;
			}

			cont.animate({
				left: pos
			});
		})

		next.on('click', function(e) {
			e.preventDefault();

			var end = itemsCount - toShow;

			if ( count < end ) {
				pos -= itemWidth;
				count++;
			}

			cont.animate({
				left: pos
			});
		});
	};
})(jQuery);


// ----------------------------------------------------------------------------/
// /-> Фиксированное меню
// ----------------------------------------------------------------------------/
;(function($){
  /*
    1) block
      1. fixedBlockParent   // Блок внутри которого позиционируется элемент.
      2. fixedBlock         // Позиционируемый блок.
      3. relativeBlock      // Блок, относительно кторого идет позиционирование
    2) padding              // Отступы от края экрана
    3) css                  // Специфические параметры CSS
  */
  $.fn.onScrollBoxFixedV2 = function(block, padding, css) {

    "use strict";

    block.fixedBlock.css('margin-bottom', css.marginBottom ? css.marginBottom : 0 );


    //==========================================================================

    //var self = $(this);                                                         // текущий элемент
    //var container_Height = $(this).height();                                    // Высота контейнера / Высота основного блока
    var WINDOW_DOM = $(window);

    var relativeBlock_Height = block.relativeBlock.outerHeight(true);             // Высота блока с основным содержимым
    var fixedBlockParent_Height = block.fixedBlockParent.outerHeight(true);       // Высота родителя позиционируемого блока
    var fixedBlock_Height = block.fixedBlock.outerHeight(true);                   // Высота позиционируемого блока

    var document_Height = $(document).height(); // Высота страницы
    var window_Height = WINDOW_DOM.height();     // Высота окна

    var way = 'default'; // Направление прокрутки
    var tmpScroll = 0;   // Величина прокрутки
    //==========================================================================

    WINDOW_DOM.on('scroll', function(){setPosition(false)});
    WINDOW_DOM.on('resize', setParams);

    block.fixedBlock.on('resize', function(){
      setParams();
      setPosition(true);
    });
    //==========================================================================

    function setParams() {
      relativeBlock_Height = block.relativeBlock.outerHeight(true);             // Высота блока с основным содержимым
      fixedBlockParent_Height = block.fixedBlockParent.outerHeight(true);       // Высота родителя позиционируемого блока
      fixedBlock_Height = block.fixedBlock.outerHeight(true);                   // Высота позиционируемого блока

      document_Height = $(document).height(); // Высота страницы
      window_Height = WINDOW_DOM.height();     // Высота окна
    }
    function setPosition(isClick) {
      var padding_Top = (padding.top) ? padding.top : 0;
      var padding_Bottom = (padding.bottom) ? padding.bottom : 0;

      if ( fixedBlock_Height > window_Height - padding_Top - padding_Bottom && fixedBlock_Height > relativeBlock_Height ) {
        // Если фиксируемый блок больше, чем основное содержимое, то ничего не делаем
        block.fixedBlockParent.height('initial');
      } else {
        // Иначе задаем родителю высоту, равную основному содержимому
        block.fixedBlockParent.height( relativeBlock_Height );
      }

      //var scroll = $(window).scrollTop();                                       // Величина прокрутки страницы
      var scroll = WINDOW_DOM.scrollTop();                                       // Величина прокрутки страницы

      //Направление прокрутки
      if ( scroll > tmpScroll ) {
        way = 'down';
      } else {
        way = 'up';
      }
      //Сохраняем текущее состояние
      tmpScroll = scroll;

      relativeBlock_Height = block.relativeBlock.outerHeight(true);
      fixedBlockParent_Height = block.fixedBlockParent.height();
      fixedBlock_Height = block.fixedBlock.outerHeight(true);


      // Верхняя граница
      var upperBound = block.fixedBlockParent.offset().top;
      // Нижняя граница
      var bottomBound = document_Height - window_Height - (document_Height - block.bottomAge.offset().top);

      var fixedBlock_Top = block.fixedBlock.offset().top;
      var areaHigher = fixedBlock_Top - upperBound;
      var areaToBottomScreen = window_Height - fixedBlock_Height;


      if ( fixedBlock_Height < window_Height - padding_Top - padding_Bottom ) {
        // Если фиксируемый блок целиком помещается на экране,
        // то просто фиксируем его

        if ( scroll <= upperBound - padding_Top ) {
          setBoxPosition(block.fixedBlock, {position: 'absolute', top: 0, bottom: 'auto', right:0 });
          // console.log(0);
        } else if ( scroll > upperBound - padding_Top && scroll < block.bottomAge.offset().top - fixedBlock_Height - padding_Top) {
          setBoxPosition(block.fixedBlock, {position: 'fixed', top: padding_Top, bottom: 'auto', right: 'auto'});
          // console.log(1);
        } else {
          setBoxPosition(block.fixedBlock, {position: 'absolute', top: 'auto', bottom: 0, right:0 });
          // console.log(2);
        }

      } else if ( fixedBlock_Height > window_Height - padding_Top - padding_Bottom && fixedBlock_Height - 10 < relativeBlock_Height ) {
        // Если фиксируемый блок не помещается на экране
        // и он меньше основного содержимого

        if ( way == 'down' ) {
          // Если скроллим страницу вниз
          if ( scroll < fixedBlock_Height - 10 - window_Height + upperBound + areaHigher ) {
            setBoxPosition(block.fixedBlock, {position: 'absolute', top: areaHigher, bottom: 'auto', right:0 });
            //console.log(3);
          } else {
            setBoxPosition(block.fixedBlock, {position: 'fixed', top: 'auto', bottom: padding_Bottom, right: 'auto'});
            //console.log(4);
          }
          if ( scroll > bottomBound ) {
            setBoxPosition(block.fixedBlock, {position: 'absolute', top: 'auto', bottom: 0, right:0 });
            //console.log(5);
          }
        } else {
          // Если скроллим страницу вверх
          if ( scroll > upperBound - padding_Top && scroll <= fixedBlock_Top - padding_Top ) {
            setBoxPosition(block.fixedBlock, {position: 'fixed', top: padding_Top, bottom: 'auto', right: 'auto'});
            //console.log(6);
          } else if ( scroll <= upperBound - padding_Top ) {
            setBoxPosition(block.fixedBlock, {position: 'absolute', top: 0, bottom: 'auto', right:0 });
            //console.log(7);
          } else if ( scroll > bottomBound - upperBound - fixedBlock_Height && isClick ) {
            setBoxPosition(block.fixedBlock, {position: 'absolute', top: 'auto', bottom: 0, right:0 });
            //console.log(8);
          } else {
            setBoxPosition(block.fixedBlock, {position: 'absolute', top: areaHigher, bottom: 'auto', right:0 });
            //console.log(9);
          }
        }
      } else {
        // В случае, если фиксируемый блок не момещается на экране
        // и он больше основного содержимого,
        // то ичего не делаем с блоком

        setBoxPosition(block.fixedBlock, {position: 'initial'});
        // console.log(9);
      }

    }
    function setBoxPosition(elem, position) {
      elem.css('position', position.position);
      elem.css('top', position.top);
      elem.css('right', 'auto');
      elem.css('bottom', position.bottom);
      elem.css('left', position.left);
      elem.width(elem.parent().width());
    }

    return block;
  };

})(jQuery);
// <---------------------------------------------------------------------------/
