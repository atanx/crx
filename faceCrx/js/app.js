/**
 * Created by youxiang on 2017/7/4.
 */

var app = angular.module('myApp',[]);

app.controller('myCtrl', function($scope, $http){
 //$scope.input1 = 12;
    $scope.queryDict = function() {
        console.log($scope.kw);
        $http({
            method: 'GET',
            url:'https://www.runoob.com/try/angularjs/data/sites.php'
        }).then(
            function successCallback(response){
                $scope.sites = response.data.sites;
            },
            function errorCallback(response) {
                console.log(response);
            }
        )
    }
});

app.directive('line', function(){
   return {
       restrict: 'E',
       template: '<p> this is a line{{kw}} </p>'
   }
});