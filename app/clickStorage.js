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
    this.createCampaign = function (data) {
        console.log(data);
    }

});
