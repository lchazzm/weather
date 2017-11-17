/**
 * Created by lch on 2017/1/9.
 */
angular.module('starter.15weatherCtrl',[])
.controller("15Weather",['$scope','$http','$ionicSideMenuDelegate',function ($scope,$http,$ionicSideMenuDelegate) {
 /* getWeather($scope.city);
  //调用综合天气预报接口
  function getWeather(city) {
    var url = 'https://free-api.heweather.com/v5/weather?'+'city='+city+'&key=555f3232dcdd40fe9e30fec30d78ac7c';
    hmsPopup.showLoading("请稍后");
    $scope.city = city;
    $http.post(url, '', true).then(function (response) {
      console.info('接口列表==>', angular.toJson(response, true));
      if (response.status == 200) {
        /!*近三日天气情况*!/
        $scope.daily_forecast = [];
        if(response.data.HeWeather5[0] && response.data.HeWeather5[0].daily_forecast){
          var responseData = response.data.HeWeather5[0].daily_forecast;
          $scope.daily_forecast = responseData;
        }
        console.info('近三日==>',$scope.daily_forecast);

        hmsPopup.hideLoading();
      }
    }, function (response) {
      hmsPopup.hideLoading();
      hmsPopup.showPopup('网络连接错误！')
    });
  };*/

}])
