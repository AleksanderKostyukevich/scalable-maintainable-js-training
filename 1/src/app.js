var APP = APP || {};

;(function(APP, $, undefined){
	APP.init = function(options) {
		var $element = $(options.element), 
			eventCallback = function(data) {
				$.extend(options, data);
				$element.render(options);
			};
		$element.quiz(options);
		APP.EventBus.unbind(options.event, eventCallback).bind(options.event, eventCallback);
	};
})(APP, jQuery)