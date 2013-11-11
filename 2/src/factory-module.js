var APP = APP || {};
APP.Factory = (function (APP, $, undefined) {
	//private utility function
	function generateModuleId() {
		var newId = 'xxxx-xxxx-yxxx-yxxx-xxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		return newId;
	};

	function Factory() {
		if (arguments.callee.factoryInstance) {
			return arguments.callee.factoryInstance;
		}
		
		this.MODULE_TYPES = {
			QUIZ: 'quiz',
			RENDER: 'render'
		};
		
		this.init = function() {
			this.typeToModuleMap = {};
			this.typeToModuleMap[this.MODULE_TYPES.QUIZ] = this.buildQuizModule;
			this.typeToModuleMap[this.MODULE_TYPES.RENDER] = this.buildRenderModule;
		};

		this.buildModule = function(options) {
			var options = $.extend({}, options, {ID: generateModuleId()}),
				requireType = options.moduleType;
			return this.typeToModuleMap[requireType](options);
		};
		
		this.buildQuizModule = function(options) {
			return new APP.Quiz(options);
		};
		
		this.buildRenderModule = function(options) {
			return new APP.Render(options);
		};
		
		//initialize factory
		this.init();
		arguments.callee.factoryInstance = this;
	};
	
	Factory.getInstance = function() {
		var instance = new Factory();
		return instance;
	};
	
	return Factory.getInstance();
})(APP, jQuery); 