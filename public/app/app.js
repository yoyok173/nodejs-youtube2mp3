var app = angular.module("youtube2mp3", []);

app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (value) {
                if (value) {
                    element.removeClass('ng-hide');
                } else {
                    element.addClass('ng-hide');
                }
            });
        }
    }
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = false;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.post["Content-Type"] = 'application/json';
}]);


app.controller("HomeCtrl", ["$scope", "$http", ($scope, $http) => {

    $scope.converter = {
        videoURL: "",
        videoConvert: () => {
            if ($scope.converter.videoURL) {
                $http.post("/convert", { link: $scope.converter.videoURL })
                    .then((response) => {
                        console.log(response);
                        if (response.data == "video_not_found") {
                            $scope.videoNotFound = true;
                        }
                        else {
                            // $http.get(response.data.downloadURL)
                            $scope.downloadURL = response.data.downloadURL;
                        }

                        $scope.convertFinished = true;

                    }).catch((response) => {
                        console.log(response);
                        $scope.convertFinished = true;
                    })
            }
        }
    }

}])