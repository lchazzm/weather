/**
 * Created by lch on 2017/1/20.
 */
angular.module('starter.cityCtrl',[])

  .controller("CityCtrl",['$scope','$filter','$http','$ionicSideMenuDelegate','$ionicPopover','$state','hmsPopup','TransferService','$ionicHistory','$timeout','$stateParams',function (
    $scope,
    $filter,
    $http,
    $ionicSideMenuDelegate,
    $ionicPopover,
    $state,
    hmsPopup,
    TransferService,
    $ionicHistory,
    $timeout,
    $stateParams) {

    $scope.chooseCityName = $stateParams.chooseCityName;
    console.info('数据检查==>',$scope.chooseCityName);

    //城市选择
    $scope.city='';
    $scope.cityArr = ['北京','上海','天津','重庆','香港','澳门','台湾','黑龙江',
                       '吉林','辽宁','内蒙古','河北','河南','山西','山东','江苏',
                       '浙江','福建','江西','安徽','湖北','湖南','广东','广西',
                       '海南','贵州','云南','四川','西藏','陕西','宁夏','甘肃',
                       '青海','新疆'];

    console.info('各省数组==>',angular.toJson($scope.cityArr,true));
    $scope.timer = '';//避免并发问题
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

    $scope.selectCity = function (city) {
      if($scope.timer){
        $timeout.cancel($scope.timer);
        $scope.timer = '';
      }
        $scope.timer=$timeout(function () {
          TransferService.set('selectCity',city);
          $ionicHistory.goBack();
        },1000)


    }

    $scope.secondCity = function (firstCity) {
      if(firstCity == '北京' || firstCity == '上海' || firstCity == '天津' || firstCity == '重庆' || firstCity == '香港' || firstCity == '澳门'){
        console.info('数据检查111==>',$scope.chooseCityName);
        $state.go('tab.secondCity',{firstCity:firstCity,chooseCityName:$scope.chooseCityName});
      }else{
        $state.go('tab.leaderCity',{firstCity:firstCity,chooseCityName:$scope.chooseCityName});
      }
      console.info('省市名称==>',firstCity);
    }
  }])


//json属性定义如下
//id:城市id  cityEn:城市英文  cityZh:城市中文  countryCode:国家代码  countryEn:国家英文  countryZh:国家中文  provinceEn:省英文  provinceEn:省中文  provinceEn:省中文  leaderEn:所属上级市英文  leaderZh:所属上级市中文  lat:纬度  lon:经度

