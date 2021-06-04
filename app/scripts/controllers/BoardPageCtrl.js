angular.module('demo').controller('BoardPageCtrl', function ($scope,MyService) {
  $scope.modal = false;
  $scope.task = {};
  const service = MyService;
  const statusConcluido = "CONCLUÍDOS"
  $scope.listToDo = [];
  $scope.listConcluido = [];
  $scope.senhaAdmin = false;
  $scope.admin = {};
  $scope.constSenhaAdmin = "TrabalheNaSaipos"

  $scope.atualizarLista = function(){
    service.buscarTarefasToDo().then(function(response){
      $scope.listToDo = [];
      $scope.listToDo = response.data;
    });
  }

  $scope.atualizarListaConcluido = function(){
    service.atualizarTarefasConcluidas().then(function(response){
      $scope.listConcluido = [];
      $scope.listConcluido = response.data;
    })
  }

  $scope.finalizarInclusao = function(){
      const task = {title: $scope.task.desc, name: $scope.task.name, email: $scope.task.email, qtdMov: 0};
      service.salvarTarefasToDo(task);
      $scope.atualizarLista();
      $scope.modal = false;
  }

  $scope.validarEmail = function(email){
    service.validarEmail(email).then(function(response){
      const validFormat = response.data.format_valid;
      const mxFound = response.data.mx_found;
      if(validFormat && validFormat){
        $scope.finalizarInclusao();
      }else{
        alert("E-mail informado inválido. Preencha novamente!")
      }
    });

  }
  
  $scope.atualizarLista();
  $scope.atualizarListaConcluido();

  $scope.concluirTask = function(tarefa){
    service.excluirTarefaPendente(tarefa);
    $scope.atualizarLista();
    $scope.salvarTarefaConcluida(tarefa);
    $scope.atualizarListaConcluido();
  }

  $scope.excluirTarefa = function(tarefa){
    service.excluirTarefaPendente(tarefa);
    $scope.atualizarLista();
  }

  $scope.salvarTarefaConcluida = function(tarefa){
    service.salvarTarefaConcluida(tarefa);
  }

  $scope.restaurarTarefa = function(tarefa){
    $scope.tarefaAdmin = tarefa;
    if(tarefa.qtdMov > 2){
      alert("Limite de movimentação da tarefa atingido!");
    }else{
      $scope.admin.psw  = "";
      $scope.senhaAdmin = true;
    }
    
  }

  $scope.closeModalAdmin = function(){
    $scope.senhaAdmin = false;
  }

  $scope.pswAdmin = function(){
    if($scope.admin.psw === $scope.constSenhaAdmin){
      $scope.senhaAdmin = false;
      service.excluirTarefaConcluida($scope.tarefaAdmin);
      $scope.atualizarListaConcluido();
      service.salvarTarefasToDo($scope.tarefaAdmin);
      $scope.atualizarLista();
    }else{
      alert("Senha do Administrador inválida!")
    }
  }

  $scope.closeModal = function(){
    $scope.modal = false;
  }

  $scope.addList = function () {
    $scope.lists.push({name: 'new list', tickets: []})
  }

  $scope.addTask = function(){
    if(!!$scope.task.desc && !!$scope.task.name && !!$scope.task.email){
      $scope.validarEmail($scope.task.email);
    }else{
      alert("Campos obrigatórios não preenchidos!")
    }

  }

  $scope.addTicket = function (list) {
    //list.tickets.push({});
    $scope.modal = true;
    $scope.task = {};
  }

  $scope.addRandomTask = function(){
    service.tarefasRandom().then(function (response){
      const tarefasRandom = {data : response.data}
      service.incluirTarefasRandom(tarefasRandom);
      $scope.atualizarLista();
    })
  }

})
