(function(){
	'use strict';

	//MODAL FACTORY

	 angular
	 	.module('app')
	 	.factory('ModalFactory', ModalFactory);

	 ModalFactory.$inject = ['$uibModal'];

	 function ModalFactory($uibModal) {
	 	var modalInstance;

	 	var service = {
	 			create: function() {
	 				modalInstance = $uibModal.open({
	 					animation: true,
						ariaLabelledBy: 'modal-title',
						ariaDescribedBy: 'modal-body',
						templateUrl: 'formModal.html',
						controller: ModalAddController,
						size: 'lg',
						keyboard: true
			 		});
			 		return this;
	 			},
	 			update: function(person){
	 				modalInstance = $uibModal.open({
	 					animation: true,
						ariaLabelledBy: 'modal-title',
						ariaDescribedBy: 'modal-body',
						templateUrl: 'formModal.html',
						controller: ModalUpdateController,
						size: 'lg',
						keyboard: true,
						resolve: {
							person: function() { return person; }
						}
			 		});
			 		return this;
	 			},
	 			delete: function(person){
	 				modalInstance = $uibModal.open({
	 					animation: true,
	 					ariaLabelledBy: 'modal-title',
						ariaDescribedBy: 'modal-body',
						templateUrl: 'formModal.html',
						controller: ModalDeleteController,
						size: 'lg',
						keyboard: false,
						resolve: {
							person: function() { return person; }
						}
	 				})
	 			},
	 			then: function (fnClose, fnDismiss) {
	                modalInstance.result.then(fnClose, fnDismiss);
	                return this;
            	},
            	instance: function () {
                	return modalInstance;
            	}

            };

            return service;
        }

    //CONTROLLER ADD MODAL

	angular
		.module('app')
		.controller('ModalAddController', ModalAddController)

    ModalAddController.$inject = ['$scope', '$uibModalInstance'];

	function ModalAddController(ng, $uibModalInstance) {
		ng.title = "Add";

		ng.save = function () {
			$uibModalInstance.close(ng.pessoas);
		}

		ng.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	};

	//CONTROLLER UPDATE MODAL
	angular
		.module('app')
		.controller('ModalUpdateController', ModalUpdateController)

    ModalUpdateController.$inject = ['$scope', '$uibModalInstance', 'person'];

	function ModalUpdateController(ng, $uibModalInstance, person) {		
		ng.pessoas = angular.copy(person);
	 	ng.old = person;
		ng.title = "Update";

		ng.save = function () {
			$uibModalInstance.close(ng.pessoas);
		}

		ng.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		
	};

	//CONTROLLER DELETE MODAL
	angular
		.module('app')
		.controller('ModalDeleteController', ModalDeleteController)

    ModalDeleteController.$inject = ['$scope', '$uibModalInstance', 'person'];

	function ModalDeleteController(ng, $uibModalInstance, person) {		
		ng.pessoas = angular.copy(person);
	 	ng.old = person;
		ng.title = "Delete";
		ng.disableText = true;

		ng.save = function () {
			$uibModalInstance.close(ng.pessoas);
		}

		ng.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		
		
	};

})();

