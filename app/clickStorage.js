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
        var campaignId = "";
        var campaignSetUp = {
            method: 'POST',
            url: "https://us15.api.mailchimp.com/3.0/campaigns",
            headers: {
                "Authorization": "Basic ZHVzdGluLnd1cnR6QG9yYWNsZS5jb206ZDdhYjc0ZmE2YzgxYjc2ODg3MWQ1MDAzMDhhZTVhY2YtdXMxNQ==",
                "Content-type": "application/json"
            },
            data: {
                type: "regular",
                recipients: {
                    list_id: "bd56aae19c"
                },
                settings: {
                    subject_line: data.subjectLine,
                    title: data.subjectLine,
                    from_name: "Dustin Wurtz",
                    reply_to: "dustin.wurtz@oracle.com",
                    auto_footer: false
                }
            }
        }

        $http(campaignSetUp).then(function successCallback(response) {
            console.log(response);
        },
        function errorCallback(response) {
            console.log(response);
            clickStorage.errorPage = true;
        });
    }

});
