var img = $('.item_box .img-item'); 
img.on('mouseover', function(e) {
	var elem = $(e.target);

	var length = +$(e.target).attr('data-size');
	var step = 1;
	var path = $(e.target).attr('data-original');
	path = path.substr(0, path.length-5);
	var format = path.substr(-4);

	step++;
	e.target.src = path + step + format;
	
	console.log(e.target.src);
	// setTimeout(function(){
	// 	if (step < length) {
	// 		step++;
	// 		e.target.src = path + step + format;
	// 	}

	// },1000);
});
img.on('mouseleave', function(e) {
	e.target.src = $(e.target).attr('data-original');
});