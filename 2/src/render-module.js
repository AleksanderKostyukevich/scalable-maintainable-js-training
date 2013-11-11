var APP = APP || {};

APP.Render = (function (APP, $, undefined) {
	var defaults = {};//defaults static init options
    
	//static function for calculation status
	function calcStatus(earnedPoints, results) {
		var status = 'no status',
			statusPoints = 0,
			result;
		for (var i = 0; i < results.length; i++) {
			result = results[i];
			if (earnedPoints >= result.to && statusPoints < result.to) {
				status = result.status;
				statusPoints = result.to;
			}
		}
		return status;
	};
	
    return function (options) {
		this.options = $.extend({}, defaults, options);
        this.ID = this.options.ID;
		this.results = this.options.results;
		this.element = this.options.element;
		this.event = this.options.event;
		
		this.init = function() {
			APP.EventBus.bind(this.event, this.show);
		};
		
		this.destroy = function() {
			APP.EventBus.unbind(this.event, this.show);
		};
        
        this.show = $.proxy(function (options) {
			var earnedPoints = options.earnedPoints,
				$elem = $(this.element),
				status = calcStatus(earnedPoints, this.results),
				clickButtonHandler = function(e) {
					$elem.empty();
				};
			$elem.empty();
			$result = $('<span>Status: ' + status + '<br/>' + 'Earned points: ' + earnedPoints + '</span>');
			$button = $('<button>Close</button>');
			$button.on('click', clickButtonHandler);
			$elem.append($result);
			$elem.append($button);
        }, this);
    };
})(APP, jQuery);