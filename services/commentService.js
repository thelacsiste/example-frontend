angular.module('commentService', [])

.factory('Comment', function($http) {

    return {
        get : function() {
            return $http.get('http://example.backend.dev/api/comments');
        },

        save : function(commentData) {
            return $http({
                method: 'POST',
                url: 'http://example.backend.dev/api/comments',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: $.param(commentData)
            });
        },

        destroy : function(id) {
            return $http.delete('http://example.backend.dev/api/comments/' + id);
        }
    }

});