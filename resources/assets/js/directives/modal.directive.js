(function(){
	'use strict';

//DIRECTIVE PRO FORMULARIO DE CADASTRO
angular
.module('app')
.directive('modalDirective', ModalDirective);

	function ModalDirective() {

		return {
			
			scope: {
				labelName: '@label',
				fieldModel: '=ngModel',
				fieldName: '@name',
				inputType: '@type',
				disableText: '=ngDisabled'
			},

			template: '<div class="form-group">\
							<label class="control-label">{{ labelName }}</label>\
							<input class="form-control" type="{{ inputType }}" name="{{ fieldName }}" ng-model="fieldModel" ng-disabled="disableText" required>\
						 </div>'
		};
	}

})();