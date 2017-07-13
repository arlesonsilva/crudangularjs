app.factory("categorysFactory", function($http){
 
    var factory = {};
    
    // read all categorys
    factory.readCategorys = function(){
        return $http({
            method: 'GET',
            url: 'http://localhost/api/category/read_category.php'
        });
    };
   
    // createCategory will be here
    // create Category
    factory.createCategory = function($scope){
        return $http({
            method: 'POST',
            data: {
                'name' : $scope.name,
                'description' : $scope.description
            },
            url: 'http://localhost/api/category/create.php'
        });
    };
     
    // readOneCategory will be here
    // read one category
    factory.readOneCategory = function(id){
        return $http({
            method: 'GET',
            url: 'http://localhost/api/category/read_one.php?id=' + id
        });
    };
    
    // updateCategory will be here
    // update category
    factory.updateCategory = function($scope){
     
        return $http({
            method: 'POST',
            data: {
                'id' : $scope.id,
                'name' : $scope.name,
                'description' : $scope.description
            },
            url: 'http://localhost/api/category/update.php'
        });
    };
      
    // deleteCategory will be here
    // delete category
    factory.deleteCategory = function(id){
        return $http({
            method: 'POST',
            data: { 'id' : id },
            url: 'http://localhost/api/category/delete.php'
        });
    };
    
    // searchCategorys will be here
    // search all categorys
    factory.searchCategorys = function(keywords){
        return $http({
            method: 'GET',
            url: 'http://localhost/api/category/search.php?s=' + keywords
        });
    };

    return factory;
});