angular.module('directory.services', ['ngResource'])

    .factory('Students', function ($resource) {
        return $resource('/students/:studentId');
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
    .factory('StudentMessenger',function($resource) {

        return $resource('/messenger');

    });
    
    