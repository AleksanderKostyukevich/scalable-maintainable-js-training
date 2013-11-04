var APP = APP || {};

;(function(APP, $, undefined){
	APP.init = function(options) {
		var $element = $(options.element);
		$element.quiz(options);
		APP.EventBus.bind(options.event, function(data) {
			$.extend(options, data);
			$element.render(options);
		});
	};
})(APP, jQuery)