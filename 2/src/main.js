$(function() {
	APP.init({
		questionsFilePath: '../../questions.json',
		resultsFilePath: '../../results.json',
		modules: [
			{
				moduleType: APP.Factory.MODULE_TYPES.QUIZ,
				element: '.quiz1',
				event: 'finishQuiz'
			},
			{
				moduleType: APP.Factory.MODULE_TYPES.QUIZ,
				element: '.quiz2',
				event: 'finishQuiz'
			},
			{
				moduleType: APP.Factory.MODULE_TYPES.RENDER,
				element: '.result',
				event: 'finishQuiz'
			}
		]
	});
});