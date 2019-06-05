<!DOCTYPE html>
<html lang="pt-br" ng-app="app">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
	<meta name="theme-color" content="#191e33">

	<link rel="stylesheet" type="text/css" href="public/css/app.css">

	<title>Tutorial AngularJS</title>

	<style type="text/css">
		[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
			display: none !important;
		}
	</style>

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

<link rel="icon" href="//angularjs.org/favicon.ico" type="image/x-icon">
<link rel="shortcut icon" href="//angularjs.org/favicon.ico" type="image/x-icon">
</head>
<body ng-controller="IndexController">
	<!--  CALCULADORA   -->
	<div>
		<div class="form-group" id="divForm">
			<h1>Calculadora</h1>
			<label>Choose an option: </label>
			<br>
			<div class="btn-group" role="group" style="margin-bottom: 20px">
				<button ng-click="soma(num1,num2)" class="btn btn-primary"> + </button>
				<button ng-click="subtrair(num1,num2)" class="btn btn-warning"> - </button>
				<button ng-click="multiplicar(num1,num2)" class="btn btn-sucess"> x </button>
				<button ng-click="dividir(num1,num2)" class="btn btn-info"> ÷ </button>
				<button ng-click="modulo(num1,num2)" class="btn btn-danger"> % </button>
			</div>

			<input type="number" ng-model="num1" class="form-control" />
			{{sinal}}
			<input type="number" ng-model=" num2" style="margin-bottom: 20px" class="form-control"/> =
			<span> {{ resp }} </span>
		</div>

		<div class="linha"></div>

		<!--  FORMULÁRIO   -->
		<div>
			<div class="content">
				<h1>Form Modal</h1>

				<button type="button" class="btn btn-danger btn-lg" id="register-btn" ng-click="open()">Cadastrar +</button>
			</div>

			<h5>Tabela dos valores inseridos no formulário</h5>
			<table class="table">
				<tr>
					<th ng-click="orderBy('fname')">First Name</th>
					<th ng-click="orderBy('lname')">Last Name</th>
					<th ng-click="orderBy('age')">Age</th>
					<th ng-click="orderBy('email')">E-mail</th>
					<th>Filter: <input type="text" name="filter" ng-model="filter"></th>
				</tr>
				<tr ng-repeat="person in pessoas | orderBy: myOrder | filter: filter">
					<th>{{ person.fname }}</th>
					<th>{{ person.lname }}</th>
					<th>{{ person.age }}</th>
					<th>{{ person.email }}</th>
					<th>
						<button type="button" name="buttonUpdate" class="btn btn-info btn-sm"
						ng-click="openUpdate(person, $index);old=true">edit</button> </th>
						<th>
							<button type="button" name="buttonDelete" class="btn btn-danger btn-sm"
							ng-click="deletarUmaPessoa(person, $index)">delete</button> </th>
						</tr>
					</table>
				</div>

				<div class="linha"></div>

				<!--  CRUD   -->
				<div class="container">
					<h1>CRUD</h1>
					<div class="row">
						<!--  CREATE   -->
						<div class="form-group">
							<input type="text" ng-model="personName" placeholder="Nome" class="form-control"/>
						</div>
						<div class="form-group">
							<input type="text" ng-model="personAge" placeholder="Idade" class="form-control"/>
						</div>
						<div class="form-group">
							<input type="text" ng-model="personEmail" placeholder="E-mail" class="form-control"/>
						</div>
						<div class="form-group">
							<button type="button" name="button" class="btn btn-primary"
							ng-click="addPerson(personName,personAge,personEmail)">Add person</button>
						</div>
					</div>
				</div>

				<!--  READ,UPDATE,DELETE   -->
				<div class="col-sm-8 col-md-8">
					<div class="row text-center">
						<h4 style="font-weight:bold; color:black;">People</h4>
					</div>
					<ul class="list-group">
						<li class="list-group-item" ng-repeat="person in people">
							<span ng-hide="edit">
								<p class="badge"><b>name: {{person.name}}</b> | age: {{person.age}} | email: {{person.email}}</p>
								<span class="pull-right">
									<button type="button" name="button" class="btn btn-info btn-sm" ng-click="edit=true">edit</button>
									<button type="button" name="button" class="btn btn-danger btn-sm" ng-click="delete($index)">delete</button>
								</span>
							</span>
							<span ng-show="edit">
								<input type="text" ng-model="person.name">
								<input type="text" ng-model="person.age">
								<input type="text" ng-model="person.email">
								<button type="button" name="button" class="btn btn-primary btn-sm" ng-click="updatePerson(person.name,person.age,person.email,$index);edit=false">update</button>
							</span>
						</li>
					</ul>
				</div>
			</div>

			<div class="linha"></div>

			<!--  CAROUSEL   -->
			<!--
			<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
				<div class="carousel-inner">
					<div class="carousel-item active">
						<img class="d-block w-100" src="images/borboleta.jpg" alt="First slide">
					</div>
					<div class="carousel-item">
						<img class="d-block w-100" src="images/lobo.jpg" alt="Second slide">
					</div>
					<div class="carousel-item">
						<img class="d-block w-100" src="images/beija-flor.jpg" alt="Third slide">
					</div>
				</div>
				<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
			 -->

	<toaster-container toaster-options="{ 'time-out': 8000, 'close-button': true }"></toaster-container>

	<script type="text/javascript" src="/public/js/manifest.js"></script>
	<script type="text/javascript" src="/public/js/vendor.js"></script>
	<script type="text/javascript" src="/public/js/app.js"></script>
	<script async src="http://localhost:3000/browser-sync/browser-sync-client.js"></script>
</body>
</html>