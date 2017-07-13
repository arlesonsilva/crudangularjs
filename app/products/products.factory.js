app.factory("productsFactory", function($http){
 
    var factory = {};
    
    // read all categorys
    factory.readCategorys = function(){
        return $http({
            method: 'GET',
            url: 'http://localhost/api/category/read_category.php'
        });
    };

    // read all products
    factory.readProducts = function(){
        return $http({
            method: 'GET',
            url: 'http://localhost/api/product/read.php'
        });
    };

    // read all products
    factory.nextPage = function(url){
        return $http({
            method: 'GET',
            url: 'http://localhost/api/product/read_paging.php' + url
        });
    };

    // read all paging products
    factory.readPagingProducts = function(){
        return $http({
            method: 'GET',
            url: 'http://localhost/api/product/read_paging.php'
        });
    };
     
    // createProduct will be here
    // create product
    factory.createProduct = function($scope){
        return $http({
            method: 'POST',
            data: {
                'name' : $scope.name,
                'description' : $scope.description,
                'price' : $scope.price,
                'category_id' : $scope.category
            },
            url: 'http://localhost/api/product/create.php'
        });
    };
     
    // readOneProduct will be here
    // read one product
    factory.readOneProduct = function(id){
        return $http({
            method: 'GET',
            url: 'http://localhost/api/product/read_one.php?id=' + id
        });
    };
     
    // updateProduct will be here
    // update product
    factory.updateProduct = function($scope){
     
        return $http({
            method: 'POST',
            data: {
                'id' : $scope.id,
                'name' : $scope.name,
                'description' : $scope.description,
                'price' : $scope.price,
                'category_id' : $scope.category
            },
            url: 'http://localhost/api/product/update.php'
        });
    };
     
    // deleteProduct will be here
    // delete product
    factory.deleteProduct = function(id){
        return $http({
            method: 'POST',
            data: { 'id' : id },
            url: 'http://localhost/api/product/delete.php'
        });
    };
     
    // searchProducts will be here
    // search all products
    factory.searchProducts = function(keywords){
        return $http({
            method: 'GET',
            url: 'http://localhost/api/product/search.php?s=' + keywords
        });
    };

    return factory;
});