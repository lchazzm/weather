angular.module('starter.services', [])

  .service('hmsPopup', ['$ionicLoading','$ionicPopup',
    function ($ionicLoading,
               $ionicPopup) {

      this.showLoading = function (content) {
        content = angular.isUndefined(content) || content == null ? "" : content;
        $ionicLoading.show({

          template: '<ion-spinner icon="bubbles" class="spinner-calm"></ion-spinner><p>' + content + '</p>',
          animation: 'fade-in',
          showBackdrop: true
        });
      };
      this.hideLoading = function () {
        $ionicLoading.hide();
      };
      //弹出确认弹出框
      this.showPopup = function (template, callback) {
          var certainPopup =  $ionicPopup.show({
            title: "<span class='warningTitle'>温馨提示</span>",
            cssClass:'fuk-popup-style',
            template: template,
            buttons: [{
              text: '确定',
              type: 'button-cux-popup-confirm'
            }]
          });
          certainPopup.then(callback);
      };

  }])
  //页面间的传值
  .service('TransferService', [function () {
    var _variables = {};
    return {
      get: function (varname) {
        return (typeof _variables[varname] !== 'undefined') ? _variables[varname] : false;
      },
      set: function (varname, value) {
        _variables[varname] = value;
      }
    };
  }])
