angular.module('app').service('clickStorage', function ($q, $http) {
    var _this = this;
    this.data = [];
    var listObj = { };
    var listName = [];
    var listId = [];
    var folderObj = { };
    var folderName = [];
    var folderId = [];
    var listData = { };
    var folderData = { };
    var clickStorage = this;
    var loadingSpinner = false;
    var successPage = false;
    var loadingSpinner = false;
    var successPage = false;

    // API calls

    // ******* Create Campaign *******
    this.createCampaign = function (htmlAndImages) {
        var documentPath = htmlAndImages.html.documentPath;
        var content = htmlAndImages.html.content;



        var createHtml = {
          method: 'POST',
          url: "https://api2-016.responsys.net/rest/api/v1.3/clDocs",
          headers: {
            "Authorization": "E2Vn4wHR2GU66ppt3RvjItjPvqplOcPY2y3PjogktBrvaCKGjO4aylJg",
            "Content-type": "application/json"
          },
          data: {
              "documentPath": documentPath,
              "content": content
          }
        }

        $http(createHtml).then(function successCallback(response) {
            console.log("Step 1 done, Doc set up, response is below:");
            console.log(response);
            return $http({
                method: "POST",
                url: "https://api2-016.responsys.net/rest/api/v1.3/clDocImages/contentlibrary/donut_2/" + htmlAndImages.htmlFileName + ".htm",
                headers: {
                  "Authorization": "E2Vn4wHR2GU66ppt3RvjItjPvqplOcPY2y3PjogktBrvaCKGjO4aylJg",
                  "Content-type": "application/json"
                },
                data: {
                    "documentPath": "/contentlibrary/donut_2/" + htmlAndImages.htmlFileName + ".htm",
                    "imageData": htmlAndImages.images
                }
            }).then(function successCallback(response) {
                console.log("Step 2 done, images uploaded to Doc, response is below:");
                console.log(response);
                return $http({
                    method: "POST",
                    url: "https://api2-016.responsys.net/rest/api/v1.3/campaigns",
                    headers: {
                      "Authorization": "E2Vn4wHR2GU66ppt3RvjItjPvqplOcPY2y3PjogktBrvaCKGjO4aylJg",
                      "Content-type": "application/json"
                    },
                    data: {
                        "name": htmlAndImages.htmlFileName,
                        "folderName": "!!Dustins_Test_Folder",
                        "type": "EMAIL",
                        "purpose": "PROMOTIONAL",
                        "listName": "Z_Destiny_Contacts",
                        "htmlMessagePath": "/contentlibrary/donut_2/" + htmlAndImages.htmlFileName + ".htm",
                        "enableLinkTracking": false,
                        "enableExternalTracking": false,
                        "subject": htmlAndImages.htmlFileName,
                        "fromName": "Booya",
                        "locale": "en"
                    }
                }).then(function successCallback(response) {
                    console.log("Step 3 done, campaign is set up and then will be sent, response is below:");
                    console.log(response);
                    return $http({
                        method: "POST",
                        url: "https://api2-016.responsys.net/rest/api/v1.3/campaigns/" + htmlAndImages.htmlFileName + "/email",
                        headers: {
                          "Authorization": "E2Vn4wHR2GU66ppt3RvjItjPvqplOcPY2y3PjogktBrvaCKGjO4aylJg",
                          "Content-type": "application/json"
                        },
                        data: {
                            "recipientData" : [{
	                            "recipient" : {
		                            "customerId" : "1",
		                            "emailAddress" : "dustin.wurtz@gmail.com",
		                            "listName" : {
		                            "folderName" : "TEST_Destiny_2013026_LB_GOFOX",
		                            "objectName" : "Z_Destiny_Contacts"
		                            },
		                            "recipientId" : "420113672",
		                            "emailFormat" : "HTML_FORMAT"
	                            }
	                        }]
                        }
                    });
                });
            });
        }, function errorCallback(response) {
          console.log(response);
          clickStorage.errorPage = true;
        });
    }

});
