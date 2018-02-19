var img_timer;

//Image changer
var img = $('.item_box .img-item'); 
img.on('mouseover', function(e) {
	var elem = $(e.target);

	var length = +$(e.target).attr('data-size');
	var step = 1;
	var path = $(e.target).attr('data-original');
	var format = path.substr(-4);
	path = path.substr(0, path.length-5);
	
	img_timer = setTimeout(function tick() {
		step++;
		if (step > length) {
			step = 1;
		}
		console.log(step);
		$(e.target).attr('src', path + step + format);
		img_timer = setTimeout(tick, 1000);
	}, 1000);

});
img.on('mouseleave', function(e) {
	clearTimeout(img_timer);
	e.target.src = $(e.target).attr('data-original');
});
//----------------------------------------------------------
// $('#fullpage').on('scroll', function(e) {
// 	e.preventDefault();
// 	console.log('asd');
// 	$('.miko-slide_page.active').find('.list_item').addClass('active');
// });