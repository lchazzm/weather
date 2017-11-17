angular.module('starter.mainCtrl',[])

  .controller("MainCtrl",['$scope','$filter','$http','$ionicSideMenuDelegate','$ionicPopover','$state','hmsPopup','TransferService','$cordovaGeolocation','$cordovaSocialSharing','$location','$timeout','$stateParams',function (
    $scope,
    $filter,
    $http,
    $ionicSideMenuDelegate,
    $ionicPopover,
    $state,
    hmsPopup,
    TransferService,
    $cordovaGeolocation,
    $cordovaSocialSharing,
    $location,
    $timeout,
    $stateParams) {


    //侧栏是否打开
    // $scope.closeFlag = false;
    //观察popover是否打开
    $scope.tagFlag = false
    $scope.myUrl = $location.absUrl();//获取当前Url以便分享
    console.info('当前Url==>',$scope.myUrl);

    $scope.chooseCityName = 'N';
    $scope.vm = {
      str:''
    };
    // alert($scope.vm.str);
    //存贮添加的城市，限制最多3个城市
    $scope.view={
      addCityArr:[],
    };
    //语音播报内容
    //当前城市的经纬度
    $scope.lat = '';
    $scope.long = '';
    //每三小时天气状况
    $scope.hourly_forecast=[];
    //解决日期显示（未解决）
    $scope.date=[];
    //空气质量
    $scope.aqi=[];
    //穿衣指数
    $scope.drsg=[];
    //城市选择
    $scope.city='';
    /*近三日天气情况*/
    $scope.daily_forecast = [];
    //生活指数列表
    $scope.livelive=[{name:'AQI',img:'img/aqi.png'},
                  {name:'运动指数',img:'img/play.png'},
                  {name:'舒适度',img:'img/compare.png'},
                  {name:'辐射指数',img:'img/sunny.png'},
                  {name:'流感指数',img:'img/medicine.png'},
                  {name:'风力',img:'img/wind.png'},
                  {name:'旅游指数',img:'img/out.png'},
                  {name:'洗车指数',img:'img/washCar.png'},
                 ];

    $scope.dateHH = [];

    if($scope.city){
      getWeather($scope.city);
    }
    //调用综合天气预报接口
    function getWeather(city) {
      var url = 'https://free-api.heweather.com/v5/weather?'+'city='+city+'&key=555f3232dcdd40fe9e30fec30d78ac7c';
      hmsPopup.showLoading("请稍后");
      $scope.city = city;
      $http.post(url, '', true).then(function (response) {
        console.info('接口列表==>', angular.toJson(response, true));
        if (response.status == 200) {
          /*今日未来每3个时辰天气*/
          if (response.data.HeWeather5[0] && response.data.HeWeather5[0].hourly_forecast && !response.data.HeWeather5[1]) {
            var responseData = response.data.HeWeather5[0].hourly_forecast;
            if (responseData.constructor == Array) {
              $scope.hourly_forecast = responseData;
              console.info('日期改造：',angular.toJson($scope.hourly_forecast,true));
            } else {
              console.info('申请单行信息==>', angular.toJson($scope.hourly_forecast, true));
              $scope.hourly_forecast.push(responseData);
            }
          }else if(response.data.HeWeather5[1] && response.data.HeWeather5[1].hourly_forecast && response.data.HeWeather5[0]){
            var responseData = response.data.HeWeather5[1].hourly_forecast;
            if (responseData.constructor == Array) {
              $scope.hourly_forecast = responseData;
              console.info('日期改造：',angular.toJson($scope.hourly_forecast,true));
            } else {
              console.info('申请单行信息==>', angular.toJson($scope.hourly_forecast, true));
              $scope.hourly_forecast.push(responseData);
            }
          }else{
            hmsPopup.hideLoading();
            hmsPopup.showPopup('查不到该城市天气！');
          }
          console.info('hourly_forecast==>',$scope.hourly_forecast);

          /*今日空城市aqi（空气质量）*/
          if (response.data.HeWeather5[0].aqi && response.data.HeWeather5[0].aqi.city) {
            //查询数据返回aqi的时候，将指定对象添加回来
            if($scope.livelive[0].name!='AQI'){
              $scope.livelive.unshift({name:'AQI',img:'img/aqi.png'});
            }
            var responseData = response.data.HeWeather5[0].aqi.city;
            if (responseData.constructor == Array) {
              $scope.aqi = responseData;
            } else {
              $scope.aqi.push(responseData);
              console.info('申请单行信息==>', angular.toJson($scope.aqi, true));
            }
          }else if(!response.data.HeWeather5[0].aqi && $scope.livelive[0].name=='AQI'){
            //查询数据无aqi的时候，将指定对象删除
            $scope.livelive.splice(0,1);
          }

          /*查询城市显示*/
          if (response.data.HeWeather5[0] && response.data.HeWeather5[0].basic.city) {
            var responseData = response.data.HeWeather5[0].basic.city;
            if (responseData.constructor == Array) {

            } else {
              $scope.city=responseData;
            }
          }

          /*近三日天气情况*/
          if(response.data.HeWeather5[0] && response.data.HeWeather5[0].daily_forecast && !response.data.HeWeather5[1]){
            var responseData = response.data.HeWeather5[0].daily_forecast;
            $scope.daily_forecast = responseData;
            console.info('近三日==>',$scope.daily_forecast);
            $scope.vm.str = $scope.city + '今日最低温度为：' + responseData[0].tmp.min + '摄氏度，最高温度为：' + responseData[0].tmp.max + '摄氏度;';
            // console.info('语音播报==>',$scope.vm.str);
          }else if(response.data.HeWeather5[1] && response.data.HeWeather5[1].daily_forecast && response.data.HeWeather5[0]){
            var responseData = response.data.HeWeather5[1].daily_forecast;
            $scope.daily_forecast = responseData;
            console.info('近三日==>',$scope.daily_forecast);
            $scope.vm.str = $scope.city + '今日最低温度为：' + responseData[0].tmp.min + '摄氏度，最高温度为：' + responseData[0].tmp.max + '摄氏度;';
            // console.info('语音播报==>',$scope.vm.str);
          }

          //当地名在两个国家都出现的时候
          if(response.data.HeWeather5[1] && response.data.HeWeather5[1].suggestion.drsg){
            var responseData = response.data.HeWeather5[1].suggestion.drsg;
            if (responseData.constructor == Array) {
              $scope.drsg = responseData;
            } else {
              $scope.drsg.push(responseData);
              console.info('今日生活指数==>', angular.toJson($scope.drsg, true));
            }
            $scope.vm.str = $scope.vm.str + '生活指数：' + responseData.txt;
            // console.info('语音播报==>',$scope.vm.str);
          }else if(response.data.HeWeather5[0] && response.data.HeWeather5[0].suggestion.drsg && !response.data.HeWeather5[1]){
            var responseData = response.data.HeWeather5[0].suggestion.drsg;
            if (responseData.constructor == Array) {
              $scope.drsg = responseData;
            } else {
              $scope.drsg.push(responseData);
              console.info('今日生活指数==>', angular.toJson($scope.drsg, true));
            }
            $scope.vm.str = $scope.vm.str + '生活指数：' + responseData.txt;
          }
          console.info('语音播报==>',$scope.vm.str);
          hmsPopup.hideLoading();
        }else{
          hmsPopup.hideLoading();
          hmsPopup.showPopup('连接超时！')
        }
      }, function (response) {
        hmsPopup.hideLoading();
        hmsPopup.showPopup('网络连接错误！')
      });
    };
    //生活指数查询
    $scope.goDetail = function (city,name,image) {
      $state.go('tab.air', {city:city,name:name,image:image});
    }
    //城市天气查询
    $scope.goCity = function () {
      $state.go('tab.city');
    }

    //下拉刷新
    $scope.refresh = function () {
      getWeather($scope.city);
      $scope.$broadcast('scroll.refreshComplete');
    }

    //添加城市
    $scope.chooseCityname =function () {
      console.info('11111',angular.toJson(TransferService.get('AddCityName'),true));
      $scope.view.addCityArr = TransferService.get('AddCityName');
      // closeToggle();
      if($scope.tagFlag){
        closePopover();
      }
      TransferService.set('addCityName','');
      if($scope.view.addCityArr.length == 3){
        $scope.chooseCityName = 'N';
        hmsPopup.showPopup('至多只能添加三个城市！');
      }else{
        $scope.chooseCityName = 'Y';
        // console.info('1234567890==>',$scope.chooseCityName);
        $state.go('tab.city',{chooseCityName:$scope.chooseCityName});
      }
    }

    //通过输入城市进行查询
    $scope.$on('$ionicView.beforeEnter', function () {
      console.info(TransferService.get('selectCity'));
      if (TransferService.get('selectCity') != '') {
        $scope.city = TransferService.get('selectCity');
        $scope.hourly_forecast=[];
        $scope.date=[];
        $scope.aqi=[];
        $scope.drsg=[];
        getWeather($scope.city);
      }
      // if (TransferService.get('searchCityName') != '') {
      //   $scope.city = TransferService.get('searchCityName');
      //   $scope.hourly_forecast=[];
      //   $scope.date=[];
      //   $scope.aqi=[];
      //   $scope.drsg=[];
      //   getWeather($scope.city);
      // }
    });




//定位当前城市
// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates

    $timeout(function () {
      cordova.plugins.BDDWplugin.getLocation(null,function (data) {
        // alert(data.allMessage);
        // alert(data.distractName);
        $scope.city = (data.distractName).substring(0,(data.distractName).length-1);
        TransferService.set('distractName',$scope.city);
        // alert($scope.city);
        getWeather($scope.city);
      });
    },800);


    //百度语音播放插件
    $scope.bdvoice = function () {
      // alert(123);
      if($scope.tagFlag){
        closePopover();
      }
      if (window.plugins.BdVoice) {
        window.plugins.BdVoice.speakout($scope.vm.str, function (success) {
          // alert($scope.vm.str);
        }, function (fail) {
          // alert('no');
        });
      }else{
        // alert(1234567890);
      }
    }

    //社会分享
    $scope.shareAnywhere = function() {
      if($scope.tagFlag){
        closePopover();
      }
      $cordovaSocialSharing.share("", "", "", $scope.myUrl);
    };

    //popover固定用法
    $ionicPopover.fromTemplateUrl("a.html", {
      scope: $scope
    })
      .then(function(popover){
        $scope.popover = popover;
      });


    //$event
    $scope.openPopover = function($event) {

      $scope.tagFlag = true;
      // console.log($event);
      $scope.popover.show($event);
    }
    function closePopover() {
      $scope.popover.hide();
    };

  }])


