(function () {
    angular
        .module("FinalWebAppMaker")
        .factory("CommentsService", commentsService);

    function commentsService($http) {
        var api = {
            "getComments": getComments,
            "saveComment": saveComment
        };
        return api;


        function getComments(commentIds) {
            return $http.post('/api/project/comments', commentIds);
        }

        function saveComment(comment) {
            return $http.post('/api/project/comment', comment);
        }
    }
})();