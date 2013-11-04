;(function ( $, window, document, undefined ) {
 
    var pluginName = "quiz",
        defaults = {};
 
    function Quiz( element, options ) {
        this.element = element;    
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
 
    Quiz.prototype.init = function () {
        var questPath = this.options.questionsFilePath,
			event = this.options.event,
			questions = [],
			earnedPoints = 0,
			maxQuestionIndex,
			$elem = $(this.element),
			showQuestion = function(qIndex) {
				$elem.empty();
				var qObj = questions[qIndex],
					pnts = qObj.points,
					$q = $('<span data-question-index="' + qIndex + '">' + qObj.question + '<br/></span>'),
					$ans;
				$elem.append($q);
				$.each(qObj.answers, function(i, ans) {
					$ans = $('<input type = "checkbox" data-points="' + pnts[i] + '">' + ans + '</input><br/>');
					$ans.on('click', answerHandler);
					$q.append($ans);
				});
			},
			answerHandler = function(e) {
				var $selectedAnswer = $(e.currentTarget),
					questionIndex = $selectedAnswer.closest('span').data('question-index'),
					points = $selectedAnswer.data('points');
				earnedPoints += points;
				if (maxQuestionIndex > questionIndex) {
					showQuestion(++questionIndex);
				} else {
					$elem.empty();
					//inform render plugin
					APP.EventBus.trigger(event, {earnedPoints: earnedPoints});
				}
			};
				
		$.getJSON(questPath, function(data) {
			$.each(data, function(i, d) {
				questions.push(d);
			});
			maxQuestionIndex = questions.length - 1;
			//show first question
			showQuestion(0);
		}).error(function(){
            console.log('Download questions.json file error');
		});
    };
 
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new Quiz( this, options ));
            }
        });
    }
 
})( jQuery, window, document );