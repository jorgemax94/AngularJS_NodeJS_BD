angular.module('demo').service('MyService', function ($http) {
  this.sum = function (a, b) {
    return a + b
  }

  this.salvarTarefasToDo = function(data){
    return $http.post('http://localhost:3000/tarefasPendentes', JSON.stringify(data))
  }

  this.buscarTarefasToDo = function(){
    return $http.get('http://localhost:3000/tarefasIncluidas');
  }

  this.atualizarTarefasConcluidas = function(){
    return $http.get('http://localhost:3000/tarefasConcluidas');
  }

  this.salvarTarefaConcluida = function(data){
    return $http.post('http://localhost:3000/salvarTarefaConcluida', JSON.stringify(data))
  }

  this.excluirTarefaPendente = function(data){
    return $http.post('http://localhost:3000/tarefas',JSON.stringify(data));
  }

  this.excluirTarefaConcluida = function(data){
    return $http.post('http://localhost:3000/excluirTarefaConcluida',JSON.stringify(data));
  }

  this.tarefasRandom = function(){
    return $http.get('http://localhost:3000/dogFact');
  }

  this.incluirTarefasRandom = function(data){
    return $http.post('http://localhost:3000/incluirTarefasRandom',JSON.stringify(data));
  }

  this.validarEmail = function(email){
    var data = {email: email}
    return $http.post('http://localhost:3000/emailVerify/',JSON.stringify(data));
  
  }
})
