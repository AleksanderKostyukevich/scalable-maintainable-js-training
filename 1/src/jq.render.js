;(function ( $, window, document, undefined ) {
 
    var pluginName = "render",
        defaults = {};
 
    function Render( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
 
    Render.prototype.init = function () {
        var resultsPath = this.options.resultsFilePath,
			earnedPoints = this.options.earnedPoints,
			$elem = $(this.element),
			status = 'no status',
			statusPoints = 0,
			clickButtonHandler = function(e) {
				$elem.empty();
			};
			
		$.getJSON(resultsPath, function(data) {
			$.each(data, function(i, r) {
				if (earnedPoints >= r.to && statusPoints < r.to) {
					status = r.status;
					statusPoints = r.to;
				}
			});
			
			$result = $('<span>Status: ' + status + '<br/>' + 'Earned points: ' + earnedPoints + '</span>');
			$button = $('<button>Close</button>');
			$button.on('click', clickButtonHandler);
			$elem.append($result);
			$elem.append($button);
		}).error(function(){
            console.log('Download results.json file error');
		});  
    };
 
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new Render( this, options ));
            }
        });
    }
 
})( jQuery, window, document );