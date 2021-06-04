angular.module('demo', ['ngRoute', 'dndLists']).config(function ($routeProvider) {

  $routeProvider
    .when('/board', {
      controller: 'BoardPageCtrl',
      templateUrl: '/app/views/board_page.html'
    })
    .otherwise({redirectTo: '/board'})
})
