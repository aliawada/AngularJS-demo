(function(){
	'use strict';

	//INDEX
	angular
	.module('app')
	.controller('IndexController', IndexController);

	IndexController.$inject = ['$scope', '$uibModal', '$log', 'ModalFactory', '$http'];	

	function IndexController(ng, $uibModal, $log, mf, $http)
	{


		ng.people = [
		{
			name:'Ali Awada',
			age:20,
			email:'ali_awada99@hotmail.com'
		}
		];

		var url = 'https://my-json-server.typicode.com/awadamiau/fake-json-server/db';

		getPessoas();

		function getPessoas() {
			$http({
				method: 'GET',
				url: url
			}).then(function successCallback(response) {
				ng.pessoas = response.data.records;
			}), function failureCallback(response){
				console.log("ERRO GET");
			};
		}

		function postPessoas(modalResult) {
			$http({
				method: 'POST',
				url: url,
				data: modalResult
			}).then( function successCallback(response) {
				ng.pessoas.push(modalResult);
			}), function failureCallback(){
				console.log("ERROR POST!");
			}
		}

		function putPessoas(index, modalResult) {
			$http({
				method: 'PUT',
				url: url + '/' + index,
				data: ng.pessoas
			}).then( function successCallback(response) {
				ng.pessoas[index] = modalResult;
			}), function failureCallback(response){
				console.log("ERROR PUT!");
			}
		}

		function deletePessoas(index){
			$http({
				method: 'DELETE',
				url: url,
				data: ng.pessoas[index]
			}).then(function successCallback(response) {
				ng.pessoas.splice(index, 1);
			}, function failureCallback(response) {
				console.log("ERROR DELETE!");
			});
		}


		//////////////////////

		//CALCULADORA
		ng.multiplicar = function(num1, num2) {
			ng.sinal = 'x';
			ng.resp = num1 * num2;
		}

		ng.soma = function(num1, num2) {
			ng.sinal = '+';
			ng.resp = Number(num1) + Number(num2);
		};

		ng.subtrair = function(num1, num2) {
			ng.sinal = '-';
			ng.resp = num1 - num2;
		};
		ng.dividir = function(num1, num2) {
			ng.sinal = '÷';
			ng.resp = num1 / num2;
		};
		ng.modulo = function(num1, num2) {
			ng.sinal = '%';
			ng.resp = num1 % num2;
		}
		//CALCULADORA

		ng.reset = reset;

		//CRUD
		ng.addPerson=function(personName,personAge,personEmail){

			if(personName == null){
				personName = 'not set';
			}

			ng.people.push({
				name:personName,
				age:personAge,
				email:personEmail
			});

			reset();
		};

		ng.updatePerson=function(name,age,email,key){
			ng.people[key].name=name;
			ng.people[key].age=age;
			ng.people[key].email=email;
			ng.edit=false;
		}

		ng.delete = function(index){
			ng.people.splice(index, 1);
		}

		function reset(){
			ng.personName = null;
			ng.personAge = 0;
			ng.personEmail = "";
		}
		//CRUD

		//FORMULARIO MODAL
		ng.open = function(){
			mf.create();

			mf.instance().result.then(function (modalResult) {
				postPessoas(modalResult);
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

		ng.openUpdate = function(person, index){
			mf.update(person);

			mf.instance().result.then(function (modalResult) {
				putPessoas(index, modalResult);
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

		ng.deletarUmaPessoa = function(person, index){
			mf.delete(person);

			mf.instance().result.then(function (modalResult) {
				deletePessoas(index);
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

		ng.orderBy = function(x) {
			ng.myOrder = x;
		}

		//FORMULARIO MODAL

	}

})();
