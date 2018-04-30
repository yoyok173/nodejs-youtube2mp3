app.controller("HomeCtrl", ["$scope", "$http", "$window", ($scope, $http, $window) => {

    $scope.converter = {
        videoURL: "",
        videoConvert: () => {
            if ($scope.converter.videoURL) {
                $scope.disableConvertButton = true;
                $http.post("/convert", { link: $scope.converter.videoURL })
                    .then((response) => {
                        if (response.data == "video_not_found") {
                            $scope.videoNotFound = true;
                        }
                        else {
                            $scope.downloadURL = response.data.downloadURL;
                        }

                        $scope.convertFinished = true;

                    }).catch((response) => {
                        console.log(response);
                        $scope.convertFinished = true;
                    })
            }
        },
        openMP3: (url) => {
            $window.open(url);
        }
    }

}]);