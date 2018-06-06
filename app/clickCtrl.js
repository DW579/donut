'use strict';

angular.module('app', ['naif.base64']).controller('clickCtrl', function ($scope, clickStorage) {

    $scope.clickStorage = clickStorage;

    $scope.userLists = clickStorage.userLists;

    $scope.userFolders = clickStorage.userFolders;

    $scope.listName = clickStorage.listName;
    $scope.listId = clickStorage.listId;
    $scope.folderName = clickStorage.folderName;
    $scope.folderId = clickStorage.folderId;
    $scope.errorPage = false;


    $scope.$watch('clickStorage.loadingSpinner', function() {
      if(clickStorage.loadingSpinner === false) {
        $scope.loadingSpinner = false;
      }
    });

    $scope.$watch('clickStorage.errorPage', function() {
      if(clickStorage.errorPage === true) {
        $scope.errorPage = true;
        $scope.loadingSpinner = false;
      }
    });

    $scope.submit = function() {
        var data = {
            subjectLine: $scope.subjectLine,
            zipFile: $scope.zipFile.base64
        }
        clickStorage.createCampaign(data);
    }
});
