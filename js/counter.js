$(document).ready(function() {
	"use strict";

	if( $('div').is('.counter-group') ) {

		/*$('.count').on('change', function(e) {

		});*/


		$('.count').focusout(function() {
			if ( $(this).val() == '' ) {
				$(this).val(1);
			}
		});

		$('.counter-js').on('click', function(e) {
			e.preventDefault();

			var count = $(this).parent().find('.count');
			var value = count.val();

			if ( $(this).hasClass('inc_count') ) {
				value++;
				count.val(value);	
			} 

			if ( $(this).hasClass('dec_count') ) {
				if ( value > 1 ) {
					value--;
					count.val(value);
				}
			} 
		});

	}
});