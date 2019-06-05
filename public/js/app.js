(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/public/js/app"],{

/***/ "./resources/assets/js/app.js":
/*!************************************!*\
  !*** ./resources/assets/js/app.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * App initial point.
 */
__webpack_require__(/*! ./bootstrap.js */ "./resources/assets/js/bootstrap.js");

/***/ }),

/***/ "./resources/assets/js/app.module.js":
/*!*******************************************!*\
  !*** ./resources/assets/js/app.module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (angular) {
  'use strict';

  angular.module('app', ['ui.bootstrap']);
})(angular);

/***/ }),

/***/ "./resources/assets/js/bootstrap.js":
/*!******************************************!*\
  !*** ./resources/assets/js/bootstrap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */
try {
  window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
} catch (e) {}
/**
 * Dependencies
 */


__webpack_require__(/*! angular */ "./node_modules/angular/index.js");

__webpack_require__(/*! ui-bootstrap4 */ "./node_modules/ui-bootstrap4/index.js");

__webpack_require__(/*! ./app.module */ "./resources/assets/js/app.module.js");

__webpack_require__(/*! ./controllers/index.controller */ "./resources/assets/js/controllers/index.controller.js");

__webpack_require__(/*! ./modals/people.modal */ "./resources/assets/js/modals/people.modal.js");

__webpack_require__(/*! ./directives/modal.directive */ "./resources/assets/js/directives/modal.directive.js");

/***/ }),

/***/ "./resources/assets/js/controllers/index.controller.js":
/*!*************************************************************!*\
  !*** ./resources/assets/js/controllers/index.controller.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  'use strict'; //INDEX

  angular.module('app').controller('IndexController', IndexController);
  IndexController.$inject = ['$scope', '$uibModal', '$log', 'ModalFactory', '$http'];

  function IndexController(ng, $uibModal, $log, mf, $http) {
    ng.people = [{
      name: 'Ali Awada',
      age: 20,
      email: 'ali_awada99@hotmail.com'
    }];
    var url = 'https://my-json-server.typicode.com/awadamiau/fake-json-server/db';
    getPessoas();

    function getPessoas() {
      $http({
        method: 'GET',
        url: url
      }).then(function successCallback(response) {
        ng.pessoas = response.data.records;
      }), function failureCallback(response) {
        console.log("ERRO GET");
      };
    }

    function postPessoas(modalResult) {
      $http({
        method: 'POST',
        url: url,
        data: modalResult
      }).then(function successCallback(response) {
        ng.pessoas.push(modalResult);
      }), function failureCallback() {
        console.log("ERROR POST!");
      };
    }

    function putPessoas(index, modalResult) {
      $http({
        method: 'PUT',
        url: url + '/' + index,
        data: ng.pessoas
      }).then(function successCallback(response) {
        ng.pessoas[index] = modalResult;
      }), function failureCallback(response) {
        console.log("ERROR PUT!");
      };
    }

    function deletePessoas(index) {
      $http({
        method: 'DELETE',
        url: url,
        data: ng.pessoas[index]
      }).then(function successCallback(response) {
        ng.pessoas.splice(index, 1);
      }, function failureCallback(response) {
        console.log("ERROR DELETE!");
      });
    } //////////////////////
    //CALCULADORA


    ng.multiplicar = function (num1, num2) {
      ng.sinal = 'x';
      ng.resp = num1 * num2;
    };

    ng.soma = function (num1, num2) {
      ng.sinal = '+';
      ng.resp = Number(num1) + Number(num2);
    };

    ng.subtrair = function (num1, num2) {
      ng.sinal = '-';
      ng.resp = num1 - num2;
    };

    ng.dividir = function (num1, num2) {
      ng.sinal = '÷';
      ng.resp = num1 / num2;
    };

    ng.modulo = function (num1, num2) {
      ng.sinal = '%';
      ng.resp = num1 % num2;
    }; //CALCULADORA


    ng.reset = reset; //CRUD

    ng.addPerson = function (personName, personAge, personEmail) {
      if (personName == null) {
        personName = 'not set';
      }

      ng.people.push({
        name: personName,
        age: personAge,
        email: personEmail
      });
      reset();
    };

    ng.updatePerson = function (name, age, email, key) {
      ng.people[key].name = name;
      ng.people[key].age = age;
      ng.people[key].email = email;
      ng.edit = false;
    };

    ng["delete"] = function (index) {
      ng.people.splice(index, 1);
    };

    function reset() {
      ng.personName = null;
      ng.personAge = 0;
      ng.personEmail = "";
    } //CRUD
    //FORMULARIO MODAL


    ng.open = function () {
      mf.create();
      mf.instance().result.then(function (modalResult) {
        postPessoas(modalResult);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    ng.openUpdate = function (person, index) {
      mf.update(person);
      mf.instance().result.then(function (modalResult) {
        putPessoas(index, modalResult);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    ng.deletarUmaPessoa = function (person, index) {
      mf["delete"](person);
      mf.instance().result.then(function (modalResult) {
        deletePessoas(index);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    ng.orderBy = function (x) {
      ng.myOrder = x;
    }; //FORMULARIO MODAL

  }
})();

/***/ }),

