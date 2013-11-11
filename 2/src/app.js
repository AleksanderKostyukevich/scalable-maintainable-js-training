var APP = APP || {};

;(function(APP, $, undefined){
	APP.init = function(options) {
		var modulesToInit = options.modules,
			qR = $.getJSON(options.questionsFilePath, function(data) {
				$.extend(options, {questions: data});
			}).error(function(){
				console.log('Download questions.json file error');
			}),
			rq = $.getJSON(options.resultsFilePath, function(data) {
				$.extend(options, {results: data});
			}).error(function(){
				console.log('Download results.json file error');
			});
		//download data
		$.when(qR, rq).done(function() {
			var modules = APP.modules || (APP.modules = {});
			$.each(modulesToInit, function(i, module) {
				var moduleOptions = $.extend({}, options, module),
					mds = modules[moduleOptions.moduleType] || (modules[moduleOptions.moduleType] = []),
					newModule = APP.Factory.buildModule(moduleOptions);
				newModule.init();
				mds.push(newModule);
			});
			//start quiz
			$.each(modules[APP.Factory.MODULE_TYPES.QUIZ], function(i, quizModule) {
				quizModule.start();
			});
		});
	};
	
	APP.destroy = function() {
		$.each(APP.modules, function(i, module) {
			module.destroy();
		});
	};
})(APP, jQuery)