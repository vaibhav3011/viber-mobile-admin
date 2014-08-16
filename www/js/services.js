angular.module('directory.services', ['ngResource'])

    .factory('Students', function ($resource) {
        return $resource('/students/:studentId/:data');
    })
     .factory('appCache', function ($cacheFactory) {
        return $cacheFactory('appData');
    })
    .factory('Manage',function($resource){
       
       return $resource('/manage/getsubordinates/:email/:role');
        
    });
    
    