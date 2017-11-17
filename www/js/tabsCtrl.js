/**
 * Created by lch on 2017/3/28.
 */
angular.module('starter.tabsCtrl',[])

  .controller("TabsCtrl",['$scope','$filter','$http','$ionicSideMenuDelegate','$ionicPopover','$state','hmsPopup','TransferService','$cordovaGeolocation','$cordovaSocialSharing','$location','$timeout','$ionicModal',function (
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
    $ionicModal) {

    //编辑城市标识
    $scope.editFlag = false;
    $scope.chooseCityName = 'N';
    //存贮添加的城市，限制最多3个城市
    $scope.addCity = [];
    $scope.view={
      addCityArr:JSON.parse(window.localStorage.getItem('addCityNameLocal'))?JSON.parse(window.localStorage.getItem('addCityNameLocal')):[],////将取出的数据以数组的形式展示
    }
    $timeout(function () {
      //城市选择
      $scope.city=TransferService.get('distractName');
    },1500);

    //未点击添加的城市时：默认不查询
    // TransferService.set('searchCityName','');


    //modal的使用
    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/useHelp.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal1 = modal;
    });

    //添加城市
    $scope.chooseCityname =function () {
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

    //编辑城市
    $scope.editCity = function () {
      if($scope.view.addCityArr.length>0){
        $scope.editFlag = !$scope.editFlag;
        console.info($scope.editFlag);
      }else{
        $scope.editFlag = false;
        hmsPopup.showPopup('暂无城市可编辑！');
        console.info($scope.editFlag);
      }
    }

    //删除城市
    $scope.deleteCity = function (CityName) {
      angular.forEach($scope.view.addCityArr,function (item,index) {
        if(CityName == item){
          $scope.view.addCityArr.splice(index,0);
        }
      })
      if($scope.view.addCityArr.length == 0){
        $scope.editFlag = false;
        console.info($scope.editFlag);
      }
      window.localStorage.setItem('addCityNameLocal',JSON.stringify($scope.view.addCityArr));//将存储的数据转换成数组的形式
    }

    //查询添加的城市天气
    /*$scope.searchCityName = function (CityName) {
      $ionicSideMenuDelegate.toggleLeft(false);
      TransferService.set('searchCityName',CityName);
    }*/

    //通过输入城市进行查询
    $scope.$on('$ionicView.enter', function () {
      if(TransferService.get('addCityName') != ''){
        $ionicSideMenuDelegate.toggleLeft();
        $scope.view.addCityArr.push(TransferService.get('addCityName'));
        window.localStorage.setItem('addCityNameLocal',JSON.stringify($scope.view.addCityArr));//将存储的数据转换成数组的形式
        console.info('本地存储城市==>',JSON.parse(window.localStorage.getItem('addCityNameLocal')));//将取出的数据以数组的形式展示
        console.info('添加的城市==>',$scope.view.addCityArr);
        TransferService.set('addCityName','');
        unique($scope.view.addCityArr);
      }
    });
    //去重
    function unique(addCityArr) {
      var hash = {},
        len = addCityArr.length,
        result = [];
      for (var i = 0; i < len; i++){
        if (!hash[addCityArr[i]]){
          hash[addCityArr[i]] = true;
          result.push(addCityArr[i]);
        }else{
          hmsPopup.showPopup('该城市重复！');
        }
      }
      $scope.view.addCityArr = result;
      TransferService.set('AddCityName',$scope.view.addCityArr);
    }

    //关闭侧栏
    function closeToggle(){
      $ionicSideMenuDelegate.toggleLeft(false);
    };

    $scope.openModal = function () {
      $scope.modal.show();//先调用界面出来之后，再填充modal颜色
      fillColor();
    }
    //填充modal的颜色，以便选择
    $scope.colorLength = [1,2,3,4,5,6,7,8,9,10];
    $scope.itemColor1 = [];
    function fillColor() {
      $scope.itemColor1 = [];
      var itemColor = document.getElementsByClassName('itemColor');
      $scope.itemColor1 = itemColor;
      if(itemColor.length>0){
        for(var i = 0;i<itemColor.length;i++){
          switch (i){
            case 0:itemColor[i].style.backgroundColor = '#11c1f3';break;
            case 1:itemColor[i].style.backgroundColor = '#0a9dc7';break;
            case 2:itemColor[i].style.backgroundColor = '#0c60ee';break;
            case 3:itemColor[i].style.backgroundColor = '#387ef5';break;
            case 4:itemColor[i].style.backgroundColor = '#6b46e5';break;
            case 5:itemColor[i].style.backgroundColor = '#886aea';break;
            case 6:itemColor[i].style.backgroundColor = '#e42112';break;
            case 7:itemColor[i].style.backgroundColor = '#ef473a';break;
            case 8:itemColor[i].style.backgroundColor = '#33cd5f';break;
            case 9:itemColor[i].style.backgroundColor = '#28a54c';break;
          }
        }
      }
      // console.info('1111111',$scope.itemColor1);
    }


    //切换颜色
    $scope.changeColor = function(len){
      // var lch = document.getElementById('lch');

      var dark_bg = document.getElementsByClassName('bg');
     /* for(var i = 0;i<dark_bg.length;i++){
        dark_bg[i].className=dark_bg[i].className+' color1';//在原来class上添加class
      }*/

      if(len){
          switch (len-1){
            case 0:
              for(var i = 0;i<dark_bg.length;i++){
                dark_bg[i].style.backgroundColor = '#11c1f3';
              };
              break;
            case 1:
              for(var i = 0;i<dark_bg.length;i++){
                dark_bg[i].style.backgroundColor = '#0a9dc7';
              };
              break;
            case 2:
              for(var i = 0;i<dark_bg.length;i++){
                dark_bg[i].style.backgroundColor = '#0c60ee';
              };
              break;
            case 3:
              for(var i = 0;i<dark_bg.length;i++){
                dark_bg[i].style.backgroundColor = '#387ef5';
              };
              break;
            case 4:
              for(var i = 0;i<dark_bg.length;i++){
                dark_bg[i].style.backgroundColor = '#6b46e5';
              };
              break;
            case 5:
              for(var i = 0;i<dark_bg.length;i++){
                dark_bg[i].style.backgroundColor = '#886aea';
              };
              break;
            case 6:
              for(var i = 0;i<dark_bg.length;i++){
                dark_bg[i].style.backgroundColor = '#e42112';
              };
              break;
            case 7:
              for(var i = 0;i<dark_bg.length;i++){
                dark_bg[i].style.backgroundColor = '#ef473a';
              };
              break;
            case 8:
              for(var i = 0;i<dark_bg.length;i++){
                dark_bg[i].style.backgroundColor = '#33cd5f';
              };
              break;
            case 9:
              for(var i = 0;i<dark_bg.length;i++){
                dark_bg[i].style.backgroundColor = '#28a54c';
              };
              break;
          }
      }

    }

    //还原侧边栏的颜色
    $scope.firstColor = function () {
      $scope.modal.hide();
      // var dark_bg = document.getElementsByClassName('bg');
      $timeout(function () {
        var item = document.getElementsByClassName('bg');
        var headerBarStyle = document.getElementsByClassName('headerBarStyle');
        var contentStyle = document.getElementsByClassName('contentStyle');
        for(var i = 0;i<item.length;i++){
          item[i].style.backgroundColor = '';
          // item[i].className='dark-bg'+' item';//在原来class上添加class
        }
        headerBarStyle[0].style.backgroundColor = '#3C3C3C';
        contentStyle[0].style.backgroundColor = '#222222';
      },100)
    }

    //使用帮助
    $scope.useHelp = function () {
      $scope.modal1.show();
    }

  }])


