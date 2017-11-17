/**
 * Created by lch on 2017/2/16.
 */
angular.module('starter.leaderCityCtrl', [])

  .controller("LeaderCityCtrl", ['$scope', '$filter', '$http', '$ionicSideMenuDelegate', '$ionicPopover', '$state', 'hmsPopup', 'TransferService', '$ionicHistory','$stateParams',
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
      $scope.leaderCity = [];
      $scope.leaderCity1 = [];

      $scope.chooseCityName = $stateParams.chooseCityName;
      console.info("名称222==>",$scope.chooseCityName);
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
                  if(item.provinceZh == $scope.firstCity&&item.leaderZh != $scope.firstCity){
                    $scope.leaderCity.push(item);
                  }
                })
              }
            }
            console.info("leader数组==>",angular.toJson($scope.leaderCity,true));
            hmsPopup.hideLoading();
            unique($scope.leaderCity);
          }else{
            hmsPopup.hideLoading();
            hmsPopup.showPopup('连接超时！')
          }
        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showPopup('网络连接错误！')
        });
      }

      //各市数组去重（对象数组，非普通数组，hash判断要具体到对象的属性）
      //把数组元素逐个搬运到另一个数组，搬运的过程中检查这个元素是否有重复，如果有就直接丢掉，用一个hashtable的结构记录已有的元素，避免内层循环
      function unique(leaderCity) {
        var hash = {},
          len = leaderCity.length,
          result = [];

        for (var i = 0; i < len; i++){
          if (!hash[leaderCity[i].leaderZh]){
            hash[leaderCity[i].leaderZh] = true;
            result.push(leaderCity[i].leaderZh);
          }
        }
        $scope.leaderCity1 = result;
      }

      $scope.goBack = function () {
        $ionicHistory.goBack();
      }

      $scope.selectCity = function (leaderZh) {
        console.info("名称==>",leaderZh);
        $state.go('tab.secondCity',{firstCity:leaderZh,chooseCityName:$scope.chooseCityName});
      }

    }])


//json属性定义如下
//id:城市id  cityEn:城市英文  cityZh:城市中文  countryCode:国家代码  countryEn:国家英文  countryZh:国家中文  provinceEn:省英文  provinceEn:省中文  provinceEn:省中文  leaderEn:所属上级市英文  leaderZh:所属上级市中文  lat:纬度  lon:经度

