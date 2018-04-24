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

      var uploadedImages = $scope.uploadedImage;
      var finalHtml = { };
      var groupArrayHtml = $scope.rawHtml.split("\n");
      var htmlAndImages = { };
      var imageDataArray = [ ];
      // ^^^^^^^^^ Testing rawHtml straight to be sent to RI ^^^^^^^^^
      var rawHtml = $scope.rawHtml;

      console.log(imageDataArray)
      // ******* JS logic to turn raw HTML to be used in RI *********
      for(var i = 0; i < groupArrayHtml.length; i++) {
          var singleArrayHtml = groupArrayHtml[i].split("");
          var arrayLength = singleArrayHtml.length;

          for(var j = 0; j < arrayLength; j++) {
              // if(singleArrayHtml[j] === '"') {
              //     singleArrayHtml[j] = '\\"';
              // }
              // else if (singleArrayHtml[j] === "'") {
              //     singleArrayHtml[j] = "\\'";
              // }
              // else if (singleArrayHtml[j] === '>') {
              //     singleArrayHtml[j] = ">\\r\\n ";
              // }
              // else if(singleArrayHtml[j] === '<' && singleArrayHtml[j+1] === "/") {
              //     singleArrayHtml[j] = "<\\";
              // }
              // ^^^^^^^^ Testing including file name before images folder ^^^^^^^

          }

          singleArrayHtml = singleArrayHtml.join('');

          groupArrayHtml[i] = singleArrayHtml.trim();
          arrayLength = 0;
          singleArrayHtml = { };
      }

      finalHtml = groupArrayHtml.join('');

      $scope.showHtml = finalHtml;



      // ******* JSON Object to be sent over to clickStorage after images and HTML are ready for transport *****
      for(var i = 0; i < uploadedImages.length; i++) {
          var sampleArray = {
              // "itemPath": "images/" + uploadedImages[i].filename,
              "itemPath": "/contentlibrary/donut_2/" + uploadedImages[i].filename,
              "itemData": uploadedImages[i].base64
          };

          imageDataArray.push(sampleArray);
      };

      htmlAndImages = {
          html: {
              "documentPath": "/contentlibrary/donut_2/" + $scope.htmlFileName + ".htm",
              // "content": finalHtml
              "content": rawHtml
          },
          images: imageDataArray,
          htmlFileName: $scope.htmlFileName
      };

      console.log("Below should be the json object with the html:");
      console.log(htmlAndImages);

      clickStorage.createCampaign(htmlAndImages);
      $scope.newSubject = '';
    }
});
