/**
 * Created by lch on 2017/1/13.
 */

angular.module('starter.airCtrl',[])

  .controller("AirCtrl",['$scope','$filter','$http','$ionicSideMenuDelegate','$ionicPopover','$state','$stateParams','hmsPopup',function (
    $scope,
    $filter,
    $http,
    $ionicSideMenuDelegate,
    $ionicPopover,
    $state,
    $stateParams,
    hmsPopup) {

    $scope.name = $stateParams.name;
    $scope.image = $stateParams.image;
    //城市
    $scope.city = $stateParams.city;
    console.info('城市==',$scope.city);
    console.info('名字==',$scope.name);
    //今日以及未来几天内天气
    $scope.daily_forecast = [];
    //每三小时天气状况
    $scope.hourly_forecast=[];
    //解决日期显示（未解决）
    $scope.date=[];
    //空气质量
    $scope.aqi=[];
    //穿衣指数
    $scope.drsg=[];

    //air指数
    $scope.air=[];
    //now天气
    /*$scope.nowWeather=[];*/
    //调用综合天气预报接口
    getWeather($scope.city)
    function getWeather(city) {
      var url = 'https://free-api.heweather.com/v5/weather?'+'city='+city+'&key=555f3232dcdd40fe9e30fec30d78ac7c';
      hmsPopup.showLoading("请稍后");
      $http.post(url, '', true).then(function (response) {
        console.info('接口列表==>', angular.toJson(response, true));
        if (response.status == 200) {
          /*if(response.data.HeWeather5[0].suggestion && response.data.HeWeather5[0].now && response.data.HeWeather5[0].aqi.city){*/
          if(response.data.HeWeather5[0] && response.data.HeWeather5[0].status!='unknown city' && !response.data.HeWeather5[1]){
            var responseData1 = response.data.HeWeather5[0].daily_forecast[0];
            $scope.daily_forecast.push(responseData1);
            if($scope.name=='AQI'){
              var responseData = response.data.HeWeather5[0].aqi.city;
              $scope.aqi.push(responseData);
            }else if($scope.name=='运动指数'){
              var responseData = response.data.HeWeather5[0].suggestion.sport;
              $scope.air.push(responseData);
            }else if($scope.name=='舒适度'){
              var responseData = response.data.HeWeather5[0].suggestion.comf;
              $scope.air.push(responseData);
            }else if($scope.name=='辐射指数'){
              var responseData = response.data.HeWeather5[0].suggestion.uv;
              $scope.air.push(responseData);
            }else if($scope.name=='流感指数'){
              var responseData = response.data.HeWeather5[0].suggestion.flu;
              $scope.air.push(responseData);
            }else if($scope.name=='风力'){
              var responseData = response.data.HeWeather5[0].now.wind;
              $scope.air.push(responseData);
            }else if($scope.name=='旅游指数'){
              var responseData = response.data.HeWeather5[0].suggestion.trav;
              $scope.air.push(responseData);
            }else if($scope.name=='洗车指数'){
              var responseData = response.data.HeWeather5[0].suggestion.cw;
              $scope.air.push(responseData);
            }else if($scope.name=='穿衣指数'){
              var responseData = response.data.HeWeather5[0].suggestion.drsg;
              $scope.air.push(responseData);
            }
          /*  console.info('lch==>',$scope.air[0].brf);
            console.info('now===',$scope.daily_forecast[0]);*/
          }else if(response.data.HeWeather5[0] && response.data.HeWeather5[1] && response.data.HeWeather5[1].status!='unknown city'){
            var responseData1 = response.data.HeWeather5[1].daily_forecast[0];
            $scope.daily_forecast.push(responseData1);
            if($scope.name=='AQI'){
              var responseData = response.data.HeWeather5[1].aqi.city;
              $scope.aqi.push(responseData);
            }else if($scope.name=='运动指数'){
              var responseData = response.data.HeWeather5[1].suggestion.sport;
              $scope.air.push(responseData);
            }else if($scope.name=='舒适度'){
              var responseData = response.data.HeWeather5[1].suggestion.comf;
              $scope.air.push(responseData);
            }else if($scope.name=='辐射指数'){
              var responseData = response.data.HeWeather5[1].suggestion.uv;
              $scope.air.push(responseData);
            }else if($scope.name=='流感指数'){
              var responseData = response.data.HeWeather5[1].suggestion.flu;
              $scope.air.push(responseData);
            }else if($scope.name=='风力'){
              var responseData = response.data.HeWeather5[1].now.wind;
              $scope.air.push(responseData);
            }else if($scope.name=='旅游指数'){
              var responseData = response.data.HeWeather5[1].suggestion.trav;
              $scope.air.push(responseData);
            }else if($scope.name=='洗车指数'){
              var responseData = response.data.HeWeather5[1].suggestion.cw;
              $scope.air.push(responseData);
            }else if($scope.name=='穿衣指数'){
              var responseData = response.data.HeWeather5[1].suggestion.drsg;
              $scope.air.push(responseData);
            }
          }else{
            hmsPopup.hideLoading();
            hmsPopup.showPopup('查不到该城市数据！');
          }

          /*查询城市显示*/
          /*if (response.data.HeWeather5[0] && response.data.HeWeather5[0].basic.city) {
            var responseData = response.data.HeWeather5[0].basic.city;
            if (responseData.constructor == Array) {

            } else {
              $scope.city=responseData;
            }
          }*/
          hmsPopup.hideLoading();
        }
      }, function (response) {
        hmsPopup.hideLoading();
        hmsPopup.showPopup('网络连接错误！')
      });
    };

  }])


