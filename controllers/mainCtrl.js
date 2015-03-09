angular.module('mainCtrl', ['ngSanitize', 'angularModalService'])

    .controller('mainController',['$scope', '$http', 'Comment', 'ModalService', function($scope, $http, Comment, ModalService) {
        $scope.commentData = {};
        $scope.errors      = {};
        $scope.loading     = true;

        Comment.get()
            .success(function(data) {
                $scope.comments = data;
                $scope.loading = false;
            });

        $scope.submitComment = function() {
            $scope.loading = true;

            Comment.save($scope.commentData)
                .success(function(data) {
                    $scope.commentData = {};
                    toast('Commentaire ajouté', 4000);
                })
                .error(function(data) {
                    $scope.errors = data;
                    toast('Des erreurs sont survenues lors de la validation du formulaire', 4000);
                });

                Comment.get()
                    .success(function(getData) {
                        $scope.comments = getData;
                        $scope.loading = false;
                    });

        };

        $scope.deleteComment = function(id) {
            $scope.loading = true; 

            ModalService.showModal({
              templateUrl: "templates/modal.html",
              controller: "ComplexController",
              inputs: {
                title: "Suppression d'un commentaire",
                text: "Etes vous sur de vouloir supprimer ce commentaire ?"
              }
            })
            .then(function(modal) {
                modal.element.openModal();
                modal.close.then(function(result) {
                    if(result.success)
                        Comment.destroy(id)
                            .success(function(data) {
                                toast('Commentaire supprimé', 4000);
                                Comment.get()
                                    .success(function(getData) {
                                        $scope.comments = getData;
                                    });
                            });
                });

                $scope.loading = false;
            });
        };

    }]);

angular.module('modalModule', [])

    .controller('ComplexController', [
        '$scope', '$element', 'title', 'text', 'close', 
        function($scope, $element, title, text, close) {
      
            $scope.title = title;
            $scope.text  = text;

            $scope.close = function() {
            
                $element.closeModal();

                close({
                    success:true
                }, 500);
            };

            $scope.cancel = function() {

                $element.closeModal();
            
                close({}, 500); 
          };

    }]);