/***/ "./resources/assets/js/directives/modal.directive.js":
/*!***********************************************************!*\
  !*** ./resources/assets/js/directives/modal.directive.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  'use strict'; //DIRECTIVE PRO FORMULARIO DE CADASTRO

  angular.module('app').directive('modalDirective', ModalDirective);

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

/***/ }),

/***/ "./resources/assets/js/modals/people.modal.js":
/*!****************************************************!*\
  !*** ./resources/assets/js/modals/people.modal.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  'use strict'; //MODAL FACTORY

  angular.module('app').factory('ModalFactory', ModalFactory);
  ModalFactory.$inject = ['$uibModal'];

  function ModalFactory($uibModal) {
    var modalInstance;
    var service = {
      create: function create() {
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
      update: function update(_person) {
        modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'formModal.html',
          controller: ModalUpdateController,
          size: 'lg',
          keyboard: true,
          resolve: {
            person: function person() {
              return _person;
            }
          }
        });
        return this;
      },
      "delete": function _delete(_person2) {
        modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'formModal.html',
          controller: ModalDeleteController,
          size: 'lg',
          keyboard: false,
          resolve: {
            person: function person() {
              return _person2;
            }
          }
        });
      },
      then: function then(fnClose, fnDismiss) {
        modalInstance.result.then(fnClose, fnDismiss);
        return this;
      },
      instance: function instance() {
        return modalInstance;
      }
    };
    return service;
  } //CONTROLLER ADD MODAL


  angular.module('app').controller('ModalAddController', ModalAddController);
  ModalAddController.$inject = ['$scope', '$uibModalInstance'];

  function ModalAddController(ng, $uibModalInstance) {
    ng.title = "Add";

    ng.save = function () {
      $uibModalInstance.close(ng.pessoas);
    };

    ng.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

  ; //CONTROLLER UPDATE MODAL

  angular.module('app').controller('ModalUpdateController', ModalUpdateController);
  ModalUpdateController.$inject = ['$scope', '$uibModalInstance', 'person'];

  function ModalUpdateController(ng, $uibModalInstance, person) {
    ng.pessoas = angular.copy(person);
    ng.old = person;
    ng.title = "Update";

    ng.save = function () {
      $uibModalInstance.close(ng.pessoas);
    };

    ng.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

  ; //CONTROLLER DELETE MODAL

  angular.module('app').controller('ModalDeleteController', ModalDeleteController);
  ModalDeleteController.$inject = ['$scope', '$uibModalInstance', 'person'];

  function ModalDeleteController(ng, $uibModalInstance, person) {
    ng.pessoas = angular.copy(person);
    ng.old = person;
    ng.title = "Delete";
    ng.disableText = true;

    ng.save = function () {
      $uibModalInstance.close(ng.pessoas);
    };

    ng.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

  ;
})();

/***/ }),

/***/ "./resources/assets/sass/app.scss":
/*!****************************************!*\
  !*** ./resources/assets/sass/app.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************************************!*\
  !*** multi ./resources/assets/js/app.js ./resources/assets/sass/app.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\laragon\www\tutorial-angularjs\resources\assets\js\app.js */"./resources/assets/js/app.js");
module.exports = __webpack_require__(/*! C:\laragon\www\tutorial-angularjs\resources\assets\sass\app.scss */"./resources/assets/sass/app.scss");


/***/ })

},[[0,"/public/js/manifest","/public/js/vendor"]]]);