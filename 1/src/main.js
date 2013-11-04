$(function() {
	APP.init({
		questionsFilePath: '../../questions.json',
		resultsFilePath: '../../results.json',
		element: '.quiz',
		event: 'finishQuiz'
	});
});