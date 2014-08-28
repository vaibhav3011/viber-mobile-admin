angular.module('directory.services', ['ngResource'])

    .factory('Students', function ($resource) {
        return $resource('/students/:studentId',
            {'query': { method: 'GET' }});
    })
    .factory('studentCache', function ($cacheFactory) {
        return $cacheFactory('appData');
    })
    .factory('Manage',function($resource){
       
       return $resource('/manage/getsubordinates/:email/:role');
        
    })
    .factory('GetCity',function($resource, $http) {
        return $resource('/city');
    })
    .factory('CityDetail',function($resource) {

        return $resource('/data/:city');

    })
    .factory('ZonalManagerDetail',function($resource) {

        return $resource('/zonalmanager');

    })
    .factory('ProjectManagerDetail',function($resource) {

        return $resource('/projectmanager');

    })
    .factory('LoginService',function($resource) {

        //return $resource('/login');
        return $resource('/login', {}, {
            save: { method: 'POST' }
        });

    })
    .factory('StudentMessenger',function($resource) {

        return $resource('/messenger');

    });
    
    