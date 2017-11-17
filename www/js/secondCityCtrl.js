/**
 * Created by lch on 2017/2/15.
 */
angular.module('starter.secondCityCtrl', [])

  .controller("SecondCityCtrl", ['$scope', '$filter', '$http', '$ionicSideMenuDelegate', '$ionicPopover', '$state', 'hmsPopup', 'TransferService', '$ionicHistory','$stateParams',
    function ($scope,
               $filter,
               $http,
               $ionicSideMenuDelegate,
               $ionicPopover,
               $state,
               hmsPopup,
               TransferService,
               $ionicHistory,
               $stateParams) {
    //省市名称
    $scope.firstCity = $stateParams.firstCity;
      console.info("名称111==>",$scope.firstCity);
    $scope.secondCity = [];
      $scope.chooseCityName = $stateParams.chooseCityName;
      console.info('afqerqervqerqver',$scope.chooseCityName);
    //城市划分
    citySearch();
    function citySearch() {
      var url = 'data/json/weather.json';
      hmsPopup.showLoading("请稍后");
      $http.post(url, '', true).then(function (response) {
        if (response.status == 200) {
          var list = response.data;
          if (list.constructor == Array) {
            if (list.length > 0) {
              angular.forEach(list, function (item) {
                if(item.provinceZh == $scope.firstCity || item.leaderZh == $scope.firstCity){
                  $scope.secondCity.push(item);
                }
              })
            }
          }
          hmsPopup.hideLoading();
        }else{
          hmsPopup.hideLoading();
          hmsPopup.showPopup('连接超时！')
        }
      }, function (response) {
        hmsPopup.hideLoading();
        hmsPopup.showPopup('网络连接错误！')
      });
    }

    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

    $scope.selectCity = function (secondCity) {
      TransferService.set('selectCity', secondCity);
      if($scope.firstCity == '北京' || $scope.firstCity == '上海' || $scope.firstCity == '天津' || $scope.firstCity == '重庆' || $scope.firstCity == '香港' || $scope.firstCity == '澳门'){
        $ionicHistory.goBack(-2);
      }else{
        $ionicHistory.goBack(-3);
      }
      /*$state.go('tab.main');*/
      /*$ionicHistory.goBack(-2);*/
    }
    $scope.addCityUrl = function (secondCity) {
      TransferService.set('addCityName', secondCity);
      if($scope.firstCity == '北京' || $scope.firstCity == '上海' || $scope.firstCity == '天津' || $scope.firstCity == '重庆' || $scope.firstCity == '香港' || $scope.firstCity == '澳门'){
        $ionicHistory.goBack(-2);
      }else{
        $ionicHistory.goBack(-3);
      }
    }

  }])


//json属性定义如下
//id:城市id  cityEn:城市英文  cityZh:城市中文  countryCode:国家代码  countryEn:国家英文  countryZh:国家中文  provinceEn:省英文  provinceEn:省中文  provinceEn:省中文  leaderEn:所属上级市英文  leaderZh:所属上级市中文  lat:纬度  lon:经度

