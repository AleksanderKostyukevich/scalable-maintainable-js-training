var APP = APP || {};

APP.Quiz = (function (APP, $, undefined) {
    var defaults = {};//defaults static init options
    
    return function (options) {
		this.options = $.extend({}, defaults, options);
        this.ID = options.ID;
        this.questions = this.options.questions;
		this.element = this.options.element;
		this.event = this.options.event;
		this.maxQuestionIndex = this.questions.length - 1;
        
        this.start = function () {
			this.earnedPoints = 0;
           //show first question
			this.showQuestion(0);
        };
		
		this.init = function() {};
		
		this.destroy = function() {};
        
        this.showQuestion = $.proxy(function (qIndex) {
            var $elem = $(this.element),
				answerHandler = this.answerHandler,
				qObj= this.questions[qIndex],
				pnts = qObj.points,
				$q = $('<span data-question-index="' + qIndex + '">' + qObj.question + '<br/></span>'),
				$ans;
			$elem.empty();
			$elem.append($q);
			$.each(qObj.answers, function(i, ans) {
				$ans = $('<input type = "checkbox" data-points="' + pnts[i] + '">' + ans + '</input><br/>');
				$ans.on('click', answerHandler);
				$q.append($ans);
			});
        }, this);
		
		this.answerHandler = $.proxy(function(e) {
			var $selectedAnswer = $(e.currentTarget),
				questionIndex = $selectedAnswer.closest('span').data('question-index'),
				points = $selectedAnswer.data('points');
			this.earnedPoints += points;
			if (this.maxQuestionIndex > questionIndex) {
				this.showQuestion(++questionIndex);
			} else {
				$(this.element).empty();
				//inform render module
				APP.EventBus.trigger(this.event, {earnedPoints: this.earnedPoints});
			}
		}, this);
    };
}(APP, jQuery));